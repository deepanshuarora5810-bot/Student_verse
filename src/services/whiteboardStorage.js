// Storage Service for StudentVerse Whiteboard

const STORAGE_KEY = 'sv_whiteboards_vault';
const ACTIVE_BOARD_ID_KEY = 'sv_active_whiteboard_id';

export const createDefaultBoard = () => {
  return {
    id: `wb-${Date.now()}`,
    title: 'Quantum Circuits & Superposition Lecture',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activePageIndex: 0,
    backgroundType: 'grid', // 'grid', 'dots', 'ruled', 'blank', 'cyber'
    pages: [
      {
        id: 'page-1',
        title: 'Lecture 1: Bell States & Hadamard Gate',
        elements: [
          {
            id: 'sample-rect-1',
            type: 'rectangle',
            startX: 120,
            startY: 100,
            endX: 680,
            endY: 260,
            color: '#a855f7',
            width: 3,
            fill: 'rgba(168, 85, 247, 0.08)'
          },
          {
            id: 'sample-text-1',
            type: 'text',
            x: 150,
            y: 140,
            text: 'STUDENTVERSE: QUANTUM COMPUTING 101',
            color: '#06b6d4',
            fontSize: 22,
            fontFamily: 'Space Grotesk'
          },
          {
            id: 'sample-text-2',
            type: 'text',
            x: 150,
            y: 180,
            text: 'Superposition State: |ψ⟩ = α|0⟩ + β|1⟩  where |α|² + |β|² = 1',
            color: '#ffffff',
            fontSize: 16,
            fontFamily: 'JetBrains Mono'
          },
          {
            id: 'sample-text-3',
            type: 'text',
            x: 150,
            y: 220,
            text: 'Hadamard Transform Matrix: H = 1/√2 [[1, 1], [1, -1]]',
            color: '#38bdf8',
            fontSize: 15,
            fontFamily: 'JetBrains Mono'
          },
          {
            id: 'sample-arrow-1',
            type: 'arrow',
            startX: 360,
            startY: 280,
            endX: 360,
            endY: 370,
            color: '#06b6d4',
            width: 3
          },
          {
            id: 'sample-circle-1',
            type: 'circle',
            startX: 280,
            startY: 380,
            endX: 440,
            endY: 520,
            color: '#10b981',
            width: 3,
            fill: 'rgba(16, 185, 129, 0.1)'
          },
          {
            id: 'sample-text-4',
            type: 'text',
            x: 310,
            y: 450,
            text: 'Entangled Pair',
            color: '#10b981',
            fontSize: 14,
            fontFamily: 'Plus Jakarta Sans'
          }
        ]
      },
      {
        id: 'page-2',
        title: 'Lecture 2: Grover Diffusion Operator',
        elements: [
          {
            id: 'sample-text-p2',
            type: 'text',
            x: 140,
            y: 120,
            text: 'Grover Diffusion Operator: Us = 2|s⟩⟨s| - I',
            color: '#c084fc',
            fontSize: 20,
            fontFamily: 'JetBrains Mono'
          }
        ]
      }
    ]
  };
};

export const getSavedBoards = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = [createDefaultBoard()];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [createDefaultBoard()];
  } catch (e) {
    return [createDefaultBoard()];
  }
};

export const saveBoardToStorage = (board) => {
  try {
    const boards = getSavedBoards();
    const updated = {
      ...board,
      updatedAt: new Date().toISOString()
    };
    const index = boards.findIndex((b) => b.id === board.id);
    let newBoards;
    if (index >= 0) {
      newBoards = [...boards];
      newBoards[index] = updated;
    } else {
      newBoards = [updated, ...boards];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBoards));
    localStorage.setItem(ACTIVE_BOARD_ID_KEY, board.id);
    return true;
  } catch (e) {
    console.error('Failed to save whiteboard to storage', e);
    return false;
  }
};

export const deleteBoardFromStorage = (boardId) => {
  try {
    const boards = getSavedBoards().filter((b) => b.id !== boardId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
    return boards;
  } catch (e) {
    return [];
  }
};

export const exportCanvasAsPNG = (canvasElement, filename = 'studentverse-whiteboard') => {
  if (!canvasElement) return;
  const link = document.createElement('a');
  link.download = `${filename}-${Date.now()}.png`;
  link.href = canvasElement.toDataURL('image/png', 1.0);
  link.click();
};

export const exportBoardAsJSON = (board) => {
  const jsonStr = JSON.stringify(board, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `${board.title.toLowerCase().replace(/\s+/g, '-')}-board.json`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
};
