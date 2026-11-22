import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import {
  PenTool,
  Camera,
  CheckSquare,
  BookOpen,
  Users,
  Video,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Award,
  BarChart3,
  Flame,
  Clock,
  Send,
  Zap,
  GraduationCap,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Eye
} from 'lucide-react';

export const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { teacher, courses, stats, assignments, addToast, logout } = useStudent();
  const [broadcastActive, setBroadcastActive] = useState(true);

  // Demo active exam candidates for teacher monitoring
  const [proctoredStudents, setProctoredStudents] = useState([
    {
      id: 'stu-1',
      name: 'Alex Mercer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      subject: 'Quantum Computing Midterm',
      status: 'In Progress (Q 1 of 4)',
      matchConfidence: 97.4,
      anomalies: 1,
      flagReason: 'Gaze diverted from primary viewport (05:55:39)',
      verified: true
    },
    {
      id: 'stu-2',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      subject: 'Neural Systems Architecture',
      status: 'Submitted (100%)',
      matchConfidence: 99.1,
      anomalies: 0,
      flagReason: 'No infractions',
      verified: true
    },
    {
      id: 'stu-3',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      subject: 'WebGL Shader Optimization',
      status: 'In Progress (Q 3 of 4)',
      matchConfidence: 95.8,
      anomalies: 0,
      flagReason: 'Optimal gaze alignment',
      verified: true
    }
  ]);

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      
      {/* FACULTY BANNER & WELCOME HEADER */}
      <div className="relative glass-card rounded-3xl p-6 sm:p-8 border-purple-500/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={teacher.avatar}
              alt={teacher.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-purple-500/40 shadow-neon-purple"
            />
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400 font-semibold mb-1">
                <GraduationCap className="w-4 h-4" />
                <span>Faculty Control Center • Neo-Kyoto</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                {teacher.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {teacher.title} • {teacher.department}
              </p>
            </div>
          </div>

          {/* Quick Faculty Metrics */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="block text-xl font-bold text-cyan-400 font-display">
                {teacher.totalStudents}
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Enrolled Students
              </span>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="block text-xl font-bold text-purple-400 font-display">
                {courses.length}
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Active Courses
              </span>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="block text-xl font-bold text-emerald-400 font-display">
                {teacher.activeClassroomCode}
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Live Room Code
              </span>
            </div>
          </div>
        </div>

        {/* Action Pills */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Digital Broadcast Live</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Room: <strong className="text-white">{teacher.activeClassroomCode}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Preview Student View</span>
            </Link>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-all"
            >
              Faculty Logout
            </button>
          </div>
        </div>
      </div>

      {/* CORE TEACHER ACTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* CARD 1: TEACHER WHITEBOARD */}
        <Link
          to="/whiteboard"
          className="glass-card glass-card-hover rounded-2xl p-5 border border-indigo-900/40 relative overflow-hidden group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
              <PenTool className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              Digital Whiteboard
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Real-time multi-page canvas with math formula templates, laser pointers, and student broadcast.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-cyan-400">
            <span>Launch Whiteboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* CARD 2: PROCTORING & FACE MONITORING */}
        <Link
          to="/face-monitoring"
          className="glass-card glass-card-hover rounded-2xl p-5 border border-indigo-900/40 relative overflow-hidden group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-105 transition-transform">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
              Face Proctor Monitor
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Verify enrolled candidate biometric identity, track gaze orientation, and detect anomalies live.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-purple-400">
            <span>Inspect Live Proctor</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* CARD 3: ASSIGNMENT GRADING */}
        <Link
          to="/assignments"
          className="glass-card glass-card-hover rounded-2xl p-5 border border-indigo-900/40 relative overflow-hidden group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
              <CheckSquare className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
              AI Auto-Grading Hub
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Review student submissions, execute automated code test suites, and award XP and badges.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-emerald-400">
            <span>Grade Assignments</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* CARD 4: COURSES & API KEYS */}
        <Link
          to="/courses"
          className="glass-card glass-card-hover rounded-2xl p-5 border border-indigo-900/40 relative overflow-hidden group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
              Curriculum & API Keys
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Configure course syllabus modules, manage student REST API keys, and test Neural AI prompts.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-amber-400">
            <span>Manage Curriculum</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

      </div>

      {/* LIVE PROCTOR AUDIT TELEMETRY STREAM */}
      <div className="glass-card rounded-2xl p-6 border-indigo-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-semibold mb-1">
              <Camera className="w-4 h-4" />
              <span>Real-Time Candidate Proctor Stream</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Live Examination Biometric Telemetry
            </h3>
          </div>
          <Link
            to="/face-monitoring"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all shadow-neon-cyan"
          >
            <span>Open Proctoring Terminal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {proctoredStudents.map((candidate) => (
            <div
              key={candidate.id}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between gap-3 relative"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-cyan-500/30"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-white">{candidate.name}</h5>
                    <p className="text-[10px] text-cyan-400 font-mono truncate">{candidate.subject}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  candidate.anomalies === 0 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {candidate.anomalies === 0 ? 'Verified' : '1 Flagged'}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800/80 text-[11px] font-mono">
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Match Confidence:</span>
                  <span className="text-emerald-400 font-bold">{candidate.matchConfidence}%</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Status:</span>
                  <span className="text-slate-200">{candidate.status}</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-mono">
                Log: <span className="text-slate-300">{candidate.flagReason}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CLASSROOM CURRICULUM OVERVIEW */}
      <div className="glass-card rounded-2xl p-6 border-indigo-900/40">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Faculty Assigned Courses ({courses.length})</span>
          </h3>
          <Link to="/courses" className="text-xs font-mono text-cyan-400 hover:underline">
            View All in Catalog →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.slice(0, 3).map((crs) => (
            <div key={crs.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block mb-1">
                  {crs.category} • {crs.duration}
                </span>
                <h4 className="text-sm font-semibold text-white">{crs.title}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{crs.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">{crs.studentsCount} Students</span>
                <span className="text-emerald-400 font-bold">Rating {crs.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
