import fs from 'fs'
import path from 'path'
import Database from 'better-sqlite3'
import type { Outreach, Response } from './types'
import { NICHES } from './niches-data'

const DATA_DIR =
  process.env.NODE_ENV === 'production'
    ? path.join('/tmp', 'data')
    : path.join(process.cwd(), 'data')

const DB_FILE = path.join(DATA_DIR, 'sqlite.db')

let _db: Database.Database | null = null

function getDb(): Database.Database {
  if (_db) return _db

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }

  _db = new Database(DB_FILE)

  _db.exec(`
    CREATE TABLE IF NOT EXISTS outreach (
      id TEXT PRIMARY KEY,
      nicheId TEXT NOT NULL,
      templateId TEXT,
      contactName TEXT NOT NULL,
      contactCompany TEXT NOT NULL,
      contactTitle TEXT,
      channel TEXT NOT NULL,
      sentAt TEXT NOT NULL,
      notes TEXT
    );

    CREATE TABLE IF NOT EXISTS responses (
      id TEXT PRIMARY KEY,
      outreachId TEXT,
      nicheId TEXT NOT NULL,
      contactName TEXT NOT NULL,
      contactCompany TEXT NOT NULL,
      contactTitle TEXT,
      responseText TEXT NOT NULL,
      painPoints TEXT NOT NULL, -- JSON array
      receivedAt TEXT NOT NULL,
      sentiment TEXT NOT NULL,
      notes TEXT
    );
  `)

  migrateJsonData(_db)

  return _db
}

function migrateJsonData(db: Database.Database) {
  const outreachFile = path.join(DATA_DIR, 'outreach.json')
  const responsesFile = path.join(DATA_DIR, 'responses.json')

  if (fs.existsSync(outreachFile)) {
    try {
      const all: Outreach[] = JSON.parse(fs.readFileSync(outreachFile, 'utf-8'))
      const insert = db.prepare(`
        INSERT OR IGNORE INTO outreach (id, nicheId, templateId, contactName, contactCompany, contactTitle, channel, sentAt, notes)
        VALUES (@id, @nicheId, @templateId, @contactName, @contactCompany, @contactTitle, @channel, @sentAt, @notes)
      `)
      const tx = db.transaction(() => {
        for (const o of all) {
          insert.run({
            id: o.id,
            nicheId: o.nicheId,
            templateId: o.templateId ?? null,
            contactName: o.contactName,
            contactCompany: o.contactCompany,
            contactTitle: o.contactTitle ?? null,
            channel: o.channel,
            sentAt: o.sentAt,
            notes: o.notes ?? null,
          })
        }
      })
      tx()
      fs.renameSync(outreachFile, path.join(DATA_DIR, 'outreach.json.bak'))
    } catch (err) {
      console.error('Failed to migrate outreach.json', err)
    }
  }

  if (fs.existsSync(responsesFile)) {
    try {
      const all: Response[] = JSON.parse(fs.readFileSync(responsesFile, 'utf-8'))
      const insert = db.prepare(`
        INSERT OR IGNORE INTO responses (id, outreachId, nicheId, contactName, contactCompany, contactTitle, responseText, painPoints, receivedAt, sentiment, notes)
        VALUES (@id, @outreachId, @nicheId, @contactName, @contactCompany, @contactTitle, @responseText, @painPoints, @receivedAt, @sentiment, @notes)
      `)
      const tx = db.transaction(() => {
        for (const r of all) {
          insert.run({
            id: r.id,
            outreachId: r.outreachId ?? null,
            nicheId: r.nicheId,
            contactName: r.contactName,
            contactCompany: r.contactCompany,
            contactTitle: r.contactTitle ?? null,
            responseText: r.responseText,
            painPoints: JSON.stringify(r.painPoints || []),
            receivedAt: r.receivedAt,
            sentiment: r.sentiment,
            notes: r.notes ?? null,
          })
        }
      })
      tx()
      fs.renameSync(responsesFile, path.join(DATA_DIR, 'responses.json.bak'))
    } catch (err) {
      console.error('Failed to migrate responses.json', err)
    }
  }
}

// ── Outreach ──────────────────────────────────────────────────────────────────

function mapOutreach(row: any): Outreach {
  return {
    ...row,
    templateId: row.templateId ?? undefined,
    contactTitle: row.contactTitle ?? undefined,
    notes: row.notes ?? undefined,
  }
}

