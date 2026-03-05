'use client'

import { useState } from 'react'
import type { Niche, ApolloContact, TemplateType } from '@/lib/types'

interface Props {
  niche: Niche
  onClose: () => void
  onSaved: () => void
}

type ModalState = 'idle' | 'loading' | 'results' | 'saving' | 'error'

const CHANNEL_OPTIONS: { value: TemplateType; label: string }[] = [
  { value: 'linkedin_connect', label: 'LinkedIn Connect' },
  { value: 'linkedin_dm', label: 'LinkedIn DM' },
  { value: 'cold_email', label: 'Cold Email' },
]

export default function ApolloContactsModal({ niche, onClose, onSaved }: Props) {
  const [state, setState] = useState<ModalState>('idle')
  const [contacts, setContacts] = useState<ApolloContact[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [channel, setChannel] = useState<TemplateType>('linkedin_connect')
  const [limit, setLimit] = useState(25)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSearch() {
    setState('loading')
    setContacts([])
    setSelected(new Set())
    setErrorMessage('')

    try {
      const res = await fetch('/api/apollo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nicheId: niche.id, limit }),
      })
      const data = await res.json() as { contacts?: ApolloContact[]; error?: string }
      if (!res.ok) {
        setErrorMessage(data.error ?? 'Apollo search failed.')
        setState('error')
        return
      }
      setContacts(data.contacts ?? [])
      setState('results')
    } catch {
      setErrorMessage('Network error. Please try again.')
      setState('error')
    }
  }

  function toggleContact(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  function toggleAll() {
    if (selected.size === contacts.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(contacts.map((c) => c.id)))
    }
  }

  async function handleAddToOutreach() {
    const toAdd = contacts.filter((c) => selected.has(c.id))
    if (toAdd.length === 0) return

    setState('saving')
    try {
      await Promise.all(
        toAdd.map((contact) => {
          const notes = [
            contact.linkedinUrl ? `LinkedIn: ${contact.linkedinUrl}` : '',
            contact.email ? `Email: ${contact.email}` : '',
            contact.location ? `Location: ${contact.location}` : '',
          ]
            .filter(Boolean)
            .join(' · ')

          return fetch('/api/outreach', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nicheId: niche.id,
              templateId: '',
              contactName: contact.name,
              contactCompany: contact.company,
              contactTitle: contact.title,
              channel,
              notes,
            }),
          })
        })
      )
      onSaved()
      onClose()
    } catch {
      setErrorMessage('Failed to save contacts. Please try again.')
      setState('results')
    }
  }

  const selectedCount = selected.size

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div>
            <h2 className="font-semibold text-gray-900">Find Contacts via Apify</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {niche.icon} {niche.name} · Founders, CEOs, Ops leads & more
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search controls */}
        <div className="px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">Results to fetch</label>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                disabled={state === 'loading' || state === 'saving'}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
              >
                <option value={10}>10 contacts</option>
                <option value={25}>25 contacts</option>
                <option value={50}>50 contacts</option>
              </select>
            </div>
            <div className="pt-5">
              <button
                onClick={handleSearch}
                disabled={state === 'loading' || state === 'saving'}
                className="px-5 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition-colors whitespace-nowrap"
              >
                {state === 'loading' ? 'Searching…' : 'Search Apify'}
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {state === 'idle' && (
            <div className="text-center py-12">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">
                Click <span className="font-medium text-gray-700">Search Apify</span> to find relevant contacts
                <br />in the <span className="font-medium text-gray-700">{niche.name}</span> vertical.
              </p>
            </div>
          )}

          {state === 'loading' && (
            <div className="text-center py-12">
              <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-gray-400">Searching Apify…</p>
            </div>
          )}

          {state === 'error' && (
            <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          {(state === 'results' || state === 'saving') && contacts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-gray-400">No contacts found. Try adjusting the search scope.</p>
            </div>
          )}

          {(state === 'results' || state === 'saving') && contacts.length > 0 && (
            <div className="space-y-2">
              {/* Select all row */}
              <div className="flex items-center justify-between py-1 mb-1">
                <button
                  onClick={toggleAll}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  {selected.size === contacts.length ? 'Deselect all' : 'Select all'}
                </button>
                <span className="text-xs text-gray-400">
                  {contacts.length} contact{contacts.length !== 1 ? 's' : ''} found
                </span>
              </div>

              {contacts.map((contact) => (
                <label
                  key={contact.id}
                  className={`flex items-start gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-colors ${selected.has(contact.id)
                      ? 'border-indigo-200 bg-indigo-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={selected.has(contact.id)}
                    onChange={() => toggleContact(contact.id)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-gray-900">{contact.name}</span>
                      {contact.title && (
                        <span className="text-xs text-gray-500">{contact.title}</span>
                      )}
                      {contact.company && (
                        <>
                          <span className="text-gray-300 text-xs">·</span>
                          <span className="text-xs font-medium text-gray-600">{contact.company}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      {contact.location && (
                        <span className="text-[11px] text-gray-400">{contact.location}</span>
                      )}
                      {contact.email && (
                        <span className="text-[11px] text-gray-500 font-mono">{contact.email}</span>
                      )}
                      {contact.linkedinUrl && (
                        <a
                          href={contact.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[11px] text-indigo-500 hover:text-indigo-700 underline"
                        >
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Footer — only shown when there are results */}
        {(state === 'results' || state === 'saving') && contacts.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0 flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">Add as channel</label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as TemplateType)}
                disabled={state === 'saving'}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
              >
                {CHANNEL_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="pt-5 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToOutreach}
                disabled={selectedCount === 0 || state === 'saving'}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition-colors whitespace-nowrap"
              >
                {state === 'saving'
                  ? 'Adding…'
                  : selectedCount === 0
                    ? 'Select contacts'
                    : `Add ${selectedCount} to Outreach`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
