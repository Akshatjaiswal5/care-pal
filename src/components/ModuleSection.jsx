import TaskCard from './TaskCard'

export default function ModuleSection({ module, tasks, logs, onDone, onSkip, onPostpone }) {
  if (!tasks.length) return null

  const logsMap = Object.fromEntries(logs.map((l) => [l.task_id, l]))
  const doneCount = tasks.filter((t) => logsMap[t.id]?.status === 'done').length

  return (
    <div className="mb-5">
      <div className="flex items-center gap-1.5 mb-2 px-1">
        <span className="text-sm">{module.icon}</span>
        <h3 className="text-xs font-semibold text-gray-400 tracking-wider uppercase">{module.name}</h3>
        <span className="ml-auto text-xs text-gray-300">{doneCount}/{tasks.length}</span>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            log={logsMap[task.id]}
            onDone={onDone}
            onSkip={onSkip}
            onPostpone={onPostpone}
          />
        ))}
      </div>
    </div>
  )
}
