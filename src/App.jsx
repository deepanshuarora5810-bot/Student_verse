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
import { Universe } from './pages/Universe';
import { ReverseClassroom } from './pages/ReverseClassroom';
import { LivingTextbook } from './pages/LivingTextbook';
import { ProductivityHub } from './pages/ProductivityHub';
import { FaceMonitoringMode } from './pages/FaceMonitoringMode';
import { AiCompanionModal } from './components/companion/AiCompanionModal';
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
  const isUniverse = location.pathname === '/universe';
  const isImmersiveFullPage = isWhiteboard || isUniverse;

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
      ) : isImmersiveFullPage ? (
        <main className="flex-1 w-full flex flex-col">
          <Routes>
            <Route path="/whiteboard" element={<TeacherWhiteboard />} />
            <Route path="/universe" element={<Universe />} />
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
              <Route path="/productivity" element={<ProductivityHub />} />
              <Route path="/face-monitoring" element={<FaceMonitoringMode />} />
              <Route path="/universe" element={<Universe />} />
              <Route path="/reverse-classroom" element={<ReverseClassroom />} />
              <Route path="/living-textbook" element={<LivingTextbook />} />
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

      {/* Universal Footer (hidden in immersive views for maximal canvas view) */}
      {!isImmersiveFullPage && <Footer />}

      {/* Global 3D AI Companion Dock & Modal */}
      <AiCompanionModal />

      {/* Toast Notification Layer */}
      <ToastContainer />

      {/* Universal Quick Task Modal */}
      <Modal
        isOpen={quickTaskModalOpen}
        onClose={() => setQuickTaskModalOpen(false)}
        title="Quick Study Task"
      >
        <form onSubmit={handleQuickTaskSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
              Task Title
            </label>
            <input
              type="text"
              required
              value={quickTaskTitle}
              onChange={(e) => setQuickTaskTitle(e.target.value)}
              placeholder="e.g. Master Lie Algebras in 3D Universe"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-indigo-900/40 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Subject Sphere
              </label>
              <select
                value={quickTaskSubject}
                onChange={(e) => setQuickTaskSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-indigo-900/40 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Quantum Computing">Quantum Computing</option>
                <option value="AI & Neural Systems">AI & Neural Systems</option>
                <option value="Systems & Memory Architecture">Systems & Memory</option>
                <option value="Applied Biophysics">Applied Biophysics</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Scheduled Day
              </label>
              <select
                value={quickTaskDay}
                onChange={(e) => setQuickTaskDay(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-indigo-900/40 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-indigo-900/40">
            <button
              type="button"
              onClick={() => setQuickTaskModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all"
            >
              Add to Study Schedule
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


export default App;
