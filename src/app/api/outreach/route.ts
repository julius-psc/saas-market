import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { addOutreach, getOutreach, deleteOutreach } from '@/lib/db'
import { getNicheById } from '@/lib/niches-data'
import type { Outreach } from '@/lib/types'

export async function GET() {
  return NextResponse.json(getOutreach())
}

export async function POST(req: Request) {
  const body = await req.json()
  const { nicheId, templateId, contactName, contactCompany, contactTitle, channel, notes } = body

  if (!nicheId || !contactName || !contactCompany || !channel) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const niche = getNicheById(nicheId)
  if (!niche) return NextResponse.json({ error: 'Invalid nicheId' }, { status: 400 })

  const outreach: Outreach = {
    id: uuidv4(),
    nicheId,
    templateId: templateId ?? '',
    contactName,
    contactCompany,
    contactTitle: contactTitle ?? '',
    channel,
    sentAt: new Date().toISOString(),
    notes: notes ?? '',
  }

  addOutreach(outreach)
  return NextResponse.json(outreach, { status: 201 })
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  deleteOutreach(id)
  return NextResponse.json({ ok: true })
}
