import { NextResponse } from 'next/server'
import { NICHES } from '@/lib/niches-data'
import { getAllNicheStats } from '@/lib/db'

export async function GET() {
  const stats = getAllNicheStats()
  const niches = NICHES.map((n) => {
    const s = stats.find((st) => st.nicheId === n.id)
    return { ...n, stats: s ?? null }
  })
  return NextResponse.json(niches)
}
