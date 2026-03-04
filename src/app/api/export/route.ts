import { NextResponse } from 'next/server'
import { getAllNicheStats, getOutreach, getResponses } from '@/lib/db'
import { NICHES } from '@/lib/niches-data'

function escapeCsv(val: string | number | undefined): string {
  const s = String(val ?? '')
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

function toRow(fields: (string | number | undefined)[]): string {
  return fields.map(escapeCsv).join(',')
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const format = searchParams.get('format') ?? 'json'

  const nicheStats = getAllNicheStats()
  const outreach = getOutreach()
  const responses = getResponses()

  if (format === 'csv') {
    const lines: string[] = []

    lines.push('=== NICHE SIGNAL SCORES ===')
    lines.push(toRow(['Rank', 'Niche', 'Signal Score', 'Outreach Sent', 'Responses', 'Response Rate %', 'Top Pain Points']))
    nicheStats.forEach((s, i) => {
      lines.push(
        toRow([
          i + 1,
          s.nicheName,
          s.signalScore,
          s.outreachSent,
          s.responsesReceived,
          Math.round(s.responseRate),
          s.topPainPoints.join(' | '),
        ])
      )
    })

    lines.push('')
    lines.push('=== ALL OUTREACH ===')
    lines.push(toRow(['ID', 'Niche', 'Contact Name', 'Company', 'Title', 'Channel', 'Sent At', 'Notes']))
    for (const o of outreach) {
      const niche = NICHES.find((n) => n.id === o.nicheId)
      lines.push(
        toRow([o.id, niche?.name ?? o.nicheId, o.contactName, o.contactCompany, o.contactTitle, o.channel, o.sentAt, o.notes])
      )
    }

    lines.push('')
    lines.push('=== ALL RESPONSES ===')
    lines.push(toRow(['ID', 'Niche', 'Contact Name', 'Company', 'Title', 'Sentiment', 'Pain Points', 'Response Text', 'Notes', 'Received At']))
    for (const r of responses) {
      const niche = NICHES.find((n) => n.id === r.nicheId)
      lines.push(
        toRow([
          r.id,
          niche?.name ?? r.nicheId,
          r.contactName,
          r.contactCompany,
          r.contactTitle,
          r.sentiment,
          r.painPoints.join(' | '),
          r.responseText,
          r.notes,
          r.receivedAt,
        ])
      )
    }

    const csv = lines.join('\n')
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="niche-research-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    })
  }

  // JSON export
  return NextResponse.json(
    {
      exportedAt: new Date().toISOString(),
      summary: {
        totalOutreach: outreach.length,
        totalResponses: responses.length,
        globalResponseRate:
          outreach.length > 0 ? Math.round((responses.length / outreach.length) * 100) : 0,
      },
      nicheSignalScores: nicheStats,
      outreach,
      responses,
    },
    {
      headers: {
        'Content-Disposition': `attachment; filename="niche-research-${new Date().toISOString().slice(0, 10)}.json"`,
      },
    }
  )
}
