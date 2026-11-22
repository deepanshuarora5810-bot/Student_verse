import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import {
  Sparkles,
  GraduationCap,
  School,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Brain,
  Video,
  KeyRound
} from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, authRole } = useStudent();

  const [selectedRole, setSelectedRole] = useState('student'); // 'student' | 'teacher'
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Quick autofill for demo credentials
  const handleAutoFill = (role, demoPass) => {
    setSelectedRole(role);
    setPassword(demoPass);
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!password.trim()) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);

    // Simulate authenticating for smooth modern UI feedback
    setTimeout(() => {
      const result = login(selectedRole, password.trim());
      setIsLoading(false);

      if (result.success) {
        setLoginSuccess(true);
        setTimeout(() => {
          navigate(result.redirect);
        }, 600);
      } else {
        setErrorMessage(result.error || 'Invalid password. Please try again.');
      }
    }, 500);
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Background Ambient Glows & Cyber Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute inset-0 cyber-grid-pattern opacity-40 pointer-events-none" />

      {/* Main Login Card Container */}
      <div className="relative z-10 w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[2px] mb-3 shadow-neon-cyan">
            <div className="w-full h-full bg-[#050818] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            STUDENT<span className="text-gradient-cyan">VERSE</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Student Task Manager & Faculty Digital Ecosystem
          </p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden backdrop-blur-2xl">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

          {/* Role Selection Tabs */}
          <div className="mb-6">
            <label className="block text-xs font-mono font-semibold uppercase text-slate-400 tracking-wider mb-2">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
              {/* Student Role Button */}
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('student');
                  setPassword('');
                  setErrorMessage('');
                }}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  selectedRole === 'student'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/30 text-cyan-300 border border-cyan-500/40 shadow-neon-cyan font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <GraduationCap className={`w-4 h-4 ${selectedRole === 'student' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>Student Login</span>
              </button>

              {/* Teacher Role Button */}
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('teacher');
                  setPassword('');
                  setErrorMessage('');
                }}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  selectedRole === 'teacher'
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-600/30 text-purple-300 border border-purple-500/40 shadow-neon-purple font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <School className={`w-4 h-4 ${selectedRole === 'teacher' ? 'text-purple-400' : 'text-slate-400'}`} />
                <span>Teacher Login</span>
              </button>
            </div>
          </div>

          {/* Role Description Snapshot */}
          <div className="mb-6 p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              selectedRole === 'student' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-purple-500/10 text-purple-400'
            }`}>
              {selectedRole === 'student' ? <Brain className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            </div>
            <div className="text-left text-xs text-slate-300">
              {selectedRole === 'student' ? (
                <>
                  <span className="font-bold text-white block">Student Workspace</span>
                  Access assignments, task predictor, exams, and 3D learning world.
                </>
              ) : (
                <>
                  <span className="font-bold text-white block">Teacher Command Hub</span>
                  Launch digital whiteboard, inspect face proctoring, and grade assignments.
                </>
              )}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono font-semibold uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Password</span>
                </label>
                <span className="text-[10px] font-mono text-slate-500">
                  Demo Pass: <strong className="text-cyan-400">{selectedRole === 'student' ? '1234' : '0987'}</strong>
                </span>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder={`Enter ${selectedRole} password...`}
                  autoComplete="current-password"
                  className={`w-full pl-4 pr-11 py-3 rounded-xl bg-slate-900/90 border text-xs sm:text-sm text-white placeholder-slate-500 font-mono transition-all focus:outline-none ${
                    errorMessage
                      ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50'
                      : 'border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300 animate-in fade-in slide-in-from-top-1 duration-200">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Feedback Box */}
            {loginSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Credentials verified! Redirecting to dashboard...</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || loginSuccess}
              className={`w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold text-white transition-all transform active:scale-[0.98] flex items-center justify-center gap-2.5 shadow-lg mt-2 cursor-pointer ${
                selectedRole === 'student'
                  ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-neon-cyan'
                  : 'bg-gradient-to-r from-purple-500 via-pink-600 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-neon-purple'
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : loginSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Access Granted</span>
                </>
              ) : (
                <>
                  <span>Login to {selectedRole === 'student' ? 'Student' : 'Teacher'} Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Footer Pills */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block text-center mb-2.5">
              1-Click Demo Credentials
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => handleAutoFill('student', '1234')}
                className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-all flex items-center justify-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                <span>Student: <strong>1234</strong></span>
              </button>

              <button
                type="button"
                onClick={() => handleAutoFill('teacher', '0987')}
                className="p-2 rounded-xl bg-white/5 hover:bg-purple-500/10 border border-white/10 hover:border-purple-500/30 text-slate-300 hover:text-purple-300 transition-all flex items-center justify-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5 text-purple-400" />
                <span>Teacher: <strong>0987</strong></span>
              </button>
            </div>
          </div>

        </div>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-1.5 mt-6 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Encrypted Session • Role-based Access Security</span>
        </div>

      </div>
    </div>
  );
};
