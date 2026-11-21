import React from 'react';
import { useStudent } from '../context/StudentContext';
import { CheckCircle2, AlertTriangle, Info, Trophy, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useStudent();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <Info className="w-5 h-5 text-cyan-400 shrink-0" />;
        let borderClass = 'border-cyan-500/40';
        let bgGlow = 'rgba(6, 182, 212, 0.15)';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
          borderClass = 'border-emerald-500/40';
          bgGlow = 'rgba(16, 185, 129, 0.15)';
        } else if (toast.type === 'trophy') {
          icon = <Trophy className="w-5 h-5 text-amber-400 shrink-0" />;
          borderClass = 'border-amber-500/40';
          bgGlow = 'rgba(245, 158, 11, 0.2)';
        } else if (toast.type === 'error' || toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />;
          borderClass = 'border-rose-500/40';
          bgGlow = 'rgba(244, 63, 94, 0.15)';
        }

        return (
          <div
            key={toast.id}
            style={{ boxShadow: `0 8px 24px -4px ${bgGlow}` }}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl backdrop-blur-xl bg-[#090e24]/90 border ${borderClass} shadow-2xl transition-all duration-300 transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-3`}
          >
            <div className="mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              {toast.title && (
                <h4 className="text-sm font-semibold text-white tracking-wide mb-0.5">
                  {toast.title}
                </h4>
              )}
              <p className="text-xs text-slate-300 leading-relaxed break-words">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded-lg hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
