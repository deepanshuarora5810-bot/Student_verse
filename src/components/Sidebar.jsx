import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  CheckSquare,
  Trophy,
  User,
  Zap,
  Flame,
  RotateCcw,
  PlusCircle,
  Bot,
  PenTool
} from 'lucide-react';

export const Sidebar = ({ onQuickTaskClick }) => {
  const { student, stats, resetDemoData } = useStudent();

  const links = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Live Whiteboard', path: '/whiteboard', icon: PenTool },
    { label: 'My Courses', path: '/courses', icon: BookOpen, badge: stats.enrolledCount },
    { label: 'Study Planner', path: '/planner', icon: Calendar, badge: stats.totalTasksCount - stats.completedTasksCount },
    { label: 'Assignments', path: '/assignments', icon: CheckSquare, badge: stats.pendingAssignmentsCount },
    { label: 'Achievements', path: '/achievements', icon: Trophy },
    { label: 'AI Neural Tutor', path: '/ai-tutor', icon: Bot },
    { label: 'Student Profile', path: '/profile', icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 min-h-[calc(100vh-5rem)] border-r border-indigo-900/30 bg-[#050818]/60 backdrop-blur-xl p-4 justify-between">
      <div className="flex flex-col gap-6">
        
        {/* Quick User Snapshot Card */}
        <div className="p-3.5 rounded-2xl glass-card border-indigo-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-11 h-11 rounded-xl object-cover ring-2 ring-cyan-500/30"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-[#0a0f24]" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-white truncate">{student.name}</h4>
              <p className="text-[11px] text-cyan-400 font-mono truncate">{student.title}</p>
            </div>
          </div>

          {/* XP Progress Bar */}
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
        </div>

        {/* Quick Action Button */}
        {onQuickTaskClick && (
          <button
            onClick={onQuickTaskClick}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-medium text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Study Task</span>
          </button>
        )}

        {/* Navigation Section */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 mb-1">
            Navigation Portal
          </span>
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_-3px_rgba(6,182,212,0.25)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

      </div>

      {/* Footer controls inside sidebar */}
      <div className="flex flex-col gap-3 pt-4 border-t border-indigo-900/30">
        <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5 text-amber-300">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>{stats.streak}d Streak</span>
          </div>
          <div className="flex items-center gap-1 text-purple-300">
            <Zap className="w-4 h-4 text-purple-400" />
            <span>{stats.xp} XP</span>
          </div>
        </div>

        <button
          onClick={resetDemoData}
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[11px] font-mono text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
          title="Reset local storage data to initial demo state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </aside>
  );
};
