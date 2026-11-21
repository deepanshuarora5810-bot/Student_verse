import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Courses } from './pages/Courses';
import { StudyPlanner } from './pages/StudyPlanner';
import { Assignments } from './pages/Assignments';
import { Profile } from './pages/Profile';
import { Achievements } from './pages/Achievements';
import { AiTutor } from './pages/AiTutor';
import { TeacherWhiteboard } from './pages/TeacherWhiteboard';
import { Modal } from './components/Modal';
import { useStudent } from './context/StudentContext';

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addTask } = useStudent();
  const [quickTaskModalOpen, setQuickTaskModalOpen] = useState(false);

  const [quickTaskTitle, setQuickTaskTitle] = useState('');
  const [quickTaskSubject, setQuickTaskSubject] = useState('Quantum Computing');
  const [quickTaskDay, setQuickTaskDay] = useState('Monday');

  const isHome = location.pathname === '/';
  const isWhiteboard = location.pathname === '/whiteboard';

  const handleQuickTaskSubmit = (e) => {
    e.preventDefault();
    if (!quickTaskTitle.trim()) return;
    addTask({
      title: quickTaskTitle,
      subject: quickTaskSubject,
      day: quickTaskDay,
      time: '14:00 - 16:00',
      duration: '2.0h',
      priority: 'High',
      tag: 'Quick Task',
      notes: 'Added via quick launch action.'
    });
    setQuickTaskTitle('');
    setQuickTaskModalOpen(false);
    navigate('/planner');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#040714] text-slate-100 cyber-grid-pattern selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Universal Navbar */}
      <Navbar />

      {/* Main Content Area */}
      {isHome ? (
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      ) : isWhiteboard ? (
        <main className="flex-1 w-full flex flex-col">
          <Routes>
            <Route path="/whiteboard" element={<TeacherWhiteboard />} />
          </Routes>
        </main>
      ) : (
        <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
          {/* Dashboard Left Sidebar */}
          <Sidebar onQuickTaskClick={() => setQuickTaskModalOpen(true)} />

          {/* Core Content Body */}
          <main className="flex-1 min-w-0 flex flex-col">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/whiteboard" element={<TeacherWhiteboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/planner" element={<StudyPlanner />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/ai-tutor" element={<AiTutor />} />
              <Route path="/api-keys" element={<AiTutor />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      )}

      {/* Universal Footer (hidden in Whiteboard for maximal canvas view) */}
      {!isWhiteboard && <Footer />}

      {/* Toast Notification Layer */}
      <ToastContainer />

      {/* Universal Quick Task Modal */}
      <Modal
        isOpen={quickTaskModalOpen}
        onClose={() => setQuickTaskModalOpen(false)}
        title="Quick Study Task"
        subtitle="Quickly schedule a study session into your weekly timetable"
      >
        <form onSubmit={handleQuickTaskSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
              What are you focusing on?
            </label>
            <input
              type="text"
              required
              autoFocus
              value={quickTaskTitle}
              onChange={(e) => setQuickTaskTitle(e.target.value)}
              placeholder="e.g. Master Bell State Entanglement Proofs"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Discipline
              </label>
              <select
                value={quickTaskSubject}
                onChange={(e) => setQuickTaskSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
              >
                <option value="Quantum Computing">Quantum Computing</option>
                <option value="Neural Architectures">Neural Architectures</option>
                <option value="Hyperdimensional WebGL">Hyperdimensional WebGL</option>
                <option value="Cybernetics & BCI">Cybernetics & BCI</option>
                <option value="Zero-Knowledge Web3">Zero-Knowledge Web3</option>
                <option value="Drone Swarms">Drone Swarms</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Day
              </label>
              <select
                value={quickTaskDay}
                onChange={(e) => setQuickTaskDay(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setQuickTaskModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan"
            >
              Add to Timetable
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default App;
