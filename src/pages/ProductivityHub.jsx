import React, { useState, useEffect } from 'react';
import { useStudent } from '../context/StudentContext';
import { Modal } from '../components/Modal';
import {
  Brain,
  Zap,
  Target,
  Repeat,
  Users,
  ShieldAlert,
  Flame,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Bell,
  Eye,
  EyeOff,
  Plus,
  Send,
  Sliders,
  BookOpen
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

export const ProductivityHub = () => {
  const {
    tasks,
    exams,
    revisions,
    partners,
    distractions,
    emergencyPlan,
    hourlyProductivity,
    workloadHeatmap,
    stats,
    addExam,
    toggleExamTopic,
    reviewSpacedTopic,
    addRevisionTopic,
    nudgePartner,
    togglePartnerPrivacy,
    toggleSharedGoal,
    logDistraction,
    generateEmergencyPlan,
    acceptRecoveryPlan,
    addToast,
    addXP
  } = useStudent();

  const [activeTab, setActiveTab] = useState('readiness'); // 'readiness', 'spaced', 'focus', 'partners', 'emergency'

  // Focus Timer State
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerMode, setTimerMode] = useState('focus'); // 'focus' (25m), 'shortBreak' (5m), 'deepSprint' (50m)
  const [distractionModalOpen, setDistractionModalOpen] = useState(false);
  const [customDistraction, setCustomDistraction] = useState('');

  // Add Exam Modal State
  const [isAddExamOpen, setIsAddExamOpen] = useState(false);
  const [examForm, setExamForm] = useState({
    title: '',
    subject: 'Quantum Computing',
    date: '2026-12-01',
    time: '10:00 - 13:00',
    venue: 'Hall 3'
  });

  // Add Spaced Topic Modal State
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const [topicForm, setTopicForm] = useState({
    topic: '',
    subject: 'Quantum Computing',
    keySummary: ''
  });

  // Emergency Mode Form
  const [selectedEmergencyExam, setSelectedEmergencyExam] = useState(exams[0]?.id || '');
  const [emergencyTargetHours, setEmergencyTargetHours] = useState('6.0');
  const [emergencyLoading, setEmergencyLoading] = useState(false);

  // Focus Timer interval
  useEffect(() => {
    let interval = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      addToast('Focus block completed! Great work on maintaining deep attention.', 'success', 'Sprint Finished');
      addXP(50);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const handleStartTimer = () => setTimerRunning(true);
  const handlePauseTimer = () => setTimerRunning(false);
  const handleResetTimer = (minutes) => {
    setTimerRunning(false);
    setTimerSeconds(minutes * 60);
  };

  const handleLogCustomDistraction = (e) => {
    e.preventDefault();
    if (!customDistraction.trim()) return;
    logDistraction(customDistraction.trim());
    setCustomDistraction('');
    setDistractionModalOpen(false);
  };

  const handleCreateExam = (e) => {
    e.preventDefault();
    if (!examForm.title.trim()) {
      addToast('Please enter exam title', 'warning');
      return;
    }
    addExam({
      title: examForm.title,
      subject: examForm.subject,
      date: examForm.date,
      time: examForm.time,
      venue: examForm.venue,
      urgency: 'Medium',
      daysLeft: 7,
      topics: [
        { id: `top-${Date.now()}-1`, name: "Core Principles & Definitions", weight: "30%", completed: false, mastery: 40 },
        { id: `top-${Date.now()}-2`, name: "Problem Solving & Analytical Proofs", weight: "40%", completed: false, mastery: 35 },
        { id: `top-${Date.now()}-3`, name: "Past Examination Question Patterns", weight: "30%", completed: false, mastery: 30 }
      ]
    });
    setExamForm({ title: '', subject: 'Quantum Computing', date: '2026-12-01', time: '10:00 - 13:00', venue: 'Hall 3' });
    setIsAddExamOpen(false);
  };

  const handleCreateTopic = (e) => {
    e.preventDefault();
    if (!topicForm.topic.trim()) {
      addToast('Please enter revision topic name', 'warning');
      return;
    }
    addRevisionTopic({
      topic: topicForm.topic,
      subject: topicForm.subject,
      keySummary: topicForm.keySummary || 'Key formula or concept to remember.'
    });
    setTopicForm({ topic: '', subject: 'Quantum Computing', keySummary: '' });
    setIsAddTopicOpen(false);
  };

  const handleTriggerEmergency = async () => {
    const exm = exams.find((e) => e.id === selectedEmergencyExam) || exams[0];
    if (!exm) return;
    setEmergencyLoading(true);
    const weakList = exm.topics.filter((t) => !t.completed).map((t) => t.name);
    await generateEmergencyPlan(
      exm.title,
      exm.subject,
      parseFloat(emergencyTargetHours) || 6.0,
      weakList.length ? weakList : ['Primary Theorem Derivations', 'High-Frequency Exam Traps']
    );
    setEmergencyLoading(false);
    setActiveTab('emergency');
  };

  // Timer format display
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const timerDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Smart deadline risk calculation
  const pendingTasks = tasks.filter((t) => !t.completed);
  const totalPendingHours = pendingTasks.reduce((acc, cur) => acc + (cur.estimatedHours || 2.0), 0);
  const weeklyBandwidth = 28.0;
  const deadlineRiskLevel = totalPendingHours > 24 ? 'High' : totalPendingHours > 16 ? 'Medium' : 'Low';

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      
      {/* HEADER SECTION */}
      <div className="relative glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-600/15 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" />
                <span>Next-Gen Academic Engine</span>
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase ${
                deadlineRiskLevel === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                deadlineRiskLevel === 'Medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                Schedule Risk: {deadlineRiskLevel}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Cognitive <span className="text-gradient-purple">Productivity Suite</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Intelligent deadline telemetry, spaced repetition memory retention, live distraction auditing, and accountability synchronization.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-3 rounded-2xl glass-card border-indigo-500/20 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase text-slate-400">Exam Readiness</p>
                <p className="text-lg font-bold text-white font-display">{stats.averageExamReadiness}%</p>
              </div>
            </div>

            <div className="px-4 py-3 rounded-2xl glass-card border-indigo-500/20 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
                <Repeat className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase text-slate-400">Revisions Due</p>
                <p className="text-lg font-bold text-cyan-300 font-display">{stats.spacedTopicsDueCount} Topics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Navigation */}
        <div className="mt-8 pt-5 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'readiness', label: 'Exam Readiness Score', icon: Target },
            { id: 'spaced', label: 'Revision Memory (Spaced)', icon: Repeat, badge: stats.spacedTopicsDueCount },
            { id: 'focus', label: 'Focus & Distraction Tracker', icon: Clock },
            { id: 'partners', label: 'Accountability Partners', icon: Users, badge: partners.filter(p => p.activeNow).length },
            { id: 'emergency', label: 'Emergency Study Mode', icon: ShieldAlert, highlight: true }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? tab.highlight
                      ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-neon-rose'
                      : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-neon-purple'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white text-purple-900' : 'bg-cyan-500/20 text-cyan-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: EXAM READINESS SCORE                              */}
      {/* ======================================================== */}
      {activeTab === 'readiness' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                <span>Subject-Wise Examination Readiness</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Dynamic preparation scores evaluated in real-time from topic mastery and completed practice tasks.
              </p>
            </div>
            <button
              onClick={() => setIsAddExamOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-neon-purple transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Register Upcoming Exam</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="glass-card rounded-2xl p-5 border-indigo-500/20 flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/40 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                        {exam.subject}
                      </span>
                      <h3 className="text-base font-bold text-white mt-0.5">{exam.title}</h3>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase shrink-0 ${
                      exam.urgency === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      exam.urgency === 'Medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {exam.daysLeft}d left
                    </span>
                  </div>

                  {/* Readiness Progress Bar */}
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 mb-4">
                    <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                      <span className="text-slate-400">Readiness Score</span>
                      <span className="font-bold text-purple-300">{exam.readinessScore}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${exam.readinessScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Topic Checklist */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                      Key Topics ({exam.topics.filter(t => t.completed).length}/{exam.topics.length} Mastered)
                    </p>
                    <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
                      {exam.topics.map((top) => (
                        <div
                          key={top.id}
                          onClick={() => toggleExamTopic(exam.id, top.id)}
                          className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer border transition-all ${
                            top.completed
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                              : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <CheckCircle2 className={`w-4 h-4 shrink-0 ${top.completed ? 'text-emerald-400' : 'text-slate-500'}`} />
                            <span className={`truncate ${top.completed ? 'line-through text-slate-400' : ''}`}>
                              {top.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">{top.weight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Exam Footer Actions */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exam.date} • {exam.time}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedEmergencyExam(exam.id);
                      handleTriggerEmergency();
                    }}
                    className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Cram Mode</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: REVISION MEMORY SYSTEM (SPACED REPETITION)         */}
      {/* ======================================================== */}
      {activeTab === 'spaced' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Repeat className="w-5 h-5 text-cyan-400" />
                <span>Spaced Revision Memory System</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Combat the Ebbinghaus forgetting curve with algorithmic revision intervals: 1d &rarr; 3d &rarr; 7d &rarr; 14d &rarr; 30d permanent retention.
              </p>
            </div>
            <button
              onClick={() => setIsAddTopicOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Queue New Topic</span>
            </button>
          </div>

          {/* Topics Due Today Banner */}
          {stats.spacedTopicsDueCount > 0 ? (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-500/10 to-transparent border border-amber-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {stats.spacedTopicsDueCount} Topics Scheduled for Spaced Review Today
                  </h4>
                  <p className="text-xs text-slate-300">
                    Reviewing these today will solidify neural pathways and boost permanent concept retention to ~95%.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs font-mono">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>All queued revision topics reviewed! Your memory retention curve is optimized for today.</span>
            </div>
          )}

          {/* Revisions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {revisions.map((rev) => (
              <div
                key={rev.id}
                className={`glass-card rounded-2xl p-5 border transition-all ${
                  rev.dueToday
                    ? 'border-amber-500/40 bg-gradient-to-br from-amber-500/5 to-transparent'
                    : 'border-indigo-500/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                      {rev.subject}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">{rev.topic}</h3>
                  </div>
                  {rev.dueToday ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                      Due Today
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10">
                      Next: {rev.nextReviewDate}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-white/5 mb-3 font-mono">
                  {rev.keySummary}
                </p>

                <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>Interval: <strong className="text-purple-300">{rev.intervalName}</strong></span>
                    <span>•</span>
                    <span>Mastery: <strong className="text-cyan-300">{rev.mastery}%</strong></span>
                  </div>

                  <button
                    onClick={() => reviewSpacedTopic(rev.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all transform active:scale-95"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{rev.dueToday ? 'Review & Mark Done' : 'Extra Drill'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: FOCUS TIMER & DISTRACTION TRACKER                 */}
      {/* ======================================================== */}
      {activeTab === 'focus' && (
        <div className="flex flex-col gap-8">
          
          {/* Top Focus Timer & Distraction Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Live Focus Clock */}
            <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider mb-2">
                Neural Focus Telemetry
              </span>

              {/* Timer Dial Display */}
              <div className="my-6 relative flex items-center justify-center">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-indigo-900/40 flex items-center justify-center relative">
                  <div className="absolute inset-2 rounded-full border border-cyan-500/20" />
                  <div className="text-4xl sm:text-5xl font-mono font-extrabold text-white tracking-widest">
                    {timerDisplay}
                  </div>
                </div>
              </div>

              {/* Mode Selection */}
              <div className="flex items-center gap-2 mb-6">
                {[
                  { id: 'focus', label: '25m Sprint', mins: 25 },
                  { id: 'deepSprint', label: '50m Deep Block', mins: 50 },
                  { id: 'shortBreak', label: '5m Recovery', mins: 5 }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setTimerMode(m.id);
                      handleResetTimer(m.mins);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      timerMode === m.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                        : 'text-slate-400 hover:text-white bg-white/5'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                {timerRunning ? (
                  <button
                    onClick={handlePauseTimer}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-amber-500 hover:bg-amber-400 transition-all transform active:scale-95"
                  >
                    <Pause className="w-4 h-4" />
                    <span>Pause Sprint</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStartTimer}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all transform active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Start Focus Session</span>
                  </button>
                )}

                <button
                  onClick={() => handleResetTimer(timerMode === 'deepSprint' ? 50 : timerMode === 'shortBreak' ? 5 : 25)}
                  className="p-2.5 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setDistractionModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-300 hover:text-white bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 transition-all"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Log Distraction</span>
                </button>
              </div>
            </div>

            {/* Distraction Insights */}
            <div className="lg:col-span-7 glass-card rounded-3xl p-6 border-indigo-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-400" />
                      <span>Distraction Pattern Audit</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Track cognitive friction points and apply targeted psychological mitigation.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {distractions.map((dis) => (
                    <div
                      key={dis.id}
                      className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col gap-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">{dis.reason}</span>
                        <span className="font-mono text-rose-400 font-bold">
                          {dis.occurrences} logs (~{dis.avgMinutesLost * dis.occurrences}m lost)
                        </span>
                      </div>
                      <p className="text-[11px] text-cyan-300/90 font-mono flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span>Remedy: {dis.tip}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Focus Reliability Index: <strong className="text-emerald-400">88.4%</strong></span>
                <span>Average Focus Span: <strong className="text-purple-300">46 minutes</strong></span>
              </div>
            </div>
          </div>

          {/* Hourly Productivity Curve */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <span>Productivity Pattern Detector (Hourly Efficiency)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Calculated from focus sprint completion rates. Identifies your biological peak performance windows.
                </p>
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Peak Hours: 10:00 & 16:00
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyProductivity}>
                  <defs>
                    <linearGradient id="prodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} unit="%" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#090d1f', borderColor: '#4f46e5', borderRadius: 12 }}
                    itemStyle={{ color: '#c084fc' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="productivity"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#prodGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: ACCOUNTABILITY PARTNER                            */}
      {/* ======================================================== */}
      {activeTab === 'partners' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                <span>Accountability Partner Network</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Mutual progress synchronization, shared study milestones, peer motivation nudges, and granular privacy controls.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="glass-card rounded-2xl p-6 border-indigo-500/20 flex flex-col justify-between hover:border-indigo-500/40 transition-all"
              >
                <div>
                  {/* Partner Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={partner.avatar}
                          alt={partner.name}
                          className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/30"
                        />
                        {partner.activeNow && (
                          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-[#0a0f24]" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{partner.name}</h4>
                        <p className="text-[11px] font-mono text-cyan-400">{partner.major}</p>
                        <p className="text-[10px] text-slate-400">{partner.handle}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        partner.activeNow ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {partner.status}
                      </span>
                      <p className="text-[11px] font-mono text-purple-300 mt-1">
                        🔥 {partner.streak}d streak
                      </p>
                    </div>
                  </div>

                  {/* Shared Goals */}
                  <div className="flex flex-col gap-2.5 mb-4">
                    <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                      Shared Academic Milestones
                    </span>
                    {partner.sharedGoals.map((goal) => (
                      <div
                        key={goal.id}
                        onClick={() => toggleSharedGoal(partner.id, goal.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          goal.completed
                            ? 'bg-emerald-500/10 border-emerald-500/30'
                            : 'bg-slate-900/60 border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className={`w-4 h-4 ${goal.completed ? 'text-emerald-400' : 'text-slate-500'}`} />
                            <span className={`font-semibold ${goal.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                              {goal.title}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-purple-300">Target: {goal.target}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span>You: {goal.currentAlex}</span>
                          <span>{partner.name.split(' ')[0]}: {goal.currentPartner}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Privacy Controls */}
                  <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5 flex items-center justify-between text-xs mb-4">
                    <span className="text-slate-400">Privacy Sync</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePartnerPrivacy(partner.id, 'privacyShareHours')}
                        className={`px-2 py-1 rounded text-[10px] font-mono flex items-center gap-1 ${
                          partner.privacyShareHours ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {partner.privacyShareHours ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>Hours</span>
                      </button>
                      <button
                        onClick={() => togglePartnerPrivacy(partner.id, 'privacyShareStreak')}
                        className={`px-2 py-1 rounded text-[10px] font-mono flex items-center gap-1 ${
                          partner.privacyShareStreak ? 'bg-purple-500/20 text-purple-300' : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {partner.privacyShareStreak ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>Streak</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    Weekly Focus: <strong className="text-white">{partner.studyHoursThisWeek}h</strong>
                  </span>
                  <button
                    onClick={() => nudgePartner(partner.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-neon-purple transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Study Nudge</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: EMERGENCY STUDY MODE                              */}
      {/* ======================================================== */}
      {activeTab === 'emergency' && (
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-600/20 via-amber-600/10 to-transparent border border-rose-500/40 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500 text-white animate-pulse">
                    CRISIS PROTOCOL
                  </span>
                  <span className="text-xs font-mono text-amber-300 uppercase tracking-wider font-semibold">
                    Rapid Cram Synthesis Engine
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                  Emergency Study Mode
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
                  Exam in 24 to 72 hours? This engine filters out low-yield theory and builds an aggressive high-impact problem-solving schedule.
                </p>
              </div>

              {/* Generation Form */}
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={selectedEmergencyExam}
                  onChange={(e) => setSelectedEmergencyExam(e.target.value)}
                  className="px-3 py-2 rounded-xl text-xs bg-slate-900 border border-rose-500/30 text-white focus:outline-none focus:border-rose-400"
                >
                  {exams.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.title} ({ex.daysLeft}d left)
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleTriggerEmergency}
                  disabled={emergencyLoading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 shadow-neon-rose transition-all disabled:opacity-50"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>{emergencyLoading ? 'Synthesizing Plan...' : 'Generate Cram Timetable'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Emergency Schedule Display */}
          {emergencyPlan ? (
            <div className="glass-card rounded-3xl p-6 sm:p-8 border-rose-500/30 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    High-Yield Sprint: {emergencyPlan.exam_title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {emergencyPlan.guidance}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  {emergencyPlan.target_hours}h SPRINT
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {emergencyPlan.schedule.map((block) => (
                  <div
                    key={block.block}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-rose-500/20 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-rose-400 font-bold">Block 0{block.block}</span>
                        <span className="text-slate-400">{block.time}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1.5">{block.activity}</h4>
                      <div className="flex items-center gap-2 text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300">{block.type}</span>
                        <span className={`px-2 py-0.5 rounded font-bold ${
                          block.intensity === 'Extreme' ? 'bg-rose-500/20 text-rose-300' :
                          block.intensity === 'High' ? 'bg-amber-500/20 text-amber-300' :
                          'bg-cyan-500/20 text-cyan-300'
                        }`}>
                          {block.intensity} Intensity
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 font-mono text-xs glass-card rounded-2xl border-white/5">
              Select an exam and click "Generate Cram Timetable" to synthesize an intensive emergency study schedule.
            </div>
          )}
        </div>
      )}

      {/* MODAL: REGISTER EXAM */}
      <Modal
        isOpen={isAddExamOpen}
        onClose={() => setIsAddExamOpen(false)}
        title="Register Upcoming Examination"
      >
        <form onSubmit={handleCreateExam} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-mono uppercase mb-1">Exam Title</label>
            <input
              type="text"
              value={examForm.title}
              onChange={(e) => setExamForm({ ...examForm, title: e.target.value })}
              placeholder="e.g. Quantum Computing Midterm"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-mono uppercase mb-1">Subject</label>
              <select
                value={examForm.subject}
                onChange={(e) => setExamForm({ ...examForm, subject: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Quantum Computing">Quantum Computing</option>
                <option value="Neural Architectures">Neural Architectures</option>
                <option value="Hyperdimensional WebGL">Hyperdimensional WebGL</option>
                <option value="Zero-Knowledge Cryptography">Zero-Knowledge Cryptography</option>
                <option value="Robotics & Swarms">Robotics & Swarms</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-mono uppercase mb-1">Exam Date</label>
              <input
                type="date"
                value={examForm.date}
                onChange={(e) => setExamForm({ ...examForm, date: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-mono uppercase mb-1">Time Slot</label>
              <input
                type="text"
                value={examForm.time}
                onChange={(e) => setExamForm({ ...examForm, time: e.target.value })}
                placeholder="10:00 - 13:00"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-mono uppercase mb-1">Venue / Mode</label>
              <input
                type="text"
                value={examForm.venue}
                onChange={(e) => setExamForm({ ...examForm, venue: e.target.value })}
                placeholder="Hall 3 / Proctored"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddExamOpen(false)}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-neon-purple transition-all"
            >
              Save Exam Record
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL: QUEUE SPACED TOPIC */}
      <Modal
        isOpen={isAddTopicOpen}
        onClose={() => setIsAddTopicOpen(false)}
        title="Queue Spaced Revision Topic"
      >
        <form onSubmit={handleCreateTopic} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-mono uppercase mb-1">Topic Name</label>
            <input
              type="text"
              value={topicForm.topic}
              onChange={(e) => setTopicForm({ ...topicForm, topic: e.target.value })}
              placeholder="e.g. Shor's Quantum Factoring Proof"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 font-mono uppercase mb-1">Subject</label>
            <select
              value={topicForm.subject}
              onChange={(e) => setTopicForm({ ...topicForm, subject: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="Quantum Computing">Quantum Computing</option>
              <option value="Neural Architectures">Neural Architectures</option>
              <option value="Hyperdimensional WebGL">Hyperdimensional WebGL</option>
              <option value="Zero-Knowledge Cryptography">Zero-Knowledge Cryptography</option>
              <option value="Robotics & Swarms">Robotics & Swarms</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-mono uppercase mb-1">Key Formula or Summary</label>
            <textarea
              value={topicForm.keySummary}
              onChange={(e) => setTopicForm({ ...topicForm, keySummary: e.target.value })}
              placeholder="Key mathematical formula, theorem, or mental model to prompt recall..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 h-20"
            />
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddTopicOpen(false)}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all"
            >
              Queue for 1d Review
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL: LOG DISTRACTION */}
      <Modal
        isOpen={distractionModalOpen}
        onClose={() => setDistractionModalOpen(false)}
        title="Log Focus Distraction"
      >
        <form onSubmit={handleLogCustomDistraction} className="flex flex-col gap-4 text-xs">
          <p className="text-slate-300">
            Select or enter what interrupted your focus sprint to calibrate your cognitive pattern audit:
          </p>

          <div className="grid grid-cols-1 gap-2">
            {[
              "Smartphone Notifications & Messages",
              "Social Media & Feeds",
              "Cognitive Fatigue & Mind Wandering",
              "Irrelevant Browsing / YouTube",
              "Ambient Room Noise"
            ].map((reason) => (
              <button
                key={reason}
                type="button"
                onClick={() => {
                  logDistraction(reason);
                  setDistractionModalOpen(false);
                }}
                className="text-left px-3 py-2.5 rounded-xl bg-slate-900/80 hover:bg-white/10 border border-white/5 text-slate-200 transition-all"
              >
                {reason}
              </button>
            ))}
          </div>

          <div className="mt-2">
            <label className="block text-slate-400 font-mono uppercase mb-1">Custom Distraction Reason</label>
            <input
              type="text"
              value={customDistraction}
              onChange={(e) => setCustomDistraction(e.target.value)}
              placeholder="e.g. Roommate conversation, snack break..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="mt-3 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setDistractionModalOpen(false)}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-400 transition-all"
            >
              Record Interruption
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
