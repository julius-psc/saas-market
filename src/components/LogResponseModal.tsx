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
  { value: 'positive', label: 'Positive', color: 'bg-emerald-50 border-emerald-300 text-emerald-700' },
  { value: 'neutral', label: 'Neutral', color: 'bg-gray-100 border-gray-300 text-gray-700' },
  { value: 'negative', label: 'Negative', color: 'bg-red-50 border-red-300 text-red-700' },
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
      <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="font-semibold text-gray-900">Log Response</h2>
            <p className="text-xs text-gray-400 mt-0.5">{niche.icon} {niche.name}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Contact Name *</label>
              <input
                type="text"
                value={form.contactName}
                onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Company *</label>
              <input
                type="text"
                value={form.contactCompany}
                onChange={(e) => setForm({ ...form, contactCompany: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                placeholder="Acme Co"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Job Title</label>
            <input
              type="text"
              value={form.contactTitle}
              onChange={(e) => setForm({ ...form, contactTitle: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
              placeholder="Owner / Manager"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Response Text *</label>
            <textarea
              value={form.responseText}
              onChange={(e) => setForm({ ...form, responseText: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 resize-none"
              placeholder="Paste or summarise what they said..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">Sentiment</label>
            <div className="flex gap-2">
              {sentimentOptions.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setForm({ ...form, sentiment: s.value })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    form.sentiment === s.value
                      ? s.color
                      : 'bg-gray-50 border-gray-200 text-gray-400 hover:border-gray-300'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Pain Point Categories
              <span className="ml-1 text-gray-400">(select all that apply)</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {PAIN_POINT_CATEGORIES.map((pp) => (
                <button
                  key={pp}
                  type="button"
                  onClick={() => togglePainPoint(pp)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                    selectedPainPoints.includes(pp)
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-600'
                      : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-600'
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
            <label className="block text-xs font-medium text-gray-600 mb-1">Internal Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 resize-none"
              placeholder="Your own observations or follow-up actions..."
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
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
