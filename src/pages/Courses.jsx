import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { CourseCard } from '../components/CourseCard';
import {
  Search,
  BookOpen,
  CheckCircle2,
  Layers,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Calendar,
  Globe,
  Sparkles
} from 'lucide-react';

export const Courses = () => {
  const { courses, stats } = useStudent();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [enrollFilter, setEnrollFilter] = useState('All'); // 'All', 'Enrolled', 'Available'
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 3;

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

  // Calculate pagination
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * coursesPerPage;
  const currentCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

  const handleNextPage = () => {
    if (validCurrentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (validCurrentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handlePageSelect = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by topic, instructor, or keywords (e.g. Qubit, Shader, PyTorch)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
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
                onClick={() => {
                  setEnrollFilter('All');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  enrollFilter === 'All' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setEnrollFilter('Enrolled');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  enrollFilter === 'Enrolled' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Enrolled ({stats.enrolledCount})
              </button>
              <button
                onClick={() => {
                  setEnrollFilter('Available');
                  setCurrentPage(1);
                }}
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
              onChange={(e) => {
                setSelectedLevel(e.target.value);
                setCurrentPage(1);
              }}
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
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
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

      {/* RESULTS COUNT & PAGINATION STATUS */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
        <span>
          Showing <strong className="text-white">{filteredCourses.length > 0 ? startIndex + 1 : 0}</strong> -{' '}
          <strong className="text-white">{Math.min(startIndex + coursesPerPage, filteredCourses.length)}</strong> of{' '}
          <strong className="text-cyan-400">{filteredCourses.length}</strong> modules
        </span>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 hidden sm:inline">
            Page <strong className="text-white">{validCurrentPage}</strong> of {totalPages}
          </span>
          {(searchQuery || selectedCategory !== 'All' || selectedLevel !== 'All' || enrollFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedLevel('All');
                setEnrollFilter('All');
                setCurrentPage(1);
              }}
              className="text-cyan-400 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* COURSES GRID */}
      {currentCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourses.map((course) => (
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
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* INTERACTIVE PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-card border-indigo-500/20 bg-[#060a1f] mt-2">
          <div className="text-xs text-slate-400 font-mono">
            Page <span className="text-cyan-300 font-bold">{validCurrentPage}</span> of {totalPages}
          </div>

          <div className="flex items-center gap-2">
            {/* Previous Page Button */}
            <button
              onClick={handlePrevPage}
              disabled={validCurrentPage <= 1}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border border-indigo-900/40 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Page</span>
            </button>

            {/* Numeric Page Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageSelect(page)}
                className={`w-9 h-9 rounded-xl text-xs font-mono font-bold transition-all ${
                  page === validCurrentPage
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-neon-cyan'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Page Button */}
            <button
              onClick={handleNextPage}
              disabled={validCurrentPage >= totalPages}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 shadow-neon-cyan disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <span>Next Page</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick jump to next page or top */}
          <button
            onClick={handleNextPage}
            disabled={validCurrentPage >= totalPages}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
          >
            <span>Move to Next Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* MOVE TO NEXT LEARNING SECTION BANNER */}
      <div className="p-6 rounded-3xl glass-card border-indigo-500/30 bg-gradient-to-r from-cyan-950/30 via-[#070b22] to-purple-950/30 flex flex-col md:flex-row items-center justify-between gap-6 mt-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider font-semibold block">
              NEXT CURRICULUM STEP
            </span>
            <h3 className="text-lg font-bold text-white">
              Schedule Your Courses on the Study Planner
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 max-w-lg">
              Organize your enrolled courses into weekly time slots, track study targets, and set assignment milestones.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/universe"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>3D Universe</span>
          </Link>
          <Link
            to="/planner"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all transform active:scale-95"
          >
            <span>Move to Next Page: Planner</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
};
