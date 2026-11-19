import { useCallback, useEffect, useRef, useState } from "react";

/*
    Хук useAnimationLock позволяет блокировать анимацию на заданный период времени.
    duration задает длительность блокировки в миллисекундах.
    Возвращает объект с состоянием блокировки и функциями lock и unlock.
*/

export function useAnimationLock(duration: number) {
  const [locked, setLocked] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const lock = useCallback(() => {
    setLocked(true);
    clear();
    timeoutRef.current = setTimeout(() => {
      setLocked(false);
      timeoutRef.current = null;
    }, duration + 50);
  }, [duration]);

  const unlock = useCallback(() => {
    clear();
    setLocked(false);
  }, []);

  useEffect(() => clear, []);

  return { locked, lock, unlock };
}