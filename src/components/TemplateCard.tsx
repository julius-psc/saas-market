'use client'

import { useState } from 'react'
import type { Template } from '@/lib/types'

const typeLabels: Record<string, string> = {
  linkedin_connect: 'LinkedIn Connect',
  linkedin_dm: 'LinkedIn DM',
  cold_email: 'Cold Email',
}

const typeIcons: Record<string, string> = {
  linkedin_connect: '🔗',
  linkedin_dm: '💬',
  cold_email: '✉️',
}

interface TemplateCardProps {
  template: Template
  contactName?: string
  contactCompany?: string
}

export default function TemplateCard({ template, contactName = '{{name}}', contactCompany = '{{company}}' }: TemplateCardProps) {
  const [copied, setCopied] = useState(false)

  const filled = template.body
    .replace(/\{\{name\}\}/g, contactName)
    .replace(/\{\{company\}\}/g, contactCompany)

  const filledSubject = template.subject
    ?.replace(/\{\{name\}\}/g, contactName)
    .replace(/\{\{company\}\}/g, contactCompany)

  const copyText = filledSubject ? `Subject: ${filledSubject}\n\n${filled}` : filled

  function handleCopy() {
    navigator.clipboard.writeText(copyText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center gap-2">
          <span className="text-base">{typeIcons[template.type]}</span>
          <span className="text-sm font-medium text-slate-300">{typeLabels[template.type]}</span>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
            copied
              ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-800/50'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700'
          }`}
        >
          {copied ? (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      <div className="p-4">
        {filledSubject && (
          <p className="text-xs text-slate-500 mb-2">
            <span className="font-medium text-slate-400">Subject: </span>
            {filledSubject}
          </p>
        )}
        <p className="text-sm text-slate-400 whitespace-pre-wrap leading-relaxed">{filled}</p>
      </div>
    </div>
  )
}
