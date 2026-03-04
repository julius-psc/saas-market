'use client'

import { useState } from 'react'
import type { Niche, TemplateType } from '@/lib/types'

const channelOptions: { value: TemplateType; label: string }[] = [
  { value: 'linkedin_connect', label: 'LinkedIn Connect Request' },
  { value: 'linkedin_dm', label: 'LinkedIn DM' },
  { value: 'cold_email', label: 'Cold Email' },
]

interface LogOutreachModalProps {
  niche: Niche
  onClose: () => void
  onSaved: () => void
}

export default function LogOutreachModal({ niche, onClose, onSaved }: LogOutreachModalProps) {
  const [form, setForm] = useState({
    contactName: '',
    contactCompany: '',
    contactTitle: '',
    channel: 'linkedin_connect' as TemplateType,
    templateId: '',
    notes: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.contactName || !form.contactCompany) {
      setError('Contact name and company are required.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nicheId: niche.id, ...form }),
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
      <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div>
            <h2 className="font-semibold text-slate-100">Log Outreach</h2>
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
                placeholder="Acme Trades"
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
              placeholder="Owner / Operations Manager"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Channel *</label>
            <select
              value={form.channel}
              onChange={(e) => setForm({ ...form, channel: e.target.value as TemplateType })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-indigo-600"
            >
              {channelOptions.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Template Used</label>
            <select
              value={form.templateId}
              onChange={(e) => setForm({ ...form, templateId: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-indigo-600"
            >
              <option value="">— none / custom —</option>
              {niche.templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.type === 'linkedin_connect' ? 'LinkedIn Connect' : t.type === 'linkedin_dm' ? 'LinkedIn DM' : 'Cold Email'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-600 resize-none"
              placeholder="Any context..."
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
              {saving ? 'Saving...' : 'Log Outreach'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
