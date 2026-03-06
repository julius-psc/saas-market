import { NextResponse } from 'next/server'
import { NICHE_APOLLO_KEYWORDS, APOLLO_DEFAULT_TITLES } from '@/lib/niches-data'
import type { ApolloContact } from '@/lib/types'
import { ApifyClient } from 'apify-client'

export async function POST(req: Request) {
  const apiKey = process.env.APIFY_API_TOKEN
  if (!apiKey) {
    return NextResponse.json({ error: 'APIFY_API_TOKEN is not configured.' }, { status: 500 })
  }

  const body = await req.json() as { nicheId?: string; titles?: string[]; limit?: number; region?: string }
  const { nicheId, titles, limit = 10, region } = body

  if (!nicheId) {
    return NextResponse.json({ error: 'nicheId is required.' }, { status: 400 })
  }

  const keywords: string[] = NICHE_APOLLO_KEYWORDS[nicheId]
  if (!keywords || !Array.isArray(keywords)) {
    return NextResponse.json({ error: `No keyword mapping found for niche: ${nicheId}` }, { status: 400 })
  }

  const personTitles = titles?.length ? titles : APOLLO_DEFAULT_TITLES

  // Construct a google dork to find linkedin profiles
  // e.g. site:linkedin.com/in/ ("plumbing" OR "hvac") ("Founder" OR "CEO")
  const keywordsStr = keywords.map(k => `"${k}"`).join(' OR ')
  const titlesStr = personTitles.map(t => `"${t}"`).join(' OR ')
  let query = `site:linkedin.com/in/ AND (${keywordsStr}) AND (${titlesStr})`

  if (region === 'eu-uk') {
    const locations = ["UK", "United Kingdom", "Europe", "London", "France", "Germany", "Spain", "Italy", "Netherlands", "Ireland", "Sweden", "Switzerland", "Belgium", "Austria"]
    const locStr = locations.map(l => `"${l}"`).join(' OR ')
    query += ` AND (${locStr})`
  } else if (region === 'us-ca') {
    const locations = ["United States", "US", "USA", "Canada", "New York", "California", "Texas", "Florida", "Ontario"]
    const locStr = locations.map(l => `"${l}"`).join(' OR ')
    query += ` AND (${locStr})`
  }

  const client = new ApifyClient({ token: apiKey })

  try {
    // 1. Get LinkedIn URLs
    const searchRun = await client.actor('apify/google-search-scraper').call({
      queries: query,
      resultsPerPage: limit,
      maxPagesPerQuery: 1
    })

    const { items: searchItems } = await client.dataset(searchRun.defaultDatasetId).listItems() as { items: any[] }
    if (!searchItems || searchItems.length === 0 || !searchItems[0].organicResults) {
      return NextResponse.json({ contacts: [] })
    }

    const urls = searchItems[0].organicResults.map((r: any) => r.url).slice(0, limit)

    if (urls.length === 0) {
      return NextResponse.json({ contacts: [] })
    }

    // Since 'dev_fusion/Linkedin-Profile-Scraper' is blocked on the free Apify tier,
    // we extract contact data directly from the Google Search results.
    const contacts: ApolloContact[] = searchItems[0].organicResults.slice(0, limit).map((r: any) => {
      // e.g. "James Leekman - Founder at Plumbing and HVAC" -> Name is usually before the first "-" or "|"
      const titleParts = r.title.split(/ [-|] /)
      const nameGuess = titleParts[0].trim() || 'Unknown'

      const pInfo = r.personalInfo || {}

      return {
        id: r.url || String(Math.random()),
        name: nameGuess,
        title: pInfo.jobTitle || titleParts.slice(1).join(' - ') || '',
        company: pInfo.companyName || '',
        email: null, // Scraper doesn't provide email
        linkedinUrl: r.url || null,
        location: pInfo.location || null,
      }
    })

    return NextResponse.json({ contacts })
  } catch (err: any) {
    console.error('Apify error:', err)
    return NextResponse.json(
      { error: `Network error reaching Apify API: ${err instanceof Error ? err.message : 'unknown'}` },
      { status: 502 }
    )
  }
}
