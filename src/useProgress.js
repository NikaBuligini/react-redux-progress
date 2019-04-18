import { useReducer, useRef, useEffect, useCallback, useMemo } from 'react';

function getDefaultIncrement() {
  return (Math.random() + 1 - Math.random()) * 3;
}

export function reducer(state, action) {
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
    default: {
      return state;
    }
  }
}

export function useInterval(callback, delay) {
  const savedCallback = useRef();

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

    return undefined;
  }, [delay]);
}

function useTimeout(callback, delay) {
  const savedCallback = useRef();

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

const defaultOptions = {
  maxPercent: 85,
  intervalTime: 450,
  increment: getDefaultIncrement,
};

function getOptions(options) {
  return {
    ...defaultOptions,
    ...options,
  };
}

function useTicker({
  progress,
  dispatch,
  maxPercent,
  intervalTime,
  increment,
}) {
  const handleTick = useCallback(() => {
    if (progress >= 0 && progress < 99) {
      dispatch({
        type: 'increment',
        payload: { maxPercent, add: increment() },
      });
    } else {
      dispatch({ type: 'set', payload: progress });
    }
  }, [progress, dispatch, maxPercent, increment]);

  useInterval(handleTick, progress >= 0 && progress < 99 ? intervalTime : null);

  const onReset = useCallback(() => {
    dispatch({ type: 'reset' });
  }, []);

  useTimeout(onReset, progress >= 99 ? 400 : null);
}

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function useProgress(isActive, config = {}) {
  const options = useMemo(() => getOptions(config), [config]);

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
  }, [isActive]);

  useTicker({ ...options, progress, dispatch });

  return progress;
}

export default useProgress;
