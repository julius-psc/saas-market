import { getAllNicheStats, getGlobalPainPoints, getOutreach, getResponses } from '@/lib/db'
import NicheCard from '@/components/NicheCard'
import StatCard from '@/components/StatCard'
import PainPointBadge from '@/components/PainPointBadge'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const nicheStats = getAllNicheStats()
  const outreach = getOutreach()
  const responses = getResponses()
  const globalPainPoints = getGlobalPainPoints()

  const totalOutreach = outreach.length
  const totalResponses = responses.length
  const globalResponseRate =
    totalOutreach > 0 ? Math.round((totalResponses / totalOutreach) * 100) : 0

  const topPainPoints = Object.entries(globalPainPoints)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  const nichesWithData = nicheStats.filter((n) => n.outreachSent > 0)
  const topNiches = nicheStats.filter((n) => n.signalScore > 0).slice(0, 3)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Niche Research Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track outreach, responses, and pain points across 20 B2B verticals to find your best market.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Outreach Sent" value={totalOutreach} sub="across all niches" />
        <StatCard label="Responses" value={totalResponses} sub="total received" />
        <StatCard label="Response Rate" value={`${globalResponseRate}%`} sub="overall" accent />
        <StatCard label="Niches Active" value={nichesWithData.length} sub={`of 20 total`} />
      </div>

      {/* Top signals */}
      {topNiches.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Top Signals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {topNiches.map((n, i) => (
              <div
                key={n.nicheId}
                className="rounded-xl border border-indigo-100 bg-indigo-50 p-4"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-indigo-600">#{i + 1}</span>
                  <span className="text-base">{n.icon}</span>
                  <span className="font-semibold text-gray-800 text-sm">{n.nicheName}</span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-2xl font-bold text-indigo-600">{n.signalScore}</span>
                  <span className="text-xs text-gray-400">/ 100</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {n.responsesReceived} responses · {Math.round(n.responseRate)}% rate
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Niche leaderboard */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              All Niches — Signal Leaderboard
            </h2>
            <span className="text-xs text-gray-400">Click a niche to view details</span>
          </div>
          <div className="space-y-2">
            {nicheStats.map((s, i) => (
              <NicheCard key={s.nicheId} stats={s} rank={i + 1} />
            ))}
          </div>
        </div>

        {/* Pain points sidebar */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Top Pain Points
          </h2>
          {topPainPoints.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
              <p className="text-sm text-gray-400">No responses logged yet.</p>
              <p className="text-xs text-gray-300 mt-1">
                Visit a niche and start logging outreach + responses.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
              {topPainPoints.map(([category, count], i) => (
                <div key={category} className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 w-4 tabular-nums">{i + 1}</span>
                    <PainPointBadge category={category} />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-1.5 bg-indigo-600 rounded-full"
                        style={{
                          width: `${(count / (topPainPoints[0]?.[1] ?? 1)) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono text-gray-500 w-5 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Getting started guide */}
          {totalOutreach === 0 && (
            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 space-y-3">
              <h3 className="text-sm font-semibold text-gray-700">Getting Started</h3>
              <ol className="space-y-2 text-xs text-gray-500 list-decimal list-inside">
                <li>Pick a niche from the leaderboard</li>
                <li>Copy a cold outreach template</li>
                <li>Send it to 5–10 contacts in that vertical</li>
                <li>Log each outreach sent</li>
                <li>When replies come in, log the response and tag pain points</li>
                <li>Watch the signal scores update automatically</li>
              </ol>
              <p className="text-xs text-gray-400 pt-1 border-t border-gray-100">
                Aim for 10+ outreach per niche before drawing conclusions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
