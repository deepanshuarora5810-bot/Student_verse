import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AiStudentAvatar3D } from '../components/reverse/AiStudentAvatar3D';
import { REVERSE_AI_QUESTIONS } from '../data/demoData';
import { useStudent } from '../context/StudentContext';
import {
  GraduationCap,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  PenTool,
  Trophy,
  ArrowRight,
  Brain,
  Lightbulb
} from 'lucide-react';

export const ReverseClassroom = () => {
  const navigate = useNavigate();
  const { submitTeachingEvaluation, addToast } = useStudent();

  const [selectedQuestionId, setSelectedQuestionId] = useState(REVERSE_AI_QUESTIONS[0].id);
  const question = REVERSE_AI_QUESTIONS.find((q) => q.id === selectedQuestionId) || REVERSE_AI_QUESTIONS[0];

  const [studentExplanation, setStudentExplanation] = useState('');
  const [emotionalState, setEmotionalState] = useState('puzzled'); // puzzled, curious, enlightened
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Web Speech API Voice synthesis
  const handleSpeakQuestion = () => {
    if (!('speechSynthesis' in window)) {
      addToast('Speech synthesis is not supported on this browser.', 'warning');
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(question.prompt);
    utterance.pitch = 1.15;
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Evaluate the student's explanation against the rubric
  const handleEvaluateExplanation = (e) => {
    e.preventDefault();
    if (!studentExplanation.trim() || studentExplanation.length < 15) {
      addToast('Please provide a more detailed explanation to teach Cortex-7.', 'warning');
      return;
    }

    setIsEvaluating(true);
    setEmotionalState('curious');

    setTimeout(() => {
      setIsEvaluating(false);

      // Intelligent scoring algorithm based on keyword coverage
      const lower = studentExplanation.toLowerCase();
      let matchedPoints = 0;
      const feedbackNotes = [];

      question.keyPointsRequired.forEach((point) => {
        const keywords = point.toLowerCase().split(' ').filter((w) => w.length > 4);
        const hasMatch = keywords.some((kw) => lower.includes(kw));
        if (hasMatch) {
          matchedPoints += 1;
        }
      });

      const coverageRatio = matchedPoints / question.keyPointsRequired.length;
      let calculatedScore = Math.round(55 + coverageRatio * 40 + Math.min(5, studentExplanation.length / 50));
      calculatedScore = Math.min(100, Math.max(60, calculatedScore));

      const isHighMastery = calculatedScore >= 80;
      setEmotionalState(isHighMastery ? 'enlightened' : 'curious');

      const result = {
        score: calculatedScore,
        grade: isHighMastery ? 'A+ Master Pedagog' : 'B+ Sound Explanation',
        pointsCovered: matchedPoints,
        totalPoints: question.keyPointsRequired.length,
        studentComprehension: isHighMastery
          ? "Cortex-7 completely understood! 'Ohhh, I see now! The memory references and binary representation explain everything!'"
          : "Cortex-7 grasped the main idea, but is still slightly hazy on the hardware details.",
        critique: isHighMastery
          ? "Outstanding clarity. You broke down the misconception without overwhelming with jargon."
          : "Good attempt! Consider explicitly mentioning memory addresses and representation differences for full clarity."
      };

      setEvaluationResult(result);
      submitTeachingEvaluation(question.id, calculatedScore, result.critique);
    }, 1200);
  };

  const handleUseSample = () => {
    setStudentExplanation(question.sampleGoodAnswer);
  };

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 border border-purple-500/30 text-purple-300 mb-1">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>PEDAGOGICAL REVERSE LEARNING ENGINE</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Teach the AI Student: Cortex-7
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            The Feynman Technique in 3D: Solidify your own understanding by teaching our curious junior AI student. Catch Cortex-7's misconceptions and explain why the code behaves that way.
          </p>
        </div>

        {/* Question Switcher */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl glass-card border-indigo-500/20 bg-[#070b22]/70">
          {REVERSE_AI_QUESTIONS.map((q) => {
            const isSelected = q.id === selectedQuestionId;
            return (
              <button
                key={q.id}
                onClick={() => {
                  setSelectedQuestionId(q.id);
                  setEvaluationResult(null);
                  setStudentExplanation('');
                  setEmotionalState('puzzled');
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{q.title}</span>
                <span className="text-[10px] font-mono opacity-70">[{q.difficulty}]</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[560px]">
        {/* Left Column: 3D AI Student Avatar & Question Prompt (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* 3D Avatar Viewport */}
          <div className="h-64 sm:h-72 rounded-2xl glass-card border-indigo-500/30 bg-[#030612] relative overflow-hidden flex flex-col">
            <div className="absolute top-3 left-4 z-10 flex items-center gap-2 text-[10px] font-mono text-purple-300">
              <Brain className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>AI STUDENT: CORTEX-7 // STATE: {emotionalState.toUpperCase()}</span>
            </div>

            <div className="w-full h-full flex-1">
              <AiStudentAvatar3D emotionalState={emotionalState} />
            </div>

            {/* Voice Read Aloud Floating Pill */}
            <div className="absolute bottom-3 right-3 z-10">
              <button
                onClick={handleSpeakQuestion}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium backdrop-blur-md transition-all ${
                  isSpeaking
                    ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                    : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/20'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5 animate-spin" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isSpeaking ? 'Stop Voice' : 'Hear Cortex-7'}</span>
              </button>
            </div>
          </div>

          {/* Cortex-7's Confused Question Box */}
          <div className="flex-1 p-5 rounded-2xl glass-card border-purple-500/30 bg-[#070b22]/90 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400">
                  {question.subject}
                </span>
                <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Misconception Detected
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{question.title}</h3>
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200 font-mono leading-relaxed whitespace-pre-wrap">
                "{question.prompt}"
              </div>
              <p className="text-[11px] text-slate-400 mt-2.5">
                <strong className="text-amber-300">What Cortex-7 assumes:</strong> {question.studentMisconception}
              </p>
            </div>

            {/* Action Buttons to open whiteboard */}
            <div className="mt-4 pt-3 border-t border-indigo-900/40 flex items-center justify-between">
              <button
                onClick={() => navigate('/whiteboard')}
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Draw Diagram on Whiteboard</span>
              </button>

              <button
                onClick={handleUseSample}
                className="text-[11px] text-slate-500 hover:text-slate-300 underline"
              >
                Autofill Model Explanation
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Teaching Response Composer & Evaluation Report (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <form
            onSubmit={handleEvaluateExplanation}
            className="p-5 rounded-2xl glass-card border-indigo-500/20 bg-[#060a1f] flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Your Teaching Explanation</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {studentExplanation.length} characters
              </span>
            </div>

            <textarea
              value={studentExplanation}
              onChange={(e) => setStudentExplanation(e.target.value)}
              placeholder="Explain to Cortex-7 step-by-step why their mental model is wrong and what is physically happening in memory/hardware..."
              rows={8}
              className="w-full p-4 rounded-xl bg-[#030612] border border-indigo-900/40 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-xs text-slate-200 placeholder:text-slate-600 outline-none resize-none leading-relaxed"
            />

            {/* Teaching Submission Button */}
            <div className="flex items-center justify-between">
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Award: up to +250 XP based on clarity & accuracy</span>
              </div>

              <button
                type="submit"
                disabled={isEvaluating}
                className="flex items-center gap-2 py-2.5 px-5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all transform active:scale-95 disabled:opacity-50"
              >
                {isEvaluating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Cortex-7 is Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Teach Cortex-7</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Pedagogical Evaluation Card */}
          <AnimatePresence>
            {evaluationResult && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-5 rounded-2xl glass-card border-emerald-500/30 bg-[#06141e]/90 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                      Pedagogical Mastery Audit
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {evaluationResult.score} / 100
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-200 leading-relaxed">
                  <strong className="text-emerald-400 block mb-1">Cortex-7 Reaction:</strong>
                  {evaluationResult.studentComprehension}
                </div>

                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-purple-300">Teaching Critique: </strong>
                  {evaluationResult.critique}
                </div>

                {/* Rubric check pills */}
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {question.keyPointsRequired.map((point, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/[0.03] border border-white/10 text-slate-300"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{point}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
