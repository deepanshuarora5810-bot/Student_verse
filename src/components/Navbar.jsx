import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  Bot,
  Camera,
  LogOut,
  LogIn,
  School,
  Scale
} from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student, teacher, stats, authRole, logout } = useStudent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeUser = authRole === 'teacher' ? teacher : student;

  const studentLinks = [
    { label: 'Home', path: '/', icon: Compass },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'AnswerIQ', path: '/answer-iq', icon: Scale },
    { label: 'Productivity', path: '/productivity', icon: Brain },
    { label: 'Face Monitor', path: '/face-monitoring', icon: Camera },
    { label: '3D Universe', path: '/universe', icon: Globe },
    { label: 'Reverse AI', path: '/reverse-classroom', icon: GraduationCap },
    { label: 'Textbook 3D', path: '/living-textbook', icon: BookOpen },
    { label: 'Whiteboard', path: '/whiteboard', icon: PenTool },
    { label: 'AI Tutor', path: '/ai-tutor', icon: Bot },
  ];

  const teacherLinks = [
    { label: 'Home', path: '/', icon: Compass },
    { label: 'Teacher Hub', path: '/teacher-dashboard', icon: School },
    { label: 'AnswerIQ', path: '/answer-iq', icon: Scale },
    { label: 'Whiteboard', path: '/whiteboard', icon: PenTool },
    { label: 'Face Proctor', path: '/face-monitoring', icon: Camera },
    { label: 'Assignments', path: '/assignments', icon: CheckSquare },
    { label: 'Curriculum', path: '/courses', icon: BookOpen },
    { label: 'AI Tutor', path: '/ai-tutor', icon: Bot },
  ];

  const navLinks = authRole === 'teacher' ? teacherLinks : studentLinks;

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
            {/* Streak Pill (for student) */}
            {authRole === 'student' && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400/30 animate-pulse" />
                <span>{stats.streak}d Streak</span>
              </div>
            )}

            {/* Role Badge */}
            <div className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider ${
              authRole === 'teacher'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-neon-purple'
                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-neon-cyan'
            }`}>
              {authRole === 'teacher' ? 'Faculty Lead' : 'Student'}
            </div>

            {/* User Avatar & Level */}
            {authRole ? (
              <Link
                to={authRole === 'teacher' ? '/teacher-dashboard' : '/profile'}
                className="flex items-center gap-2.5 p-1 pl-2.5 pr-3 rounded-full glass-card border-indigo-500/30 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="flex flex-col text-right">
                  <span className="text-xs font-bold text-white leading-tight truncate max-w-[110px]">{activeUser.name}</span>
                  <span className="text-[10px] text-cyan-400 font-mono leading-tight">
                    {authRole === 'teacher' ? 'FACULTY' : `LVL ${student.level}`}
                  </span>
                </div>
                <img
                  src={activeUser.avatar}
                  alt={activeUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-500/40"
                />
              </Link>
            ) : null}

            {/* Login / Logout Button */}
            {authRole ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-rose-300 bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 transition-all cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login</span>
              </Link>
            )}
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
        <div className="lg:hidden border-b border-indigo-900/40 bg-[#050818]/95 backdrop-blur-2xl px-4 pt-3 pb-6 flex flex-col gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold ${
                  active
                    ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-500/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            {authRole ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/30 flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout ({activeUser.name})</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
