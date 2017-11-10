import React from 'react';
import ProgressBar from '../../../index';
import { setTimeout } from 'core-js/library/web/timers';

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

class App extends React.Component {
  state = {
    isActive: false,
  };

  handleStartProgress = () => {
    this.setState({ isActive: true }, () => {
      setTimeout(this.handleStopProgress, 5000);
    });
  };

  handleStopProgress = () => {
    this.setState({ isActive: false });
  };

  render() {
    const { isActive: isProgressActive } = this.state;

    return (
      <div>
        <ProgressBar isActive={isProgressActive} />
        <div
          style={{
            textAlign: 'center',
            width: '100%',
            padding: '20px 0',
          }}
        >
          {isProgressActive ? (
            <Button
              onClick={this.handleStopProgress}
              isProgressActive={isProgressActive}
            >
              Stop
            </Button>
          ) : (
            <Button
              onClick={this.handleStartProgress}
              isProgressActive={isProgressActive}
            >
              Start
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
