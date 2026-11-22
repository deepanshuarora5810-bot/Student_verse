import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import {
  LayoutDashboard,
  Globe,
  Code,
  GraduationCap,
  BookOpen,
  Compass,
  Brain,
  Video,
  PenTool,
  Calendar,
  CheckSquare,
  Trophy,
  User,
  PlusCircle,
  Bot,
  Camera,
  School,
  LogOut,
  Scale
} from 'lucide-react';

export const Sidebar = ({ onQuickTaskClick }) => {
  const navigate = useNavigate();
  const { student, teacher, stats, authRole, courses, logout } = useStudent();

  const isTeacher = authRole === 'teacher';
  const currentUser = isTeacher ? teacher : student;

  const studentLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'AnswerIQ Comparator', path: '/answer-iq', icon: Scale, highlight: true },
    { label: 'Productivity Suite', path: '/productivity', icon: Brain, highlight: true, badge: stats.overdueTasksCount > 0 ? stats.overdueTasksCount : undefined },
    { label: 'Face Monitoring Mode', path: '/face-monitoring', icon: Camera, highlight: true },
    { label: '3D Universe', path: '/universe', icon: Globe, highlight: true },
    { label: 'Reverse AI Student', path: '/reverse-classroom', icon: GraduationCap, highlight: true },
    { label: 'Living 3D Textbook', path: '/living-textbook', icon: BookOpen, highlight: true },
    { label: 'Teacher Whiteboard', path: '/whiteboard', icon: PenTool },
    { label: 'My Courses', path: '/courses', icon: BookOpen, badge: stats.enrolledCount },
    { label: 'Study Planner', path: '/planner', icon: Calendar, badge: stats.totalTasksCount - stats.completedTasksCount },
    { label: 'Assignments', path: '/assignments', icon: CheckSquare, badge: stats.pendingAssignmentsCount },
    { label: 'Achievements', path: '/achievements', icon: Trophy },
    { label: 'AI Neural Tutor', path: '/ai-tutor', icon: Bot },
    { label: 'Student Profile', path: '/profile', icon: User },
  ];

  const teacherLinks = [
    { label: 'Teacher Dashboard', path: '/teacher-dashboard', icon: LayoutDashboard },
    { label: 'AnswerIQ Comparator', path: '/answer-iq', icon: Scale, highlight: true },
    { label: 'Digital Whiteboard', path: '/whiteboard', icon: PenTool, highlight: true },
    { label: 'Face Proctor Monitor', path: '/face-monitoring', icon: Camera, highlight: true },
    { label: 'Assignments & Grading', path: '/assignments', icon: CheckSquare, badge: teacher.pendingReviews },
    { label: 'Course Curriculum', path: '/courses', icon: BookOpen, badge: courses.length },
    { label: 'AI Assistant', path: '/ai-tutor', icon: Bot },
    { label: 'Student View', path: '/dashboard', icon: GraduationCap },
  ];

  const links = isTeacher ? teacherLinks : studentLinks;

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 min-h-[calc(100vh-5rem)] border-r border-indigo-900/30 bg-[#050818]/60 backdrop-blur-xl p-4 justify-between">
      <div className="flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-6rem)] pr-1">
        
        {/* Quick User Snapshot Card */}
        <div className={`p-3.5 rounded-2xl glass-card relative overflow-hidden group ${
          isTeacher ? 'border-purple-500/30' : 'border-indigo-500/20'
        }`}>
          <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl transition-all ${
            isTeacher ? 'bg-purple-500/10 group-hover:bg-purple-500/20' : 'bg-cyan-500/10 group-hover:bg-cyan-500/20'
          }`} />
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className={`w-11 h-11 rounded-xl object-cover ring-2 ${
                  isTeacher ? 'ring-purple-500/40' : 'ring-cyan-500/30'
                }`}
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-[#0a0f24]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-white truncate">{currentUser.name}</h4>
              </div>
              <p className={`text-[11px] font-mono truncate ${isTeacher ? 'text-purple-300' : 'text-cyan-400'}`}>
                {currentUser.title}
              </p>
            </div>
          </div>

          {/* Role Snapshot Badge or XP Bar */}
          {isTeacher ? (
            <div className="mt-3 p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between text-[11px] font-mono">
              <span className="text-purple-300 font-bold">Room: {teacher.activeClassroomCode}</span>
              <span className="text-slate-400">{teacher.totalStudents} Students</span>
            </div>
          ) : (
            <div className="mt-3">
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span>LVL {student.level}</span>
                <span className="text-purple-300 font-semibold">{student.xp} / {student.xpToNextLevel} XP</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${Math.min(100, (student.xp / student.xpToNextLevel) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Button: New Task (Student) or Launch Whiteboard (Teacher) */}
        {isTeacher ? (
          <Link
            to="/whiteboard"
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-neon-purple transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <PenTool className="w-4 h-4 text-purple-200 group-hover:rotate-12 transition-transform" />
            <span>Launch Whiteboard</span>
          </Link>
        ) : onQuickTaskClick ? (
          <button
            onClick={onQuickTaskClick}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-cyan-200 group-hover:rotate-90 transition-transform" />
            <span>New Study Task</span>
          </button>
        ) : null}

        {/* Nav Links */}
        <div className="flex flex-col gap-1 pb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 mb-1">
            {isTeacher ? 'Faculty Workspace' : 'Spatial 3D & AI Ecosystem'}
          </span>
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? isTeacher
                        ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30 shadow-[0_0_15px_-3px_rgba(168,85,247,0.3)] font-semibold'
                        : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_-3px_rgba(6,182,212,0.25)] font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isTeacher ? 'text-purple-400' : 'text-cyan-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

      </div>

      {/* Footer Switcher / Logout */}
      <div className="pt-4 border-t border-indigo-900/30 flex items-center justify-between px-1">
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Switch / Logout</span>
        </button>
        <span className="text-[10px] font-mono text-slate-500">v3.0</span>
      </div>
    </aside>
  );
};
