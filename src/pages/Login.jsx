import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { Login3DBackground } from '../components/Login3DBackground';
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
  KeyRound,
  RotateCcw
} from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useStudent();

  // Role state: null (no role selected initially), 'student', or 'teacher'
  const [selectedRole, setSelectedRole] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Quick autofill helper for demo testing
  const handleSelectRole = (role, demoPass = '') => {
    setSelectedRole(role);
    setPassword(demoPass);
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    // 1. Validation: Role check
    if (!selectedRole) {
      setErrorMessage('Please select a role to continue (Student or Teacher).');
      return;
    }

    // 2. Validation: Empty password check
    if (!password.trim()) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);

    // Authentication delay for smooth cyber-UI feedback
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
    }, 450);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden bg-[#040714]">
      {/* 3D Floating Educational & Tech Objects Canvas */}
      <Login3DBackground />

      {/* Cyber Neon Glow Ambience */}
      <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/5 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute inset-0 cyber-grid-pattern opacity-40 pointer-events-none" />

      {/* Main Glassmorphic Login Card */}
      <div className="relative z-10 w-full max-w-lg">
        
        {/* Brand Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[2px] mb-3 shadow-[0_0_35px_rgba(6,182,212,0.4)] group">
            <div className="w-full h-full bg-[#050818] rounded-[14px] flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
              <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Welcome to <span className="text-gradient-cyan">StudentVerse</span>
          </h1>
          <p className="text-xs sm:text-sm text-cyan-300/80 mt-1 font-mono tracking-wide">
            Your Learning Universe Starts Here.
          </p>
        </div>

        {/* Glassmorphic Container */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.65)] relative overflow-hidden backdrop-blur-2xl">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 via-purple-500 to-transparent" />

          {/* Role Selection Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono font-semibold uppercase text-slate-300 tracking-wider">
                Select Your Role
              </label>
              {selectedRole && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole(null);
                    setPassword('');
                    setErrorMessage('');
                  }}
                  className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Change Role</span>
                </button>
              )}
            </div>

            {/* Two Selectable Role Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Student Role Card */}
              <button
                type="button"
                onClick={() => handleSelectRole('student')}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden ${
                  selectedRole === 'student'
                    ? 'bg-gradient-to-br from-cyan-500/20 via-blue-600/15 to-transparent border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.35)] scale-[1.02]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    selectedRole === 'student'
                      ? 'bg-cyan-500 text-white shadow-neon-cyan'
                      : 'bg-white/5 text-slate-400 group-hover:text-cyan-300 group-hover:bg-cyan-500/10'
                  }`}>
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  {selectedRole === 'student' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    Student
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Enter as Student
                  </p>
                </div>
              </button>

              {/* Teacher Role Card */}
              <button
                type="button"
                onClick={() => handleSelectRole('teacher')}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden ${
                  selectedRole === 'teacher'
                    ? 'bg-gradient-to-br from-purple-500/20 via-pink-600/15 to-transparent border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.35)] scale-[1.02]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-purple-500/40 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    selectedRole === 'teacher'
                      ? 'bg-purple-600 text-white shadow-neon-purple'
                      : 'bg-white/5 text-slate-400 group-hover:text-purple-300 group-hover:bg-purple-500/10'
                  }`}>
                    <School className="w-5 h-5" />
                  </div>
                  {selectedRole === 'teacher' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    Teacher
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Enter as Teacher
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Password Section (Displayed after a role is selected) */}
          {selectedRole ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono font-semibold uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{selectedRole === 'student' ? 'Student' : 'Teacher'} Password</span>
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">
                    Demo: <strong className="text-cyan-300">{selectedRole === 'student' ? '1234' : '0987'}</strong>
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
                    onKeyDown={handleKeyDown}
                    autoFocus
                    placeholder={`Enter ${selectedRole} password (${selectedRole === 'student' ? '1234' : '0987'})...`}
                    autoComplete="current-password"
                    className={`w-full pl-4 pr-11 py-3.5 rounded-xl bg-slate-900/90 border text-xs sm:text-sm text-white placeholder-slate-500 font-mono transition-all focus:outline-none ${
                      errorMessage
                        ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50'
                        : selectedRole === 'student'
                        ? 'border-cyan-500/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-inner'
                        : 'border-purple-500/40 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 shadow-inner'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message Alert */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300 animate-in fade-in slide-in-from-top-1 duration-200">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Success Feedback Alert */}
              {loginSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verification successful! Launching {selectedRole} Dashboard...</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || loginSuccess}
                className={`w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold text-white transition-all transform active:scale-[0.98] flex items-center justify-center gap-2.5 shadow-lg mt-1 cursor-pointer ${
                  selectedRole === 'student'
                    ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-neon-cyan'
                    : 'bg-gradient-to-r from-purple-500 via-pink-600 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 shadow-neon-purple'
                } disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating {selectedRole}...</span>
                  </>
                ) : loginSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Access Granted</span>
                  </>
                ) : (
                  <>
                    <span>Enter {selectedRole === 'student' ? 'Student' : 'Teacher'} Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* 1-Click Demo Shortcut */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setPassword(selectedRole === 'student' ? '1234' : '0987')}
                  className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 inline-flex items-center gap-1.5 transition-colors"
                >
                  <KeyRound className="w-3 h-3 text-cyan-400" />
                  <span>Autofill Demo Password ({selectedRole === 'student' ? '1234' : '0987'})</span>
                </button>
              </div>

            </form>
          ) : (
            <div className="py-4 text-center border-t border-slate-800/80 mt-2">
              <p className="text-xs text-slate-400 font-mono flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Please select a role above to reveal the password access field.</span>
              </p>
            </div>
          )}

          {/* Quick Demo Credentials Footer Pills */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block text-center mb-2.5">
              Instant Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => handleSelectRole('student', '1234')}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-all flex items-center justify-center gap-2"
              >
                <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                <span>Student: <strong>1234</strong></span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectRole('teacher', '0987')}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-purple-500/10 border border-white/10 hover:border-purple-500/30 text-slate-300 hover:text-purple-300 transition-all flex items-center justify-center gap-2"
              >
                <KeyRound className="w-3.5 h-3.5 text-purple-400" />
                <span>Teacher: <strong>0987</strong></span>
              </button>
            </div>
          </div>

        </div>

        {/* Security Note Footer */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-400 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>StudentVerse Core Security Protocol • Encrypted Session</span>
        </div>

      </div>
    </div>
  );
};
