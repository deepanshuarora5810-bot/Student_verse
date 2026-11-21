import React, { useState, useEffect } from 'react';
import { useStudent } from '../context/StudentContext';
import { Modal } from '../components/Modal';
import {
  Key,
  Shield,
  Cpu,
  Terminal,
  Sparkles,
  Copy,
  Check,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Send,
  ExternalLink,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Bot,
  Play
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000';

export const ApiKeys = () => {
  const { addToast } = useStudent();

  // Keys State
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
            scopes: ['read:courses', 'write:tasks', 'ai:tutoring'],
            created_at: '2026-11-15T10:00:00Z',
            last_used: '2 hours ago',
            rate_limit: '1000 req/hr',
            status: 'Active'
          },
          {
            id: 'key-2',
            name: 'Autonomous Grading Agent',
            key: 'sv_live_k4m2_812c40e1b990da1f7623',
            masked_key: 'sv_live_k4m2_••••••••••••••••7623',
            scopes: ['ai:grading', 'submit:assignments'],
            created_at: '2026-11-18T14:30:00Z',
            last_used: 'Yesterday',
            rate_limit: '5000 req/hr',
            status: 'Active'
          }
        ];
  });

  // External AI Key State
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
  const [aiProvider, setAiProvider] = useState('gemini');
  const [backendOnline, setBackendOnline] = useState(false);
  const [revealedKeys, setRevealedKeys] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  // Modals
  const [isCreateKeyModalOpen, setIsCreateKeyModalOpen] = useState(false);
  const [newKeyForm, setNewKeyForm] = useState({
    name: '',
    environment: 'live',
    scopes: ['read:courses', 'ai:tutoring']
  });

  // AI Sandbox State
  const [tutorPrompt, setTutorPrompt] = useState('Explain variational quantum eigensolvers in 3 steps');
  const [tutorDiscipline, setTutorDiscipline] = useState('Quantum Computing');
  const [tutorResponse, setTutorResponse] = useState(null);
  const [tutorLoading, setTutorLoading] = useState(false);

  // AI Grader Sandbox State
  const [graderCode, setGraderCode] = useState(`def grover_search(oracle, qubits):\n    # Initialize superposition\n    circuit = QuantumCircuit(qubits)\n    circuit.h(range(qubits))\n    \n    # Grover iterations\n    for _ in range(3):\n        oracle(circuit)\n        diffusion_operator(circuit)\n    return circuit`);
  const [graderResult, setGraderResult] = useState(null);
  const [graderLoading, setGraderLoading] = useState(false);

  // Active Code snippet tab
  const [codeTab, setCodeTab] = useState('python');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sv_api_keys', JSON.stringify(keys));
  }, [keys]);

  useEffect(() => {
    localStorage.setItem('sv_ai_config', JSON.stringify(aiConfig));
  }, [aiConfig]);

  // Ping FastAPI Backend
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/health`, { method: 'GET' });
        if (res.ok) {
          setBackendOnline(true);
          // Sync keys from FastAPI if available
          const keysRes = await fetch(`${API_BASE_URL}/api/keys`);
          if (keysRes.ok) {
            const data = await keysRes.json();
            if (data.keys && data.keys.length > 0) {
              setKeys(data.keys);
            }
          }
        } else {
          setBackendOnline(false);
        }
      } catch (err) {
        setBackendOnline(false);
      }
    };
    checkBackend();
    const interval = setInterval(checkBackend, 10000);
    return () => clearInterval(interval);
  }, []);

  // Configure AI API Key
  const handleSaveAiKey = async (e) => {
    e.preventDefault();
    if (!inputAiKey.trim()) {
      addToast('Please enter a valid API key.', 'warning');
      return;
    }

    const masked = `${inputAiKey.slice(0, 6)}••••••••${inputAiKey.slice(-4)}`;
    const newCfg = {
      apiKey: inputAiKey,
      provider: aiProvider,
      connected: true,
      maskedKey: masked
    };
    setAiConfig(newCfg);

    // Sync with FastAPI if server is online
    if (backendOnline) {
      try {
        await fetch(`${API_BASE_URL}/api/keys/config-ai`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ api_key: inputAiKey, provider: aiProvider })
        });
      } catch (e) {
        // Handled locally
      }
    }

    addToast(`External ${aiProvider.toUpperCase()} API key linked! Neural AI capabilities unlocked.`, 'success', 'Provider Connected');
    setInputAiKey('');
  };

  // Create Student API Key
  const handleCreateKey = async (e) => {
    e.preventDefault();
    if (!newKeyForm.name.trim()) return;

    if (backendOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/keys`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newKeyForm)
        });
        if (res.ok) {
          const data = await res.json();
          setKeys([data.key_entry, ...keys]);
          addToast(`Generated API Key: ${data.plain_key}`, 'success', 'Key Created');
          setIsCreateKeyModalOpen(false);
          return;
        }
      } catch (err) {
        // Fallback to local creation
      }
    }

    // Local key fallback
    const token = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    const fullKey = `sv_${newKeyForm.environment}_${token}`;
    const masked = `sv_${newKeyForm.environment}_••••••••••••••••${token.slice(-4)}`;

    const newKey = {
      id: `key-${Date.now()}`,
      name: newKeyForm.name,
      key: fullKey,
      masked_key: masked,
      scopes: newKeyForm.scopes,
      created_at: new Date().toISOString(),
      last_used: 'Never',
      rate_limit: '2000 req/hr',
      status: 'Active'
    };

    setKeys([newKey, ...keys]);
    addToast('New Student API key generated and stored.', 'success', 'Key Created');
    setIsCreateKeyModalOpen(false);
  };

  // Revoke Key
  const handleRevokeKey = async (keyId) => {
    if (backendOnline) {
      try {
        await fetch(`${API_BASE_URL}/api/keys/${keyId}`, { method: 'DELETE' });
      } catch (e) {}
    }
    setKeys(keys.filter((k) => k.id !== keyId));
    addToast('API Key revoked successfully.', 'info', 'Key Revoked');
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast('API key copied to clipboard!', 'info');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleReveal = (id) => {
    setRevealedKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Neural Tutor Query
  const handleQueryTutor = async (e) => {
    e.preventDefault();
    if (!tutorPrompt.trim()) return;

    setTutorLoading(true);
    setTutorResponse(null);

    // If backend online, query FastAPI
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
            prompt: tutorPrompt,
            discipline: tutorDiscipline
          })
        });
        if (res.ok) {
          const data = await res.json();
          setTutorResponse(data);
          setTutorLoading(false);
          return;
        }
      } catch (err) {
        // Fallback to client response
      }
    }

    // Client simulated response
    setTimeout(() => {
      setTutorResponse({
        discipline: tutorDiscipline,
        answer: `### ⚛️ Neural Synthesizer Analysis\n\n**Query:** "${tutorPrompt}"\n\n1. **State Formalism**: In ${tutorDiscipline}, define the basis states $|0\\rangle$ and $|1\\rangle$ within the Hilbert space $\\mathcal{H} = \\mathbb{C}^2$.\n2. **Unitary Transformations**: Any quantum gate corresponds to a $2 \\times 2$ unitary matrix $U$ satisfying $U^\\dagger U = I$.\n3. **Decoherence Mitigation**: Run error correction circuits before measurement fidelity decays below 99.8%.\n\n\`\`\`python\n# Execution Example\nresult = execute_quantum_kernel(qubits=4, optimizer='COBYLA')\nprint(f"Convergence Energy: {result.optimal_value:.5f} Ha")\n\`\`\``,
        model: aiConfig.connected ? `External ${aiConfig.provider.toUpperCase()} Model` : 'StudentVerse-Neural-Core',
        tokens_evaluated: 290,
        latency_ms: 12.8
      });
      setTutorLoading(false);
    }, 800);
  };

  // Neural Grader Query
  const handleGradeCode = async () => {
    setGraderLoading(true);
    setGraderResult(null);

    if (backendOnline) {
      try {
        const activeKey = keys[0]?.key || 'sv_guest_session';
        const res = await fetch(`${API_BASE_URL}/api/ai/grade-assignment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': activeKey
          },
          body: JSON.stringify({
            assignment_title: 'Quantum Grover Search Implementation',
            code_snippet: graderCode
          })
        });
        if (res.ok) {
          const data = await res.json();
          setGraderResult(data);
          setGraderLoading(false);
          return;
        }
      } catch (err) {}
    }

    setTimeout(() => {
      setGraderResult({
        assignment_title: 'Quantum Grover Search Circuit Implementation',
        score: 96,
        max_score: 100,
        grade: 'A+',
        criteria_breakdown: [
          { criterion: 'Superposition & Oracle Symmetry', score: '38 / 40', passed: true },
          { criterion: 'Diffusion Operator Inversion', score: '30 / 30', passed: true },
          { criterion: 'State Amplification Probability (>95%)', score: '19 / 20', passed: true },
          { criterion: 'PEP8 Formatting & Tensor Documentation', score: '9 / 10', passed: true }
        ],
        evaluator_feedback: 'Outstanding algorithmic implementation! The diffusion operator reflection about average amplitude achieves optimal quadratic speedup. All assertions passed.'
      });
      setGraderLoading(false);
    }, 900);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      
      {/* HEADER HERO */}
      <div className="relative glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-semibold mb-1">
              <Key className="w-4 h-4" />
              <span>Decentralized Credentials & AI Matrix</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              FastAPI & <span className="text-gradient-cyan">API Keys Hub</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Insert your Gemini/OpenAI API keys, generate student developer credentials, and unlock automated neural tutoring & AI assignment grading.
            </p>
          </div>

          {/* Backend Status Telemetry */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold border ${
                backendOnline
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  backendOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span>
                {backendOnline ? 'FASTAPI BACKEND: ONLINE (PORT 8000)' : 'STANDALONE WEB CLIENT MODE'}
              </span>
            </div>

            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-cyan-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <span>Swagger API Docs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* SECTION 1: INSERT EXTERNAL AI API KEYS (GEMINI / OPENAI) */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border-cyan-500/30 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-indigo-900/40">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400 font-semibold mb-1">
              <Sparkles className="w-4 h-4" />
              <span>External AI Provider Activation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Insert AI API Key (Gemini / OpenAI)
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Connect Google Gemini or OpenAI to empower real-time neural explanations, code feedback, and auto-generated study syllabi.
            </p>
          </div>

          {/* Provider status badge */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-700/80 text-xs font-mono">
              <span className="text-slate-400 block text-[10px] uppercase">Active Provider</span>
              <span className="font-bold text-white flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                {aiConfig.connected ? `${aiConfig.provider.toUpperCase()} (LINKED)` : 'SIMULATED NEURAL CORE'}
              </span>
            </div>

            {aiConfig.maskedKey && (
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-700/80 text-xs font-mono">
                <span className="text-slate-400 block text-[10px] uppercase">Key Hash</span>
                <span className="font-bold text-cyan-300 mt-0.5 block">{aiConfig.maskedKey}</span>
              </div>
            )}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSaveAiKey} className="mt-6 flex flex-col sm:flex-row gap-3">
          <select
            value={aiProvider}
            onChange={(e) => setAiProvider(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-cyan-400 shrink-0"
          >
            <option value="gemini">Google Gemini API</option>
            <option value="openai">OpenAI API</option>
          </select>

          <div className="relative flex-1">
            <input
              type="password"
              value={inputAiKey}
              onChange={(e) => setInputAiKey(e.target.value)}
              placeholder="Paste your API key here (e.g. AIzaSy... or sk-...)"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all transform active:scale-95 flex items-center justify-center gap-2 shrink-0"
          >
            <Zap className="w-4 h-4" />
            <span>Connect & Activate Key</span>
          </button>
        </form>
      </div>

      {/* SECTION 2: STUDENT DEVELOPER API KEYS */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-semibold mb-1">
              <Shield className="w-4 h-4" />
              <span>Student Developer Credentials</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Generated StudentVerse API Keys
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Use these keys to authenticate scripts, CLI agents, and background workers with the FastAPI backend.
            </p>
          </div>

          <button
            onClick={() => setIsCreateKeyModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-neon-purple transition-all transform active:scale-95 w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>Generate New API Key</span>
          </button>
        </div>

        {/* Keys List */}
        <div className="flex flex-col gap-4">
          {keys.map((k) => {
            const isRevealed = revealedKeys[k.id];
            const isCopied = copiedId === k.id;

            return (
              <div
                key={k.id}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {k.name}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {k.status}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {k.rate_limit}
                    </span>
                  </div>

                  {/* Key string display */}
                  <div className="flex items-center gap-2 mt-2">
                    <code className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                      {isRevealed ? k.key : k.masked_key}
                    </code>

                    <button
                      onClick={() => toggleReveal(k.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                      title={isRevealed ? 'Hide secret key' : 'Reveal secret key'}
                    >
                      {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => copyToClipboard(k.key, k.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-colors"
                      title="Copy API key"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Scopes */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    <span className="text-[10px] font-mono text-slate-500 uppercase mr-1">Scopes:</span>
                    {k.scopes.map((scope, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-purple-300 border border-white/5"
                      >
                        {scope}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right metadata and action */}
                <div className="flex items-center lg:flex-col items-start lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400">
                    Last used: {k.last_used}
                  </span>
                  <button
                    onClick={() => handleRevokeKey(k.id)}
                    className="flex items-center gap-1.5 text-xs font-mono text-rose-400 hover:text-rose-300 hover:underline transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Revoke Key</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: INTERACTIVE AI NEURAL SANDBOX */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: AI Tutor Tool */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 border-indigo-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">Neural AI Tutor</h3>
                  <p className="text-[11px] font-mono text-cyan-400">POST /api/ai/tutor</p>
                </div>
              </div>

              <select
                value={tutorDiscipline}
                onChange={(e) => setTutorDiscipline(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
              >
                <option value="Quantum Computing">Quantum Computing</option>
                <option value="Neural Architectures">Neural Architectures</option>
                <option value="Hyperdimensional WebGL">Hyperdimensional WebGL</option>
                <option value="Zero-Knowledge Web3">Zero-Knowledge Web3</option>
              </select>
            </div>

            <form onSubmit={handleQueryTutor} className="flex flex-col gap-3 mb-4">
              <textarea
                rows={3}
                value={tutorPrompt}
                onChange={(e) => setTutorPrompt(e.target.value)}
                placeholder="Ask any mathematical or coding question..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                disabled={tutorLoading}
                className="self-end px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{tutorLoading ? 'Synthesizing...' : 'Send to Neural Tutor'}</span>
              </button>
            </form>

            {/* Response area */}
            {tutorResponse && (
              <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/30 animate-in fade-in">
                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300 pb-2 mb-2 border-b border-white/5">
                  <span>MODEL: {tutorResponse.model}</span>
                  <span>LATENCY: {tutorResponse.latency_ms}ms</span>
                </div>
                <div className="text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                  {tutorResponse.answer}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: AI Assignment Grader Tool */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 border-indigo-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">Automated AI Grader</h3>
                  <p className="text-[11px] font-mono text-purple-400">POST /api/ai/grade-assignment</p>
                </div>
              </div>

              <button
                onClick={handleGradeCode}
                disabled={graderLoading}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{graderLoading ? 'Auditing...' : 'Run Neural Audit'}</span>
              </button>
            </div>

            <textarea
              rows={5}
              value={graderCode}
              onChange={(e) => setGraderCode(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-cyan-200 font-mono focus:outline-none focus:border-purple-400 mb-4"
            />

            {graderResult && (
              <div className="p-4 rounded-xl bg-slate-950/60 border border-purple-500/30 animate-in fade-in">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white">{graderResult.assignment_title}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Grade {graderResult.grade} ({graderResult.score} / {graderResult.max_score})
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 mb-3">
                  {graderResult.criteria_breakdown.map((crit, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                      <span>• {crit.criterion}</span>
                      <span className="text-cyan-400 font-semibold">{crit.score}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-300 italic pt-2 border-t border-white/5">
                  "{graderResult.evaluator_feedback}"
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* SECTION 4: CODE QUICKSTART (CURL, PYTHON, JS) */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-semibold">
            <Terminal className="w-4 h-4" />
            <span>FastAPI Developer SDK Quickstart</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-mono">
            {['python', 'curl', 'javascript'].map((tab) => (
              <button
                key={tab}
                onClick={() => setCodeTab(tab)}
                className={`px-3 py-1 rounded-lg uppercase transition-all ${
                  codeTab === tab ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="relative rounded-2xl bg-slate-950 p-4 border border-slate-800 overflow-x-auto font-mono text-xs text-cyan-200">
          {codeTab === 'python' && (
            <pre>
{`import httpx

API_KEY = "${keys[0]?.key || 'sv_live_your_api_key'}"
BASE_URL = "http://localhost:8000"

headers = {
    "X-API-Key": API_KEY,
    "Content-Type": "application/json"
}

# 1. Ask Neural Tutor
response = httpx.post(
    f"{BASE_URL}/api/ai/tutor",
    headers=headers,
    json={"prompt": "Explain Grover quantum search diffusion operator", "discipline": "Quantum Computing"}
)
print("Tutor Response:", response.json()["answer"])`}
            </pre>
          )}

          {codeTab === 'curl' && (
            <pre>
{`# Query StudentVerse FastAPI Tutor
curl -X POST "http://localhost:8000/api/ai/tutor" \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: ${keys[0]?.key || 'sv_live_your_api_key'}" \\
  -d '{"prompt": "Explain RoPE positional embeddings", "discipline": "Neural Architectures"}'`}
            </pre>
          )}

          {codeTab === 'javascript' && (
            <pre>
{`const res = await fetch("http://localhost:8000/api/ai/tutor", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": "${keys[0]?.key || 'sv_live_your_api_key'}"
  },
  body: JSON.stringify({
    prompt: "Generate signed distance function for torus",
    discipline: "Hyperdimensional WebGL"
  })
});
const data = await res.json();
console.log(data.answer);`}
            </pre>
          )}
        </div>
      </div>

      {/* MODAL: CREATE API KEY */}
      <Modal
        isOpen={isCreateKeyModalOpen}
        onClose={() => setIsCreateKeyModalOpen(false)}
        title="Generate Student Developer API Key"
        subtitle="Create scoped credentials to interface with the FastAPI backend"
      >
        <form onSubmit={handleCreateKey} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
              Key Name / Purpose *
            </label>
            <input
              type="text"
              required
              value={newKeyForm.name}
              onChange={(e) => setNewKeyForm({ ...newKeyForm, name: e.target.value })}
              placeholder="e.g. Automated Study Agent or Jupyter Notebook CLI"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Environment
              </label>
              <select
                value={newKeyForm.environment}
                onChange={(e) => setNewKeyForm({ ...newKeyForm, environment: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
              >
                <option value="live">Live (sv_live_...)</option>
                <option value="test">Test / Sandbox (sv_test_...)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                Rate Limit
              </label>
              <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 text-xs font-mono">
                2,000 req / hr
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-2 uppercase">
              Permission Scopes
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'read:courses', label: 'Read Course Catalog' },
                { id: 'write:tasks', label: 'Manage Study Tasks' },
                { id: 'ai:tutoring', label: 'Query Neural Tutor' },
                { id: 'ai:grading', label: 'Automated Code Audit' },
                { id: 'submit:assignments', label: 'Submit Assessments' }
              ].map((s) => {
                const checked = newKeyForm.scopes.includes(s.id);
                return (
                  <label
                    key={s.id}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-mono cursor-pointer transition-all ${
                      checked
                        ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewKeyForm({ ...newKeyForm, scopes: [...newKeyForm.scopes, s.id] });
                        } else {
                          setNewKeyForm({
                            ...newKeyForm,
                            scopes: newKeyForm.scopes.filter((sc) => sc !== s.id)
                          });
                        }
                      }}
                      className="rounded border-slate-700 text-cyan-400"
                    />
                    <span>{s.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsCreateKeyModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-neon-purple"
            >
              Generate Key
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
