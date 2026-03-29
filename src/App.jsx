import { Routes, Route, Navigate } from 'react-router-dom'
import Today from './pages/Today'
import Calendar from './pages/Calendar'
import Manage from './pages/Manage'
import BottomNav from './components/BottomNav'

export default function App() {
  return (
    <div className="bg-[#e5e5ea] md:flex md:justify-center" style={{ height: '100dvh', overflow: 'hidden' }}>
      <div className="flex flex-col w-full md:max-w-sm md:shadow-2xl md:shadow-black/20 bg-[#f2f2f7]" style={{ height: '100dvh' }}>
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Today />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/manage" element={<Manage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </div>
  )
}
