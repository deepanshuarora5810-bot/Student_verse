import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { WhiteboardCanvas } from '../components/whiteboard/WhiteboardCanvas';
import { WhiteboardToolbar } from '../components/whiteboard/WhiteboardToolbar';
import { WhiteboardPages } from '../components/whiteboard/WhiteboardPages';
import { ClassroomControls } from '../components/whiteboard/ClassroomControls';
import { MathToolsModal } from '../components/whiteboard/MathToolsModal';
import { SavedBoardsModal } from '../components/whiteboard/SavedBoardsModal';
import { Modal } from '../components/Modal';
import {
  createDefaultBoard,
  getSavedBoards,
  saveBoardToStorage,
  deleteBoardFromStorage,
  exportCanvasAsPNG,
  exportBoardAsJSON
} from '../services/whiteboardStorage';
import { ClassroomSocket } from '../services/classroomSocket';
import {
  Save,
  FolderOpen,
  Download,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  HelpCircle,
  FileText,
  Share2,
  Check,
  Edit2
} from 'lucide-react';

export const TeacherWhiteboard = () => {
  const { student, addToast, addXP } = useStudent();
  const [searchParams] = useSearchParams();

  // URL Query parameter overrides for students joining via shared link
  const urlRoom = searchParams.get('room');
  const urlRole = searchParams.get('role'); // 'student' or 'teacher'

  // Saved boards state
  const [boards, setBoards] = useState(getSavedBoards);
  const [currentBoard, setCurrentBoard] = useState(() => {
    const list = getSavedBoards();
    return list[0] || createDefaultBoard();
  });

  // Current page elements and history
  const activePageIndex = currentBoard.activePageIndex || 0;
  const currentPage = currentBoard.pages[activePageIndex] || currentBoard.pages[0];
  const [elements, setElements] = useState(currentPage.elements || []);

  // History stack for Undo / Redo per page
  const [history, setHistory] = useState([currentPage.elements || []]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Active Tool & Style State
  const [activeTool, setActiveTool] = useState('pen'); // 'select', 'pen', 'highlighter', 'eraser', 'line', 'arrow', 'rectangle', 'circle', 'text', 'laser'
  const [strokeColor, setStrokeColor] = useState('#06b6d4');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [backgroundType, setBackgroundType] = useState(currentBoard.backgroundType || 'grid');

  // Zoom & Pan
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  // Fullscreen presentation mode
  const [isFullscreen, setIsFullscreen] = useState(false);
  const whiteboardContainerRef = useRef(null);
  const canvasRef = useRef(null);

  // Modals state
  const [isSavedBoardsOpen, setIsSavedBoardsOpen] = useState(false);
  const [isMathToolsOpen, setIsMathToolsOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  // Inline board title editing
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [boardTitleInput, setBoardTitleInput] = useState(currentBoard.title);

  // Classroom Session state
  const [sessionActive, setSessionActive] = useState(Boolean(urlRoom));
  const [roomCode, setRoomCode] = useState(urlRoom || `SV-${Math.floor(1000 + Math.random() * 9000)}`);
  const [role, setRole] = useState(urlRole || 'teacher'); // 'teacher' or 'student'
  const [allowStudentEditing, setAllowStudentEditing] = useState(false);
  const [connectedCount, setConnectedCount] = useState(1);
  const [remoteLaser, setRemoteLaser] = useState(null);

  const socketRef = useRef(null);

  // Synchronize elements when page switches
  useEffect(() => {
    const page = currentBoard.pages[activePageIndex] || currentBoard.pages[0];
    setElements(page.elements || []);
    setHistory([page.elements || []]);
    setHistoryIndex(0);
  }, [activePageIndex, currentBoard.id]);

  // Push new elements to state and history
  const handleElementsChange = useCallback(
    (action) => {
      setElements((prev) => {
        const next = typeof action === 'function' ? action(prev) : action;

        // Push to history
        setHistory((hPrev) => {
          const trimmed = hPrev.slice(0, historyIndex + 1);
          return [...trimmed.slice(-30), next];
        });
        setHistoryIndex((hPrev) => Math.min(30, hPrev + 1));

        // Update board in state
        setCurrentBoard((bPrev) => {
          const updatedPages = [...bPrev.pages];
          updatedPages[activePageIndex] = {
            ...updatedPages[activePageIndex],
            elements: next
          };
          const updatedBoard = { ...bPrev, pages: updatedPages };
          saveBoardToStorage(updatedBoard);
          return updatedBoard;
        });

        // Broadcast to WebSocket classroom if active
        if (socketRef.current && socketRef.current.connected) {
          const lastElement = next[next.length - 1];
          if (lastElement) {
            socketRef.current.sendStroke(lastElement, activePageIndex);
          }
        }

        return next;
      });
    },
    [activePageIndex, historyIndex]
  );

  // Undo / Redo handlers
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleUndo = useCallback(() => {
    if (!canUndo) return;
    const nextIdx = historyIndex - 1;
    const prevElements = history[nextIdx];
    setHistoryIndex(nextIdx);
    setElements(prevElements);

    setCurrentBoard((bPrev) => {
      const updatedPages = [...bPrev.pages];
      updatedPages[activePageIndex] = {
        ...updatedPages[activePageIndex],
        elements: prevElements
      };
      const updatedBoard = { ...bPrev, pages: updatedPages };
      saveBoardToStorage(updatedBoard);
      return updatedBoard;
    });
  }, [canUndo, historyIndex, history, activePageIndex]);

  const handleRedo = useCallback(() => {
    if (!canRedo) return;
    const nextIdx = historyIndex + 1;
    const nextElements = history[nextIdx];
    setHistoryIndex(nextIdx);
    setElements(nextElements);

    setCurrentBoard((bPrev) => {
      const updatedPages = [...bPrev.pages];
      updatedPages[activePageIndex] = {
        ...updatedPages[activePageIndex],
        elements: nextElements
      };
      const updatedBoard = { ...bPrev, pages: updatedPages };
      saveBoardToStorage(updatedBoard);
      return updatedBoard;
    });
  }, [canRedo, historyIndex, history, activePageIndex]);

  // Keyboard Shortcuts (Undo, Redo, Tools, Space Pan, Save)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isInput = document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA';
      if (isInput) return;

      // Ctrl / Cmd + Z: Undo
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      // Ctrl / Cmd + Shift + Z or Ctrl + Y: Redo
      else if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'z') || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y')) {
        e.preventDefault();
        handleRedo();
      }
      // Ctrl / Cmd + S: Save
      else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveBoardToStorage(currentBoard);
        addToast('Whiteboard saved to local vault.', 'success', 'Board Saved');
      }
      // Tool shortcuts
      else if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'v':
          case 's':
            setActiveTool('select');
            break;
          case 'p':
            setActiveTool('pen');
            break;
          case 'h':
            setActiveTool('highlighter');
            break;
          case 'e':
            setActiveTool('eraser');
            break;
          case 'l':
            setActiveTool('line');
            break;
          case 'a':
            setActiveTool('arrow');
            break;
          case 'r':
            setActiveTool('rectangle');
            break;
          case 'c':
            setActiveTool('circle');
            break;
          case 't':
            setActiveTool('text');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, currentBoard]);

  // Real-Time Classroom Socket Setup
  useEffect(() => {
    if (sessionActive && roomCode) {
      const socket = new ClassroomSocket(roomCode, {
        role,
        userName: role === 'teacher' ? student.name : 'Student Scholar'
      });

      socket.callbacks.onStroke = (stroke, pIndex) => {
        if (pIndex === activePageIndex) {
          setElements((prev) => [...prev, stroke]);
        }
      };

      socket.callbacks.onLaser = (x, y, active, user) => {
        setRemoteLaser(active ? { x, y, active, userName: user } : null);
      };

      socket.callbacks.onClear = (pIndex) => {
        if (pIndex === activePageIndex) {
          setElements([]);
        }
      };

      socket.callbacks.onPageChange = (pIndex) => {
        if (role === 'student') {
          handleSelectPage(pIndex);
        }
      };

      socket.callbacks.onRoomState = (data) => {
        if (data.participant_count) setConnectedCount(data.participant_count);
        if (data.allow_student_editing !== undefined) setAllowStudentEditing(data.allow_student_editing);
      };

      socket.callbacks.onPermissionUpdate = (allow) => {
        setAllowStudentEditing(allow);
        addToast(
          allow ? 'Teacher unlocked student whiteboard editing!' : 'Teacher set whiteboard to view-only mode.',
          'info'
        );
      };

      socketRef.current = socket;
      return () => {
        socket.disconnect();
      };
    }
  }, [sessionActive, roomCode, role, activePageIndex, student.name]);

  // Handle Laser movement broadcast
  const handleLaserMove = (x, y, active) => {
    if (socketRef.current) {
      socketRef.current.sendLaserPointer(x, y, active);
    }
  };

  // Page Operations
  const handleSelectPage = (index) => {
    setCurrentBoard((prev) => {
      const updated = { ...prev, activePageIndex: index };
      saveBoardToStorage(updated);
      return updated;
    });

    if (socketRef.current && role === 'teacher') {
      socketRef.current.sendPageChange(index);
    }
  };

  const handleAddPage = () => {
    const newPageNum = currentBoard.pages.length + 1;
    const newPage = {
      id: `page-${Date.now()}`,
      title: `Page ${newPageNum}`,
      elements: []
    };

    setCurrentBoard((prev) => {
      const updatedPages = [...prev.pages, newPage];
      const updated = {
        ...prev,
        pages: updatedPages,
        activePageIndex: updatedPages.length - 1
      };
      saveBoardToStorage(updated);
      return updated;
    });

    addToast(`Added Page ${newPageNum} to whiteboard.`, 'info');
  };

  const handleDeletePage = (index) => {
    if (currentBoard.pages.length <= 1) return;
    const updatedPages = currentBoard.pages.filter((_, i) => i !== index);
    const newActive = Math.max(0, index - 1);

    setCurrentBoard((prev) => {
      const updated = {
        ...prev,
        pages: updatedPages,
        activePageIndex: newActive
      };
      saveBoardToStorage(updated);
      return updated;
    });

    addToast('Page deleted.', 'info');
  };

  // Clear canvas
  const handleClearCanvas = () => {
    if (window.confirm('Clear all drawings and content on this page?')) {
      handleElementsChange([]);
      if (socketRef.current) {
        socketRef.current.sendClearPage(activePageIndex);
      }
      addToast('Page cleared.', 'info');
    }
  };

  // Zoom controls
  const handleZoomIn = () => setZoom((z) => Math.min(3.5, Number((z + 0.15).toFixed(2))));
  const handleZoomOut = () => setZoom((z) => Math.max(0.35, Number((z - 0.15).toFixed(2))));
  const handleResetZoom = () => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Fullscreen presentation
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      whiteboardContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Board Save / Rename / Delete
  const handleSaveBoardTitle = () => {
    if (boardTitleInput.trim()) {
      setCurrentBoard((prev) => {
        const updated = { ...prev, title: boardTitleInput.trim() };
        saveBoardToStorage(updated);
        setBoards(getSavedBoards());
        return updated;
      });
      addToast('Board title updated.', 'info');
    }
    setIsEditingTitle(false);
  };

  const handleSelectBoard = (b) => {
    setCurrentBoard(b);
    setBoardTitleInput(b.title);
    setBackgroundType(b.backgroundType || 'grid');
    setElements(b.pages[b.activePageIndex || 0]?.elements || []);
  };

  const handleCreateNewBlankBoard = () => {
    const blank = {
      id: `wb-${Date.now()}`,
      title: 'Untitled Lecture Board',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      activePageIndex: 0,
      backgroundType: 'grid',
      pages: [
        {
          id: `page-${Date.now()}`,
          title: 'Page 1',
          elements: []
        }
      ]
    };
    saveBoardToStorage(blank);
    setBoards(getSavedBoards());
    handleSelectBoard(blank);
    addToast('Created new blank whiteboard.', 'success');
  };

  const handleDeleteBoard = (bId) => {
    const updated = deleteBoardFromStorage(bId);
    setBoards(updated);
    if (currentBoard.id === bId) {
      handleSelectBoard(updated[0] || createDefaultBoard());
    }
    addToast('Board removed from vault.', 'info');
  };

  const handleRenameBoardFromModal = (bId, newTitle) => {
    const updated = boards.map((b) => (b.id === bId ? { ...b, title: newTitle } : b));
    localStorage.setItem('sv_whiteboards_vault', JSON.stringify(updated));
    setBoards(updated);
    if (currentBoard.id === bId) {
      setCurrentBoard((prev) => ({ ...prev, title: newTitle }));
      setBoardTitleInput(newTitle);
    }
  };

  // Classroom Session Toggle
  const handleToggleSession = () => {
    if (sessionActive) {
      setSessionActive(false);
      socketRef.current?.disconnect();
      addToast('Classroom live session closed.', 'info');
    } else {
      const code = `SV-${Math.floor(1000 + Math.random() * 9000)}`;
      setRoomCode(code);
      setSessionActive(true);
      addToast(`Classroom broadcast live! Room Code: ${code}`, 'success', 'Session Active');
    }
  };

  const handleToggleStudentEditing = () => {
    const nextState = !allowStudentEditing;
    setAllowStudentEditing(nextState);
    if (socketRef.current) {
      socketRef.current.sendPermissionToggle(nextState);
    }
  };

  const copyClassroomLink = () => {
    const url = `${window.location.origin}/whiteboard?room=${roomCode}&role=student`;
    navigator.clipboard.writeText(url);
    addToast('Shareable student invitation link copied to clipboard!', 'info');
  };

  // Insert Mathematical / Geometric elements onto canvas
  const handleInsertMathElement = (el) => {
    const newEl = {
      id: `el-${Date.now()}`,
      startX: 300,
      startY: 200,
      ...el
    };
    handleElementsChange((prev) => [...prev, newEl]);
    addToast('Mathematical element placed on whiteboard.', 'success');
  };

  const isStudentViewOnly = role === 'student' && !allowStudentEditing;

  return (
    <div
      ref={whiteboardContainerRef}
      className={`relative w-full h-[calc(100vh-5rem)] flex flex-col overflow-hidden bg-[#050713] ${
        isFullscreen ? 'h-screen' : ''
      }`}
    >
      {/* TOP HEADER BAR */}
      <header className="z-30 shrink-0 h-14 bg-[#070b20]/90 backdrop-blur-xl border-b border-indigo-900/40 px-4 flex items-center justify-between gap-4">
        {/* Left: Title & Saved Vault */}
        <div className="flex items-center gap-3">
          {/* Saved Boards Vault button */}
          <button
            onClick={() => setIsSavedBoardsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
            title="Open Saved Whiteboards Vault"
          >
            <FolderOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Vault</span>
          </button>

          {/* Board Title */}
          <div className="flex items-center gap-2">
            {isEditingTitle ? (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={boardTitleInput}
                  onChange={(e) => setBoardTitleInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveBoardTitle()}
                  autoFocus
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-400 text-xs text-white font-display font-bold focus:outline-none"
                />
                <button
                  onClick={handleSaveBoardTitle}
                  className="p-1 rounded text-emerald-400 hover:bg-emerald-500/10"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => setIsEditingTitle(true)}
                className="flex items-center gap-1.5 cursor-pointer group"
                title="Click to rename lecture board"
              >
                <h1 className="text-xs sm:text-sm font-bold font-display text-white group-hover:text-cyan-300 transition-colors max-w-xs sm:max-w-md truncate">
                  {currentBoard.title}
                </h1>
                <Edit2 className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </div>
        </div>

        {/* Center: Live Classroom Controls */}
        <div className="hidden lg:flex items-center">
          <ClassroomControls
            sessionActive={sessionActive}
            onToggleSession={handleToggleSession}
            roomCode={roomCode}
            role={role}
            onToggleRole={(r) => setRole(r)}
            allowStudentEditing={allowStudentEditing}
            onToggleStudentEditing={handleToggleStudentEditing}
            connectedCount={connectedCount}
            onCopyLink={copyClassroomLink}
          />
        </div>

        {/* Right: Actions & Exports */}
        <div className="flex items-center gap-2">
          {/* Save Board Manual Trigger */}
          <button
            onClick={() => {
              saveBoardToStorage(currentBoard);
              addToast('Whiteboard saved.', 'success');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all shadow-neon-cyan"
            title="Save Board (Ctrl+S)"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save</span>
          </button>

          {/* Export Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              title="Export Whiteboard"
            >
              <Download className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {isExportMenuOpen && (
              <div className="absolute right-0 mt-2 p-2 rounded-2xl bg-[#090e24] border border-indigo-500/40 shadow-2xl flex flex-col gap-1 z-50 animate-in fade-in zoom-in-95 w-44 font-mono text-xs">
                <button
                  onClick={() => {
                    exportCanvasAsPNG(canvasRef.current, currentBoard.title);
                    setIsExportMenuOpen(false);
                    addToast('Exported board as PNG image.', 'success');
                  }}
                  className="px-3 py-2 rounded-xl text-left hover:bg-cyan-500/15 hover:text-cyan-300 text-slate-300 transition-colors flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download PNG</span>
                </button>

                <button
                  onClick={() => {
                    exportBoardAsJSON(currentBoard);
                    setIsExportMenuOpen(false);
                    addToast('Exported board as JSON archive.', 'success');
                  }}
                  className="px-3 py-2 rounded-xl text-left hover:bg-purple-500/15 hover:text-purple-300 text-slate-300 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  <span>Export JSON</span>
                </button>

                <button
                  onClick={() => {
                    window.print();
                    setIsExportMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-xl text-left hover:bg-emerald-500/15 hover:text-emerald-300 text-slate-300 transition-colors flex items-center gap-2"
                >
                  <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Print / PDF</span>
                </button>
              </div>
            )}
          </div>

          {/* Fullscreen Presentation Mode */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            title={isFullscreen ? 'Exit Presentation Mode' : 'Fullscreen Presentation Mode'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* MAIN WHITEBOARD WORKSPACE */}
      <div className="relative flex-1 w-full h-full">
        {/* Floating Left Toolbar */}
        <WhiteboardToolbar
          activeTool={activeTool}
          onChangeTool={setActiveTool}
          strokeColor={strokeColor}
          onChangeColor={setStrokeColor}
          strokeWidth={strokeWidth}
          onChangeWidth={setStrokeWidth}
          backgroundType={backgroundType}
          onChangeBackground={(bg) => {
            setBackgroundType(bg);
            setCurrentBoard((prev) => {
              const u = { ...prev, backgroundType: bg };
              saveBoardToStorage(u);
              return u;
            });
          }}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={canUndo}
          canRedo={canRedo}
          onClearCanvas={handleClearCanvas}
          onOpenMathTools={() => setIsMathToolsOpen(true)}
          isStudentViewOnly={isStudentViewOnly}
        />

        {/* Core Interactive Drawing Canvas */}
        <WhiteboardCanvas
          elements={elements}
          onChangeElements={handleElementsChange}
          activeTool={activeTool}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          backgroundType={backgroundType}
          zoom={zoom}
          panOffset={panOffset}
          onPanChange={setPanOffset}
          isStudentViewOnly={isStudentViewOnly}
          laserPointerActive={activeTool === 'laser'}
          onLaserMove={handleLaserMove}
          remoteLaser={remoteLaser}
          canvasRef={canvasRef}
        />

        {/* BOTTOM CONTROLS BAR (PAGES, ZOOM, SHORTCUTS) */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {/* Multi-page controls */}
          <WhiteboardPages
            pages={currentBoard.pages}
            activePageIndex={activePageIndex}
            onSelectPage={handleSelectPage}
            onAddPage={handleAddPage}
            onDeletePage={handleDeletePage}
          />

          {/* Zoom Controls Pill */}
          <div className="flex items-center gap-1 bg-[#080d24]/90 backdrop-blur-xl border border-indigo-900/40 p-1 rounded-2xl shadow-xl text-xs font-mono">
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <span
              onClick={handleResetZoom}
              className="px-2 py-0.5 font-bold text-cyan-300 cursor-pointer hover:underline"
              title="Reset Zoom to 100%"
            >
              {Math.round(zoom * 100)}%
            </span>

            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Keyboard Shortcuts Trigger */}
          <button
            onClick={() => setIsShortcutsOpen(true)}
            className="p-2 rounded-2xl bg-[#080d24]/90 backdrop-blur-xl border border-indigo-900/40 text-slate-400 hover:text-cyan-300 shadow-xl transition-colors"
            title="Keyboard Shortcuts"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SAVED BOARDS MODAL */}
      <SavedBoardsModal
        isOpen={isSavedBoardsOpen}
        onClose={() => setIsSavedBoardsOpen(false)}
        boards={boards}
        activeBoardId={currentBoard.id}
        onSelectBoard={handleSelectBoard}
        onCreateNewBoard={handleCreateNewBlankBoard}
        onDeleteBoard={handleDeleteBoard}
        onRenameBoard={handleRenameBoardFromModal}
      />

      {/* MATHEMATICAL & GEOMETRY TOOLS MODAL */}
      <MathToolsModal
        isOpen={isMathToolsOpen}
        onClose={() => setIsMathToolsOpen(false)}
        onInsertElement={handleInsertMathElement}
      />

      {/* KEYBOARD SHORTCUTS MODAL */}
      <Modal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        title="Whiteboard Keyboard Shortcuts"
        subtitle="Quick reference for master classroom lecturing and drawing navigation"
      >
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          {[
            { key: 'P', desc: 'Pen Tool' },
            { key: 'H', desc: 'Highlighter' },
            { key: 'E', desc: 'Eraser Tool' },
            { key: 'V / S', desc: 'Select & Move' },
            { key: 'L', desc: 'Straight Line' },
            { key: 'A', desc: 'Vector Arrow' },
            { key: 'R', desc: 'Rectangle' },
            { key: 'C', desc: 'Circle / Ellipse' },
            { key: 'T', desc: 'Text Note' },
            { key: 'Space + Drag', desc: 'Pan Whiteboard' },
            { key: '⌘ / Ctrl + Z', desc: 'Undo Stroke' },
            { key: '⌘ / Ctrl + ⇧ + Z', desc: 'Redo Stroke' },
            { key: '⌘ / Ctrl + S', desc: 'Save Whiteboard' },
            { key: 'Delete / Backspace', desc: 'Delete Selected Object' }
          ].map((item, i) => (
            <div
              key={i}
              className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between"
            >
              <span className="text-slate-400">{item.desc}</span>
              <kbd className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-cyan-300 font-bold">
                {item.key}
              </kbd>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};
export default TeacherWhiteboard;
