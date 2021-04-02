import React from 'react';
import { ProgressBarProvider as ProgressBar } from 'react-redux-progress';

import NestedCard from './NestedCard';
import useTimeout from './useTimeout';

function Button({ onClick, children, isProgressActive }) {
  const color = isProgressActive ? 'cornflowerblue' : 'palevioletred';

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'inline-block',
        borderRadius: '3px',
        padding: '0.5rem 0',
        margin: '0.5rem 1rem',
        width: '11rem',
        background: 'transparent',
        color,
        border: `2px solid ${color}`,
        cursor: 'pointer',
        outline: '0',
        transition: '0.5s',
      }}
    >
      {children}
    </button>
  );
}

const App = () => {
  const [isActive, setActive] = React.useState(false);

  useTimeout(() => setActive(false), isActive ? 5000 : null);

  return (
    <div>
      <ProgressBar isActive={isActive} />
      <div
        style={{
          textAlign: 'center',
          width: '100%',
          padding: '20px 0',
        }}
      >
        <Button
          onClick={() => setActive((wasActive) => !wasActive)}
          isProgressActive={isActive}
        >
          {isActive ? 'Stop' : 'Start'}
        </Button>
      </div>
      <NestedCard />
    </div>
  );
};

export default App;
