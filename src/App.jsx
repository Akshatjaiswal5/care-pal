import { Routes, Route, Navigate } from 'react-router-dom'
import Today from './pages/Today'
import Calendar from './pages/Calendar'
import Manage from './pages/Manage'
import BottomNav from './components/BottomNav'

export default function App() {
  return (
    <div className="min-h-dvh bg-slate-950 md:flex md:justify-center">
      <div className="flex flex-col min-h-dvh w-full md:max-w-sm md:shadow-2xl md:shadow-black/50 bg-slate-800">
        <Routes>
          <Route path="/" element={<Today />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <BottomNav />
      </div>
    </div>
  )
}
