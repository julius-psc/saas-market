import fs from 'fs'
import path from 'path'
import type { Outreach, Response } from './types'
import { NICHES } from './niches-data'

const DATA_DIR = path.join(process.cwd(), 'data')
const OUTREACH_FILE = path.join(DATA_DIR, 'outreach.json')
const RESPONSES_FILE = path.join(DATA_DIR, 'responses.json')

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

function readJson<T>(filePath: string, defaultValue: T): T {
  ensureDataDir()
  if (!fs.existsSync(filePath)) {
    return defaultValue
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return defaultValue
  }
}

function writeJson<T>(filePath: string, data: T): void {
  ensureDataDir()
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

// ── Outreach ──────────────────────────────────────────────────────────────────

export function getOutreach(): Outreach[] {
  return readJson<Outreach[]>(OUTREACH_FILE, [])
}

export function getOutreachByNiche(nicheId: string): Outreach[] {
  return getOutreach().filter((o) => o.nicheId === nicheId)
}

export function addOutreach(outreach: Outreach): void {
  const all = getOutreach()
  all.push(outreach)
  writeJson(OUTREACH_FILE, all)
}

export function deleteOutreach(id: string): void {
  const all = getOutreach().filter((o) => o.id !== id)
  writeJson(OUTREACH_FILE, all)
}

// ── Responses ─────────────────────────────────────────────────────────────────

export function getResponses(): Response[] {
  return readJson<Response[]>(RESPONSES_FILE, [])
}

export function getResponsesByNiche(nicheId: string): Response[] {
  return getResponses().filter((r) => r.nicheId === nicheId)
}

export function addResponse(response: Response): void {
  const all = getResponses()
  all.push(response)
  writeJson(RESPONSES_FILE, all)
}

export function updateResponse(id: string, updates: Partial<Response>): boolean {
  const all = getResponses()
  const idx = all.findIndex((r) => r.id === id)
  if (idx === -1) return false
  all[idx] = { ...all[idx], ...updates }
  writeJson(RESPONSES_FILE, all)
  return true
}

export function deleteResponse(id: string): void {
  const all = getResponses().filter((r) => r.id !== id)
  writeJson(RESPONSES_FILE, all)
}

// ── Stats & Signal Score ──────────────────────────────────────────────────────

export interface NicheStats {
  nicheId: string
  nicheName: string
  icon: string
  outreachSent: number
  responsesReceived: number
  responseRate: number
  painPoints: Record<string, number>
  topPainPoints: string[]
  signalScore: number
}

function computeSignalScore(responseRate: number, painPointCount: number): number {
  // response_rate: 0-100, pain_point_diversity: how many distinct categories
  const ratePart = responseRate * 0.6
  const painPart = Math.min(painPointCount * 5, 40) // max 40 points from pain variety
  return Math.round(Math.min(ratePart + painPart, 100))
}

export function getNicheStats(nicheId: string): NicheStats {
  const niche = NICHES.find((n) => n.id === nicheId)!
  const outreach = getOutreachByNiche(nicheId)
  const responses = getResponsesByNiche(nicheId)

  const painPoints: Record<string, number> = {}
  for (const r of responses) {
    for (const pp of r.painPoints) {
      painPoints[pp] = (painPoints[pp] ?? 0) + 1
    }
  }

  const outreachSent = outreach.length
  const responsesReceived = responses.length
  const responseRate = outreachSent > 0 ? (responsesReceived / outreachSent) * 100 : 0
  const painPointCount = Object.keys(painPoints).length
  const signalScore = computeSignalScore(responseRate, painPointCount)

  const topPainPoints = Object.entries(painPoints)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([k]) => k)

  return {
    nicheId,
    nicheName: niche.name,
    icon: niche.icon,
    outreachSent,
    responsesReceived,
    responseRate,
    painPoints,
    topPainPoints,
    signalScore,
  }
}

export function getAllNicheStats(): NicheStats[] {
  return NICHES.map((n) => getNicheStats(n.id)).sort((a, b) => b.signalScore - a.signalScore)
}

export function getGlobalPainPoints(): Record<string, number> {
  const responses = getResponses()
  const counts: Record<string, number> = {}
  for (const r of responses) {
    for (const pp of r.painPoints) {
      counts[pp] = (counts[pp] ?? 0) + 1
    }
  }
  return counts
}
