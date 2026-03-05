'use client'

import { useState, useCallback } from 'react'
import type { Niche, Outreach, Response } from '@/lib/types'
import type { NicheStats } from '@/lib/db'
import TemplateCard from '@/components/TemplateCard'
import LogOutreachModal from '@/components/LogOutreachModal'
import LogResponseModal from '@/components/LogResponseModal'
import ResponseCard from '@/components/ResponseCard'
import SignalBar from '@/components/SignalBar'
import PainPointBadge from '@/components/PainPointBadge'
import StatCard from '@/components/StatCard'

interface Props {
  niche: Niche
  initialStats: NicheStats
  initialOutreach: Outreach[]
  initialResponses: Response[]
}

export default function NicheDetailClient({ niche, initialStats, initialOutreach, initialResponses }: Props) {
  const [showOutreachModal, setShowOutreachModal] = useState(false)
  const [showResponseModal, setShowResponseModal] = useState(false)
  const [outreach, setOutreach] = useState<Outreach[]>(initialOutreach)
  const [responses, setResponses] = useState<Response[]>(initialResponses)
  const [stats, setStats] = useState<NicheStats>(initialStats)
  const [activeTab, setActiveTab] = useState<'templates' | 'outreach' | 'responses'>('templates')
  const [templateContact, setTemplateContact] = useState({ name: '', company: '' })
  const [deletingOutreach, setDeletingOutreach] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    const res = await fetch(`/api/niches/${niche.id}`)
    const data = await res.json()
    setOutreach(data.outreach)
    setResponses(data.responses)
    setStats(data.stats)
  }, [niche.id])

  async function handleDeleteOutreach(id: string) {
    if (!confirm('Delete this outreach record?')) return
    setDeletingOutreach(id)
    await fetch(`/api/outreach?id=${id}`, { method: 'DELETE' })
    await refresh()
    setDeletingOutreach(null)
  }

  const channelLabel: Record<string, string> = {
    linkedin_connect: 'LinkedIn Connect',
    linkedin_dm: 'LinkedIn DM',
    cold_email: 'Cold Email',
  }

  const painPointsSorted = Object.entries(stats.painPoints).sort((a, b) => b[1] - a[1])

  return (
    <div className="space-y-6">
      {/* Back */}
      <a
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Dashboard
      </a>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-3xl">{niche.icon}</span>
            <h1 className="text-2xl font-bold text-gray-900">{niche.name}</h1>
          </div>
          <p className="text-sm text-gray-500">{niche.description}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowOutreachModal(true)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 border border-gray-200 transition-colors"
          >
            + Log Outreach
          </button>
          <button
            onClick={() => setShowResponseModal(true)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            + Log Response
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Signal Score" value={stats.signalScore} sub="out of 100" accent />
        <StatCard label="Outreach Sent" value={stats.outreachSent} />
        <StatCard label="Responses" value={stats.responsesReceived} />
        <StatCard label="Response Rate" value={`${Math.round(stats.responseRate)}%`} />
      </div>

      {/* Signal bar */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-gray-600">Signal Score</p>
          <p className="text-xs text-gray-400">
            Based on response rate + pain point variety
          </p>
        </div>
        <SignalBar score={stats.signalScore} />
        {painPointsSorted.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-400 mb-2">Pain points mentioned</p>
            <div className="flex flex-wrap gap-1.5">
              {painPointsSorted.map(([pp, count]) => (
                <PainPointBadge key={pp} category={pp} count={count} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Template personaliser */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
          Personalise Templates
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            value={templateContact.name}
            onChange={(e) => setTemplateContact({ ...templateContact, name: e.target.value })}
            placeholder="Contact name"
            className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            value={templateContact.company}
            onChange={(e) => setTemplateContact({ ...templateContact, company: e.target.value })}
            placeholder="Company name"
            className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex gap-0 border border-gray-200 rounded-lg p-0.5 bg-gray-50 w-fit">
          {(['templates', 'outreach', 'responses'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
              {tab === 'outreach' && outreach.length > 0 && (
                <span className="ml-1.5 text-xs opacity-70">({outreach.length})</span>
              )}
              {tab === 'responses' && responses.length > 0 && (
                <span className="ml-1.5 text-xs opacity-70">({responses.length})</span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {/* Templates tab */}
          {activeTab === 'templates' && (
            <div className="grid gap-4">
              {niche.templates.map((t) => (
                <TemplateCard
                  key={t.id}
                  template={t}
                  contactName={templateContact.name || undefined}
                  contactCompany={templateContact.company || undefined}
                />
              ))}
            </div>
          )}

          {/* Outreach tab */}
          {activeTab === 'outreach' && (
            <div>
              {outreach.length === 0 ? (
                <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
                  <p className="text-sm text-gray-400">No outreach logged yet.</p>
                  <button
                    onClick={() => setShowOutreachModal(true)}
                    className="mt-3 px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                  >
                    Log your first outreach
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {outreach
                    .slice()
                    .reverse()
                    .map((o) => (
                      <div
                        key={o.id}
                        className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-gray-800">{o.contactName}</span>
                            <span className="text-gray-300 text-xs">·</span>
                            <span className="text-xs text-gray-500">{o.contactCompany}</span>
                            {o.contactTitle && (
                              <>
                                <span className="text-gray-300 text-xs">·</span>
                                <span className="text-xs text-gray-400">{o.contactTitle}</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                              {channelLabel[o.channel] ?? o.channel}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {new Date(o.sentAt).toLocaleDateString('en-AU', {
                                day: 'numeric', month: 'short', year: 'numeric',
                              })}
                            </span>
                          </div>
                          {o.notes && <p className="text-xs text-gray-400 mt-1 italic">{o.notes}</p>}
                        </div>
                        <button
                          onClick={() => handleDeleteOutreach(o.id)}
                          disabled={deletingOutreach === o.id}
                          className="text-gray-300 hover:text-red-500 transition-colors disabled:opacity-50 flex-shrink-0"
                          aria-label="Delete"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* Responses tab */}
          {activeTab === 'responses' && (
            <div>
              {responses.length === 0 ? (
                <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
                  <p className="text-sm text-gray-400">No responses logged yet.</p>
                  <button
                    onClick={() => setShowResponseModal(true)}
                    className="mt-3 px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                  >
                    Log your first response
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {responses
                    .slice()
                    .reverse()
                    .map((r) => (
                      <ResponseCard
                        key={r.id}
                        response={r}
                        onDeleted={refresh}
                      />
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showOutreachModal && (
        <LogOutreachModal
          niche={niche}
          onClose={() => setShowOutreachModal(false)}
          onSaved={refresh}
        />
      )}
      {showResponseModal && (
        <LogResponseModal
          niche={niche}
          onClose={() => setShowResponseModal(false)}
          onSaved={refresh}
        />
      )}
    </div>
  )
}
