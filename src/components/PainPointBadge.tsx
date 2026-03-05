const colorMap: Record<string, string> = {
  'Time / Efficiency': 'bg-blue-50 text-blue-700 border-blue-200',
  'Cost / Revenue': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Compliance / Legal': 'bg-red-50 text-red-700 border-red-200',
  'Staff / HR': 'bg-purple-50 text-purple-700 border-purple-200',
  'Technology / Integration': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Customer Management': 'bg-pink-50 text-pink-700 border-pink-200',
  'Reporting / Analytics': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Communication': 'bg-teal-50 text-teal-700 border-teal-200',
  'Scheduling / Booking': 'bg-orange-50 text-orange-700 border-orange-200',
  'Cash Flow': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'Admin Overload': 'bg-rose-50 text-rose-700 border-rose-200',
  'Other': 'bg-gray-100 text-gray-600 border-gray-200',
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
