export type TemplateType = 'linkedin_connect' | 'linkedin_dm' | 'cold_email'

export interface Template {
  id: string
  nicheId: string
  type: TemplateType
  subject?: string
  body: string
}

export interface Niche {
  id: string
  name: string
  description: string
  icon: string
  templates: Template[]
}

export interface Outreach {
  id: string
  nicheId: string
  templateId: string
  contactName: string
  contactCompany: string
  contactTitle?: string
  channel: TemplateType
  sentAt: string
  notes?: string
}

export type Sentiment = 'positive' | 'neutral' | 'negative'

export interface Response {
  id: string
  outreachId?: string
  nicheId: string
  contactName: string
  contactCompany: string
  contactTitle?: string
  responseText: string
  painPoints: string[]
  receivedAt: string
  sentiment: Sentiment
  notes?: string
}

export interface NicheStats {
  nicheId: string
  nicheName: string
  outreachSent: number
  responsesReceived: number
  responseRate: number
  painPoints: Record<string, number>
  signalScore: number
}

export const PAIN_POINT_CATEGORIES = [
  'Time / Efficiency',
  'Cost / Revenue',
  'Compliance / Legal',
  'Staff / HR',
  'Technology / Integration',
  'Customer Management',
  'Reporting / Analytics',
  'Communication',
  'Scheduling / Booking',
  'Cash Flow',
  'Admin Overload',
  'Other',
] as const

export type PainPointCategory = (typeof PAIN_POINT_CATEGORIES)[number]
