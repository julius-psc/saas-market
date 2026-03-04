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
      className="block rounded-xl border border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-800/80 transition-all group p-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 text-slate-500 text-xs font-bold group-hover:text-slate-400 transition-colors">
          {rank}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{stats.icon}</span>
            <span className="font-medium text-slate-200 text-sm truncate group-hover:text-white transition-colors">
              {stats.nicheName}
            </span>
          </div>

          <SignalBar score={stats.signalScore} size="sm" />

          <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
            {hasData ? (
              <>
                <span>{stats.outreachSent} sent</span>
                <span>{stats.responsesReceived} replies</span>
                <span className="font-medium text-slate-400">{Math.round(stats.responseRate)}% rate</span>
              </>
            ) : (
              <span className="text-slate-600 italic">No outreach logged yet</span>
            )}
          </div>

          {stats.topPainPoints.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {stats.topPainPoints.slice(0, 3).map((pp) => (
                <span
                  key={pp}
                  className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-950/60 text-indigo-400 border border-indigo-900/50"
                >
                  {pp}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex-shrink-0 flex flex-col items-end gap-1">
          <span className={`text-lg font-bold tabular-nums ${
            stats.signalScore >= 70 ? 'text-emerald-400' :
            stats.signalScore >= 40 ? 'text-amber-400' :
            stats.signalScore >= 15 ? 'text-orange-400' :
            'text-slate-600'
          }`}>
            {stats.signalScore}
          </span>
          <span className="text-[10px] text-slate-600">score</span>
        </div>
      </div>
    </Link>
  )
}