export function getOutreach(): Outreach[] {
  const stmt = getDb().prepare('SELECT * FROM outreach')
  return (stmt.all() as any[]).map(mapOutreach)
}

export function getOutreachByNiche(nicheId: string): Outreach[] {
  const stmt = getDb().prepare('SELECT * FROM outreach WHERE nicheId = ?')
  return (stmt.all(nicheId) as any[]).map(mapOutreach)
}

export function addOutreach(outreach: Outreach): void {
  const stmt = getDb().prepare(`
    INSERT INTO outreach (id, nicheId, templateId, contactName, contactCompany, contactTitle, channel, sentAt, notes)
    VALUES (@id, @nicheId, @templateId, @contactName, @contactCompany, @contactTitle, @channel, @sentAt, @notes)
  `)
  stmt.run({
    id: outreach.id,
    nicheId: outreach.nicheId,
    templateId: outreach.templateId ?? null,
    contactName: outreach.contactName,
    contactCompany: outreach.contactCompany,
    contactTitle: outreach.contactTitle ?? null,
    channel: outreach.channel,
    sentAt: outreach.sentAt,
    notes: outreach.notes ?? null,
  })
}

export function deleteOutreach(id: string): void {
  const stmt = getDb().prepare('DELETE FROM outreach WHERE id = ?')
  stmt.run(id)
}

// ── Responses ─────────────────────────────────────────────────────────────────

function mapResponse(row: any): Response {
  return {
    ...row,
    outreachId: row.outreachId ?? undefined,
    contactTitle: row.contactTitle ?? undefined,
    notes: row.notes ?? undefined,
    painPoints: JSON.parse(row.painPoints),
  }
}

export function getResponses(): Response[] {
  const stmt = getDb().prepare('SELECT * FROM responses')
  return (stmt.all() as any[]).map(mapResponse)
}

export function getResponsesByNiche(nicheId: string): Response[] {
  const stmt = getDb().prepare('SELECT * FROM responses WHERE nicheId = ?')
  return (stmt.all(nicheId) as any[]).map(mapResponse)
}

export function addResponse(response: Response): void {
  const stmt = getDb().prepare(`
    INSERT INTO responses (id, outreachId, nicheId, contactName, contactCompany, contactTitle, responseText, painPoints, receivedAt, sentiment, notes)
    VALUES (@id, @outreachId, @nicheId, @contactName, @contactCompany, @contactTitle, @responseText, @painPoints, @receivedAt, @sentiment, @notes)
  `)
  stmt.run({
    id: response.id,
    outreachId: response.outreachId ?? null,
    nicheId: response.nicheId,
    contactName: response.contactName,
    contactCompany: response.contactCompany,
    contactTitle: response.contactTitle ?? null,
    responseText: response.responseText,
    painPoints: JSON.stringify(response.painPoints),
    receivedAt: response.receivedAt,
    sentiment: response.sentiment,
    notes: response.notes ?? null,
  })
}

export function updateResponse(id: string, updates: Partial<Response>): boolean {
  const db = getDb()
  const stmtGet = db.prepare('SELECT * FROM responses WHERE id = ?')
  const existingRow = stmtGet.get(id) as any
  if (!existingRow) return false

  const updated = { ...mapResponse(existingRow), ...updates }

  const stmtUpdate = db.prepare(`
    UPDATE responses
    SET outreachId = @outreachId,
        nicheId = @nicheId,
        contactName = @contactName,
        contactCompany = @contactCompany,
        contactTitle = @contactTitle,
        responseText = @responseText,
        painPoints = @painPoints,
        receivedAt = @receivedAt,
        sentiment = @sentiment,
        notes = @notes
    WHERE id = @id
  `)
  stmtUpdate.run({
    id: updated.id,
    outreachId: updated.outreachId ?? null,
    nicheId: updated.nicheId,
    contactName: updated.contactName,
    contactCompany: updated.contactCompany,
    contactTitle: updated.contactTitle ?? null,
    responseText: updated.responseText,
    painPoints: JSON.stringify(updated.painPoints),
    receivedAt: updated.receivedAt,
    sentiment: updated.sentiment,
    notes: updated.notes ?? null,
  })
  return true
}

export function deleteResponse(id: string): void {
  const stmt = getDb().prepare('DELETE FROM responses WHERE id = ?')
  stmt.run(id)
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
