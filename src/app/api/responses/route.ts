import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { addResponse, getResponses } from '@/lib/db'
import { getNicheById } from '@/lib/niches-data'
import type { Response, Sentiment } from '@/lib/types'

export async function GET() {
  return NextResponse.json(getResponses())
}

export async function POST(req: Request) {
  const body = await req.json()
  const {
    nicheId,
    outreachId,
    contactName,
    contactCompany,
    contactTitle,
    responseText,
    painPoints,
    sentiment,
    notes,
  } = body

  if (!nicheId || !contactName || !contactCompany || !responseText) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const niche = getNicheById(nicheId)
  if (!niche) return NextResponse.json({ error: 'Invalid nicheId' }, { status: 400 })

  const response: Response = {
    id: uuidv4(),
    nicheId,
    outreachId: outreachId ?? undefined,
    contactName,
    contactCompany,
    contactTitle: contactTitle ?? '',
    responseText,
    painPoints: Array.isArray(painPoints) ? painPoints : [],
    receivedAt: new Date().toISOString(),
    sentiment: (sentiment as Sentiment) ?? 'neutral',
    notes: notes ?? '',
  }

  addResponse(response)
  return NextResponse.json(response, { status: 201 })
}
