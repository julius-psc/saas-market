interface SignalBarProps {
  score: number
  size?: 'sm' | 'md'
}

function scoreColor(score: number): string {
  if (score >= 70) return 'bg-emerald-500'
  if (score >= 40) return 'bg-amber-500'
  if (score >= 15) return 'bg-orange-500'
  return 'bg-slate-600'
}

function scoreLabel(score: number): string {
  if (score >= 70) return 'Strong'
  if (score >= 40) return 'Moderate'
  if (score >= 15) return 'Weak'
  return 'No data'
}

export default function SignalBar({ score, size = 'md' }: SignalBarProps) {
  const color = scoreColor(score)
  const label = scoreLabel(score)
  const h = size === 'sm' ? 'h-1.5' : 'h-2'

  return (
    <div className="w-full">
      <div className={`w-full ${h} bg-slate-800 rounded-full overflow-hidden`}>
        <div
          className={`${h} ${color} rounded-full transition-all duration-500`}
          style={{ width: `${Math.max(score, 2)}%` }}
        />
      </div>
      {size === 'md' && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-slate-500">{label}</span>
          <span className="text-xs font-medium text-slate-400">{score}/100</span>
        </div>
      )}
    </div>
  )
}
