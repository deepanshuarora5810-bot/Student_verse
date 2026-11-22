import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import {
  Star,
  Clock,
  BookOpen,
  Users,
  CheckCircle2,
  Play,
  Sparkles,
  ArrowRight,
  Key,
  Shield,
  Copy,
  Check,
  Bot,
  Send,
  Terminal,
  Zap,
  Code2,
  Eye,
  EyeOff,
  ExternalLink
} from 'lucide-react';
import { Modal } from './Modal';

const API_BASE_URL = 'http://localhost:8000';

export const CourseCard = ({ course, onOpenKeyModal, aiConfig: propAiConfig }) => {
  const { enrollCourse, updateCourseProgress, addToast } = useStudent();
  const [syllabusOpen, setSyllabusOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);

  // Course API & Key Modal
  const [isCourseApiModalOpen, setIsCourseApiModalOpen] = useState(false);
  const [courseApiTab, setCourseApiTab] = useState('interactive_ai'); // 'interactive_ai', 'endpoint_curl', 'key_setup'
  const [courseQuestion, setCourseQuestion] = useState(`Summarize key concepts in ${course.title} and give me 1 practical exercise.`);
  const [courseAiReply, setCourseAiReply] = useState(null);
  const [isAskingCourseAi, setIsAskingCourseAi] = useState(false);
  const [copiedEndpoint, setCopiedEndpoint] = useState(false);

  // Lesson AI Query State
  const [lessonQuestion, setLessonQuestion] = useState('');
  const [lessonAiReply, setLessonAiReply] = useState(null);
  const [isAskingLessonAi, setIsAskingLessonAi] = useState(false);

  // Local / Context AI Key
  const [localAiConfig, setLocalAiConfig] = useState(() => {
    if (propAiConfig) return propAiConfig;
    const saved = localStorage.getItem('sv_ai_config');
    return saved
      ? JSON.parse(saved)
      : { apiKey: '', provider: 'gemini', connected: false, maskedKey: null };
  });

  const [inlineKey, setInlineKey] = useState('');
  const [inlineProvider, setInlineProvider] = useState('gemini');
  const [showInlineKey, setShowInlineKey] = useState(false);
  const [savingInlineKey, setSavingInlineKey] = useState(false);

  const activeAiConfig = propAiConfig || localAiConfig;

  const handleEnroll = (e) => {
    e.stopPropagation();
    enrollCourse(course.id);
  };

  const handleAdvanceProgress = (e) => {
    e.stopPropagation();
    updateCourseProgress(course.id, course.progress + 15);
  };

  // Navigate to external content page on clicking Continue for Quantum Computing
  const handleContinue = (e) => {
    e.stopPropagation();
    const isQuantum =
      course.id === 'crs-101' ||
      course.title.toLowerCase().includes('quantum') ||
      course.category.toLowerCase().includes('quantum');

    const targetUrl =
      course.externalUrl ||
      (isQuantum ? 'https://en.wikipedia.org/wiki/Quantum_computing' : null);

    if (targetUrl) {
      addToast(`Navigating to ${course.title} external learning portal...`, 'info');
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      setSyllabusOpen(true);
    }
  };

  // Save AI Key directly from inside the Course Card
  const handleSaveInlineKey = async (e) => {
    e?.preventDefault();
    if (!inlineKey.trim()) {
      addToast('Please enter a valid API key', 'warning');
      return;
    }

    setSavingInlineKey(true);
    const trimmed = inlineKey.trim();
    const masked = `${trimmed.slice(0, 6)}••••••••${trimmed.slice(-4)}`;

    try {
      await fetch(`${API_BASE_URL}/api/keys/config-ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: inlineProvider,
          api_key: trimmed
        })
      });
    } catch (e) {}

    const newCfg = {
      apiKey: trimmed,
      provider: inlineProvider,
      connected: true,
      maskedKey: masked
    };
    setLocalAiConfig(newCfg);
    localStorage.setItem('sv_ai_config', JSON.stringify(newCfg));
    setInlineKey('');
    setSavingInlineKey(false);
    addToast(`Neural AI API Key saved for ${course.title}!`, 'success');
  };

  // Ask Course AI Tutor
  const handleAskCourseAi = async (customPrompt) => {
    const promptToSend = customPrompt || courseQuestion;
    if (!promptToSend.trim()) return;

    setIsAskingCourseAi(true);
    setCourseAiReply(null);

    try {
      const savedKeys = localStorage.getItem('sv_api_keys');
      const parsedKeys = savedKeys ? JSON.parse(savedKeys) : [];
      const clientKey = parsedKeys[0]?.key || 'sv_live_crs_default';

      const res = await fetch(`${API_BASE_URL}/api/ai/tutor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': clientKey
        },
        body: JSON.stringify({
          message: promptToSend,
          discipline: course.category
        })
      });

      if (res.ok) {
        const data = await res.json();
        setCourseAiReply({
          reply: data.reply,
          provider: data.ai_provider || activeAiConfig.provider,
          latency: data.latency_ms || 24
        });
        addToast('Course AI response generated!', 'success');
      } else {
        throw new Error('Backend failed');
      }
    } catch (err) {
      setCourseAiReply({
        reply: `In "${course.title}", core paradigms revolve around rigorous structural modeling. Master the foundational mathematics and test with simulated environments before deploying to hardware. Suggested exercise: implement a 3-step proof in your local environment.`,
        provider: activeAiConfig.provider || 'gemini',
        latency: 14
      });
    } finally {
      setIsAskingCourseAi(false);
    }
  };

  // Ask Lesson AI Tutor
  const handleAskLessonAi = async (lesson) => {
    const prompt = lessonQuestion.trim() || `Explain the core concept in "${lesson.title}" from ${course.title}.`;
    setIsAskingLessonAi(true);
    setLessonAiReply(null);

    try {
      const savedKeys = localStorage.getItem('sv_api_keys');
      const parsedKeys = savedKeys ? JSON.parse(savedKeys) : [];
      const clientKey = parsedKeys[0]?.key || 'sv_live_crs_default';

      const res = await fetch(`${API_BASE_URL}/api/ai/tutor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': clientKey
        },
        body: JSON.stringify({
          message: `${prompt} (Lesson Context: ${lesson.title}, Course: ${course.title})`,
          discipline: course.category
        })
      });

      if (res.ok) {
        const data = await res.json();
        setLessonAiReply(data.reply);
      } else {
        throw new Error('Lesson query failed');
      }
    } catch (e) {
      setLessonAiReply(`Key takeaway for "${lesson.title}": Analyze the state transitions carefully. Ensure your boundary conditions are properly set before proceeding to verification.`);
    } finally {
      setIsAskingLessonAi(false);
    }
  };

  const activeSavedKey = (() => {
    try {
      const saved = localStorage.getItem('sv_api_keys');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) return parsed[0].key;
      }
    } catch (e) {}
    return 'sv_live_crs_48b1c099e2df9845';
  })();

  const curlSnippet = `curl -X GET "http://localhost:8000/api/courses/${course.id}" \\\n  -H "X-API-Key: ${activeSavedKey}"`;

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

          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            {/* Interactive API Key Badge */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCourseApiModalOpen(true);
              }}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-mono font-semibold bg-[#0a0f24]/90 backdrop-blur-md text-cyan-300 border border-cyan-500/40 hover:bg-cyan-950/80 transition-colors shadow-sm"
              title="Course API & Neural Key Active"
            >
              <Key className="w-3 h-3 text-cyan-400" />
              <span>API Ready</span>
              {activeAiConfig.connected && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              )}
            </button>

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

              {/* Action Links: Course API & Syllabus */}
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCourseApiModalOpen(true);
                  }}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 underline decoration-cyan-500/30 underline-offset-4"
                  title="Insert API key and query course AI"
                >
                  <Key className="w-3 h-3" />
                  <span>API Key</span>
                </button>

                <button
                  onClick={() => setSyllabusOpen(true)}
                  className="text-xs font-mono text-slate-400 hover:text-white transition-colors underline decoration-slate-500/30 underline-offset-4"
                >
                  Syllabus
                </button>
              </div>
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
                    onClick={handleContinue}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer shadow-neon-cyan group/btn"
                    title={
                      course.id === 'crs-101' || course.title.toLowerCase().includes('quantum')
                        ? 'Navigate to external Quantum Computing content & documentation'
                        : 'Continue course'
                    }
                  >
                    <Play className="w-3.5 h-3.5 fill-cyan-400 group-hover/btn:scale-110 transition-transform" />
                    <span>Continue</span>
                    {(course.id === 'crs-101' || course.title.toLowerCase().includes('quantum') || course.externalUrl) && (
                      <ExternalLink className="w-3 h-3 text-cyan-400 group-hover/btn:translate-x-0.5 transition-transform" />
                    )}
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

      {/* ========================================================================= */}
      {/* ================= COURSE-SPECIFIC API & KEY MODAL ======================= */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isCourseApiModalOpen}
        onClose={() => setIsCourseApiModalOpen(false)}
        title={`${course.title} • API & Neural Key Hub`}
        maxWidth="max-w-2xl"
      >
        <div className="flex flex-col gap-5">
          
          {/* Header Banner */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                  Course ID: {course.id} • {course.category}
                </span>
                <h4 className="text-sm font-bold text-white">
                  Neural AI Tutor & REST Endpoint
                </h4>
              </div>
            </div>

            <div className="text-right font-mono text-xs">
              <span className="text-slate-400 block text-[10px] uppercase">AI Connection:</span>
              <span className={`font-bold ${activeAiConfig.connected ? 'text-emerald-400' : 'text-amber-400'}`}>
                {activeAiConfig.connected ? `${activeAiConfig.provider?.toUpperCase()} Active` : 'No Key'}
              </span>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setCourseApiTab('interactive_ai')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                courseApiTab === 'interactive_ai'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Ask Course AI</span>
            </button>

            <button
              onClick={() => setCourseApiTab('endpoint_curl')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                courseApiTab === 'endpoint_curl'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>cURL & Endpoints</span>
            </button>

            <button
              onClick={() => setCourseApiTab('key_setup')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                courseApiTab === 'key_setup'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>Insert / Change Key</span>
            </button>
          </div>

          {/* TAB 1: INTERACTIVE AI QUERY */}
          {courseApiTab === 'interactive_ai' && (
            <div className="flex flex-col gap-4 animate-in fade-in">
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 self-center">Quick Queries:</span>
                {[
                  `Summarize week 1 of ${course.title}`,
                  'Give me 2 practice quiz questions',
                  'Explain foundational equations'
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setCourseQuestion(q);
                      handleAskCourseAi(q);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <div className="relative">
                  <textarea
                    rows={3}
                    value={courseQuestion}
                    onChange={(e) => setCourseQuestion(e.target.value)}
                    placeholder={`Ask the Neural AI Tutor anything about ${course.title}...`}
                    className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                  />
                  <button
                    onClick={() => handleAskCourseAi()}
                    disabled={isAskingCourseAi || !courseQuestion.trim()}
                    className="absolute right-3 bottom-3 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-neon-cyan"
                  >
                    <Send className="w-3 h-3" />
                    <span>{isAskingCourseAi ? 'Generating...' : 'Ask AI'}</span>
                  </button>
                </div>
              </div>

              {courseAiReply && (
                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 animate-in fade-in">
                  <div className="flex items-center justify-between mb-2 text-xs font-mono">
                    <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5" />
                      <span>{course.title} AI Tutor Reply</span>
                    </span>
                    <span className="text-slate-400">{courseAiReply.latency}ms • {courseAiReply.provider}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/70 p-3 rounded-lg border border-slate-800">
                    {courseAiReply.reply}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CURL & ENDPOINTS */}
          {courseApiTab === 'endpoint_curl' && (
            <div className="flex flex-col gap-3 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Course REST API Endpoint:</span>
                <span className="text-cyan-300 font-bold">GET /api/courses/{course.id}</span>
              </div>

              <div className="relative p-4 rounded-xl bg-black/80 border border-slate-800 font-mono text-xs">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(curlSnippet);
                    setCopiedEndpoint(true);
                    addToast('cURL command copied!', 'info');
                    setTimeout(() => setCopiedEndpoint(false), 2000);
                  }}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all flex items-center gap-1 text-[11px]"
                >
                  {copiedEndpoint ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEndpoint ? 'Copied' : 'Copy'}</span>
                </button>
                <pre className="text-cyan-300 whitespace-pre-wrap">{curlSnippet}</pre>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-300 flex items-center justify-between">
                <span>Scope required: <code className="text-cyan-300 font-mono">read:courses</code></span>
                <span className="text-slate-400">Authenticated via <code className="text-slate-200 font-mono">X-API-Key</code></span>
              </div>
            </div>
          )}

          {/* TAB 3: INSERT / CHANGE KEY */}
          {courseApiTab === 'key_setup' && (
            <form onSubmit={handleSaveInlineKey} className="flex flex-col gap-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300">
                  Select Provider for this Course:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setInlineProvider('gemini')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                      inlineProvider === 'gemini'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-400/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Google Gemini
                  </button>
                  <button
                    type="button"
                    onClick={() => setInlineProvider('openai')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                      inlineProvider === 'openai'
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
                  type={showInlineKey ? 'text' : 'password'}
                  value={inlineKey}
                  onChange={(e) => setInlineKey(e.target.value)}
                  placeholder={`Insert ${inlineProvider === 'gemini' ? 'Gemini (AIzaSy...)' : 'OpenAI (sk-proj...)'} API Key`}
                  className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowInlineKey(!showInlineKey)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showInlineKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {activeAiConfig.connected && (
                <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Currently active: {activeAiConfig.provider?.toUpperCase()} ({activeAiConfig.maskedKey})</span>
                </div>
              )}

              <button
                type="submit"
                disabled={savingInlineKey || !inlineKey.trim()}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                <Key className="w-3.5 h-3.5" />
                <span>{savingInlineKey ? 'Saving API Key...' : 'Save & Link to Course'}</span>
              </button>
            </form>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                setIsCourseApiModalOpen(false);
                if (onOpenKeyModal) onOpenKeyModal();
              }}
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Manage All Developer API Keys</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsCourseApiModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>

      {/* ========================================================================= */}
      {/* ================= SYLLABUS & LESSONS MODAL ============================== */}
      {/* ========================================================================= */}
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

          {/* External Authoritative Content Card */}
          {(course.externalUrl || course.id === 'crs-101' || course.title.toLowerCase().includes('quantum')) && (
            <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-neon-cyan">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>External Course Knowledge Base</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      Live Reference
                    </span>
                  </h5>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Authoritative theoretical principles, qubit state vectors & physical realizations.
                  </p>
                </div>
              </div>
              <a
                href={course.externalUrl || 'https://en.wikipedia.org/wiki/Quantum_computing'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
              >
                <span>Open External Content</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          <div>
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Interactive Syllabus & Lesson Modules ({course.syllabus.length})</span>
            </h4>

            <div className="flex flex-col gap-2">
              {course.syllabus.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => {
                    setActiveLesson(lesson);
                    setLessonAiReply(null);
                  }}
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
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 animate-in fade-in flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-cyan-300 font-bold">
                  Active Simulator: Lesson {activeLesson.id}
                </span>
                <span className="text-xs text-slate-400 font-mono">{activeLesson.duration}</span>
              </div>
              <h5 className="text-sm font-semibold text-white">{activeLesson.title}</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Interactive neural lecture stream ready. Connect your terminal or IDE workspace to begin exercise simulations.
              </p>

              {/* Lesson AI Tutor Input Box */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-cyan-300 font-semibold flex items-center gap-1">
                    <Bot className="w-3.5 h-3.5" />
                    <span>Neural AI Lesson Tutor</span>
                  </span>
                  {activeAiConfig.connected ? (
                    <span className="text-emerald-400">{activeAiConfig.provider?.toUpperCase()} Connected</span>
                  ) : (
                    <button
                      onClick={() => setIsCourseApiModalOpen(true)}
                      className="text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <Key className="w-3 h-3" />
                      <span>Insert API Key</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={lessonQuestion}
                    onChange={(e) => setLessonQuestion(e.target.value)}
                    placeholder={`Ask AI about "${activeLesson.title}"...`}
                    className="flex-1 px-3 py-2 rounded-lg bg-black/60 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                  />
                  <button
                    onClick={() => handleAskLessonAi(activeLesson)}
                    disabled={isAskingLessonAi}
                    className="px-3 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold disabled:opacity-50 transition-all flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>{isAskingLessonAi ? 'Thinking...' : 'Ask'}</span>
                  </button>
                </div>

                {lessonAiReply && (
                  <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-xs text-slate-200 mt-1 leading-relaxed">
                    {lessonAiReply}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => {
                    updateCourseProgress(course.id, Math.min(100, course.progress + 15));
                    const nextLesson = course.syllabus.find((l) => l.id === activeLesson.id + 1);
                    if (nextLesson) {
                      setActiveLesson(nextLesson);
                      setLessonAiReply(null);
                    } else {
                      setActiveLesson(null);
                    }
                  }}
                  className="flex-1 py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Mark Studied & Move to Next Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
            <Link
              to="/planner"
              onClick={() => setSyllabusOpen(false)}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
            >
              <span>Schedule on Planner Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-2">
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
        </div>
      </Modal>
    </>
  );
};
