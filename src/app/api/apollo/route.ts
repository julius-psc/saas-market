import { NextResponse } from 'next/server'
import { NICHE_APOLLO_KEYWORDS, APOLLO_DEFAULT_TITLES } from '@/lib/niches-data'
import type { ApolloContact } from '@/lib/types'
import { ApifyClient } from 'apify-client'

export async function POST(req: Request) {
  const apiKey = process.env.APIFY_API_TOKEN
  if (!apiKey) {
    return NextResponse.json({ error: 'APIFY_API_TOKEN is not configured.' }, { status: 500 })
  }

  const body = await req.json() as { nicheId?: string; titles?: string[]; limit?: number }
  const { nicheId, titles, limit = 10 } = body

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
  const query = `site:linkedin.com/in/ AND (${keywordsStr}) AND (${titlesStr})`

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

    // 2. Scrape Profiles
    const profileRun = await client.actor('dev_fusion/Linkedin-Profile-Scraper').call({
      urls,
      skipInstructions: true
    })

    const { items: profileItems } = await client.dataset(profileRun.defaultDatasetId).listItems() as { items: any[] }

    const contacts: ApolloContact[] = profileItems.map((p: any) => {
      const location = [p.city, p.state, p.country].filter(Boolean).join(', ')
      const emailObj = p.emails && p.emails.length > 0 ? p.emails[0] : null
      const emailStr = emailObj ? (typeof emailObj === 'string' ? emailObj : emailObj.email) : null

      return {
        id: p.linkedinUrl || String(Math.random()),
        name: `${p.firstName || ''} ${p.lastName || ''}`.trim() || p.fullName || 'Unknown',
        title: p.headline || p.title || '',
        company: p.company || '',
        email: emailStr || null,
        linkedinUrl: p.linkedinUrl || null,
        location: location || null,
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
