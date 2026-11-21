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
  Flame
} from 'lucide-react';

export const StudyPlanner = () => {
  const { tasks, addTask, editTask, deleteTask, toggleTaskCompleted, addXP, addToast } = useStudent();
  const [selectedDay, setSelectedDay] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditTask, setCurrentEditTask] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    subject: 'Quantum Computing',
    day: 'Monday',
    time: '14:00 - 16:00',
    duration: '2.0h',
    priority: 'High',
    tag: 'Coding',
    notes: ''
  });

  const daysOfWeek = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const filteredTasks = tasks.filter((t) => {
    const matchesDay = selectedDay === 'All' || t.day === selectedDay;
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    return matchesDay && matchesPriority;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handleOpenAddModal = () => {
    setFormData({
      title: '',
      subject: 'Quantum Computing',
      day: selectedDay !== 'All' ? selectedDay : 'Monday',
      time: '14:00 - 16:00',
      duration: '2.0h',
      priority: 'High',
      tag: 'Coding',
      notes: ''
    });
    setIsAddModalOpen(true);
  };

  const handleSaveNewTask = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      addToast('Please enter a task title.', 'warning');
      return;
    }
    addTask(formData);
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
      notes: task.notes || ''
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEditTask = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    editTask(currentEditTask.id, formData);
    setIsEditModalOpen(false);
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
              <span>Cognitive Timetable</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Weekly Study <span className="text-gradient-purple">Planner</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Organize your weekly learning blocks, set focus priorities, and build daily momentum.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-neon-purple transition-all transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Study Task</span>
          </button>
        </div>

        {/* Weekly Completion Progress */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
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
        <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-1">
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

      {/* MODAL: ADD TASK */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Schedule New Study Task"
        subtitle="Add a high-impact focus block to your cognitive calendar"
      >
        <form onSubmit={handleSaveNewTask} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Implement Shor's Algorithm QFT module"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Subject
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-purple-400"
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
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Day of Week
              </label>
              <select
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-purple-400"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Time Window
              </label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="14:00 - 16:30"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="2.5h"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-purple-400"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
              Notes & Objectives
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Key concepts to master or problems to solve during this study block..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-neon-purple"
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
        <form onSubmit={handleSaveEditTask} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Day
              </label>
              <select
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-purple-400"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-purple-400"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
              Notes
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-neon-purple"
            >
              Update Task
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
