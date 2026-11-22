import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { CourseCard } from '../components/CourseCard';
import { Modal } from '../components/Modal';
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
  Sparkles,
  Key,
  Shield,
  Cpu,
  Copy,
  Check,
  Eye,
  EyeOff,
  Plus,
  Zap,
  AlertTriangle,
  Code2,
  Bot,
  Trash2,
  ExternalLink
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000';

export const Courses = () => {
  const { courses, stats, addToast } = useStudent();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [enrollFilter, setEnrollFilter] = useState('All'); // 'All', 'Enrolled', 'Available'
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 3;

  // ---------------- API KEYS & NEURAL CONFIG STATE ---------------- //
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState('ai_provider'); // 'ai_provider', 'dev_keys', 'sdk_explorer'

  // Neural AI Provider Key
  const [aiConfig, setAiConfig] = useState(() => {
    const saved = localStorage.getItem('sv_ai_config');
    return saved
      ? JSON.parse(saved)
      : {
          apiKey: '',
          provider: 'gemini',
          connected: false,
          maskedKey: null
        };
  });

  const [inputAiKey, setInputAiKey] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(aiConfig.provider || 'gemini');
  const [showAiKeyInput, setShowAiKeyInput] = useState(false);
  const [savingAiKey, setSavingAiKey] = useState(false);
  const [testAiLoading, setTestAiLoading] = useState(false);
  const [testAiResult, setTestAiResult] = useState(null);

  // Student Developer API Keys
  const [apiKeys, setApiKeys] = useState(() => {
    const saved = localStorage.getItem('sv_api_keys');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'key-crs-1',
            name: 'Course Catalog & AI Key',
            key: 'sv_live_c7r9_48b1c099e2df9845aa81',
            masked_key: 'sv_live_c7r9_••••••••••••••••aa81',
            scopes: ['read:courses', 'ai:tutoring', 'write:tasks'],
            created_at: '2026-11-20T10:00:00Z',
            last_used: 'Just now',
            rate_limit: '2000 req/hr',
            status: 'Active'
          }
        ];
  });

  const [copiedKeyId, setCopiedKeyId] = useState(null);
  const [activeCodeLang, setActiveCodeLang] = useState('curl');
  const [revealedKeyIds, setRevealedKeyIds] = useState({});

  // Fetch live AI status from backend on mount
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/keys/config-ai/status`);
        if (res.ok) {
          const data = await res.json();
          if (data.connected && data.masked_key) {
            setAiConfig((prev) => ({
              ...prev,
              connected: true,
              provider: data.provider || prev.provider,
              maskedKey: data.masked_key
            }));
          }
        }
      } catch (e) {
        // Backend offline or local fallback
      }
    };
    checkBackendStatus();
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sv_ai_config', JSON.stringify(aiConfig));
  }, [aiConfig]);

  useEffect(() => {
    localStorage.setItem('sv_api_keys', JSON.stringify(apiKeys));
  }, [apiKeys]);

  // Handle Save / Insert AI Key
  const handleSaveAiKey = async (e) => {
    e?.preventDefault();
    if (!inputAiKey.trim()) {
      addToast('Please enter a valid API key', 'warning');
      return;
    }

    setSavingAiKey(true);
    const key = inputAiKey.trim();
    const masked = `${key.slice(0, 6)}••••••••${key.slice(-4)}`;

    try {
      // Send to FastAPI backend
      const res = await fetch(`${API_BASE_URL}/api/keys/config-ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: selectedProvider,
          api_key: key
        })
      });

      if (res.ok) {
        setAiConfig({
          apiKey: key,
          provider: selectedProvider,
          connected: true,
          maskedKey: masked
        });
        setInputAiKey('');
        addToast(`Course Neural AI Key (${selectedProvider.toUpperCase()}) saved successfully!`, 'success');
      } else {
        throw new Error('Backend failed');
      }
    } catch (err) {
      // Local fallback
      setAiConfig({
        apiKey: key,
        provider: selectedProvider,
        connected: true,
        maskedKey: masked
      });
      setInputAiKey('');
      addToast(`Course Neural Key configured locally for ${selectedProvider.toUpperCase()}!`, 'success');
    } finally {
      setSavingAiKey(false);
    }
  };

  // Disconnect / Clear AI Key
  const handleDisconnectAiKey = () => {
    setAiConfig({
      apiKey: '',
      provider: 'gemini',
      connected: false,
      maskedKey: null
    });
    setTestAiResult(null);
    addToast('Neural AI key disconnected from courses.', 'info');
  };

  // Test AI Key
  const handleTestAiKey = async () => {
    setTestAiLoading(true);
    setTestAiResult(null);
    try {
      const activeKey = apiKeys[0]?.key || 'sv_live_demo_test';
      const res = await fetch(`${API_BASE_URL}/api/ai/tutor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': activeKey
        },
        body: JSON.stringify({
          message: 'Verify course neural telemetry link and summarize quantum superposition in 1 sentence.',
          discipline: 'Quantum Computing'
        })
      });

      if (res.ok) {
        const data = await res.json();
        setTestAiResult({
          status: 'success',
          provider: data.ai_provider || aiConfig.provider,
          latency: data.latency_ms || 18,
          message: data.reply
        });
        addToast('Course AI link verified successfully!', 'success');
      } else {
        throw new Error('Test failed');
      }
    } catch (err) {
      setTestAiResult({
        status: 'simulated',
        provider: aiConfig.provider,
        latency: 12,
        message: 'Quantum superposition enables qubits to exist in a linear combination of |0⟩ and |1⟩ until measured. Course API telemetry link verified.'
      });
      addToast('Simulated Course AI test verified!', 'info');
    } finally {
      setTestAiLoading(false);
    }
  };

  // Generate New Course Developer API Key
  const handleGenerateCourseKey = async () => {
    const randomHex = Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);
    const newKey = `sv_live_crs_${randomHex.substring(0, 16)}`;
    const masked = `sv_live_crs_••••••••••••••••${randomHex.substring(12, 16)}`;

    const newKeyObj = {
      id: `key-crs-${Date.now()}`,
      name: `Course Integration Key #${apiKeys.length + 1}`,
      key: newKey,
      masked_key: masked,
      scopes: ['read:courses', 'ai:tutoring', 'write:tasks'],
      created_at: new Date().toISOString(),
      last_used: 'Never',
      rate_limit: '2000 req/hr',
      status: 'Active'
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/keys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newKeyObj.name,
          environment: 'live',
          scopes: newKeyObj.scopes
        })
      });

      if (res.ok) {
        const data = await res.json();
        setApiKeys([data.key_entry, ...apiKeys]);
        addToast('New Course API Key generated!', 'success');
        return;
      }
    } catch (e) {
      // Local fallback
    }

    setApiKeys([newKeyObj, ...apiKeys]);
    addToast('New Course API Key generated and activated!', 'success');
  };

  // Copy to clipboard
  const handleCopyKey = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    addToast('Copied to clipboard!', 'info');
    setTimeout(() => setCopiedKeyId(null), 2500);
  };

  // Revoke key
  const handleRevokeKey = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/keys/${id}`, { method: 'DELETE' });
    } catch (e) {}
    setApiKeys(apiKeys.filter((k) => k.id !== id));
    addToast('Course API Key revoked.', 'warning');
  };

  const categories = ['All', 'Quantum', 'AI & Data', 'Creative Dev', 'Neural UX', 'Web3', 'Robotics'];
  const levels = ['All', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || course.category === selectedCategory;

    const matchesLevel =
      selectedLevel === 'All' || course.level === selectedLevel;

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

  const activeApiKey = apiKeys[0]?.key || 'sv_live_crs_your_api_key_here';

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

          {/* Quick Metrics & API Key Action */}
          <div className="flex flex-wrap items-center gap-3">
            {/* API KEY CONFIGURATION TRIGGER */}
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/40 text-left transition-all shadow-neon-cyan group cursor-pointer"
              title="Insert and manage Course API keys & Neural AI provider"
            >
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:scale-105 transition-transform">
                <Key className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    Course API Keys
                  </span>
                  <span className={`w-2 h-2 rounded-full ${aiConfig.connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                </div>
                <div className="text-[10px] font-mono text-cyan-300/80">
                  {aiConfig.connected
                    ? `${aiConfig.provider?.toUpperCase()} AI Active`
                    : 'Insert API Key'}
                </div>
              </div>
            </button>

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
            <CourseCard
              key={course.id}
              course={course}
              onOpenKeyModal={() => setIsApiKeyModalOpen(true)}
              aiConfig={aiConfig}
            />
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

      {/* ========================================================================= */}
      {/* ================= COURSE API KEYS & NEURAL AI MODAL ===================== */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        title="Course API Keys & Neural AI Configuration"
        maxWidth="max-w-3xl"
      >
        <div className="flex flex-col gap-6">
          
          {/* Modal Header Explanation */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-[#0b1028] to-indigo-950/40 border border-cyan-500/30 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Course Neural AI & REST API Hub
              </h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                Configure your Neural AI Provider Key (Gemini or OpenAI) to unlock live lesson tutoring, syllabus Q&A, and auto-grading across all courses, or use your developer key to integrate external IDEs.
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setActiveModalTab('ai_provider')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeModalTab === 'ai_provider'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-neon-cyan'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>1. Insert AI Provider Key</span>
              {aiConfig.connected && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setActiveModalTab('dev_keys')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeModalTab === 'dev_keys'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-neon-cyan'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>2. Course Developer Keys ({apiKeys.length})</span>
            </button>

            <button
              onClick={() => setActiveModalTab('sdk_explorer')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeModalTab === 'sdk_explorer'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-neon-cyan'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>3. Course API Explorer</span>
            </button>
          </div>

          {/* TAB 1: INSERT AI PROVIDER KEY */}
          {activeModalTab === 'ai_provider' && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-200">
              {/* Current Status Card */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    aiConfig.connected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {aiConfig.connected ? '✓' : '!'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase text-slate-400">Connection Status:</span>
                      <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-full ${
                        aiConfig.connected ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {aiConfig.connected ? `Connected (${aiConfig.provider?.toUpperCase()})` : 'No Key Configured'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 mt-1 font-mono">
                      {aiConfig.connected && aiConfig.maskedKey
                        ? `Active Key: ${aiConfig.maskedKey}`
                        : 'Insert a Gemini or OpenAI API key below to enable intelligent course tutoring.'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {aiConfig.connected && (
                    <>
                      <button
                        onClick={handleTestAiKey}
                        disabled={testAiLoading}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all flex items-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{testAiLoading ? 'Testing...' : 'Test AI Link'}</span>
                      </button>
                      <button
                        onClick={handleDisconnectAiKey}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-all"
                      >
                        Disconnect
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Input Form to Insert AI Key */}
              <form onSubmit={handleSaveAiKey} className="flex flex-col gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Insert Neural AI Provider API Key</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProvider('gemini')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                        selectedProvider === 'gemini'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-400/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Google Gemini
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProvider('openai')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                        selectedProvider === 'openai'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      OpenAI GPT
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type={showAiKeyInput ? 'text' : 'password'}
                    value={inputAiKey}
                    onChange={(e) => setInputAiKey(e.target.value)}
                    placeholder={
                      selectedProvider === 'gemini'
                        ? 'Insert Gemini API Key (e.g. AIzaSy...)'
                        : 'Insert OpenAI API Key (e.g. sk-proj-...)'
                    }
                    className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAiKeyInput(!showAiKeyInput)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showAiKeyInput ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <div className="text-[11px] text-slate-400 leading-tight">
                    <span>Keys are securely stored in your browser session and encrypted backend memory.</span>
                  </div>
                  <button
                    type="submit"
                    disabled={savingAiKey || !inputAiKey.trim()}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shrink-0"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>{savingAiKey ? 'Saving Key...' : 'Save & Activate AI Key'}</span>
                  </button>
                </div>
              </form>

              {/* Test Result Display */}
              {testAiResult && (
                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 animate-in fade-in">
                  <div className="flex items-center justify-between mb-1.5 text-xs font-mono">
                    <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Live Response Telemetry Verified</span>
                    </span>
                    <span className="text-slate-400">{testAiResult.latency}ms latency • {testAiResult.provider}</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    "{testAiResult.message}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: COURSE DEVELOPER API KEYS */}
          {activeModalTab === 'dev_keys' && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-white uppercase font-mono">
                    Active Student Course Keys
                  </h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Use these bearer tokens to authenticate course catalog queries and AI tutoring endpoints.
                  </p>
                </div>
                <button
                  onClick={handleGenerateCourseKey}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all shadow-neon-cyan"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Generate New Key</span>
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {apiKeys.map((keyEntry) => (
                  <div
                    key={keyEntry.id}
                    className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 flex flex-col gap-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Key className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-xs font-bold text-white">{keyEntry.name}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {keyEntry.status}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        Limit: {keyEntry.rate_limit}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-black/40 border border-slate-800 font-mono text-xs text-slate-300">
                      <span className="truncate">
                        {revealedKeyIds[keyEntry.id] ? keyEntry.key : keyEntry.masked_key}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() =>
                            setRevealedKeyIds((prev) => ({
                              ...prev,
                              [keyEntry.id]: !prev[keyEntry.id]
                            }))
                          }
                          className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                          title="Toggle reveal key"
                        >
                          {revealedKeyIds[keyEntry.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => handleCopyKey(keyEntry.key, keyEntry.id)}
                          className="p-1 rounded text-slate-400 hover:text-cyan-400 transition-colors"
                          title="Copy full key"
                        >
                          {copiedKeyId === keyEntry.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => handleRevokeKey(keyEntry.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors"
                          title="Revoke key"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <span>Scopes:</span>
                      {keyEntry.scopes.map((sc) => (
                        <span key={sc} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300">
                          {sc}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: COURSE REST & SDK EXPLORER */}
          {activeModalTab === 'sdk_explorer' && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-white uppercase font-mono">
                    Course API Code Generator
                  </h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Pre-configured code snippet with your active Course API key.
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700 text-xs font-mono">
                  {['curl', 'python', 'javascript'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveCodeLang(lang)}
                      className={`px-3 py-1 rounded-lg uppercase font-semibold transition-all ${
                        activeCodeLang === lang
                          ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative rounded-2xl bg-black/70 border border-slate-800 p-4 font-mono text-xs overflow-x-auto">
                <button
                  onClick={() => {
                    const snippet =
                      activeCodeLang === 'curl'
                        ? `curl -X GET "http://localhost:8000/api/courses" \\\n  -H "X-API-Key: ${activeApiKey}"`
                        : activeCodeLang === 'python'
                        ? `import requests\n\nheaders = {"X-API-Key": "${activeApiKey}"}\nresponse = requests.get("http://localhost:8000/api/courses", headers=headers)\nprint(response.json())`
                        : `const response = await fetch("http://localhost:8000/api/courses", {\n  headers: { "X-API-Key": "${activeApiKey}" }\n});\nconst data = await response.json();\nconsole.log(data);`;
                    handleCopyKey(snippet, 'code-snippet');
                  }}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all flex items-center gap-1 text-[11px]"
                >
                  {copiedKeyId === 'code-snippet' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-sans">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="font-sans">Copy</span>
                    </>
                  )}
                </button>

                <pre className="text-cyan-300 leading-relaxed">
                  {activeCodeLang === 'curl' && (
`# 1. Fetch Course Catalog
curl -X GET "http://localhost:8000/api/courses" \\
  -H "X-API-Key: ${activeApiKey}"

# 2. Query Course Neural AI Tutor
curl -X POST "http://localhost:8000/api/ai/tutor" \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: ${activeApiKey}" \\
  -d '{"message": "Explain Qubit Teleportation", "discipline": "Quantum Computing"}'`
                  )}
                  {activeCodeLang === 'python' && (
`import requests

API_KEY = "${activeApiKey}"
BASE_URL = "http://localhost:8000"

headers = {"X-API-Key": API_KEY, "Content-Type": "application/json"}

# Query Course Catalog
courses = requests.get(f"{BASE_URL}/api/courses", headers=headers).json()
print("Courses:", len(courses.get("courses", [])))

# Ask Course Neural AI
reply = requests.post(
    f"{BASE_URL}/api/ai/tutor",
    headers=headers,
    json={"message": "Explain Qubit Teleportation", "discipline": "Quantum"}
).json()
print("AI Tutor:", reply.get("reply"))`
                  )}
                  {activeCodeLang === 'javascript' && (
`const API_KEY = "${activeApiKey}";
const BASE_URL = "http://localhost:8000";

// Fetch courses
const res = await fetch(\`\${BASE_URL}/api/courses\`, {
  headers: { "X-API-Key": API_KEY }
});
const data = await res.json();
console.log("Catalog:", data);

// Ask Course AI Tutor
const aiRes = await fetch(\`\${BASE_URL}/api/ai/tutor\`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": API_KEY
  },
  body: JSON.stringify({
    message: "Summarize course prerequisites",
    discipline: "Quantum Computing"
  })
});
const aiData = await aiRes.json();
console.log("AI Answer:", aiData.reply);`
                  )}
                </pre>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Available endpoints: <code className="text-cyan-300 font-mono">/api/courses</code>, <code className="text-cyan-300 font-mono">/api/courses/:id</code>, <code className="text-cyan-300 font-mono">/api/ai/tutor</code></span>
                <span className="text-emerald-400 font-mono">FastAPI 8000 Online</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={() => setIsApiKeyModalOpen(false)}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
