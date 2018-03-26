import React from 'react';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';
import Progress from '../../../index';
import CatSvg from './cat.svg';
import Intro from './intro.ogg';
import Loop from './loop.ogg';

const Wrapper = styled.div`
  .trigger-button-container {
    text-align: center;
    width: 100%;
    padding: 20px 0;
  }
`;

const TriggerButton = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: ${props => props.color};
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

const RainbowColor = ({ color }) => (
  <div className="color" style={{ backgroundColor: color }} />
);

const Cat = () => <div />;

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
      <Motion defaultStyle={{ x: 0 }} style={{ x: spring(width) }}>
        {value => (
          <div style={{ width: `${value.x}%`, opacity, position: 'relative' }}>
            <RainbowColor color="#fc0000" />
            <RainbowColor color="#fd9f01" />
            <RainbowColor color="#faff00" />
            <RainbowColor color="#27fc01" />
            <RainbowColor color="#009dfc" />
            <RainbowColor color="#5e29fd" />
            <span
              dangerouslySetInnerHTML={{ __html: CatSvg }}
              style={{
                position: 'absolute',
                visibility: width > 0 ? 'visible' : 'hidden',
                width: '40px',
                top: '-2px',
                right: '-20px',
                opacity,
              }}
            />
          </div>
        )}
      </Motion>
    </ProgressContainer>
  );
};

class App extends React.Component {
  state = {
    isActive: false,
  };

  handleStartProgress = () => {
    this.setState({ state: 'wait' }, () => {
      this.introRef.onended = () => {
        this.loopRef.play();
        this.setState({ state: 'started' }, () => {
          // setTimeout(this.handleStopProgress, 5000);
        });
      };
      this.introRef.play();
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
        <Progress
          isActive={isProgressActive}
          renderProgress={percent => <NyanProgress percent={percent} />}
        />
        <audio ref={this.saveIntroRef} src={Intro} preload />
        <audio ref={this.saveLoopRef} src={Loop} preload />
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
      </Wrapper>
    );
  }
}

export default App;
