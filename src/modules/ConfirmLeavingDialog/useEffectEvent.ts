import * as React from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export type Callback = (...args: never) => unknown;

/**
 * Custom hook that returns a stable callback function that always has the latest version of the provided function.
 *
 * @param fn - The function to be stabilized.
 * @returns A stable callback function.
 * @example
 * const stableCallback = useEffectEvent((value) => {
 *   console.log(value);
 * });
 */
export function useEffectEvent<T extends Callback>(fn: T): T {
  const ref = React.useRef<T | null>(null);
  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  }, [fn]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback<T>(
    ((...args) => {
      const f = ref.current;
      return f?.(...args);
    }) as T,
    [],
  );
}
