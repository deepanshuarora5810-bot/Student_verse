import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Layers
} from 'lucide-react';

export const WhiteboardPages = ({
  pages,
  activePageIndex,
  onSelectPage,
  onAddPage,
  onDeletePage
}) => {
  const canGoPrev = activePageIndex > 0;
  const canGoNext = activePageIndex < pages.length - 1;

  return (
    <div className="flex items-center gap-2 bg-[#080d24]/90 backdrop-blur-xl border border-indigo-900/40 px-3 py-1.5 rounded-2xl shadow-xl">
      {/* Prev Page Button */}
      <button
        onClick={() => canGoPrev && onSelectPage(activePageIndex - 1)}
        disabled={!canGoPrev}
        className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        title="Previous Page (PgUp)"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page indicator */}
      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 px-2">
        <span className="font-bold text-cyan-400">{activePageIndex + 1}</span>
        <span className="text-slate-600">/</span>
        <span>{pages.length}</span>
      </div>

      {/* Next Page Button */}
      <button
        onClick={() => canGoNext && onSelectPage(activePageIndex + 1)}
        disabled={!canGoNext}
        className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        title="Next Page (PgDn)"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="h-4 w-[1px] bg-slate-800 mx-1" />

      {/* Add Page Button */}
      <button
        onClick={onAddPage}
        className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-mono text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all"
        title="Add new whiteboard page"
      >
        <Plus className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Page</span>
      </button>

      {/* Delete Page Button (if more than 1 page) */}
      {pages.length > 1 && (
        <button
          onClick={() => onDeletePage(activePageIndex)}
          className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          title="Delete current page"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
