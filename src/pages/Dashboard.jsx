import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { DashboardCard } from '../components/DashboardCard';
import { Modal } from '../components/Modal';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Calendar,
  AlertCircle,
  PlusCircle,
  Flame,
  Zap,
  ArrowRight,
  Send,
  Timer,
  Globe,
  Code,
  GraduationCap,
  Compass,
  Brain,
  Video,
  PenTool,
  ShieldAlert
} from 'lucide-react';

export const Dashboard = () => {
  const { student, stats, weeklyAnalytics, assignments, activities, addXP, addToast, updateProfile } = useStudent();
  const [logHoursOpen, setLogHoursOpen] = useState(false);
  const [hoursToAdd, setHoursToAdd] = useState('2.0');
  const [sessionSubject, setSessionSubject] = useState('Quantum Computing');
  const [sessionNotes, setSessionNotes] = useState('');

  const pendingAssignments = assignments.filter((a) => a.status === 'Pending').slice(0, 3);

  const handleLogHours = (e) => {
    e.preventDefault();
    const h = parseFloat(hoursToAdd);
    if (isNaN(h) || h <= 0) {
      addToast('Please enter a valid study duration.', 'warning');
      return;
    }

    const newTotal = parseFloat((student.studyHours + h).toFixed(1));
    updateProfile({ studyHours: newTotal });
    addXP(Math.round(h * 30));
    addToast(`Logged ${h} hours of deep focus in ${sessionSubject}! +${Math.round(h * 30)} XP awarded.`, 'success', 'Session Recorded');
    setLogHoursOpen(false);
    setSessionNotes('');
  };

  // Greeting by hour
  const currentHour = new Date().getHours();
  let timeGreeting = "Good Morning";
  if (currentHour >= 12 && currentHour < 17) timeGreeting = "Good Afternoon";
  else if (currentHour >= 17) timeGreeting = "Good Evening";

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      
      {/* PERSONALIZED WELCOME HEADER */}
      <div className="relative glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30 overflow-hidden">
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/15 via-purple-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="relative shrink-0">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-cyan-500/40 shadow-neon-cyan"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 ring-2 ring-[#0a0f24]" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
                  {student.university}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {student.title}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display">
                {timeGreeting}, <span className="text-gradient-cyan">{student.name}</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Neural telemetry initialized. You are currently on a <strong className="text-amber-300 font-semibold">{stats.streak}-day streak</strong> with <strong>{stats.enrolledCount} active courses</strong>.
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setLogHoursOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all transform active:scale-95"
            >
              <Timer className="w-4 h-4" />
              <span>Log Focus Session</span>
            </button>

            <Link
              to="/planner"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Open Timetable</span>
            </Link>
          </div>
        </div>

        {/* Level XP Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Rank: <strong>Level {student.level} Scholar</strong></span>
            </span>
            <span className="text-purple-300 font-semibold">
              {student.xp.toLocaleString()} / {student.xpToNextLevel.toLocaleString()} XP ({Math.round((student.xp / student.xpToNextLevel) * 100)}%)
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden border border-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 transition-all duration-700"
              style={{ width: `${Math.min(100, (student.xp / student.xpToNextLevel) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4 KEY METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCard
          title="Courses Enrolled"
          value={stats.enrolledCount}
          subtitle={`${stats.totalCourses - stats.enrolledCount} available in catalog`}
          icon={BookOpen}
          color="cyan"
          trend="+1 this month"
          actionText="Browse Courses"
          onAction={() => window.location.href = '/courses'}
        />

        <DashboardCard
          title="Deep Focus Hours"
          value={`${student.studyHours}h`}
          subtitle="Verified cognitive time"
          icon={Clock}
          color="purple"
          trend="+8.5h this week"
          actionText="Log New Hours"
          onAction={() => setLogHoursOpen(true)}
        />

        <DashboardCard
          title="Completed Tasks"
          value={`${stats.completedTasksCount} / ${stats.totalTasksCount}`}
          subtitle="Study planner items"
          icon={CheckCircle2}
          color="emerald"
          trend={`${Math.round((stats.completedTasksCount / (stats.totalTasksCount || 1)) * 100)}% complete`}
          actionText="View Planner"
          onAction={() => window.location.href = '/planner'}
        />

        <DashboardCard
          title="Overall Progress"
          value={`${stats.averageProgress}%`}
          subtitle="Across active disciplines"
          icon={TrendingUp}
          color="amber"
          trend="Top 5% Cohort"
          actionText="View Assignments"
          onAction={() => window.location.href = '/assignments'}
        />
      </div>

      {/* COGNITIVE WEAK CONCEPT WARNING BANNER */}
      {stats.weakConceptsCount > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl glass-card border-rose-500/40 bg-gradient-to-r from-rose-950/40 via-[#070b22] to-amber-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Cognitive Attention Alert</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  {stats.weakConceptsCount} Concepts Require Practice
                </span>
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                The Learning Intelligence Engine detected memory decay in Shor's Factorization & Red-Black Tree balances. Complete quick 5-min drills to preserve long-term retention.
              </p>
            </div>
          </div>

          <Link
            to="/intelligence"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-amber-600 hover:from-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all transform active:scale-95 shrink-0 text-center"
          >
            <span>Review & Drill Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* 3D SPATIAL & AI ECOSYSTEM LAUNCH MATRIX */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Next-Gen 3D Educational Ecosystem
            </span>
            <h3 className="text-xl font-bold font-display text-white mt-0.5">
              Interactive 3D Virtual Worlds & Digital Labs
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Spatial Laboratories Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: 3D Universe */}
          <Link
            to="/universe"
            className="group p-5 rounded-2xl glass-card border-indigo-500/20 hover:border-cyan-400/50 bg-[#060a1f] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                <span>3D Universe</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Explore 5 subject celestial planets and launch orbital modules.
              </p>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 mt-4 block">
              5 Planetary Systems &rarr;
            </span>
          </Link>

          {/* Card 2: 3D Code Execution Lab */}
          <Link
            to="/code-lab"
            className="group p-5 rounded-2xl glass-card border-indigo-500/20 hover:border-purple-400/50 bg-[#060a1f] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                <Code className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
                <span>Code Lab 3D</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Step-by-step 3D Stack, Heap memory and recursion visualizer.
              </p>
            </div>
            <span className="text-[10px] font-mono text-purple-400 mt-4 block">
              Java & Python Debugger &rarr;
            </span>
          </Link>

          {/* Card 3: Reverse Classroom AI */}
          <Link
            to="/reverse-classroom"
            className="group p-5 rounded-2xl glass-card border-indigo-500/20 hover:border-indigo-400/50 bg-[#060a1f] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                <span>Reverse AI Student</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Teach Cortex-7, fix conceptual misconceptions, and earn XP.
              </p>
            </div>
            <span className="text-[10px] font-mono text-indigo-400 mt-4 block">
              Feynman Teaching Engine &rarr;
            </span>
          </Link>

          {/* Card 4: Living 3D Textbook */}
          <Link
            to="/living-textbook"
            className="group p-5 rounded-2xl glass-card border-indigo-500/20 hover:border-emerald-400/50 bg-[#060a1f] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                <span>Living 3D Textbook</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Neuroanatomy, Keplerian orbits, molecular bonds & 3D trees.
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 mt-4 block">
              Simulation Lab &rarr;
            </span>
          </Link>

          {/* Card 5: Personal Learning World */}
          <Link
            to="/my-world"
            className="group p-5 rounded-2xl glass-card border-indigo-500/20 hover:border-amber-400/50 bg-[#060a1f] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                <span>My Learning World</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Floating islands that unlock as you progress, with daily quests.
              </p>
            </div>
            <span className="text-[10px] font-mono text-amber-400 mt-4 block">
              {stats.unlockedBiomesCount} Biomes Unlocked &rarr;
            </span>
          </Link>

          {/* Card 6: Intelligence Engine */}
          <Link
            to="/intelligence"
            className="group p-5 rounded-2xl glass-card border-indigo-500/20 hover:border-cyan-400/50 bg-[#060a1f] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
                <Brain className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                <span>Intelligence Engine</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Knowledge graph, retention curve, and mistake pattern audits.
              </p>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 mt-4 block">
              Spaced Repetition &rarr;
            </span>
          </Link>

          {/* Card 7: Teacher Whiteboard */}
          <Link
            to="/whiteboard"
            className="group p-5 rounded-2xl glass-card border-indigo-500/20 hover:border-teal-400/50 bg-[#060a1f] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-3 group-hover:scale-110 transition-transform">
                <PenTool className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors flex items-center justify-between">
                <span>Teacher Whiteboard</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Infinite drawing canvas, laser pointer, math templates & export.
              </p>
            </div>
            <span className="text-[10px] font-mono text-teal-400 mt-4 block">
              Multi-page Canvas &rarr;
            </span>
          </Link>
        </div>
      </div>

      {/* ANALYTICS CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Activity Area Chart */}
        <div className="lg:col-span-8 glass-card rounded-2xl p-6 border-indigo-500/20 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>Cognitive Telemetry</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white mt-1">
                Weekly Study Hours vs Target
              </h3>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-3 h-3 rounded-full bg-cyan-400" />
                <span>Actual Hours</span>
              </div>
              <div className="flex items-center gap-1.5 text-purple-400">
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                <span>Target Hours</span>
              </div>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyAnalytics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090e24',
                    borderColor: 'rgba(99, 102, 241, 0.4)',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
                  }}
                  itemStyle={{ color: '#38bdf8' }}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  name="Study Hours"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#cyanGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  name="Target"
                  stroke="#a855f7"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#purpleGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* XP Daily Bar Chart */}
        <div className="lg:col-span-4 glass-card rounded-2xl p-6 border-indigo-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400 font-semibold mb-1">
              <Zap className="w-4 h-4" />
              <span>XP Yield</span>
            </div>
            <h3 className="text-lg font-bold font-display text-white">
              Daily XP Velocity
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Points earned via assignments & lecture modules.
            </p>
          </div>

          <div className="h-56 w-full my-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyAnalytics}>
                <CartesianGrid strokeDasharray="2 2" stroke="#1e293b" opacity={0.5} />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090e24',
                    borderColor: 'rgba(168, 85, 247, 0.4)',
                    borderRadius: '0.75rem',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="xp" name="XP Points" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-center justify-between text-xs">
            <span className="text-slate-300">Weekly Total:</span>
            <span className="font-mono font-bold text-purple-300">+3,650 XP Earned</span>
          </div>
        </div>

      </div>

      {/* LOWER SECTION: UPCOMING DEADLINES & RECENT ACTIVITIES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Upcoming Deadlines */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6 border-indigo-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-rose-400 font-semibold">
                  <AlertCircle className="w-4 h-4" />
                  <span>Submission Radar</span>
                </div>
                <h3 className="text-lg font-bold font-display text-white mt-1">
                  Upcoming Deadlines
                </h3>
              </div>

              <Link
                to="/assignments"
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {pendingAssignments.map((asg) => (
                <div
                  key={asg.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                        {asg.priority} Priority
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Due: {asg.dueDate}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {asg.title}
                    </h4>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{asg.course}</p>
                  </div>

                  <Link
                    to="/assignments"
                    className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-center transition-all"
                  >
                    Submit
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities Feed */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6 border-indigo-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Audit Stream</span>
                </div>
                <h3 className="text-lg font-bold font-display text-white mt-1">
                  Recent Activities
                </h3>
              </div>

              <span className="text-xs font-mono text-slate-400">Live Grid</span>
            </div>

            <div className="flex flex-col gap-3">
              {activities.slice(0, 4).map((act) => (
                <div
                  key={act.id}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-xs sm:text-sm font-medium text-slate-200 truncate">
                        {act.title}
                      </h5>
                      <span className="text-[10px] font-mono text-slate-400">{act.time}</span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-purple-300 shrink-0">
                    {act.xp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* MODAL: LOG STUDY HOURS */}
      <Modal
        isOpen={logHoursOpen}
        onClose={() => setLogHoursOpen(false)}
        title="Log Deep Focus Session"
        subtitle="Record cognitive hours to update your neural telemetry & earn XP"
      >
        <form onSubmit={handleLogHours} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
              Study Duration (Hours)
            </label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="16"
              value={hoursToAdd}
              onChange={(e) => setHoursToAdd(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
              Discipline / Course
            </label>
            <select
              value={sessionSubject}
              onChange={(e) => setSessionSubject(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
            >
              <option value="Quantum Computing">Quantum Computing & Qubit Algorithms</option>
              <option value="Neural Architectures">Neural Architectures & Deep Transformers</option>
              <option value="Hyperdimensional WebGL">Hyperdimensional WebGL & 3D Shaders</option>
              <option value="Neural UX">Cybernetic Systems & BCI Engineering</option>
              <option value="Web3 & Cryptography">Zero-Knowledge Cryptography & Web3</option>
              <option value="Robotics Swarms">Autonomous Drone Swarms & Robotics</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
              Focus Notes & Breakthroughs
            </label>
            <textarea
              rows={3}
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="e.g. Worked through Grover's oracle diffusion operator equations..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setLogHoursOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan flex items-center gap-1.5"
            >
              <Timer className="w-4 h-4" />
              <span>Record Focus Telemetry</span>
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
