import { useState } from 'react'

export default function TaskCard({ task, log, onDone, onSkip, onPostpone }) {
  const [showPostpone, setShowPostpone] = useState(false)
  const status = log?.status || 'pending'

  const handlePostpone = (days) => {
    setShowPostpone(false)
    onPostpone(task, days)
  }

  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-sm transition-opacity ${status !== 'pending' ? 'opacity-55' : ''}`}>
      <div className="flex items-center gap-3 px-4 py-3.5">
        {/* Status indicator */}
        <div className="shrink-0">
          {status === 'done' && (
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFCC00' }}>
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          {status === 'skipped' && (
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
          {status === 'postponed' && (
            <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
          {status === 'pending' && (
            <div className="w-7 h-7 rounded-full border-2 border-gray-200" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className={`text-[15px] font-medium leading-snug ${status === 'done' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
            {task.name}
          </p>
          {task.deadline_time && status === 'pending' && (
            <p className="text-xs text-gray-400 mt-0.5">by {formatTime(task.deadline_time)}</p>
          )}
          {status === 'postponed' && (
            <p className="text-xs text-orange-400 mt-0.5">postponed</p>
          )}
        </div>

        {status === 'pending' && (
          <div className="flex items-center gap-1.5 shrink-0">
            {task.is_reschedulable && (
              <button
                onClick={() => setShowPostpone(true)}
                className="text-xs text-orange-500 bg-orange-50 px-2.5 py-1.5 rounded-xl font-medium"
              >
                Later
              </button>
            )}
            <button
              onClick={() => onSkip(task)}
              className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1.5 rounded-xl font-medium"
            >
              Skip
            </button>
            <button
              onClick={() => onDone(task)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-xl text-[#7a6500]"
              style={{ backgroundColor: '#FFF3B0' }}
            >
              Done
            </button>
          </div>
        )}
      </div>

      {showPostpone && (
        <div className="px-4 pb-3.5 pt-0 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-2 mt-2">Postpone by:</p>
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
            <button onClick={() => setShowPostpone(false)} className="text-xs text-gray-400 px-2 py-1.5">
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
