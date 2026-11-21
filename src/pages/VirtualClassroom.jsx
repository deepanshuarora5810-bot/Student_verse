import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Classroom3DScene } from '../components/classroom/Classroom3DScene';
import { CLASSROOM_LECTURE } from '../data/demoData';
import { useStudent } from '../context/StudentContext';
import {
  Users,
  Video,
  PenTool,
  ChevronLeft,
  ChevronRight,
  Hand,
  MessageSquare,
  Sparkles,
  Share2,
  Mic,
  Maximize2
} from 'lucide-react';

export const VirtualClassroom = () => {
  const navigate = useNavigate();
  const { addToast } = useStudent();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [students, setStudents] = useState(CLASSROOM_LECTURE.studentsRoster);
  const [questionInput, setQuestionInput] = useState('');
  const [activeTab, setActiveTab] = useState('presentation'); // presentation, chat

  const currentSlide = CLASSROOM_LECTURE.slides[currentSlideIndex] || CLASSROOM_LECTURE.slides[0];
  const totalSlides = CLASSROOM_LECTURE.slides.length;

  const handleNextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const handleToggleHandRaise = () => {
    setStudents((prev) =>
      prev.map((s) => (s.id === 'st-1' ? { ...s, handRaised: !s.handRaised } : s))
    );
    const self = students.find((s) => s.id === 'st-1');
    const newState = !self?.handRaised;
    addToast(
      newState ? 'Hand raised! Professor Rostova has been notified.' : 'Hand lowered.',
      newState ? 'info' : 'default',
      'Virtual Classroom'
    );
  };

  const handleSendQuestion = (e) => {
    e.preventDefault();
    if (!questionInput.trim()) return;
    addToast(`Question submitted to professor queue: "${questionInput}"`, 'success', 'Classroom Q&A');
    setQuestionInput('');
  };

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 mb-1">
            <Video className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>IMMERSIVE 3D SPATIAL VIRTUAL CLASSROOM // LIVE SESSION</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            {CLASSROOM_LECTURE.title}
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Experience spatial lectures with fellow students in a futuristic 3D amphitheater. Real-time slide synchronization, integrated whiteboard, and live Q&A.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/whiteboard')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-500/15 border border-cyan-500/40 hover:bg-cyan-500/25 shadow-neon-cyan transition-all transform active:scale-95"
          >
            <PenTool className="w-4 h-4" />
            <span>Open Collaborative Whiteboard</span>
          </button>
        </div>
      </div>

      {/* Main 3D Lecture Hall & Presentation Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
        {/* Left Column: 3D Virtual Classroom Amphitheater (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex-1 min-h-[460px] rounded-2xl glass-card border-indigo-500/30 bg-[#030612] relative overflow-hidden flex flex-col">
            <div className="absolute top-4 left-5 z-10 flex items-center gap-3 pointer-events-none">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> LIVE BROADCAST
              </span>
              <span className="text-xs font-mono text-slate-300">
                {students.length} Connected Scholars
              </span>
            </div>

            {/* 3D Scene */}
            <div className="w-full h-full flex-1">
              <Classroom3DScene currentSlide={currentSlide} students={students} />
            </div>

            {/* Slide Navigation Overlay Bar */}
            <div className="p-3 bg-[#060a1f]/90 border-t border-indigo-900/40 backdrop-blur-md flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevSlide}
                  disabled={currentSlideIndex === 0}
                  className="p-1.5 rounded-lg border border-indigo-900/40 bg-white/5 text-slate-300 hover:text-white disabled:opacity-40 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-cyan-300 font-bold px-2">
                  Slide {currentSlideIndex + 1} / {totalSlides}
                </span>
                <button
                  onClick={handleNextSlide}
                  disabled={currentSlideIndex === totalSlides - 1}
                  className="p-1.5 rounded-lg border border-indigo-900/40 bg-white/5 text-slate-300 hover:text-white disabled:opacity-40 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Hand Raise Toggle */}
              <button
                onClick={handleToggleHandRaise}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all transform active:scale-95 ${
                  students.find((s) => s.id === 'st-1')?.handRaised
                    ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                    : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/15'
                }`}
              >
                <Hand className="w-3.5 h-3.5" />
                <span>{students.find((s) => s.id === 'st-1')?.handRaised ? 'Lower Hand' : 'Raise Hand'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Classroom Roster & Live Question Queue (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Professor Snapshot */}
          <div className="p-4 rounded-2xl glass-card border-indigo-500/20 bg-[#060a1f] flex items-center gap-3">
            <img
              src={CLASSROOM_LECTURE.professor.avatar}
              alt="Professor"
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-cyan-500/40"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-white truncate">{CLASSROOM_LECTURE.professor.name}</h4>
              <p className="text-[11px] text-cyan-400 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {CLASSROOM_LECTURE.professor.status}
              </p>
            </div>
          </div>

          {/* Connected Students Roster */}
          <div className="flex-1 p-5 rounded-2xl glass-card border-indigo-500/20 bg-[#060a1f] flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-purple-400" />
                <span>Class Roster & Seating</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">{students.length} active</span>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto max-h-48 pr-1 mb-4">
              {students.map((st) => (
                <div
                  key={st.id}
                  className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        st.handRaised ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'
                      }`}
                    />
                    <span className="text-slate-200 font-medium">{st.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{st.seat}</span>
                </div>
              ))}
            </div>

            {/* Live Question Composer */}
            <form onSubmit={handleSendQuestion} className="mt-auto pt-3 border-t border-indigo-900/40 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ask Professor a Question</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 px-3 py-2 rounded-xl bg-[#030612] border border-indigo-900/40 text-xs text-slate-200 outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 shadow-neon-cyan transition-all"
                >
                  Ask
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
