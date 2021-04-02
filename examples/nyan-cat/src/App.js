/* eslint-disable jsx-a11y/media-has-caption */

import React from 'react';
import styled from 'styled-components';
import NyanProgress from './NyanProgress';
import Intro from './intro.ogg';
import Loop from './loop.ogg';

const Wrapper = styled.div`
  .trigger-button-container {
    text-align: center;
    width: 100%;
    padding: 20px 0;
  }

  .footer {
    text-align: center;
    margin-top: 48px;

    a {
      margin: 0 6px;
      color: lightslategray;
    }
  }
`;

const TriggerButton = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: #fff;
  background-color: ${(props) => props.color};
  border: 2px solid ${(props) => props.color};
  cursor: pointer;
  outline: 0;
  transition: 0.5s;
`;

function playAudio(audio) {
  const isPlaying =
    audio.currentTime > 0 &&
    !audio.paused &&
    !audio.ended &&
    audio.readyState > 2;

  audio.volume = 0.3;

  if (!isPlaying) {
    audio.play();
  }
}

function renderButtonText(state, isProgressActive) {
  if (state === 'wait') {
    return 'Wait for it...';
  }

  return isProgressActive ? 'Stop' : 'Start';
}

const App = () => {
  const [state, setState] = React.useState('ended');

  const introRef = React.useRef();

  const loopRef = React.useRef();

  const isProgressActive = state === 'started';

  const onClick = React.useCallback(() => {
    const intro = introRef.current;
    const loop = loopRef.current;

    switch (state) {
      case 'started': {
        intro.pause();
        intro.currentTime = 0;
        loop.pause();
        loop.currentTime = 0;
        setState('ended');
        break;
      }
      case 'ended': {
        setState('wait');

        intro.onended = () => {
          playAudio(loop);
          setState('started');
        };

        playAudio(intro);
        break;
      }
      case 'wait':
      default: {
        break;
      }
    }
  }, [state, setState]);

  return (
    <Wrapper>
      <audio ref={introRef} src={Intro} preload={1} />
      <audio ref={loopRef} src={Loop} preload={1} loop={1} />
      <div className="trigger-button-container">
        <TriggerButton
          type="button"
          onClick={onClick}
          color={isProgressActive ? 'cornflowerblue' : 'palevioletred'}
        >
          {renderButtonText(state, isProgressActive)}
        </TriggerButton>
      </div>
      <NyanProgress isActive={isProgressActive} />
      <div className="footer">
        <a
          href="https://github.com/NikaBuligini"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/buligini"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </div>
    </Wrapper>
  );
};

export default App;
