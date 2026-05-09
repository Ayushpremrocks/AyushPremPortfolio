// src/hooks/useKonamiCode.js
import { useEffect, useCallback } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

/**
 * Listens for the Konami Code sequence on the document.
 * Calls `onActivate` when the full sequence is detected.
 */
export function useKonamiCode(onActivate) {
  const inputRef = { current: [] };

  const handleKey = useCallback(
    (e) => {
      inputRef.current.push(e.key);
      // Trim to last N keys
      if (inputRef.current.length > KONAMI_SEQUENCE.length) {
        inputRef.current.shift();
      }
      if (
        inputRef.current.length === KONAMI_SEQUENCE.length &&
        inputRef.current.every((k, i) => k === KONAMI_SEQUENCE[i])
      ) {
        inputRef.current = [];
        onActivate?.();
      }
    },
    [onActivate]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);
}
