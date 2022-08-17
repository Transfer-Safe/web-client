import { useCallback, useEffect } from 'react';

export const useOnKey = (key: string, callback: () => void) => {
  const onPress = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === key) {
        callback();
      }
    },
    [callback, key],
  );

  useEffect(() => {
    document.addEventListener('keypress', onPress);
    return () => document.removeEventListener('keypress', onPress);
  }, [onPress]);
};
