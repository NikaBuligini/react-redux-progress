import React from 'react';
import styled from 'styled-components';
import { Spring } from 'react-spring';
import Progress from '../../../index';
import Intro from './intro.ogg';
import Loop from './loop.ogg';
import Cat from './Cat';
import RainbowColor from './RainbowColor';

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
  background-color: ${props => props.color};
  border: 2px solid ${props => props.color};
  cursor: pointer;
  outline: 0;
  transition: 0.5s;
`;

const ProgressContainer = styled.div`
  top: 0;
  left: 0;
  margin-top: 20px;
  padding: 0 25px;
  width: 100%;
  box-sizing: border-box;
  ${props =>
    props.isHidden
      ? `
    visibility: hidden;
    opacity: 0;
    z-index: -10;
  `
      : `
    visibility: visible;
    opacity: 1;
    z-index: 9999;
  `};

  .color {
    height: 3px;
  }
`;

const ProgressPercent = styled.div`
  width: ${props => props.width};
  opacity: ${props => props.opacity};
`;

const NyanProgress = ({ percent }) => {
  const isHidden = percent < 0 || percent >= 100;
  const width = percent <= 0 ? 0 : percent;
  const opacity = percent >= 99.9 ? '0' : '1';

  return (
    <ProgressContainer isHidden={isHidden}>
      <Spring from={{ x: 0, iteration: 0 }} to={{ x: width, iteration: 5 }}>
        {value => (
          <div style={{ width: `${value.x}%`, opacity, position: 'relative' }}>
            <RainbowColor color="#fc0000" />
            <RainbowColor color="#fd9f01" />
            <RainbowColor color="#faff00" />
            <RainbowColor color="#27fc01" />
            <RainbowColor color="#009dfc" />
            <RainbowColor color="#5e29fd" />
            <Cat isHidden={isHidden} width={width} opacity={opacity} />
          </div>
        )}
      </Spring>
    </ProgressContainer>
  );
};

function playAudio(audio) {
  const isPlaying =
    audio.currentTime > 0 &&
    !audio.paused &&
    !audio.ended &&
    audio.readyState > 2;

  if (!isPlaying) {
    audio.play();
  }
}

class App extends React.Component {
  state = {
    state: 'ended',
  };

  handleStartProgress = () => {
    this.setState({ state: 'wait' }, () => {
      this.introRef.onended = () => {
        playAudio(this.loopRef);

        this.setState({ state: 'started' }, () => {
          // setTimeout(this.handleStopProgress, 5000);
        });
      };
      playAudio(this.introRef);
    });
  };

  handleStopProgress = () => {
    this.introRef.pause();
    this.introRef.currentTime = 0;
    this.loopRef.pause();
    this.loopRef.currentTime = 0;
    this.setState({ state: 'ended' });
  };

  saveIntroRef = element => {
    this.introRef = element;
  };

  saveLoopRef = element => {
    this.loopRef = element;
  };

  renderButtonText = (state, isProgressActive) => {
    if (state === 'wait') {
      return 'Wait for it...';
    }

    return isProgressActive ? 'Stop' : 'Start';
  };

  render() {
    const { state } = this.state;
    const isProgressActive = state === 'started';

    return (
      <Wrapper>
        <audio ref={this.saveIntroRef} src={Intro} preload={1} />
        <audio ref={this.saveLoopRef} src={Loop} preload={1} loop={1} />
        <div className="trigger-button-container">
          <TriggerButton
            type="button"
            onClick={
              isProgressActive
                ? this.handleStopProgress
                : this.handleStartProgress
            }
            color={isProgressActive ? 'cornflowerblue' : 'palevioletred'}
          >
            {this.renderButtonText(state, isProgressActive)}
          </TriggerButton>
        </div>
        <Progress isActive={isProgressActive}>
          {percent => <NyanProgress percent={percent} />}
        </Progress>
        <div className="footer">
          <a href="https://github.com/NikaBuligini" target="_blank">
            GitHub
          </a>
          <a href="https://twitter.com/buligini" target="_blank">
            Twitter
          </a>
        </div>
      </Wrapper>
    );
  }
}

export default App;
