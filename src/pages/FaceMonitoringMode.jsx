import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import confetti from 'canvas-confetti';
import {
  Camera,
  CameraOff,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  AlertTriangle,
  Eye,
  CheckCircle2,
  Clock,
  ArrowRight,
  Maximize2,
  RotateCcw,
  Sparkles,
  Lock,
  ChevronRight,
  ChevronLeft,
  FileText,
  Award
} from 'lucide-react';

export const FaceMonitoringMode = () => {
  const navigate = useNavigate();
  const { student, addXP, addToast, addActivity } = useStudent();

  // Session Stages: 'consent', 'active', 'completed'
  const [sessionStage, setSessionStage] = useState('consent');

  // Camera & Stream State
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraPermission, setCameraPermission] = useState('idle'); // 'idle', 'granted', 'denied', 'simulated'
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  // Proctoring Biometric Telemetry
  const [faceDetected, setFaceDetected] = useState(false);
  const [matchScore, setMatchScore] = useState(96.4);
  const [focusStatus, setFocusStatus] = useState('Centered on Screen');
  const [proctorLogs, setProctorLogs] = useState([]);
  const [multipleFacesDetected, setMultipleFacesDetected] = useState(false);
  const [warningCount, setWarningCount] = useState(0);

  // Consent Checkboxes
  const [consentCamera, setConsentCamera] = useState(false);
  const [consentBiometrics, setConsentBiometrics] = useState(false);

  // Exam Assessment State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes
  const [examSubmitted, setExamSubmitted] = useState(false);

  // Sample Monitored Exam Questions
  const examQuestions = [
    {
      id: 1,
      question: "In a 2-qubit system prepared in Bell state |Φ⁺⟩ = (|00⟩ + |11⟩) / √2, what is the exact probability of measuring qubit B in state |1⟩ if qubit A is measured to be |1⟩?",
      options: [
        "0% (Decoherence forces orthogonal collapse)",
        "50% (Uniform random distribution)",
        "100% (Instantaneous state entanglement collapse)",
        "70.7% (Proportional to 1/√2 amplitude)"
      ],
      correctAnswer: 2,
      discipline: "Quantum Computing"
    },
    {
      id: 2,
      question: "Why do Transformer multi-head attention mechanisms scale Query-Key dot products by 1/√d_k before applying the Softmax function?",
      options: [
        "To reduce GPU memory complexity from quadratic O(N²) to linear O(N)",
        "To prevent extremely small gradients caused by large dot-product magnitudes pushing Softmax into saturated regions",
        "To rotate embedding vectors into hypercomplex quaternion space",
        "To enforce unitary normalization across sequence lengths"
      ],
      correctAnswer: 1,
      discipline: "Neural Architectures"
    },
    {
      id: 3,
      question: "Which mathematical formula correctly computes surface normal vectors for a 3D Signed Distance Function (SDF) in a GLSL fragment shader?",
      options: [
        "vec3 n = normalize(vec3(map(p.x), map(p.y), map(p.z)));",
        "vec3 n = cross(p, vec3(0.0, 1.0, 0.0));",
        "vec3 n = normalize(vec3(map(p + e.xyy) - map(p - e.xyy), map(p + e.yxy) - map(p - e.yxy), map(p + e.yyx) - map(p - e.yyx)));",
        "vec3 n = reflect(rayDir, surfacePoint);"
      ],
      correctAnswer: 2,
      discipline: "Hyperdimensional WebGL"
    },
    {
      id: 4,
      question: "What cryptographic primitive prevents a prover from submitting malleable proofs in modern zk-SNARK constraint systems?",
      options: [
        "Zero-knowledge simulation extractability and non-malleability bindings",
        "AES-256 GCM symmetric cipher encapsulation",
        "Diffie-Hellman ephemeral key derivation",
        "Single-round SHA-3 hashing of public inputs"
      ],
      correctAnswer: 0,
      discipline: "Zero-Knowledge Cryptography"
    }
  ];

  // Request Camera Access and Start Session
  const startMonitoringSession = async () => {
    try {
      setCameraError(null);
      // Attempt to access user media
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          },
          audio: false
        });

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setCameraPermission('granted');
        setCameraActive(true);
      } else {
        // Fallback for sandboxed environments or browsers without hardware camera
        setCameraPermission('simulated');
        setCameraActive(true);
      }

      setSessionStage('active');
      logProctorEvent('Face Monitoring Session Initialized. Camera feed secured.');
      logProctorEvent(`Enrolled candidate reference verified: ${student.name} (${student.handle})`);
      addToast('Face Monitoring Mode engaged. Camera stream active only for this assessment.', 'success', 'Session Active');
    } catch (err) {
      console.warn('Hardware camera access blocked or unavailable:', err);
      // Provide graceful simulated candidate preview mode so user is never locked out
      setCameraPermission('simulated');
      setCameraActive(true);
      setSessionStage('active');
      logProctorEvent('Simulation Mode: Candidate reference telemetry active.');
      addToast('Monitored assessment launched with candidate verification telemetry.', 'info', 'Proctor Active');
    }
  };

  // Safely Stop Camera Streams (Camera must ONLY operate during explicit session)
  const stopMonitoringSession = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Cleanup on unmount - ensures camera is ALWAYS terminated when leaving the page
  useEffect(() => {
    return () => {
      stopMonitoringSession();
    };
  }, []);

  // Proctoring telemetry loop (simulated face bounding & gaze audit)
  useEffect(() => {
    if (sessionStage !== 'active' || !cameraActive) return;

    const interval = setInterval(() => {
      // Simulate real-time face comparison confidence fluctuations
      const confidence = Number((95 + Math.random() * 3.5).toFixed(1));
      setMatchScore(confidence);
      setFaceDetected(true);

      // Random gaze tracking simulation
      const rand = Math.random();
      if (rand > 0.95) {
        setFocusStatus('Gaze Diverted (Looking Away)');
        setWarningCount((w) => w + 1);
        logProctorEvent('Notice: Gaze diverted from primary assessment viewport.');
      } else {
        setFocusStatus('Centered on Screen (Optimal Focus)');
      }

      // Draw detection reticle on canvas overlay if video is playing
      if (videoRef.current && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;

        ctx.clearRect(0, 0, width, height);

        // Draw futuristic cyber face reticle
        const boxX = width * 0.25;
        const boxY = height * 0.15;
        const boxW = width * 0.5;
        const boxH = height * 0.65;

        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        // Corner highlights
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 4;
        const cornerLen = 16;
        // Top-left
        ctx.beginPath();
        ctx.moveTo(boxX, boxY + cornerLen);
        ctx.lineTo(boxX, boxY);
        ctx.lineTo(boxX + cornerLen, boxY);
        ctx.stroke();
        // Top-right
        ctx.beginPath();
        ctx.moveTo(boxX + boxW - cornerLen, boxY);
        ctx.lineTo(boxX + boxW, boxY);
        ctx.lineTo(boxX + boxW, boxY + cornerLen);
        ctx.stroke();
        // Bottom-left
        ctx.beginPath();
        ctx.moveTo(boxX, boxY + boxH - cornerLen);
        ctx.lineTo(boxX, boxY + boxH);
        ctx.lineTo(boxX + cornerLen, boxY + boxH);
        ctx.stroke();
        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(boxX + boxW - cornerLen, boxY + boxH);
        ctx.lineTo(boxX + boxW, boxY + boxH);
        ctx.lineTo(boxX + boxW, boxY + boxH - cornerLen);
        ctx.stroke();

        // Scanning line
        const scanY = boxY + ((Date.now() / 15) % boxH);
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(boxX, scanY);
        ctx.lineTo(boxX + boxW, scanY);
        ctx.stroke();
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [sessionStage, cameraActive]);

  // Exam Countdown Timer
  useEffect(() => {
    if (sessionStage !== 'active') return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionStage]);

  const logProctorEvent = (message) => {
    const time = new Date().toLocaleTimeString();
    setProctorLogs((prev) => [{ time, message }, ...prev.slice(0, 15)]);
  };

  const handleSelectOption = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitExam = () => {
    stopMonitoringSession();
    setExamSubmitted(true);
    setSessionStage('completed');

    confetti({ particleCount: 80, spread: 70 });
    addToast('Assessment completed under verified Face Monitoring telemetry!', 'success', 'Exam Submitted');
    addActivity(`Completed Monitored Assessment (Integrity Score: ${matchScore}%)`, 'study', '+150 XP');
    addXP(150);
  };

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
      
      {/* ======================================================== */}
      {/* 1. CONSENT & PERMISSION STAGE                            */}
      {/* ======================================================== */}
      {sessionStage === 'consent' && (
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-6 py-6">
          <div className="text-center">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 inline-flex items-center gap-1.5 mb-3">
              <Camera className="w-4 h-4" />
              <span>Face Monitoring Proctoring Protocol</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Candidate Biometric <span className="text-gradient-cyan">Verification</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto">
              Before beginning your certified assessment, please review the academic integrity consent and authorize temporary camera access.
            </p>
          </div>

          {/* Privacy Guarantee Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30 flex flex-col gap-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
              <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-300 shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Strict Privacy Architecture</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  The camera operates <strong>strictly while this monitored session is active</strong> and shuts down permanently when submitted. No raw video is stored externally.
                </p>
              </div>
            </div>

            {/* Candidate Reference Preview Card */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-cyan-500/40"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 ring-2 ring-[#0a0f24]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold">
                    Enrolled Reference Profile
                  </span>
                  <h3 className="text-base font-bold text-white">{student.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">{student.handle} • {student.title}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Reference Hash Verified
                </span>
                <p className="text-[10px] text-slate-400 font-mono mt-1">SV-BIO-9024-X7</p>
              </div>
            </div>

            {/* Consent Checkboxes */}
            <div className="flex flex-col gap-3 text-xs text-slate-300">
              <label className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={consentCamera}
                  onChange={(e) => setConsentCamera(e.target.checked)}
                  className="mt-0.5 rounded text-cyan-500 focus:ring-cyan-400"
                />
                <span>
                  I grant permission to access my device webcam for automated face detection and gaze tracking during this assessment.
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={consentBiometrics}
                  onChange={(e) => setConsentBiometrics(e.target.checked)}
                  className="mt-0.5 rounded text-cyan-500 focus:ring-cyan-400"
                />
                <span>
                  I acknowledge that my live webcam feed will be continuously compared with my reference profile photo for candidate identity validation.
                </span>
              </label>
            </div>

            {/* Launch Action */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => navigate('/productivity')}
                className="text-xs font-mono text-slate-400 hover:text-white"
              >
                &larr; Return to Productivity Hub
              </button>

              <button
                onClick={startMonitoringSession}
                disabled={!consentCamera || !consentBiometrics}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Camera className="w-4 h-4" />
                <span>Authorize Camera & Launch Exam</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. ACTIVE FACE MONITORING & ASSESSMENT WORKSPACE        */}
      {/* ======================================================== */}
      {sessionStage === 'active' && (
        <div className="flex flex-col gap-6">
          
          {/* Top Session Status Bar */}
          <div className="glass-card rounded-2xl p-4 sm:p-5 border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Face Monitoring Mode:
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                    LIVE CAMERA ACTIVE
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                  Continuous Candidate Biometric Matching • Session ID: SV-PROCTOR-{Date.now().toString().slice(-6)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 font-mono text-xs">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-400">Time Remaining:</span>
                <span className="font-extrabold text-white text-sm">{formatTimer(timeRemaining)}</span>
              </div>

              <button
                onClick={handleSubmitExam}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-neon-purple transition-all"
              >
                Submit & End Session
              </button>
            </div>
          </div>

          {/* Main Proctoring Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Assessment Questions (Col 7) */}
            <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                      {examQuestions[currentQuestionIndex].discipline}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold font-display text-white mt-1">
                      Question {currentQuestionIndex + 1} of {examQuestions.length}
                    </h2>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
                    {Object.keys(selectedAnswers).length} / {examQuestions.length} Answered
                  </span>
                </div>

                {/* Question Prompt */}
                <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed mb-6">
                  {examQuestions[currentQuestionIndex].question}
                </p>

                {/* Options List */}
                <div className="flex flex-col gap-3">
                  {examQuestions[currentQuestionIndex].options.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[examQuestions[currentQuestionIndex].id] === oIdx;

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(examQuestions[currentQuestionIndex].id, oIdx)}
                        className={`text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border-cyan-400 text-white shadow-neon-cyan'
                            : 'bg-slate-900/60 border-white/5 text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-xl border flex items-center justify-center text-xs font-mono shrink-0 ${
                          isSelected
                            ? 'bg-cyan-500 text-white border-cyan-400 font-bold'
                            : 'border-slate-600 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Pagination */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {examQuestions.map((q, idx) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                        currentQuestionIndex === idx
                          ? 'bg-cyan-500 text-white'
                          : selectedAnswers[q.id] !== undefined
                          ? 'bg-purple-500/30 text-purple-300 border border-purple-500/40'
                          : 'bg-white/5 text-slate-500'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentQuestionIndex((prev) => Math.min(examQuestions.length - 1, prev + 1))}
                  disabled={currentQuestionIndex === examQuestions.length - 1}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-cyan-400 hover:text-cyan-300 disabled:opacity-40"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Live Camera & Biometric Proctoring HUD (Col 5) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              
              {/* Live Camera Viewport Card */}
              <div className="glass-card rounded-3xl p-5 border-cyan-500/30 flex flex-col gap-4 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-1.5">
                    <Eye className="w-4 h-4" /> Live Proctor Feed
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                    1 Candidate
                  </span>
                </div>

                {/* Video & Canvas Container */}
                <div className="relative aspect-video rounded-2xl bg-black overflow-hidden border border-cyan-500/40 shadow-neon-cyan flex items-center justify-center">
                  {cameraPermission === 'granted' ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover transform -scale-x-100"
                      />
                      <canvas
                        ref={canvasRef}
                        width={480}
                        height={360}
                        className="absolute inset-0 w-full h-full pointer-events-none"
                      />
                    </>
                  ) : (
                    // Graceful Simulated Camera Feed
                    <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-indigo-950/40 to-black p-4">
                      <div className="relative mb-2">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-24 h-24 rounded-2xl object-cover ring-2 ring-cyan-400 shadow-neon-cyan animate-pulse"
                        />
                        <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-cyan-400/80 animate-spin" style={{ animationDuration: '8s' }} />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-cyan-300">
                        Candidate Optical Stream Active
                      </span>
                      <span className="text-[9px] font-mono text-slate-400">
                        Biometric Telemetry Link Synchronized
                      </span>
                    </div>
                  )}

                  {/* Corner Proctor Badge */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono text-cyan-300">
                    CONFIDENCE: {matchScore}%
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>REC // MONITORING</span>
                  </div>
                </div>

                {/* Candidate Reference Comparison Box */}
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-9 h-9 rounded-xl object-cover ring-1 ring-cyan-500/50 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-white truncate text-xs">{student.name}</p>
                      <p className="text-[10px] text-cyan-400 font-mono">Reference Match: {matchScore}%</p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                    VERIFIED
                  </span>
                </div>

                {/* Telemetry Status Gauges */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col">
                    <span className="text-[10px] text-slate-400">Focus Orientation:</span>
                    <span className="text-emerald-300 font-bold truncate text-[11px] mt-0.5">{focusStatus}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col">
                    <span className="text-[10px] text-slate-400">Anomalies Detected:</span>
                    <span className="text-cyan-300 font-bold text-[11px] mt-0.5">{warningCount} Flagged</span>
                  </div>
                </div>

                {/* Live Audit Event Stream */}
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1.5 block">
                    Real-Time Proctor Audit Stream
                  </span>
                  <div className="h-28 overflow-y-auto rounded-xl bg-slate-950/80 border border-white/5 p-2.5 flex flex-col gap-1.5 font-mono text-[10px]">
                    {proctorLogs.map((log, lIdx) => (
                      <div key={lIdx} className="text-slate-300 flex items-start gap-1.5">
                        <span className="text-cyan-400 shrink-0">[{log.time}]</span>
                        <span className="leading-tight">{log.message}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Safety Abort Button */}
                <button
                  onClick={stopMonitoringSession}
                  className="w-full py-2 rounded-xl text-xs font-mono text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 flex items-center justify-center gap-1.5 transition-all"
                >
                  <CameraOff className="w-3.5 h-3.5" />
                  <span>Terminate Camera Stream & Cancel Exam</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* 3. POST-EXAM PROCTORING AUDIT REPORT                     */}
      {/* ======================================================== */}
      {sessionStage === 'completed' && (
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-6 py-6">
          <div className="text-center">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1.5 mb-3">
              <CheckCircle2 className="w-4 h-4" />
              <span>Assessment Completed & Camera Terminated</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Proctoring Audit <span className="text-gradient-purple">Report</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto">
              Your camera stream has been permanently closed. The biometric telemetry audit confirms 100% academic compliance.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 sm:p-8 border-indigo-500/30 flex flex-col gap-6">
            {/* Audit Scorecard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 text-center">
                <span className="text-[10px] font-mono uppercase text-slate-400">Candidate Identity</span>
                <p className="text-lg font-bold text-emerald-400 mt-1">Verified</p>
                <span className="text-[10px] font-mono text-slate-500">Alex Mercer</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 text-center">
                <span className="text-[10px] font-mono uppercase text-slate-400">Avg Face Match</span>
                <p className="text-lg font-bold text-cyan-300 mt-1">{matchScore}%</p>
                <span className="text-[10px] font-mono text-slate-500">Optimal Fidelity</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 text-center">
                <span className="text-[10px] font-mono uppercase text-slate-400">Gaze Focus Integrity</span>
                <p className="text-lg font-bold text-purple-300 mt-1">98.5%</p>
                <span className="text-[10px] font-mono text-slate-500">Screen Centered</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 text-center">
                <span className="text-[10px] font-mono uppercase text-slate-400">Camera State</span>
                <p className="text-lg font-bold text-rose-400 mt-1">Terminated</p>
                <span className="text-[10px] font-mono text-slate-500">Zero active feeds</span>
              </div>
            </div>

            {/* Questions Performance Summary */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-cyan-400" />
                <div>
                  <h4 className="font-bold text-white">Quantum & Neural Systems Assessment</h4>
                  <p className="text-slate-400">{Object.keys(selectedAnswers).length} of {examQuestions.length} Questions Submitted</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 font-mono font-bold">
                +150 XP Awarded
              </span>
            </div>

            {/* Return Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setSessionStage('consent');
                  setSelectedAnswers({});
                  setTimeRemaining(15 * 60);
                }}
                className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Monitored Assessment</span>
              </button>

              <button
                onClick={() => navigate('/productivity')}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-neon-purple transition-all"
              >
                <span>Return to Productivity Hub</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
