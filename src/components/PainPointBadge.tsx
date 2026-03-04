const colorMap: Record<string, string> = {
  'Time / Efficiency': 'bg-blue-900/50 text-blue-300 border-blue-800/50',
  'Cost / Revenue': 'bg-emerald-900/50 text-emerald-300 border-emerald-800/50',
  'Compliance / Legal': 'bg-red-900/50 text-red-300 border-red-800/50',
  'Staff / HR': 'bg-purple-900/50 text-purple-300 border-purple-800/50',
  'Technology / Integration': 'bg-cyan-900/50 text-cyan-300 border-cyan-800/50',
  'Customer Management': 'bg-pink-900/50 text-pink-300 border-pink-800/50',
  'Reporting / Analytics': 'bg-indigo-900/50 text-indigo-300 border-indigo-800/50',
  'Communication': 'bg-teal-900/50 text-teal-300 border-teal-800/50',
  'Scheduling / Booking': 'bg-orange-900/50 text-orange-300 border-orange-800/50',
  'Cash Flow': 'bg-yellow-900/50 text-yellow-300 border-yellow-800/50',
  'Admin Overload': 'bg-rose-900/50 text-rose-300 border-rose-800/50',
  'Other': 'bg-slate-800 text-slate-400 border-slate-700',
}

interface PainPointBadgeProps {
  category: string
  count?: number
  removable?: boolean
  onRemove?: () => void
}

export default function PainPointBadge({ category, count, removable, onRemove }: PainPointBadgeProps) {
  const cls = colorMap[category] ?? colorMap['Other']
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {category}
      {count !== undefined && (
        <span className="opacity-70">×{count}</span>
      )}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-0.5 hover:opacity-70 transition-opacity"
          aria-label={`Remove ${category}`}
        >
          ×
        </button>
      )}
    </span>
  )
}
