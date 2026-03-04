import { NextResponse } from 'next/server'
import { getNicheById } from '@/lib/niches-data'
import { getNicheStats, getOutreachByNiche, getResponsesByNiche } from '@/lib/db'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const niche = getNicheById(id)
  if (!niche) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const stats = getNicheStats(id)
  const outreach = getOutreachByNiche(id)
  const responses = getResponsesByNiche(id)

  return NextResponse.json({ niche, stats, outreach, responses })
}
