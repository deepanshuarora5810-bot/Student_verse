import { useState, useCallback } from 'react';

export const useUndoRedo = (initialElements = []) => {
  const [past, setPast] = useState([]);
  const [present, setPresent] = useState(initialElements);
  const [future, setFuture] = useState([]);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const undo = useCallback(() => {
    if (!canUndo) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setPast(newPast);
    setFuture([present, ...future]);
    setPresent(previous);
  }, [canUndo, past, present, future]);

  const redo = useCallback(() => {
    if (!canRedo) return;

    const next = future[0];
    const newFuture = future.slice(1);

    setPast([...past, present]);
    setPresent(next);
    setFuture(newFuture);
  }, [canRedo, past, present, future]);

  const pushState = useCallback((newElements) => {
    setPast((prev) => [...prev.slice(-40), present]);
    setPresent(newElements);
    setFuture([]); // clear redo stack on new action
  }, [present]);

  const resetState = useCallback((elements) => {
    setPast([]);
    setPresent(elements);
    setFuture([]);
  }, []);

  return {
    elements: present,
    setElements: setPresent,
    pushState,
    undo,
    redo,
    canUndo,
    canRedo,
    resetState
  };
};
