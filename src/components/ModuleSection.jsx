import TaskCard from './TaskCard'

export default function ModuleSection({ module, tasks, logs, onDone, onSkip, onPostpone }) {
  if (!tasks.length) return null

  const logsMap = Object.fromEntries(logs.map((l) => [l.task_id, l]))
  const doneCount = tasks.filter((t) => logsMap[t.id]?.status === 'done').length

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: module.color }} />
          <span className="section-label">{module.name}</span>
        </div>
        <span className="text-[12px] font-medium" style={{ color: '#c7c7cc' }}>{doneCount}/{tasks.length}</span>
      </div>
      <div className="card divide-y" style={{ divideColor: '#f2f2f7' }}>
        {tasks.map((task, i) => (
          <div key={task.id} style={i > 0 ? { borderTop: '1px solid #f2f2f7' } : {}}>
            <TaskCard
              task={task}
              log={logsMap[task.id]}
              onDone={onDone}
              onSkip={onSkip}
              onPostpone={onPostpone}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
