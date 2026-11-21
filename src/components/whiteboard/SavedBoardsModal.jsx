import React, { useState } from 'react';
import { Modal } from '../Modal';
import {
  FolderOpen,
  Plus,
  Trash2,
  FileText,
  Clock,
  Check,
  Copy,
  Edit2
} from 'lucide-react';

export const SavedBoardsModal = ({
  isOpen,
  onClose,
  boards,
  activeBoardId,
  onSelectBoard,
  onCreateNewBoard,
  onDeleteBoard,
  onRenameBoard
}) => {
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const handleStartRename = (board) => {
    setEditingId(board.id);
    setNewTitle(board.title);
  };

  const handleSaveRename = (boardId) => {
    if (newTitle.trim()) {
      onRenameBoard(boardId, newTitle.trim());
    }
    setEditingId(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Saved Classroom Whiteboards"
      subtitle="Reopen previous teaching sessions, create new boards, or manage local vaults"
      maxWidth="max-w-2xl"
    >
      <div className="flex flex-col gap-5">
        {/* Top Action */}
        <div className="flex items-center justify-between pb-3 border-b border-indigo-900/40">
          <span className="text-xs font-mono text-slate-400">
            Total Vault Boards: <strong className="text-white">{boards.length}</strong>
          </span>

          <button
            onClick={() => {
              onCreateNewBoard();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-neon-cyan transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Blank Board</span>
          </button>
        </div>

        {/* Boards List */}
        <div className="flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1">
          {boards.map((b) => {
            const isActive = b.id === activeBoardId;
            const isEditing = editingId === b.id;

            return (
              <div
                key={b.id}
                className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                  isActive
                    ? 'bg-cyan-500/15 border-cyan-400/50 shadow-neon-cyan'
                    : 'bg-white/5 border-white/10 hover:border-cyan-500/30 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(b.id)}
                          autoFocus
                          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-400 text-xs text-white font-semibold focus:outline-none"
                        />
                        <button
                          onClick={() => handleSaveRename(b.id)}
                          className="p-1 rounded text-emerald-400 hover:bg-emerald-500/10"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white truncate">{b.title}</h4>
                        <button
                          onClick={() => handleStartRename(b)}
                          className="text-slate-500 hover:text-white transition-colors"
                          title="Rename board"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 mt-1">
                      <span>{b.pages?.length || 1} Pages</span>
                      <span>•</span>
                      <span>
                        Updated: {new Date(b.updatedAt || b.createdAt).toLocaleDateString()}
                      </span>
                      {isActive && (
                        <span className="text-cyan-400 font-bold uppercase tracking-wider">
                          [Active]
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2">
                  {!isActive && (
                    <button
                      onClick={() => {
                        onSelectBoard(b);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 transition-all"
                    >
                      Open
                    </button>
                  )}

                  {boards.length > 1 && (
                    <button
                      onClick={() => onDeleteBoard(b.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete board"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
