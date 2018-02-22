import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import Progress from '../Progress';
import Ticker from '../Ticker';

let clock = null;

describe('<Progress />', () => {
  const renderProgress = percent => percent;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('should render <ProgressBar />', () => {
    const renderedComponent = mount(
      <Progress renderProgress={renderProgress} />,
    );

    expect(renderedComponent.find(Ticker).length).toBe(1);
  });

  it('should initially have state.progress = -1', () => {
    const renderedComponent = mount(
      <Progress renderProgress={renderProgress} />,
    );

    expect(renderedComponent.state().progress).toBe(-1);
  });

  it('should update state.progress when called updateProgress()', () => {
    const renderedComponent = mount(
      <Progress renderProgress={renderProgress} />,
    );

    const inst = renderedComponent.instance();
    inst.updateProgress(10);
    expect(renderedComponent.state().progress).toBe(10);
  });

  it('should update state.progress to 0 when progress activated', () => {
    const renderedComponent = mount(
      <Progress renderProgress={renderProgress} isActive={false} />,
    );
    renderedComponent.setProps({ isActive: true });
    expect(renderedComponent.state().progress).toBe(0);
  });

  it('should update state.progress to 100 when progress deactivated', () => {
    const renderedComponent = mount(
      <Progress renderProgress={renderProgress} isActive />,
    );
    renderedComponent.setState({ progress: 30 });
    renderedComponent.setProps({ isActive: false });
    expect(renderedComponent.state().progress).toBe(100);
  });

  it('should have displayName', () => {
    const renderedComponent = mount(
      <Progress renderProgress={renderProgress} />,
    );
    const inst = renderedComponent.instance();
    expect(inst.constructor.displayName).toBe('Progress');
  });
});
