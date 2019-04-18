import React from 'react';
import styled from 'styled-components';
import { ProgressBarProvider as ProgressBar } from 'react-redux-progress';

import useTimeout from './useTimeout';

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

const NestedCard = () => {
  const [isActive, setActive] = React.useState(false);

  useTimeout(() => setActive(false), isActive ? 5000 : null);

  return (
    <Wrapper>
      <Card>
        <ProgressBar isActive={isActive} color="palevioletred" absolute />
        <Button
          onClick={() => setActive(wasActive => !wasActive)}
          isProgressActive={isActive}
        >
          {isActive ? 'Stop' : 'Start'}
        </Button>
      </Card>
    </Wrapper>
  );
};

export default NestedCard;
