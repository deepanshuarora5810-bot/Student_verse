import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
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
import { Login } from './pages/Login';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { AiCompanionModal } from './components/companion/AiCompanionModal';
import { Modal } from './components/Modal';
import { useStudent } from './context/StudentContext';

// Role-based Route Protection
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { authRole } = useStudent();
  const location = useLocation();

  if (!authRole) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(authRole)) {
    if (authRole === 'teacher') {
      return <Navigate to="/teacher-dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addTask, authRole } = useStudent();
  const [quickTaskModalOpen, setQuickTaskModalOpen] = useState(false);

  const [quickTaskTitle, setQuickTaskTitle] = useState('');
  const [quickTaskSubject, setQuickTaskSubject] = useState('Quantum Computing');
  const [quickTaskDay, setQuickTaskDay] = useState('Monday');

  const isHome = location.pathname === '/';
  const isLogin = location.pathname === '/login';
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
      {/* Top Universal Navbar (Visible across all pages except dedicated full-screen login) */}
      {!isLogin && <Navbar />}

      {/* Main Content Area */}
      {isLogin ? (
        /* Full-screen clean layout for Login */
        <main className="flex-1 flex items-center justify-center p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      ) : isHome ? (
        /* Home Landing Page - Restored to work as previously */
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      ) : isImmersiveFullPage ? (
        /* Full-screen Canvas view for Whiteboard and 3D Universe */
        <main className="flex-1 w-full flex flex-col">
          <Routes>
            <Route
              path="/whiteboard"
              element={
                <ProtectedRoute allowedRoles={['student', 'teacher']}>
                  <TeacherWhiteboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/universe"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <Universe />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      ) : (
        /* Standard Dashboard Layout with Role-Specific Sidebar */
        <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
          {/* Dashboard Left Sidebar */}
          <Sidebar onQuickTaskClick={() => setQuickTaskModalOpen(true)} />

          {/* Core Content Body */}
          <main className="flex-1 min-w-0 flex flex-col">
            <Routes>
              <Route path="/" element={<Navigate to="/" replace />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teacher-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <TeacherDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/productivity"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <ProductivityHub />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/face-monitoring"
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <FaceMonitoringMode />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reverse-classroom"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <ReverseClassroom />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/living-textbook"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <LivingTextbook />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/courses"
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <Courses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/planner"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudyPlanner />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assignments"
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <Assignments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/achievements"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <Achievements />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai-tutor"
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <AiTutor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/api-keys"
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <AiTutor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              {/* Fallback */}
              <Route
                path="*"
                element={
                  <Navigate
                    to={authRole === 'teacher' ? '/teacher-dashboard' : '/dashboard'}
                    replace
                  />
                }
              />
            </Routes>
          </main>
        </div>
      )}

      {/* Universal Footer (hidden in immersive views and login) */}
      {!isImmersiveFullPage && !isLogin && <Footer />}

      {/* Global 3D AI Companion Dock & Modal (visible only when logged in) */}
      {!isLogin && authRole && <AiCompanionModal />}

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
            <label className="block text-xs font-mono text-slate-300 mb-1 uppercase">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={quickTaskTitle}
              onChange={(e) => setQuickTaskTitle(e.target.value)}
              placeholder="e.g. Implement Grover Search Oracle..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 font-sans"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1 uppercase">
                Subject
              </label>
              <select
                value={quickTaskSubject}
                onChange={(e) => setQuickTaskSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 font-sans"
              >
                <option value="Quantum Computing">Quantum Computing</option>
                <option value="Neural Systems">Neural Systems</option>
                <option value="Creative Dev">Creative Dev</option>
                <option value="Web3 & Cryptography">Web3 & Cryptography</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1 uppercase">
                Day
              </label>
              <select
                value={quickTaskDay}
                onChange={(e) => setQuickTaskDay(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 font-sans"
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

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setQuickTaskModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan"
            >
              Add to Schedule
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default App;
