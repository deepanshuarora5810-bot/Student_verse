import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { Star, Clock, BookOpen, Users, CheckCircle2, Play, Sparkles } from 'lucide-react';
import { Modal } from './Modal';

export const CourseCard = ({ course }) => {
  const { enrollCourse, updateCourseProgress } = useStudent();
  const [syllabusOpen, setSyllabusOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);

  const handleEnroll = (e) => {
    e.stopPropagation();
    enrollCourse(course.id);
  };

  const handleAdvanceProgress = (e) => {
    e.stopPropagation();
    updateCourseProgress(course.id, course.progress + 15);
  };

  return (
    <>
      <div className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col group border border-indigo-900/40 relative">
        {/* Course Thumbnail & Badges */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f24] via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0a0f24]/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
              {course.category}
            </span>
            {course.badge && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-neon-purple">
                {course.badge}
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 rounded-lg text-[10px] font-mono font-semibold bg-[#0a0f24]/80 backdrop-blur-md text-slate-300 border border-white/10">
              {course.level}
            </span>
          </div>

          {/* Enrolled status banner if applicable */}
          {course.enrolled && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Enrolled</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Rating and Students count */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold text-white">{course.rating}</span>
                <span className="text-slate-400">({course.studentsCount.toLocaleString()})</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{course.duration}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-2">
              {course.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
              {course.description}
            </p>
          </div>

          {/* Instructor & Actions Footer */}
          <div className="pt-4 border-t border-indigo-900/30 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-cyan-500/30"
                />
                <div>
                  <h5 className="text-xs font-semibold text-slate-200">{course.instructor.name}</h5>
                  <p className="text-[10px] text-slate-400 truncate">{course.instructor.role}</p>
                </div>
              </div>

              <button
                onClick={() => setSyllabusOpen(true)}
                className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors underline decoration-cyan-500/30 underline-offset-4"
              >
                Syllabus
              </button>
            </div>

            {/* Enrollment / Progress section */}
            {course.enrolled ? (
              <div className="flex flex-col gap-2 mt-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-cyan-300 font-bold">{course.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    onClick={() => setSyllabusOpen(true)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-cyan-400" />
                    <span>Continue</span>
                  </button>
                  <button
                    onClick={handleAdvanceProgress}
                    className="py-2 px-3 rounded-xl text-xs font-semibold bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all"
                    title="Simulate completing next lesson"
                  >
                    +15% Study
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleEnroll}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Enroll in Course</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Syllabus & Lessons Modal */}
      <Modal
        isOpen={syllabusOpen}
        onClose={() => setSyllabusOpen(false)}
        title={course.title}
        maxWidth="max-w-2xl"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-3">
            <span>Instructor: <strong className="text-white">{course.instructor.name}</strong></span>
            <span>Duration: <strong className="text-cyan-400">{course.duration}</strong></span>
            <span>Level: <strong className="text-purple-300">{course.level}</strong></span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {course.description}
          </p>

          <div>
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Interactive Syllabus & Lesson Modules ({course.syllabus.length})</span>
            </h4>

            <div className="flex flex-col gap-2">
              {course.syllabus.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    activeLesson?.id === lesson.id
                      ? 'bg-cyan-500/15 border-cyan-400/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                        lesson.completed
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {lesson.completed ? '✓' : lesson.id}
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-medium text-slate-200">{lesson.title}</h5>
                      <span className="text-[10px] font-mono text-slate-400">{lesson.duration}</span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-cyan-400">
                    {lesson.completed ? 'Completed' : 'Ready'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {activeLesson && (
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 animate-in fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase text-cyan-300 font-bold">
                  Active Simulator: Lesson {activeLesson.id}
                </span>
                <span className="text-xs text-slate-400 font-mono">{activeLesson.duration}</span>
              </div>
              <h5 className="text-sm font-semibold text-white mb-1">{activeLesson.title}</h5>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Interactive neural lecture stream ready. Connect your terminal or IDE workspace to begin exercise simulations.
              </p>
              <button
                onClick={() => {
                  updateCourseProgress(course.id, Math.min(100, course.progress + 15));
                  setActiveLesson(null);
                }}
                className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all"
              >
                Mark Lesson as Studied (+15% Progress)
              </button>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              onClick={() => setSyllabusOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 border border-white/10"
            >
              Close
            </button>
            {!course.enrolled && (
              <button
                onClick={handleEnroll}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan"
              >
                Enroll Now
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
