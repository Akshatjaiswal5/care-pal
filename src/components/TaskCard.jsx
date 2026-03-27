import { useState } from 'react'

const STATUS_STYLES = {
  done: 'opacity-60',
  skipped: 'opacity-40',
  postponed: 'opacity-40',
  pending: '',
}

export default function TaskCard({ task, log, onDone, onSkip, onPostpone }) {
  const [showPostpone, setShowPostpone] = useState(false)
  const status = log?.status || 'pending'

  const handlePostpone = (days) => {
    setShowPostpone(false)
    onPostpone(task, days)
  }

  return (
    <div className={`relative bg-white rounded-2xl p-4 shadow-sm transition-opacity ${STATUS_STYLES[status]}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className={`font-medium truncate ${status === 'done' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
            {task.name}
          </p>
          {task.deadline_time && status === 'pending' && (
            <p className="text-xs text-gray-400 mt-0.5">by {formatTime(task.deadline_time)}</p>
          )}
          {status === 'postponed' && (
            <p className="text-xs text-amber-500 mt-0.5">postponed</p>
          )}
          {status === 'skipped' && (
            <p className="text-xs text-gray-400 mt-0.5">skipped</p>
          )}
        </div>

        {status === 'pending' && (
          <div className="flex items-center gap-2 shrink-0">
            {task.is_reschedulable && (
              <button
                onClick={() => setShowPostpone(true)}
                className="text-xs text-amber-500 bg-amber-50 px-3 py-1.5 rounded-xl font-medium"
              >
                Later
              </button>
            )}
            <button
              onClick={() => onSkip(task)}
              className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-xl font-medium"
            >
              Skip
            </button>
            <button
              onClick={() => onDone(task)}
              className="text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-xl font-medium"
            >
              Done
            </button>
          </div>
        )}

        {status === 'done' && (
          <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {status === 'skipped' && (
          <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
      </div>

      {/* Postpone picker */}
      {showPostpone && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-2">Postpone by:</p>
          <div className="flex gap-2 flex-wrap">
            {[
              { label: '12 hrs', days: 0.5 },
              { label: '1 day', days: 1 },
              { label: '2 days', days: 2 },
              { label: '3 days', days: 3 },
            ].map((opt) => (
              <button
                key={opt.days}
                onClick={() => handlePostpone(opt.days)}
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-xl font-medium"
              >
                {opt.label}
              </button>
            ))}
            <button
              onClick={() => setShowPostpone(false)}
              className="text-xs text-gray-400 px-2 py-1.5"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function formatTime(time) {
  const [h, m] = time.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`
}
