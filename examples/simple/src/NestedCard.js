import React from 'react';
import styled from 'styled-components';
import ProgressBar from '../../../ProgressBarProvider';

const Wrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

const Card = styled.div`
  position: relative;
  width: 500px;
  height: 200px;
  display: inline-block;
  padding: 15px;
  box-sizing: border-box;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
`;

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
        border: '0',
        cursor: 'pointer',
        outline: '0',
        transition: '0.5s',
      }}
    >
      {children}
    </button>
  );
}

class NestedCard extends React.PureComponent {
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
      <Wrapper>
        <Card>
          <ProgressBar
            isActive={isProgressActive}
            color="palevioletred"
            absolute
          />
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
        </Card>
      </Wrapper>
    );
  }
}

export default NestedCard;
