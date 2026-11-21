import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CompanionOrb3D } from '../../three/CompanionOrb3D';
import { useStudent } from '../../context/StudentContext';
import {
  Sparkles,
  X,
  Send,
  Bot,
  HelpCircle,
  Lightbulb,
  BookOpen,
  ArrowRight,
  BrainCircuit
} from 'lucide-react';

export const AiCompanionModal = () => {
  const { companionOpen, toggleCompanion, addToast } = useStudent();
  const [messages, setMessages] = useState([
    {
      sender: 'aura',
      text: "Greetings, scholar! I'm Aura, your personal 3D neural learning companion. How can I assist your study session right now?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const quickPrompts = [
    'Explain Transformer Self-Attention',
    'How does Stack vs Heap memory work?',
    'Quiz me on Shor\'s Algorithm',
    'Give me an optimal study suggestion'
  ];

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsThinking(true);

    try {
      // Connect to FastAPI backend
      const res = await fetch('http://localhost:8000/api/tutor/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, subject: 'Computer Science' })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            sender: 'aura',
            text: data.answer || "I have analyzed your query through our neural pedagogy model."
          }
        ]);
        setIsThinking(false);
        return;
      }
    } catch (e) {
      // Fallback intelligent response
    }

    // Simulated intelligent response
    setTimeout(() => {
      let reply = "Here is an optimized breakdown: Concepts are best understood when decomposing them into foundational components. Review the 3D visualizers in the Living Textbook or practice in the Code Lab for interactive tactile memory retention!";
      if (text.toLowerCase().includes('transformer') || text.toLowerCase().includes('attention')) {
        reply = "Self-attention computes dynamic weights between every token in a sequence using Query (Q), Key (K), and Value (V) matrices: Attention(Q, K, V) = softmax(Q K^T / √d_k) V. This allows parallel sequence processing with O(1) sequential path length!";
      } else if (text.toLowerCase().includes('memory') || text.toLowerCase().includes('stack') || text.toLowerCase().includes('heap')) {
        reply = "The Call Stack handles fast, contiguous LIFO execution for local variables and return addresses. The Dynamic Heap allocates variable-sized objects referenced by stack pointers. Check out the 3D Code Lab to see this in live action!";
      } else if (text.toLowerCase().includes('shor') || text.toLowerCase().includes('quiz')) {
        reply = "Shor's algorithm achieves polynomial time O((log N)^3) prime factorization using quantum phase estimation to discover the period r of modular exponentiation a^x mod N. Classical RSA encryption depends on this being intractable!";
      }

      setMessages((prev) => [...prev, { sender: 'aura', text: reply }]);
      setIsThinking(false);
    }, 900);
  };

  return (
    <>
      {/* Floating Action Button Dock in bottom-right */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => toggleCompanion(!companionOpen)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-medium text-xs shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all transform active:scale-95"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-cyan-200 animate-pulse" />
          </div>
          <span className="font-bold tracking-wide">Aura AI Assistant</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      </div>

      {/* Slide-over Modal Drawer */}
      <AnimatePresence>
        {companionOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[520px] rounded-3xl glass-card border-indigo-500/30 bg-[#070b22]/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Modal Top Bar */}
            <div className="p-4 bg-[#050819] border-b border-indigo-900/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 overflow-hidden relative">
                  <CompanionOrb3D />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Aura 3D Companion</span>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  </h4>
                  <p className="text-[10px] text-cyan-400 font-mono">Neural Pedagogy v3 // Online</p>
                </div>
              </div>

              <button
                onClick={() => toggleCompanion(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Prompts Bar */}
            <div className="px-3 py-2 bg-white/[0.02] border-b border-white/5 flex items-center gap-1.5 overflow-x-auto">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 rounded-lg text-[10px] bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 whitespace-nowrap border border-white/5 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Messages Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-tr-none'
                        : 'bg-[#0f172a] border border-indigo-900/40 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono p-2">
                  <BrainCircuit className="w-4 h-4 animate-spin" />
                  <span>Aura is formulating pedagogical synthesis...</span>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-[#040714] border-t border-indigo-900/30 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Aura anything about your studies..."
                className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-indigo-900/40 text-xs text-white placeholder:text-slate-500 outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 disabled:opacity-40 transition-all shadow-neon-cyan"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
