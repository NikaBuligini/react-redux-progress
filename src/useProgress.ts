import { useReducer, useRef, useEffect, Dispatch } from 'react';

function getDefaultIncrement() {
  return (Math.random() + 1 - Math.random()) * 3;
}

type StartAction = { type: 'start' };
type SetAction = { type: 'set'; payload: number };
type IncrementAction = {
  type: 'increment';
  payload: {
    maxPercent: number;
    add: number;
  };
};
type FinishAction = { type: 'finish' };
type ResetAction = { type: 'reset' };

type Actions =
  | StartAction
  | SetAction
  | IncrementAction
  | FinishAction
  | ResetAction;

export function reducer(state: number, action: Actions) {
  switch (action.type) {
    case 'start': {
      return 0;
    }
    case 'set': {
      return action.payload;
    }
    case 'increment': {
      const { maxPercent, add } = action.payload;

      const nextPercent = state + add;

      return nextPercent < maxPercent ? nextPercent : maxPercent;
    }
    case 'finish': {
      return 100;
    }
    case 'reset': {
      return -1;
    }
  }
}

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function onTimeout() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setTimeout(onTimeout, delay);
      return () => clearTimeout(id);
    }

    return undefined;
  }, [delay]);
}

export interface Config {
  maxPercent?: number;
  intervalTime?: number;
  increment?: () => number;
}

const defaultConfig = {
  maxPercent: 85,
  intervalTime: 450,
  increment: getDefaultIncrement,
};

function useTicker(
  progress: number,
  dispatch: Dispatch<Actions>,
  config: Config = {}
) {
  const maxPercent = config.maxPercent ?? defaultConfig.maxPercent;
  const intervalTime = config.intervalTime ?? defaultConfig.intervalTime;
  const increment = config.increment ?? defaultConfig.increment;

  useInterval(
    () => {
      if (progress >= 0 && progress < 99) {
        dispatch({
          type: 'increment',
          payload: { maxPercent, add: increment() },
        });
      } else {
        dispatch({ type: 'set', payload: progress });
      }
    },
    progress >= 0 && progress < 99 ? intervalTime : null
  );

  useTimeout(
    () => void dispatch({ type: 'reset' }),
    progress >= 99 ? 400 : null
  );
}

export function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function useProgress(isActive: boolean, config?: Config) {
  const [progress, dispatch] = useReducer(reducer, -1);

  const prevIsActive = usePrevious(isActive);

  useEffect(() => {
    // Start progress
    if (!prevIsActive && isActive) {
      dispatch({ type: 'start' });
    }

    // Complete progress when status changes. But prevent state update while re-rendering.
    if (prevIsActive && !isActive && progress !== -1 && progress < 100) {
      dispatch({ type: 'finish' });
    }
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

  useTicker(progress, dispatch, config);

  return progress;
}
