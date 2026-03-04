'use client'

import { useState } from 'react'
import type { Niche, Sentiment } from '@/lib/types'
import { PAIN_POINT_CATEGORIES } from '@/lib/types'
import PainPointBadge from './PainPointBadge'

interface LogResponseModalProps {
  niche: Niche
  onClose: () => void
  onSaved: () => void
}

const sentimentOptions: { value: Sentiment; label: string; color: string }[] = [
  { value: 'positive', label: 'Positive', color: 'bg-emerald-900/50 border-emerald-700 text-emerald-300' },
  { value: 'neutral', label: 'Neutral', color: 'bg-slate-800 border-slate-700 text-slate-300' },
  { value: 'negative', label: 'Negative', color: 'bg-red-900/50 border-red-800 text-red-300' },
]

export default function LogResponseModal({ niche, onClose, onSaved }: LogResponseModalProps) {
  const [form, setForm] = useState({
    contactName: '',
    contactCompany: '',
    contactTitle: '',
    responseText: '',
    sentiment: 'neutral' as Sentiment,
    notes: '',
  })
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function togglePainPoint(pp: string) {
    setSelectedPainPoints((prev) =>
      prev.includes(pp) ? prev.filter((p) => p !== pp) : [...prev, pp]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.contactName || !form.contactCompany || !form.responseText) {
      setError('Contact name, company, and response text are required.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nicheId: niche.id,
          ...form,
          painPoints: selectedPainPoints,
        }),
      })
      if (!res.ok) throw new Error('Failed to save')
      onSaved()
      onClose()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
          <div>
            <h2 className="font-semibold text-slate-100">Log Response</h2>
            <p className="text-xs text-slate-500 mt-0.5">{niche.icon} {niche.name}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Contact Name *</label>
              <input
                type="text"
                value={form.contactName}
                onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-600"
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Company *</label>
              <input
                type="text"
                value={form.contactCompany}
                onChange={(e) => setForm({ ...form, contactCompany: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-600"
                placeholder="Acme Co"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Job Title</label>
            <input
              type="text"
              value={form.contactTitle}
              onChange={(e) => setForm({ ...form, contactTitle: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-600"
              placeholder="Owner / Manager"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Response Text *</label>
            <textarea
              value={form.responseText}
              onChange={(e) => setForm({ ...form, responseText: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-600 resize-none"
              placeholder="Paste or summarise what they said..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Sentiment</label>
            <div className="flex gap-2">
              {sentimentOptions.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setForm({ ...form, sentiment: s.value })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    form.sentiment === s.value
                      ? s.color
                      : 'bg-slate-800/50 border-slate-800 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">
              Pain Point Categories
              <span className="ml-1 text-slate-600">(select all that apply)</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {PAIN_POINT_CATEGORIES.map((pp) => (
                <button
                  key={pp}
                  type="button"
                  onClick={() => togglePainPoint(pp)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                    selectedPainPoints.includes(pp)
                      ? 'bg-indigo-900/60 border-indigo-700 text-indigo-300'
                      : 'bg-slate-800/60 border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-400'
                  }`}
                >
                  {pp}
                </button>
              ))}
            </div>
            {selectedPainPoints.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {selectedPainPoints.map((pp) => (
                  <PainPointBadge
                    key={pp}
                    category={pp}
                    removable
                    onRemove={() => togglePainPoint(pp)}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Internal Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-600 resize-none"
              placeholder="Your own observations or follow-up actions..."
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition-colors"
            >
              {saving ? 'Saving...' : 'Log Response'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
