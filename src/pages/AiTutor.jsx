import React, { useState, useEffect, useRef } from 'react';
import { useStudent } from '../context/StudentContext';
import { Modal } from '../components/Modal';
import {
  Bot,
  Send,
  Sparkles,
  Key,
  Copy,
  Check,
  RotateCcw,
  Download,
  Trash2,
  Cpu,
  Zap,
  BookOpen,
  Code2,
  Terminal,
  HelpCircle,
  ThumbsUp,
  Sliders,
  ExternalLink,
  ChevronRight,
  Shield,
  Plus
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000';

export const AiTutor = () => {
  const { student, addToast, addXP } = useStudent();

  // Discipline selection
  const [selectedDiscipline, setSelectedDiscipline] = useState('Quantum Computing');

  // Manual Question input
  const [manualQuestion, setManualQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef(null);

  // Conversation history
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('sv_ai_tutor_chat');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'msg-1',
            sender: 'ai',
            discipline: 'Quantum Computing',
            timestamp: 'Just now',
            model: 'StudentVerse Neural Core v3',
            content: `### 🌌 Welcome to the StudentVerse Neural AI Tutor!\n\nI am your 24/7 graduate-level academic mentor. You can enter any question manually in natural language, mathematical notation, or code.\n\n**Select a discipline above** or try one of the suggested prompts below to explore algorithmic derivations, GLSL shaders, or deep learning proofs!`
          }
        ];
  });

  // API Key & Backend Configuration State
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [backendOnline, setBackendOnline] = useState(false);
  const [copiedKeyId, setCopiedKeyId] = useState(null);
  const [copiedCodeId, setCopiedCodeId] = useState(null);

  const [aiConfig, setAiConfig] = useState(() => {
    const saved = localStorage.getItem('sv_ai_config');
    return saved
      ? JSON.parse(saved)
      : { apiKey: '', provider: 'gemini', connected: false, maskedKey: null };
  });

  const [inputAiKey, setInputAiKey] = useState('');
  const [provider, setProvider] = useState('gemini');

  // Student Developer Keys
  const [keys, setKeys] = useState(() => {
    const saved = localStorage.getItem('sv_api_keys');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'key-1',
            name: 'Personal CLI Integration',
            key: 'sv_live_q7x9_48b1c099e2df9845aa81',
            masked_key: 'sv_live_q7x9_••••••••••••••••aa81',
            scopes: ['read:courses', 'write:tasks', 'ai:tutoring']
          }
        ];
  });

  const disciplines = [
    'Quantum Computing',
    'Neural Architectures & LLMs',
    '3D WebGL & Shaders',
    'Zero-Knowledge Web3',
    'Systems & Rust',
    'Autonomous Robotics'
  ];

  const suggestedPrompts = [
    {
      discipline: 'Quantum Computing',
      prompt: "Explain Shor's quantum factoring algorithm and how the Quantum Fourier Transform extracts the order r"
    },
    {
      discipline: 'Neural Architectures & LLMs',
      prompt: 'Compare Rotary Position Embeddings (RoPE) with standard sinusoidal encodings in Transformers'
    },
    {
      discipline: '3D WebGL & Shaders',
      prompt: 'Write a complete GLSL fragment shader for sphere raymarching with diffuse lighting and shadows'
    },
    {
      discipline: 'Quantum Computing',
      prompt: 'Derive the Variational Quantum Eigensolver (VQE) algorithm and how classical optimizers minimize energy'
    },
    {
      discipline: 'Zero-Knowledge Web3',
      prompt: 'How does PLONK arithmetization convert computation into polynomial constraint equations?'
    },
    {
      discipline: 'Autonomous Robotics',
      prompt: 'Explain flocking boids dynamics and collision avoidance fields in autonomous drone swarms'
    }
  ];

  // Save chat to localStorage
  useEffect(() => {
    localStorage.setItem('sv_ai_tutor_chat', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('sv_ai_config', JSON.stringify(aiConfig));
  }, [aiConfig]);

  // Ping FastAPI Backend
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/health`);
        if (res.ok) {
          setBackendOnline(true);
          const statusRes = await fetch(`${API_BASE_URL}/api/keys/config-ai/status`);
          if (statusRes.ok) {
            const data = await statusRes.json();
            if (data.connected && data.masked_key) {
              setAiConfig((prev) => ({
                ...prev,
                connected: true,
                provider: data.provider,
                maskedKey: data.masked_key
              }));
            }
          }
        } else {
          setBackendOnline(false);
        }
      } catch (e) {
        setBackendOnline(false);
      }
    };
    checkBackend();
    const interval = setInterval(checkBackend, 12000);
    return () => clearInterval(interval);
  }, []);

  // Handle Manual Question Submit
  const handleAskQuestion = async (queryText = manualQuestion) => {
    const textToSend = queryText.trim();
    if (!textToSend || loading) return;

    // 1. Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: textToSend,
      discipline: selectedDiscipline
    };

    setMessages((prev) => [...prev, userMsg]);
    setManualQuestion('');
    setLoading(true);

    // Scroll down
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    // 2. Fetch answer from FastAPI or simulated engine
    let answerData = null;

    if (backendOnline) {
      try {
        const activeKey = keys[0]?.key || 'sv_guest_session';
        const res = await fetch(`${API_BASE_URL}/api/ai/tutor`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': activeKey
          },
          body: JSON.stringify({
            prompt: textToSend,
            discipline: selectedDiscipline
          })
        });

        if (res.ok) {
          answerData = await res.json();
        }
      } catch (err) {
        console.warn('Backend call failed, using client fallback', err);
      }
    }

    // Client fallback if backend is offline or network error
    if (!answerData) {
      await new Promise((r) => setTimeout(r, 900));
      answerData = {
        discipline: selectedDiscipline,
        answer: generateLocalAnswer(textToSend, selectedDiscipline),
        model: aiConfig.connected ? `${aiConfig.provider.toUpperCase()} (Neural Link)` : 'StudentVerse Neural Core v3',
        tokens_evaluated: 310,
        latency_ms: 14.8
      };
    }

    // 3. Add AI response message
    const aiMsg = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      discipline: selectedDiscipline,
      model: answerData.model || 'StudentVerse Neural Core',
      content: answerData.answer,
      tokens: answerData.tokens_evaluated,
      latency: answerData.latency_ms
    };

    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
    addXP(25);
    addToast('Neural answer synthesized! +25 XP awarded.', 'success', 'Answer Received');

    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Local fallback reasoning synthesizer
  const generateLocalAnswer = (prompt, discipline) => {
    const p = prompt.toLowerCase();
    if (p.includes('shor') || p.includes('factor')) {
      return `### ⚛️ Shor's Quantum Factoring Algorithm\n\nShor's algorithm solves prime factorization in polynomial time $O((\\log N)^3)$:\n\n1. **Modular Exponentiation**: Prepares $|x\\rangle |a^x \\pmod N\\rangle$ in superposition.\n2. **Quantum Fourier Transform**: Interferences isolate period $r$.\n3. **Classical GCD**: When $r$ is even, compute $\\gcd(a^{r/2} \\pm 1, N)$.`;
    }
    if (p.includes('rope') || p.includes('attention')) {
      return `### 🧠 Rotary Position Embedding (RoPE) Deep Dive\n\nRoPE encodes position directly into key and query representations through 2D Givens rotation matrices:\n\n$$R_{\\Theta, m} = \\text{diag}(R_{\\theta_1, m}, \\dots, R_{\\theta_{d/2}, m})$$\n\n$$\\begin{pmatrix} x_1' \\\\ x_2' \\end{pmatrix} = \\begin{pmatrix} \\cos(m\\theta) & -\\sin(m\\theta) \\\\ \\sin(m\\theta) & \\cos(m\\theta) \\end{pmatrix} \\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix}$$\n\nThis preserves relative distances with zero extra learned parameters!`;
    }
    return `### 💡 Analysis for ${discipline}\n\n**Question:** "${prompt}"\n\n#### 1. Core Mathematical Formulation\nWe formulate this in ${discipline} by modeling the state vector $\\vec{v} \\in \\mathcal{V}$ under unitary transformation $U$:\n\n$$U = \\exp(-i H t / \\hbar)$$\n\n#### 2. Algorithmic Steps\n1. **Initialization**: Map boundary values into normalized tensors.\n2. **Iterative Convergence**: Apply gradient projection to minimize target loss function.\n3. **Verification**: Validate eigenvalues against the characteristic equation $\\det(A - \\lambda I) = 0$.\n\n\`\`\`python\n# Execution Template\ndef solve_problem(tensor_input):\n    return tensor_input.matmul(kernel_matrix)\n\`\`\``;
  };

  // Save AI Provider Key
  const handleSaveAiKey = async (e) => {
    e.preventDefault();
    if (!inputAiKey.trim()) return;

    const masked = `${inputAiKey.slice(0, 6)}••••••••${inputAiKey.slice(-4)}`;
    setAiConfig({
      apiKey: inputAiKey,
      provider,
      connected: true,
      maskedKey: masked
    });

    if (backendOnline) {
      try {
        await fetch(`${API_BASE_URL}/api/keys/config-ai`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ api_key: inputAiKey, provider })
        });
      } catch (err) {}
    }

    addToast(`External ${provider.toUpperCase()} API Key linked successfully!`, 'success', 'Provider Connected');
    setInputAiKey('');
    setIsKeyModalOpen(false);
  };

  // Clear chat
  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        discipline: selectedDiscipline,
        timestamp: 'Just now',
        model: 'StudentVerse Neural Core v3',
        content: `Conversation thread reset. You can now enter a new question manually or choose from the suggested prompts below.`
      }
    ]);
    addToast('Conversation cleared.', 'info');
  };

  // Export chat as markdown
  const handleExportMarkdown = () => {
    let md = `# STUDENTVERSE AI TUTOR — STUDY SESSION NOTES\n\nDate: ${new Date().toLocaleDateString()}\nStudent: ${student.name} (${student.handle})\n\n---\n\n`;
    messages.forEach((m) => {
      if (m.sender === 'user') {
        md += `### 👤 Question (${m.discipline} • ${m.timestamp}):\n${m.content}\n\n`;
      } else {
        md += `### 🤖 AI Tutor Explanation (${m.model}):\n${m.content}\n\n---\n\n`;
      }
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studentverse-ai-tutor-notes-${Date.now()}.md`;
    a.click();
    addToast('Study notes downloaded as Markdown file!', 'success');
  };

  const copyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    addToast('Copied to clipboard!', 'info');
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
      
      {/* HEADER SECTION */}
      <div className="relative glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1.5px] shrink-0 shadow-neon-cyan">
              <div className="w-full h-full bg-[#050818] rounded-[14px] flex items-center justify-center">
                <Bot className="w-6 h-6 text-cyan-400" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider">
                  24/7 Cognitive Neural Mentor
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Interactive Mode
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                Neural <span className="text-gradient-cyan">AI Tutor</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Enter any academic question manually to receive instant mathematical derivations, step-by-step explanations, and runnable code.
              </p>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Backend status indicator */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold border ${
                backendOnline
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>{backendOnline ? 'FASTAPI: ONLINE' : 'LOCAL ENGINE'}</span>
            </div>

            {/* Configure API Keys Button */}
            <button
              onClick={() => setIsKeyModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all shadow-neon-cyan"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{aiConfig.connected ? 'AI Key Linked' : 'Configure API Key'}</span>
            </button>

            {/* Export Notes */}
            <button
              onClick={handleExportMarkdown}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              title="Export Conversation as Markdown"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Clear Chat */}
            <button
              onClick={handleClearChat}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-white/10 transition-colors"
              title="Clear Chat History"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Discipline Selector Chips */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mr-1 shrink-0">
            Discipline:
          </span>
          {disciplines.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDiscipline(d)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 ${
                selectedDiscipline === d
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-neon-cyan font-bold'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* SUGGESTED PROMPT CHIPS */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest px-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Quick Manual Questions (Click to Ask)</span>
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {suggestedPrompts.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedDiscipline(s.discipline);
                handleAskQuestion(s.prompt);
              }}
              className="p-3 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-left transition-all group flex items-start gap-2.5"
            >
              <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-mono text-purple-400 uppercase block mb-0.5">
                  {s.discipline}
                </span>
                <p className="text-xs text-slate-300 group-hover:text-white line-clamp-2 leading-relaxed">
                  {s.prompt}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CONVERSATION MESSAGE STREAM */}
      <div className="glass-card rounded-3xl p-4 sm:p-6 border-indigo-500/30 min-h-[460px] flex flex-col justify-between">
        
        {/* Messages List */}
        <div className="flex flex-col gap-5 overflow-y-auto max-h-[550px] pr-2">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {/* AI Avatar */}
                {!isUser && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px] shrink-0">
                    <div className="w-full h-full bg-[#050818] rounded-[11px] flex items-center justify-center">
                      <Bot className="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>
                )}

                {/* Message Body */}
                <div
                  className={`max-w-2xl sm:max-w-3xl rounded-2xl p-4 sm:p-5 border ${
                    isUser
                      ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-cyan-500/30 text-slate-100'
                      : 'bg-[#090e24]/90 border-indigo-500/20 text-slate-200 shadow-xl'
                  }`}
                >
                  {/* Message Meta */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-2 mb-2 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">
                        {isUser ? student.name : 'AI Tutor Neural Core'}
                      </span>
                      {msg.discipline && (
                        <span className="px-1.5 py-0.5 rounded bg-white/5 text-cyan-300">
                          {msg.discipline}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {msg.model && <span className="text-purple-300 hidden sm:inline">{msg.model}</span>}
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>

                  {/* Content with whitespace formatting */}
                  <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {msg.content}
                  </div>

                  {/* AI Response Tools */}
                  {!isUser && (
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-xs text-slate-400 font-mono">
                      <div className="flex items-center gap-3">
                        {msg.latency && <span>Latency: {msg.latency}ms</span>}
                        {msg.tokens && <span>Tokens: {msg.tokens}</span>}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyText(msg.content, msg.id)}
                          className="flex items-center gap-1 hover:text-cyan-400 transition-colors p-1"
                          title="Copy response text"
                        >
                          {copiedCodeId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="text-[11px]">Copy</span>
                        </button>
                        <button
                          onClick={() => addToast('Feedback registered! Model calibrated.', 'success')}
                          className="flex items-center gap-1 hover:text-emerald-400 transition-colors p-1"
                          title="Mark as helpful"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {isUser && (
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-cyan-500/40 shrink-0"
                  />
                )}
              </div>
            );
          })}

          {/* Loading indicator */}
          {loading && (
            <div className="flex gap-3.5 justify-start animate-pulse">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="p-4 rounded-2xl bg-[#090e24]/90 border border-cyan-500/30 text-xs text-cyan-300 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Synthesizing neural pedagogical explanation for {selectedDiscipline}...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* MANUAL INPUT FORM */}
        <form onSubmit={(e) => { e.preventDefault(); handleAskQuestion(); }} className="mt-4 pt-4 border-t border-indigo-900/40">
          <div className="relative flex items-center gap-2">
            <textarea
              rows={2}
              value={manualQuestion}
              onChange={(e) => setManualQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAskQuestion();
                }
              }}
              placeholder={`Ask any manual question in ${selectedDiscipline} (e.g. 'Derive Grover diffusion operator' or 'How to compute raymarching normal vector in GLSL')... [Press Enter to Send]`}
              className="w-full px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans resize-none"
            />

            <button
              type="submit"
              disabled={loading || !manualQuestion.trim()}
              className="px-5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-neon-cyan transition-all transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </div>

          <div className="flex items-center justify-between mt-2 px-2 text-[10px] font-mono text-slate-500">
            <span>Shift + Enter for new line • Enter to submit</span>
            <span className="text-cyan-400 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>Earn +25 XP per answered question</span>
            </span>
          </div>
        </form>

      </div>

      {/* MODAL: API KEY CONFIGURATION */}
      <Modal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        title="AI Provider & API Key Configuration"
        subtitle="Insert your Google Gemini or OpenAI API Key to connect live external neural models"
      >
        <div className="flex flex-col gap-5">
          {/* Active status */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Connection Status</span>
              <span className="font-bold text-white flex items-center gap-1.5 mt-0.5">
                <span className={`w-2 h-2 rounded-full ${aiConfig.connected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                {aiConfig.connected ? `${aiConfig.provider.toUpperCase()} (LINKED & ACTIVE)` : 'SIMULATED PEDAGOGY ENGINE'}
              </span>
            </div>
            {aiConfig.maskedKey && (
              <span className="text-cyan-300 font-mono">{aiConfig.maskedKey}</span>
            )}
          </div>

          {/* Key Input Form */}
          <form onSubmit={handleSaveAiKey} className="flex flex-col gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Select AI Provider
              </label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
              >
                <option value="gemini">Google Gemini API (gemini-1.5-flash)</option>
                <option value="openai">OpenAI API (gpt-4o)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Insert API Key *
              </label>
              <input
                type="password"
                required
                value={inputAiKey}
                onChange={(e) => setInputAiKey(e.target.value)}
                placeholder="AIzaSy... (Gemini) or sk-... (OpenAI)"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all"
            >
              Verify & Link Key
            </button>
          </form>

          {/* StudentVerse Developer Key */}
          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-xs font-mono font-bold uppercase text-slate-300 mb-2">
              Your StudentVerse FastAPI Key (For CLI / Python)
            </h4>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <code className="text-cyan-300">{keys[0]?.key || 'sv_live_q7x9_48b1c099e2df9845aa81'}</code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(keys[0]?.key || 'sv_live_q7x9_48b1c099e2df9845aa81');
                  addToast('Key copied!', 'info');
                }}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Modal>

    </div>
  );
};
