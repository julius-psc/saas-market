import { NextResponse } from 'next/server'
import { NICHE_APOLLO_KEYWORDS, APOLLO_DEFAULT_TITLES } from '@/lib/niches-data'
import type { ApolloContact } from '@/lib/types'

interface ApolloPersonResult {
  id: string
  name: string
  title: string | null
  organization: { name: string } | null
  email: string | null
  linkedin_url: string | null
  city: string | null
  state: string | null
  country: string | null
}

interface ApolloApiResponse {
  people?: ApolloPersonResult[]
  error?: string
}

export async function POST(req: Request) {
  const apiKey = process.env.APOLLO_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'APOLLO_API_KEY is not configured.' }, { status: 500 })
  }

  const body = await req.json() as { nicheId?: string; titles?: string[]; limit?: number }
  const { nicheId, titles, limit = 25 } = body

  if (!nicheId) {
    return NextResponse.json({ error: 'nicheId is required.' }, { status: 400 })
  }

  const keywords = NICHE_APOLLO_KEYWORDS[nicheId]
  if (!keywords) {
    return NextResponse.json({ error: `No keyword mapping found for niche: ${nicheId}` }, { status: 400 })
  }

  const personTitles = titles?.length ? titles : APOLLO_DEFAULT_TITLES

  const apolloPayload = {
    api_key: apiKey,
    q_organization_keyword_tags: keywords,
    person_titles: personTitles,
    per_page: Math.min(limit, 50),
    page: 1,
  }

  let apolloRes: Response
  try {
    apolloRes = await fetch('https://api.apollo.io/v1/mixed_people/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apolloPayload),
    })
  } catch (err) {
    return NextResponse.json(
      { error: `Network error reaching Apollo API: ${err instanceof Error ? err.message : 'unknown'}` },
      { status: 502 }
    )
  }

  if (!apolloRes.ok) {
    const text = await apolloRes.text()
    return NextResponse.json(
      { error: `Apollo API returned ${apolloRes.status}`, details: text },
      { status: 502 }
    )
  }

  const data = (await apolloRes.json()) as ApolloApiResponse
  const people: ApolloPersonResult[] = data.people ?? []

  const contacts: ApolloContact[] = people.map((p) => ({
    id: p.id,
    name: p.name,
    title: p.title ?? '',
    company: p.organization?.name ?? '',
    email: p.email ?? null,
    linkedinUrl: p.linkedin_url ?? null,
    location: [p.city, p.state, p.country].filter(Boolean).join(', ') || null,
  }))

  return NextResponse.json({ contacts })
}
