import { notFound } from 'next/navigation'
import { getNicheById, NICHES } from '@/lib/niches-data'
import { getNicheStats, getOutreachByNiche, getResponsesByNiche } from '@/lib/db'
import NicheDetailClient from './NicheDetailClient'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return NICHES.map((n) => ({ id: n.id }))
}

export default async function NichePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const niche = getNicheById(id)
  if (!niche) notFound()

  const stats = getNicheStats(id)
  const outreach = getOutreachByNiche(id)
  const responses = getResponsesByNiche(id)

  return (
    <NicheDetailClient
      niche={niche}
      initialStats={stats}
      initialOutreach={outreach}
      initialResponses={responses}
    />
  )
}
