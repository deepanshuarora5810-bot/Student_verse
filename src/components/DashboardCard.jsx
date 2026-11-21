import React from 'react';

export const DashboardCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  color = 'cyan',
  actionText,
  onAction,
  children
}) => {
  const colorStyles = {
    cyan: {
      border: 'border-cyan-500/20 hover:border-cyan-400/40',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      glow: 'hover:shadow-[0_8px_30px_-4px_rgba(6,182,212,0.25)]',
      gradient: 'from-cyan-400 to-blue-500'
    },
    purple: {
      border: 'border-purple-500/20 hover:border-purple-400/40',
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      glow: 'hover:shadow-[0_8px_30px_-4px_rgba(168,85,247,0.25)]',
      gradient: 'from-purple-400 to-pink-500'
    },
    emerald: {
      border: 'border-emerald-500/20 hover:border-emerald-400/40',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      glow: 'hover:shadow-[0_8px_30px_-4px_rgba(16,185,129,0.25)]',
      gradient: 'from-emerald-400 to-teal-500'
    },
    amber: {
      border: 'border-amber-500/20 hover:border-amber-400/40',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      glow: 'hover:shadow-[0_8px_30px_-4px_rgba(245,158,11,0.25)]',
      gradient: 'from-amber-400 to-orange-500'
    }
  }[color] || {
    border: 'border-cyan-500/20 hover:border-cyan-400/40',
    iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    glow: 'hover:shadow-[0_8px_30px_-4px_rgba(6,182,212,0.25)]',
    gradient: 'from-cyan-400 to-blue-500'
  };

  return (
    <div
      className={`glass-card rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden group ${colorStyles.border} ${colorStyles.glow}`}
    >
      {/* Subtle top edge gradient line */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${colorStyles.gradient} opacity-40 group-hover:opacity-100 transition-opacity`}
      />

      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
            {title}
          </span>
          <div className="flex items-baseline gap-2 mt-1.5">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {value}
            </h3>
            {trend && (
              <span
                className={`text-[11px] font-mono font-semibold px-1.5 py-0.5 rounded-full ${
                  trendPositive
                    ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                    : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
                }`}
              >
                {trend}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div className={`p-3 rounded-xl border ${colorStyles.iconBg} shrink-0 transition-transform group-hover:scale-110`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {children && <div className="mt-4">{children}</div>}

      {actionText && (
        <button
          onClick={onAction}
          className="mt-4 w-full pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span>{actionText}</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      )}
    </div>
  );
};
