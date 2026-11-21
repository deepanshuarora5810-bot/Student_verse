import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { CourseCard } from '../components/CourseCard';
import {
  Search,
  Filter,
  BookOpen,
  Sparkles,
  SlidersHorizontal,
  CheckCircle2,
  Layers
} from 'lucide-react';

export const Courses = () => {
  const { courses, stats } = useStudent();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [enrollFilter, setEnrollFilter] = useState('All'); // 'All', 'Enrolled', 'Available'

  const categories = ['All', 'Quantum', 'AI & Data', 'Creative Dev', 'Neural UX', 'Web3', 'Robotics'];
  const levels = ['All', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter((course) => {
    // Search query matching
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Category matching
    const matchesCategory =
      selectedCategory === 'All' || course.category === selectedCategory;

    // Level matching
    const matchesLevel =
      selectedLevel === 'All' || course.level === selectedLevel;

    // Enrollment matching
    const matchesEnroll =
      enrollFilter === 'All' ||
      (enrollFilter === 'Enrolled' && course.enrolled) ||
      (enrollFilter === 'Available' && !course.enrolled);

    return matchesSearch && matchesCategory && matchesLevel && matchesEnroll;
  });

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      
      {/* PAGE HEADER */}
      <div className="relative glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-semibold mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Curriculum Matrix</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Advanced Course <span className="text-gradient-cyan">Catalog</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Explore specialized graduate-level modules spanning quantum information science, neural transformers, and procedural WebGL graphics.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="block text-xl font-bold text-cyan-400 font-display">
                {stats.enrolledCount}
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Enrolled
              </span>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="block text-xl font-bold text-purple-400 font-display">
                {stats.averageProgress}%
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Avg Progress
              </span>
            </div>
          </div>
        </div>

        {/* SEARCH AND FILTERS BAR */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, instructor, or keywords (e.g. Qubit, Shader, PyTorch)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Dropdowns / Toggles */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Enrollment Filter */}
            <div className="flex items-center rounded-xl bg-slate-900/90 border border-slate-700 p-1 text-xs font-mono">
              <button
                onClick={() => setEnrollFilter('All')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  enrollFilter === 'All' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setEnrollFilter('Enrolled')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  enrollFilter === 'Enrolled' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Enrolled ({stats.enrolledCount})
              </button>
              <button
                onClick={() => setEnrollFilter('Available')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  enrollFilter === 'Available' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Available ({courses.length - stats.enrolledCount})
              </button>
            </div>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-cyan-400 font-mono"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>Level: {lvl}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-neon-cyan font-bold'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* RESULTS COUNT */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
        <span>
          Showing <strong className="text-white">{filteredCourses.length}</strong> of {courses.length} courses
        </span>
        {(searchQuery || selectedCategory !== 'All' || selectedLevel !== 'All' || enrollFilter !== 'All') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedLevel('All');
              setEnrollFilter('All');
            }}
            className="text-cyan-400 hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* COURSES GRID */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-12 text-center flex flex-col items-center justify-center border-indigo-900/40 my-8">
          <Layers className="w-12 h-12 text-slate-500 mb-4" />
          <h3 className="text-lg font-bold text-white font-display">No modules matching your criteria</h3>
          <p className="text-xs text-slate-400 max-w-sm mt-1 mb-6">
            Try adjusting your search query or reset your category and difficulty filters to discover available disciplines.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedLevel('All');
              setEnrollFilter('All');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
};
