import { NextResponse } from 'next/server'
import { getAllNicheStats, getGlobalPainPoints, getOutreach, getResponses } from '@/lib/db'

export async function GET() {
  const outreach = getOutreach()
  const responses = getResponses()
  const nicheStats = getAllNicheStats()
  const globalPainPoints = getGlobalPainPoints()

  const totalOutreach = outreach.length
  const totalResponses = responses.length
  const globalResponseRate =
    totalOutreach > 0 ? Math.round((totalResponses / totalOutreach) * 100) : 0

  const topPainPoints = Object.entries(globalPainPoints)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([category, count]) => ({ category, count }))

  return NextResponse.json({
    totalOutreach,
    totalResponses,
    globalResponseRate,
    topPainPoints,
    nicheStats,
  })
}
