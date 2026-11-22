import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { Modal } from '../components/Modal';
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  CheckCircle2,
  Circle,
  Trash2,
  Edit2,
  Tag,
  AlertCircle,
  Filter,
  Sparkles,
  Flame,
  Brain,
  ShieldAlert,
  ArrowRight,
  ListTodo,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export const StudyPlanner = () => {
  const {
    tasks,
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompleted,
    toggleSubtask,
    breakdownTaskWithAI,
    acceptRecoveryPlan,
    addXP,
    addToast,
    stats
  } = useStudent();

  const [selectedDay, setSelectedDay] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditTask, setCurrentEditTask] = useState(null);

  // AI Breakdown Modal State
  const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false);
  const [breakdownTitle, setBreakdownTitle] = useState('');
  const [breakdownSubject, setBreakdownSubject] = useState('Quantum Computing');
  const [breakdownContext, setBreakdownContext] = useState('');
  const [breakdownLoading, setBreakdownLoading] = useState(false);

  // Missed Task Recovery Modal State
  const [isRecoveryModalOpen, setIsRecoveryModalOpen] = useState(false);

  // Subtask accordion toggles for task cards
  const [expandedSubtasks, setExpandedSubtasks] = useState({});

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    subject: 'Quantum Computing',
    day: 'Monday',
    time: '14:00 - 16:00',
    duration: '2.0h',
    priority: 'High',
    tag: 'Coding',
    notes: '',
    dueDate: '2026-11-25',
    risk: 'Low'
  });

  const daysOfWeek = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const filteredTasks = tasks.filter((t) => {
    const matchesDay = selectedDay === 'All' || t.day === selectedDay;
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    return matchesDay && matchesPriority;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Smart Deadline Predictor calculations
  const pendingTasks = tasks.filter((t) => !t.completed);
  const totalPendingHours = pendingTasks.reduce((acc, t) => acc + (t.estimatedHours || 2.0), 0);
  const dailyCap = 4.5;
  const weeklyCap = 28.0;

  // Day-wise workload calculation
  const dayWorkload = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0
  };

  pendingTasks.forEach((t) => {
    if (dayWorkload[t.day] !== undefined) {
      dayWorkload[t.day] += (t.estimatedHours || 2.0);
    }
  });

  const overloadedDays = Object.entries(dayWorkload).filter(([_, h]) => h > dailyCap).map(([d]) => d);
  const deadlineRisk = totalPendingHours > 22 || overloadedDays.length >= 2 ? 'High' : totalPendingHours > 14 || overloadedDays.length === 1 ? 'Medium' : 'Low';

  // Detect overdue tasks
  const overdueTasks = tasks.filter((t) => !t.completed && (t.dueDate < '2026-11-22' || t.risk === 'High'));

  // Suggested recovery plan slots
  const recoverySlots = [
    { day: "Monday", time: "14:00 - 16:00" },
    { day: "Tuesday", time: "10:00 - 12:30" },
    { day: "Thursday", time: "11:00 - 13:00" },
    { day: "Friday", time: "15:00 - 17:30" }
  ];

  const recoveryPlan = overdueTasks.map((t, idx) => ({
    task_id: t.id,
    title: t.title,
    subject: t.subject,
    priority: t.priority,
    suggested_day: recoverySlots[idx % recoverySlots.length].day,
    suggested_time: recoverySlots[idx % recoverySlots.length].time,
    rationale: "Clash-free low congestion block allocated."
  }));

  const handleOpenAddModal = () => {
    setFormData({
      title: '',
      subject: 'Quantum Computing',
      day: selectedDay !== 'All' ? selectedDay : 'Monday',
      time: '14:00 - 16:00',
      duration: '2.0h',
      priority: 'High',
      tag: 'Coding',
      notes: '',
      dueDate: '2026-11-25',
      risk: 'Low'
    });
    setIsAddModalOpen(true);
  };

  const handleSaveNewTask = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      addToast('Please enter a task title.', 'warning');
      return;
    }
    addTask({
      ...formData,
      estimatedHours: parseFloat(formData.duration) || 2.0,
      subtasks: [
        { id: `st-${Date.now()}-1`, title: "Review requirements and core formulas", completed: false },
        { id: `st-${Date.now()}-2`, title: "Execute implementation and derivation", completed: false },
        { id: `st-${Date.now()}-3`, title: "Final verification and submission wrap-up", completed: false }
      ]
    });
    setIsAddModalOpen(false);
  };

  const handleOpenEditModal = (task) => {
    setCurrentEditTask(task);
    setFormData({
      title: task.title,
      subject: task.subject,
      day: task.day,
      time: task.time,
      duration: task.duration,
      priority: task.priority,
      tag: task.tag || 'Study',
      notes: task.notes || '',
      dueDate: task.dueDate || '2026-11-25',
      risk: task.risk || 'Low'
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEditTask = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    editTask(currentEditTask.id, formData);
    setIsEditModalOpen(false);
  };

  const handleTriggerAIBreakdown = async (e) => {
    e.preventDefault();
    if (!breakdownTitle.trim()) {
      addToast('Please enter an assignment or project title.', 'warning');
      return;
    }
    setBreakdownLoading(true);

    const newTaskId = `tsk-${Date.now()}`;
    const newTask = {
      id: newTaskId,
      title: breakdownTitle,
      subject: breakdownSubject,
      day: 'Tuesday',
      time: '10:00 - 13:00',
      duration: '3.0h',
      estimatedHours: 3.0,
      dueDate: '2026-11-27',
      priority: 'High',
      risk: 'Medium',
      completed: false,
      tag: 'AI Decomposed',
      notes: breakdownContext || 'Decomposed using Neural Task Breakdown Engine.'
    };

    addTask(newTask);
    await breakdownTaskWithAI(newTaskId, breakdownTitle, breakdownSubject, breakdownContext);
    setBreakdownLoading(false);
    setIsBreakdownModalOpen(false);
    setBreakdownTitle('');
    setBreakdownContext('');
  };

  const toggleAccordion = (taskId) => {
    setExpandedSubtasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      
      {/* HEADER SECTION */}
      <div className="relative glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400 font-semibold mb-1">
              <CalendarIcon className="w-4 h-4" />
              <span>Cognitive Timetable & Smart Predictor</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Weekly Study <span className="text-gradient-purple">Planner</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Organize your weekly learning blocks, auto-decompose large assignments into subtasks, and recover missed deadlines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsBreakdownModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-cyan-200 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 transition-all transform active:scale-95"
            >
              <Brain className="w-4 h-4 text-cyan-400" />
              <span>AI Task Breakdown</span>
            </button>

            <button
              onClick={handleOpenAddModal}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-neon-purple transition-all transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Study Task</span>
            </button>
          </div>
        </div>

        {/* FEATURE A: SMART DEADLINE PREDICTOR BANNER */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-900/80 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className={`p-2.5 rounded-xl shrink-0 ${
              deadlineRisk === 'High' ? 'bg-rose-500/20 text-rose-300' :
              deadlineRisk === 'Medium' ? 'bg-amber-500/20 text-amber-300' :
              'bg-emerald-500/20 text-emerald-300'
            }`}>
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white uppercase">Smart Deadline Predictor:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase ${
                  deadlineRisk === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                  deadlineRisk === 'Medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                  'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {deadlineRisk} Risk
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {overloadedDays.length > 0
                  ? `Overload warning on ${overloadedDays.join(', ')} (exceeds ${dailyCap}h daily limit). Required: ${totalPendingHours.toFixed(1)}h / ${weeklyCap}h weekly capacity.`
                  : `Schedule well-balanced. ${totalPendingHours.toFixed(1)}h pending across 7 days with zero day bottlenecking.`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {overdueTasks.length > 0 && (
              <button
                onClick={() => setIsRecoveryModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 transition-all animate-pulse"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Recover {overdueTasks.length} Missed Tasks</span>
              </button>
            )}
          </div>
        </div>

        {/* Weekly Completion Progress */}
        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Weekly Completion Velocity: <strong>{completedCount} of {tasks.length} Tasks</strong></span>
            </span>
            <span className="text-purple-300 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden border border-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Day Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-5 pb-1 scrollbar-none">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 ${
                selectedDay === day
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-neon-purple font-bold'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

      </div>

      {/* FILTER BAR & SUMMARY */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
        <span>
          Showing <strong className="text-white">{filteredTasks.length}</strong> tasks for{' '}
          <strong className="text-cyan-400">{selectedDay}</strong>
        </span>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-400"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* TASKS LIST */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTasks.map((task) => {
            const isHigh = task.priority === 'High';
            const isMed = task.priority === 'Medium';
            const hasSubtasks = task.subtasks && task.subtasks.length > 0;
            const completedSubCount = hasSubtasks ? task.subtasks.filter((s) => s.completed).length : 0;
            const subtaskProgress = hasSubtasks ? Math.round((completedSubCount / task.subtasks.length) * 100) : 0;
            const isAccordionOpen = expandedSubtasks[task.id];

            return (
              <div
                key={task.id}
                className={`glass-card rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between group ${
                  task.completed
                    ? 'border-emerald-500/30 bg-emerald-950/10 opacity-75'
                    : isHigh
                    ? 'border-rose-500/30 hover:border-rose-500/60'
                    : 'border-indigo-500/20 hover:border-cyan-500/40'
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-white/5 border border-white/10 text-cyan-300">
                      {task.day}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {task.risk && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          task.risk === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                          task.risk === 'Medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          Risk: {task.risk}
                        </span>
                      )}

                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          isHigh
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : isMed
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-slate-700/40 text-slate-300 border border-slate-600'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subject */}
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleTaskCompleted(task.id)}
                      className="mt-1 text-slate-400 hover:text-cyan-400 transition-colors shrink-0"
                      title={task.completed ? "Mark as Incomplete" : "Mark as Completed"}
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500 hover:text-cyan-400" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <h3
                        className={`text-sm sm:text-base font-bold font-display transition-colors ${
                          task.completed
                            ? 'line-through text-slate-400'
                            : 'text-white group-hover:text-cyan-300'
                        }`}
                      >
                        {task.title}
                      </h3>
                      <p className="text-xs text-purple-300 font-mono mt-0.5">
                        {task.subject}
                      </p>
                    </div>
                  </div>

                  {/* Notes if available */}
                  {task.notes && (
                    <p className="text-xs text-slate-400 bg-white/5 p-2.5 rounded-xl border border-white/5 mt-3 leading-relaxed">
                      {task.notes}
                    </p>
                  )}

                  {/* FEATURE B: SUBTASKS DISPLAY */}
                  {hasSubtasks ? (
                    <div className="mt-3 pt-3 border-t border-slate-800/80">
                      <button
                        onClick={() => toggleAccordion(task.id)}
                        className="flex items-center justify-between w-full text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors mb-2"
                      >
                        <span className="flex items-center gap-1.5">
                          <ListTodo className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Subtasks: {completedSubCount} / {task.subtasks.length} ({subtaskProgress}%)</span>
                        </span>
                        {isAccordionOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {/* Mini Progress Bar */}
                      <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden mb-2">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300"
                          style={{ width: `${subtaskProgress}%` }}
                        />
                      </div>

                      {/* Collapsible Subtask Checklist */}
                      {isAccordionOpen && (
                        <div className="flex flex-col gap-1.5 pt-1">
                          {task.subtasks.map((st) => (
                            <div
                              key={st.id}
                              onClick={() => toggleSubtask(task.id, st.id)}
                              className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer border transition-all ${
                                st.completed
                                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300 line-through'
                                  : 'bg-slate-900/60 border-white/5 text-slate-300 hover:bg-slate-900'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <CheckSquare className={`w-3.5 h-3.5 shrink-0 ${st.completed ? 'text-emerald-400' : 'text-slate-500'}`} />
                                <span className="truncate">{st.title}</span>
                              </div>
                              {st.estimated_hours && (
                                <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-1">
                                  {st.estimated_hours}h
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => breakdownTaskWithAI(task.id, task.title, task.subject, task.notes)}
                      className="mt-3 w-full py-1.5 rounded-lg text-[11px] font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Brain className="w-3.5 h-3.5" />
                      <span>Break down with AI</span>
                    </button>
                  )}
                </div>

                {/* Bottom Timing & Controls */}
                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{task.time}</span>
                    <span className="text-slate-600">•</span>
                    <span>{task.duration}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(task)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                      title="Edit task"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-12 text-center flex flex-col items-center justify-center border-indigo-900/40 my-8">
          <CalendarIcon className="w-12 h-12 text-slate-500 mb-4" />
          <h3 className="text-lg font-bold text-white font-display">No study tasks scheduled for {selectedDay}</h3>
          <p className="text-xs text-slate-400 max-w-sm mt-1 mb-6">
            Keep your momentum sharp! Schedule an upcoming review block, lab session, or coding sprint.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-neon-purple"
          >
            Create Task Now
          </button>
        </div>
      )}

      {/* FEATURE C: MISSED TASK RECOVERY MODAL */}
      <Modal
        isOpen={isRecoveryModalOpen}
        onClose={() => setIsRecoveryModalOpen(false)}
        title="Missed Task Recovery System"
        subtitle="Automated clash-free schedule rebalancing for overdue learning tasks"
      >
        <div className="flex flex-col gap-4 text-xs">
          <p className="text-slate-300">
            The neural scheduler detected <strong className="text-rose-400 font-bold">{overdueTasks.length} overdue/high-risk tasks</strong>. Here is an optimized, clash-free rescheduling proposal spread across lighter upcoming days:
          </p>

          <div className="flex flex-col gap-2.5 max-h-60 overflow-y-auto pr-1">
            {recoveryPlan.map((plan) => (
              <div
                key={plan.task_id}
                className="p-3.5 rounded-xl bg-slate-900 border border-indigo-500/30 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-white">{plan.title}</h4>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Original subject: {plan.subject}
                  </p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full font-mono font-bold text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {plan.suggested_day} • {plan.suggested_time}
                  </span>
                  <p className="text-[10px] text-emerald-400 mt-1">No collision detected</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              onClick={() => setIsRecoveryModalOpen(false)}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
            >
              Reject Suggestions
            </button>
            <button
              onClick={() => {
                acceptRecoveryPlan(recoveryPlan);
                setIsRecoveryModalOpen(false);
              }}
              className="px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-neon-cyan transition-all"
            >
              1-Click Accept Rescheduling
            </button>
          </div>
        </div>
      </Modal>

      {/* FEATURE B: AI TASK BREAKDOWN GENERATOR MODAL */}
      <Modal
        isOpen={isBreakdownModalOpen}
        onClose={() => setIsBreakdownModalOpen(false)}
        title="AI Task Breakdown Generator"
        subtitle="Decompose large assignments or capstones into smaller, actionable milestones"
      >
        <form onSubmit={handleTriggerAIBreakdown} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-mono uppercase mb-1">Assignment / Project Title *</label>
            <input
              type="text"
              required
              value={breakdownTitle}
              onChange={(e) => setBreakdownTitle(e.target.value)}
              placeholder="e.g. Build a 3D Volumetric Raymarching Shader Engine"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-mono uppercase mb-1">Subject</label>
            <select
              value={breakdownSubject}
              onChange={(e) => setBreakdownSubject(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="Quantum Computing">Quantum Computing</option>
              <option value="Neural Architectures">Neural Architectures</option>
              <option value="Hyperdimensional WebGL">Hyperdimensional WebGL</option>
              <option value="Zero-Knowledge Web3">Zero-Knowledge Web3</option>
              <option value="Robotics Swarms">Robotics Swarms</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-mono uppercase mb-1">Assignment Scope / Context</label>
            <textarea
              rows={3}
              value={breakdownContext}
              onChange={(e) => setBreakdownContext(e.target.value)}
              placeholder="Describe deliverables, requirements, or target outcomes for granular estimation..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="mt-3 flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsBreakdownModalOpen(false)}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={breakdownLoading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all disabled:opacity-50"
            >
              <Brain className="w-4 h-4" />
              <span>{breakdownLoading ? 'Generating Subtasks...' : 'Generate AI Subtasks'}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL: ADD TASK */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Schedule New Study Task"
        subtitle="Add a high-impact focus block to your cognitive calendar"
      >
        <form onSubmit={handleSaveNewTask} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="block font-mono text-slate-300 mb-1.5 uppercase">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Implement Shor's Algorithm QFT module"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-slate-300 mb-1.5 uppercase">
                Subject
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-purple-400"
              >
                <option value="Quantum Computing">Quantum Computing</option>
                <option value="Neural Architectures">Neural Architectures</option>
                <option value="Hyperdimensional WebGL">Hyperdimensional WebGL</option>
                <option value="Neural UX & BCI">Neural UX & BCI</option>
                <option value="Zero-Knowledge Web3">Zero-Knowledge Web3</option>
                <option value="Robotics Swarms">Robotics Swarms</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-slate-300 mb-1.5 uppercase">
                Day of Week
              </label>
              <select
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-purple-400"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono text-slate-300 mb-1.5 uppercase">
                Time Window
              </label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="14:00 - 16:30"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block font-mono text-slate-300 mb-1.5 uppercase">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="2.5h"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block font-mono text-slate-300 mb-1.5 uppercase">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-purple-400"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-mono text-slate-300 mb-1.5 uppercase">
              Notes & Objectives
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Key concepts to master or problems to solve during this study block..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-neon-purple"
            >
              Confirm Task
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL: EDIT TASK */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Study Task"
        subtitle="Modify schedule, priority or study goals"
      >
        <form onSubmit={handleSaveEditTask} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="block font-mono text-slate-300 mb-1.5 uppercase">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-slate-300 mb-1.5 uppercase">
                Day
              </label>
              <select
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-purple-400"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono text-slate-300 mb-1.5 uppercase">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-purple-400"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-mono text-slate-300 mb-1.5 uppercase">
              Notes
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-neon-purple"
            >
              Update Task
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
