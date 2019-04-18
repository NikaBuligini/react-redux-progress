import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useProgress } from 'react-redux-progress';

import Cat from './Cat';
import RainbowColor from './RainbowColor';

const ProgressContainer = styled.div`
  top: 0;
  left: 0;
  margin-top: 20px;
  padding: 0 25px;
  width: 100%;
  height: 18px;
  box-sizing: border-box;
  visibility: visible;
  opacity: 1;
  z-index: 9999;

  > div {
    position: relative;
  }

  .cat {
    position: absolute;
    width: 40px;
    top: -2px;
    right: -20px;
  }

  .color {
    height: 3px;
  }
`;

const NyanProgress = ({ isActive }) => {
  const percent = useProgress(isActive);

  const isHidden = percent <= 0 || percent > 100;

  const animatedProps = useSpring({
    from: { width: '0%', opacity: 0 },
    to: {
      width: `${percent <= 0 ? 0 : percent}%`,
      opacity: percent >= 99.9 ? 0 : 1,
    },
  });

  return (
    <ProgressContainer>
      {!isHidden && (
        <animated.div style={animatedProps}>
          <RainbowColor color="#fc0000" />
          <RainbowColor color="#fd9f01" />
          <RainbowColor color="#faff00" />
          <RainbowColor color="#27fc01" />
          <RainbowColor color="#009dfc" />
          <RainbowColor color="#5e29fd" />
          <Cat animatedProps={animatedProps} />
        </animated.div>
      )}
    </ProgressContainer>
  );
};

export default NyanProgress;
