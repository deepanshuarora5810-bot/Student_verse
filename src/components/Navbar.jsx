import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { 
  Sparkles, 
  Flame, 
  Zap, 
  Menu, 
  X, 
  Compass, 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  Trophy, 
  User,
  Globe,
  Code,
  GraduationCap,
  Brain,
  Video,
  PenTool,
  Bot
} from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const { student, stats } = useStudent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/', icon: Compass },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: '3D Universe', path: '/universe', icon: Globe },
    { label: 'Code Lab', path: '/code-lab', icon: Code },
    { label: 'Reverse AI', path: '/reverse-classroom', icon: GraduationCap },
    { label: 'Textbook 3D', path: '/living-textbook', icon: BookOpen },
    { label: 'Whiteboard', path: '/whiteboard', icon: PenTool },
    { label: 'Intelligence', path: '/intelligence', icon: Brain },
    { label: 'AI Tutor', path: '/ai-tutor', icon: Bot },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#040714]/85 border-b border-indigo-900/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-neon-cyan">
              <div className="w-full h-full bg-[#050818] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg sm:text-xl tracking-wider text-white flex items-center gap-1.5">
                STUDENT<span className="text-gradient-cyan">VERSE</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold tracking-normal">
                  v3.0
                </span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 -mt-1 hidden sm:inline tracking-widest">
                3D AI LEARNING ECOSYSTEM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.slice(0, 8).map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                    active
                      ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action / Telemetry Area */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Streak Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400/30 animate-pulse" />
              <span>{stats.streak}d Streak</span>
            </div>

            {/* XP Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Zap className="w-4 h-4 text-purple-400 fill-purple-400/30" />
              <span>{stats.xp.toLocaleString()} XP</span>
            </div>

            {/* User Avatar & Level */}
            <Link
              to="/profile"
              className="flex items-center gap-2.5 p-1 pl-2.5 pr-3 rounded-full glass-card border-indigo-500/30 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="flex flex-col text-right">
                <span className="text-xs font-bold text-white leading-tight">{student.name}</span>
                <span className="text-[10px] text-cyan-400 font-mono leading-tight">LVL {student.level}</span>
              </div>
              <img
                src={student.avatar}
                alt={student.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-500/40"
              />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 border border-indigo-900/40 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-indigo-900/30 bg-[#050818]/95 backdrop-blur-2xl px-4 pt-3 pb-6 flex flex-col gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                  active
                    ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};
