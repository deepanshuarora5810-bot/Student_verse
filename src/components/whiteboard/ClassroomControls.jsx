import React, { useState } from 'react';
import {
  Users,
  Radio,
  Share2,
  Lock,
  Unlock,
  Copy,
  Check,
  Eye,
  Edit3
} from 'lucide-react';

export const ClassroomControls = ({
  sessionActive,
  onToggleSession,
  roomCode,
  role,
  onToggleRole,
  allowStudentEditing,
  onToggleStudentEditing,
  connectedCount,
  onCopyLink
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyLink();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
      {/* Session Toggle Button */}
      <button
        onClick={onToggleSession}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold transition-all ${
          sessionActive
            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_15px_-3px_rgba(244,63,94,0.3)]'
            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 shadow-neon-cyan'
        }`}
      >
        <Radio className={`w-3.5 h-3.5 ${sessionActive ? 'animate-pulse text-rose-400' : ''}`} />
        <span>{sessionActive ? 'End Live Session' : 'Start Classroom'}</span>
      </button>

      {/* When active: Show room code and participant badge */}
      {sessionActive && (
        <>
          {/* Room Code Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-white font-bold">
            <span className="text-slate-400">ROOM:</span>
            <span className="text-cyan-300 tracking-wider font-extrabold">{roomCode}</span>
            <button
              onClick={handleCopy}
              className="ml-1 text-slate-400 hover:text-white transition-colors"
              title="Copy student invite link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Participant count */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>{connectedCount} Scholars</span>
          </div>

          {/* Role Indicator / Switcher */}
          <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-0.5">
            <button
              onClick={() => onToggleRole('teacher')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                role === 'teacher' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-3 h-3" />
              <span>Teacher</span>
            </button>
            <button
              onClick={() => onToggleRole('student')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                role === 'student' ? 'bg-purple-500/20 text-purple-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Student View</span>
            </button>
          </div>

          {/* Teacher control: Allow student editing */}
          {role === 'teacher' && (
            <button
              onClick={onToggleStudentEditing}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                allowStudentEditing
                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
              title={allowStudentEditing ? 'Student drawing enabled' : 'Students are view-only'}
            >
              {allowStudentEditing ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Collab Enabled</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">View-Only</span>
                </>
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
};
