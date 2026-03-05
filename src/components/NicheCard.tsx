import Link from 'next/link'
import type { NicheStats } from '@/lib/db'
import SignalBar from './SignalBar'

interface NicheCardProps {
  stats: NicheStats
  rank: number
}

export default function NicheCard({ stats, rank }: NicheCardProps) {
  const hasData = stats.outreachSent > 0

  return (
    <Link
      href={`/niches/${stats.nicheId}`}
      className="block rounded-xl border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 transition-all group p-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 text-xs font-bold group-hover:text-gray-600 transition-colors">
          {rank}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{stats.icon}</span>
            <span className="font-medium text-gray-800 text-sm truncate group-hover:text-gray-900 transition-colors">
              {stats.nicheName}
            </span>
          </div>

          <SignalBar score={stats.signalScore} size="sm" />

          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
            {hasData ? (
              <>
                <span>{stats.outreachSent} sent</span>
                <span>{stats.responsesReceived} replies</span>
                <span className="font-medium text-gray-500">{Math.round(stats.responseRate)}% rate</span>
              </>
            ) : (
              <span className="text-gray-300 italic">No outreach logged yet</span>
            )}
          </div>

          {stats.topPainPoints.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {stats.topPainPoints.slice(0, 3).map((pp) => (
                <span
                  key={pp}
                  className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-50 text-indigo-600 border border-indigo-100"
                >
                  {pp}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex-shrink-0 flex flex-col items-end gap-1">
          <span className={`text-lg font-bold tabular-nums ${
            stats.signalScore >= 70 ? 'text-emerald-600' :
            stats.signalScore >= 40 ? 'text-amber-600' :
            stats.signalScore >= 15 ? 'text-orange-600' :
            'text-gray-300'
          }`}>
            {stats.signalScore}
          </span>
          <span className="text-[10px] text-gray-400">score</span>
        </div>
      </div>
    </Link>
  )
}
