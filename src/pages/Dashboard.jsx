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
  ShieldAlert,
  AlertTriangle,
  Target,
  ListTodo,
  CheckSquare,
  Users,
  Repeat
} from 'lucide-react';

export const Dashboard = () => {
  const {
    student,
    stats,
    weeklyAnalytics,
    assignments,
    activities,
    tasks,
    exams,
    hourlyProductivity,
    workloadHeatmap,
    toggleTaskCompleted,
    addXP,
    addToast,
    updateProfile
  } = useStudent();

  const [logHoursOpen, setLogHoursOpen] = useState(false);
  const [hoursToAdd, setHoursToAdd] = useState('2.0');
  const [sessionSubject, setSessionSubject] = useState('Quantum Computing');
  const [sessionNotes, setSessionNotes] = useState('');
  const [selectedHeatmapDay, setSelectedHeatmapDay] = useState(workloadHeatmap[workloadHeatmap.length - 1]);

  const pendingAssignments = assignments.filter((a) => a.status === 'Pending').slice(0, 3);

  // Tasks requiring immediate attention (Overdue or High Risk)
  const urgentTasks = tasks
    .filter((t) => !t.completed && (t.dueDate < '2026-11-22' || t.risk === 'High' || t.priority === 'High'))
    .slice(0, 4);

  // Today's schedule tasks (Sunday or first upcoming day)
  const todayTasks = tasks.filter((t) => t.day === 'Monday' || t.day === 'Sunday' || t.day === 'All');

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
                Neural telemetry initialized. You are currently on a <strong className="text-amber-300 font-semibold">{stats.streak}-day streak</strong> with <strong>{stats.enrolledCount} active courses</strong> and <strong>{stats.averageExamReadiness}% exam readiness</strong>.
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/productivity"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-neon-purple transition-all transform active:scale-95"
            >
              <Brain className="w-4 h-4" />
              <span>Productivity Hub</span>
            </Link>

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
              <span>Timetable</span>
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

      {/* DYNAMIC METRIC CARDS (ALL 8 CORE METRICS) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {/* Metric 1: Total Tasks */}
        <div className="glass-card rounded-2xl p-4 border-indigo-500/20 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-400">Total Tasks</span>
          <div className="my-2">
            <p className="text-xl sm:text-2xl font-extrabold text-white font-display">{stats.totalTasksCount}</p>
          </div>
          <span className="text-[10px] font-mono text-cyan-400">In calendar</span>
        </div>

        {/* Metric 2: Completed Tasks */}
        <div className="glass-card rounded-2xl p-4 border-indigo-500/20 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-400">Completed</span>
          <div className="my-2">
            <p className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-display">{stats.completedTasksCount}</p>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">
            {stats.totalTasksCount ? Math.round((stats.completedTasksCount / stats.totalTasksCount) * 100) : 0}% done
          </span>
        </div>

        {/* Metric 3: Pending Tasks */}
        <div className="glass-card rounded-2xl p-4 border-indigo-500/20 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-400">Pending</span>
          <div className="my-2">
            <p className="text-xl sm:text-2xl font-extrabold text-purple-300 font-display">{stats.pendingTasksCount}</p>
          </div>
          <span className="text-[10px] font-mono text-purple-400">Active queue</span>
        </div>

        {/* Metric 4: Overdue Tasks */}
        <div className="glass-card rounded-2xl p-4 border-indigo-500/20 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-400">Overdue</span>
          <div className="my-2">
            <p className="text-xl sm:text-2xl font-extrabold text-rose-400 font-display">{stats.overdueTasksCount}</p>
          </div>
          <span className="text-[10px] font-mono text-rose-400">Requires recovery</span>
        </div>

        {/* Metric 5: Upcoming Exams */}
        <div className="glass-card rounded-2xl p-4 border-indigo-500/20 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-400">Upcoming Exams</span>
          <div className="my-2">
            <p className="text-xl sm:text-2xl font-extrabold text-amber-300 font-display">{stats.upcomingExamsCount}</p>
          </div>
          <span className="text-[10px] font-mono text-amber-400">Next in 3d</span>
        </div>

        {/* Metric 6: Study Streak */}
        <div className="glass-card rounded-2xl p-4 border-indigo-500/20 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-400">Study Streak</span>
          <div className="my-2 flex items-center gap-1">
            <Flame className="w-5 h-5 text-amber-400" />
            <p className="text-xl sm:text-2xl font-extrabold text-white font-display">{stats.streak}d</p>
          </div>
          <span className="text-[10px] font-mono text-amber-300">Continuous fire</span>
        </div>

        {/* Metric 7: Exam Readiness Score */}
        <div className="glass-card rounded-2xl p-4 border-indigo-500/20 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-400">Readiness Score</span>
          <div className="my-2">
            <p className="text-xl sm:text-2xl font-extrabold text-cyan-300 font-display">{stats.averageExamReadiness}%</p>
          </div>
          <span className="text-[10px] font-mono text-cyan-400">Cohort top 10%</span>
        </div>

        {/* Metric 8: Focus Hours */}
        <div className="glass-card rounded-2xl p-4 border-indigo-500/20 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-400">Focus Hours</span>
          <div className="my-2">
            <p className="text-xl sm:text-2xl font-extrabold text-indigo-300 font-display">{student.studyHours}h</p>
          </div>
          <span className="text-[10px] font-mono text-indigo-400">Verified deep work</span>
        </div>
      </div>

      {/* TASKS REQUIRING IMMEDIATE ATTENTION */}
      {urgentTasks.length > 0 && (
        <div className="glass-card rounded-3xl p-6 border-rose-500/30 bg-gradient-to-r from-rose-500/10 via-transparent to-transparent">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300 animate-pulse">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold font-display text-white">
                  Tasks Requiring Immediate Attention
                </h3>
                <p className="text-xs text-slate-400">
                  {urgentTasks.length} high-priority or overdue tasks require resolution to preserve your deadline telemetry.
                </p>
              </div>
            </div>

            <Link
              to="/planner"
              className="text-xs font-mono text-rose-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Engage Recovery Planner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {urgentTasks.map((t) => (
              <div
                key={t.id}
                className="p-3.5 rounded-2xl bg-slate-900/90 border border-rose-500/20 flex flex-col justify-between gap-3 group hover:border-rose-500/50 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                    <span className="text-rose-400 font-bold uppercase">{t.day} • {t.duration}</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                      {t.priority}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {t.title}
                  </h4>
                  <p className="text-[11px] text-purple-300 font-mono mt-1 truncate">{t.subject}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono">Due: {t.dueDate || 'Soon'}</span>
                  <button
                    onClick={() => toggleTaskCompleted(t.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all"
                  >
                    <CheckSquare className="w-3 h-3" />
                    <span>Done</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FEATURE D: ACADEMIC WORKLOAD HEATMAP */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-semibold mb-1">
              <Calendar className="w-4 h-4" />
              <span>Cognitive Load Matrix</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white">
              Academic Workload Heatmap (28-Day Telemetry)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Identifies overloaded days, task congestion density, and recommended redistribution days.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span>Low</span>
            <span className="w-3.5 h-3.5 rounded bg-slate-800 border border-white/5" />
            <span className="w-3.5 h-3.5 rounded bg-indigo-950 border border-indigo-700/50" />
            <span className="w-3.5 h-3.5 rounded bg-indigo-600" />
            <span className="w-3.5 h-3.5 rounded bg-cyan-400" />
            <span className="w-3.5 h-3.5 rounded bg-rose-500" />
            <span>Overloaded</span>
          </div>
        </div>

        {/* Heatmap Grid Matrix */}
        <div className="grid grid-cols-7 sm:grid-cols-14 lg:grid-cols-28 gap-2 pt-2">
          {workloadHeatmap.map((cell, idx) => {
            const isSelected = selectedHeatmapDay?.date === cell.date;
            const hasOverdue = cell.overdue > 0;
            const bgClass =
              hasOverdue
                ? 'bg-rose-500/80 hover:bg-rose-500 ring-rose-400'
                : cell.intensity === 4
                ? 'bg-cyan-500 hover:bg-cyan-400 ring-cyan-300'
                : cell.intensity === 3
                ? 'bg-indigo-600 hover:bg-indigo-500 ring-indigo-400'
                : cell.intensity === 2
                ? 'bg-indigo-900/80 hover:bg-indigo-800 ring-indigo-600'
                : 'bg-slate-800 hover:bg-slate-700 ring-slate-600';

            return (
              <button
                key={cell.date}
                onClick={() => setSelectedHeatmapDay(cell)}
                className={`h-11 rounded-xl flex flex-col items-center justify-center p-1 transition-all ${bgClass} ${
                  isSelected ? 'ring-2 ring-white scale-105 z-10' : ''
                }`}
                title={`${cell.date} (${cell.dayName}): ${cell.tasks} tasks, ${cell.hours}h`}
              >
                <span className="text-[9px] font-mono text-white/80 font-bold leading-tight">
                  {cell.date.split('-')[2]}
                </span>
                <span className="text-[8px] font-mono text-white/90 font-extrabold leading-tight">
                  {cell.hours}h
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Heatmap Day Details Bar */}
        {selectedHeatmapDay && (
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 font-mono font-bold">
                {selectedHeatmapDay.date} ({selectedHeatmapDay.dayName})
              </span>
              <span className="text-slate-300">
                Load: <strong className="text-white">{selectedHeatmapDay.hours} Hours</strong> • <strong className="text-cyan-400">{selectedHeatmapDay.tasks} Tasks Scheduled</strong>
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="text-emerald-400">Completed: {selectedHeatmapDay.completed}</span>
              <span className="text-slate-400">•</span>
              <span className="text-amber-400">Pending: {selectedHeatmapDay.tasks - selectedHeatmapDay.completed}</span>
              {selectedHeatmapDay.overdue > 0 && (
                <>
                  <span className="text-slate-400">•</span>
                  <span className="text-rose-400 font-bold">Overdue: {selectedHeatmapDay.overdue}</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* TODAY'S SCHEDULE & HOURLY PRODUCTIVITY PATTERNS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Today's Schedule List */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 border-indigo-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-semibold">
                  <Calendar className="w-4 h-4" />
                  <span>Daily Agenda</span>
                </div>
                <h3 className="text-lg font-bold font-display text-white mt-1">
                  Today's Study Schedule
                </h3>
              </div>
              <Link
                to="/planner"
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>Full Timetable</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex flex-col gap-2.5">
              {todayTasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                    task.completed
                      ? 'bg-emerald-500/10 border-emerald-500/20 opacity-70'
                      : 'bg-white/5 border-white/5 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="min-w-0">
                    <h4 className={`text-xs sm:text-sm font-semibold truncate ${task.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                      {task.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {task.subject} • {task.time}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleTaskCompleted(task.id)}
                    className="p-1 text-slate-400 hover:text-cyan-400 shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-500 hover:border-cyan-400" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Queue: <strong>{todayTasks.length} Sessions</strong></span>
            <Link
              to="/productivity"
              className="text-purple-300 hover:text-purple-200 font-bold flex items-center gap-1"
            >
              <span>Launch Focus Timer &rarr;</span>
            </Link>
          </div>
        </div>

        {/* FEATURE E: HOURLY PRODUCTIVITY PATTERN DETECTOR */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 border-indigo-500/20 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400 font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  <span>Pattern Detector</span>
                </div>
                <h3 className="text-lg font-bold font-display text-white mt-1">
                  Productivity Pattern (Hourly Focus Efficiency)
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold self-start sm:self-auto">
                Optimal Sprint: 10:00 & 16:00
              </span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyProductivity}>
                  <defs>
                    <linearGradient id="hourlyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
                  <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} unit="%" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#090e24', borderColor: '#6366f1', borderRadius: '0.75rem', color: '#fff' }}
                    itemStyle={{ color: '#c084fc' }}
                  />
                  <Area type="monotone" dataKey="productivity" stroke="#8b5cf6" strokeWidth={2.5} fillOpacity={1} fill="url(#hourlyGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-3 p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between text-xs font-mono text-slate-300">
            <span>Morning Peak: <strong className="text-cyan-300">09:00 - 11:30 (95% Efficiency)</strong></span>
            <span>Afternoon Peak: <strong className="text-purple-300">15:00 - 17:00 (92% Efficiency)</strong></span>
          </div>
        </div>

      </div>

      {/* 3D SPATIAL & AI ECOSYSTEM LAUNCH MATRIX */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Spatial 3D Learning & AI Hubs
            </span>
            <h3 className="text-xl font-bold font-display text-white mt-0.5">
              Interactive 3D Virtual Worlds & Digital Laboratories
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Spatial Laboratories Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* LOWER SECTION: UPCOMING DEADLINES & AUDIT FEED */}
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
