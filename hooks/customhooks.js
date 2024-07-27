// src/hooks/useDelayedState.js
import { useState, useEffect, useRef, useCallback } from 'react';

export const useDelayedState = (initialValue, delay) => {
  const [state, setState] = useState(initialValue);
  const [internalValue, setInternalValue] = useState(initialValue);
  const timerRef = useRef(null);

  const setValue = useCallback(
    (value) => {
      setInternalValue(value);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setState(value);
      }, delay);
    },
    [delay]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return [state, internalValue, setValue];
};
