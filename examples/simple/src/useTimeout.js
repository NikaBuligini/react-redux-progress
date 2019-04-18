import React from 'react';

function useTimeout(callback, delay) {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
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

export default useTimeout;
