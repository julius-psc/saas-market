'use client'

import { useState } from 'react'
import type { Response } from '@/lib/types'
import PainPointBadge from './PainPointBadge'

interface ResponseCardProps {
  response: Response
  onDeleted: () => void
}

const sentimentConfig = {
  positive: { label: 'Positive', cls: 'text-emerald-400 bg-emerald-900/30 border-emerald-900' },
  neutral: { label: 'Neutral', cls: 'text-slate-400 bg-slate-800 border-slate-700' },
  negative: { label: 'Negative', cls: 'text-red-400 bg-red-900/30 border-red-900' },
}

export default function ResponseCard({ response, onDeleted }: ResponseCardProps) {
  const [deleting, setDeleting] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const sentiment = sentimentConfig[response.sentiment]

  async function handleDelete() {
    if (!confirm('Delete this response?')) return
    setDeleting(true)
    try {
      await fetch(`/api/responses/${response.id}`, { method: 'DELETE' })
      onDeleted()
    } finally {
      setDeleting(false)
    }
  }

  const truncated = response.responseText.length > 200 && !expanded

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-slate-200">{response.contactName}</span>
            <span className="text-slate-600 text-xs">·</span>
            <span className="text-xs text-slate-400">{response.contactCompany}</span>
            {response.contactTitle && (
              <>
                <span className="text-slate-600 text-xs">·</span>
                <span className="text-xs text-slate-500">{response.contactTitle}</span>
              </>
            )}
          </div>
          <p className="text-[10px] text-slate-600 mt-0.5">
            {new Date(response.receivedAt).toLocaleDateString('en-AU', {
              day: 'numeric', month: 'short', year: 'numeric',
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-xs border ${sentiment.cls}`}>
            {sentiment.label}
          </span>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-slate-700 hover:text-red-400 transition-colors disabled:opacity-50"
            aria-label="Delete response"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div>
        <p className="text-sm text-slate-400 leading-relaxed">
          {truncated ? response.responseText.slice(0, 200) + '…' : response.responseText}
        </p>
        {response.responseText.length > 200 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-indigo-500 hover:text-indigo-400 mt-1 transition-colors"
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      {response.painPoints.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {response.painPoints.map((pp) => (
            <PainPointBadge key={pp} category={pp} />
          ))}
        </div>
      )}

      {response.notes && (
        <p className="text-xs text-slate-600 italic border-t border-slate-800 pt-2 mt-2">
          {response.notes}
        </p>
      )}
    </div>
  )
}
