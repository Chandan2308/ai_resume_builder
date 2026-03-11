import { useState, useCallback } from 'react';

const useUndoRedo = (initialState) => {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([initialState]);

  // Supports both direct values and functional updates (prev => newState)
  const setState = useCallback((newStateOrFn) => {
    setHistory((prev) => {
      const currentState = prev[index] ?? prev[prev.length - 1];
      const newState = typeof newStateOrFn === 'function' 
        ? newStateOrFn(currentState) 
        : newStateOrFn;
      const newHistory = prev.slice(0, index + 1);
      const stateToAdd = JSON.parse(JSON.stringify(newState));
      newHistory.push(stateToAdd);
      const limitedHistory = newHistory.slice(-50);
      setIndex(limitedHistory.length - 1);
      return limitedHistory;
    });
  }, [index]);

  const undo = useCallback(() => {
    setIndex(i => Math.max(0, i - 1));
  }, []);

  const redo = useCallback(() => {
    setHistory(h => {
      setIndex(i => Math.min(h.length - 1, i + 1));
      return h;
    });
  }, []);

  const canUndo = index > 0;
  const canRedo = index < history.length - 1;

  return {
    state: history[index],
    setState,
    undo,
    redo,
    canUndo,
    canRedo
  };
};

export default useUndoRedo;
export { useUndoRedo };
