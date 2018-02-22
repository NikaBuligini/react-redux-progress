import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import Ticker from '../Ticker';

let clock = null;

describe('<Ticker />', () => {
  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('should initially render empty progress', () => {
    const component = renderer.create(<Ticker />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should initially render progress html', () => {
    const component = renderer.create(
      <Ticker renderProgress={percent => <div>Progress {percent}</div>} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call renderProgress function', () => {
    const renderProgress = jest.fn();
    renderProgress.mockReturnValue(null);
    mount(<Ticker renderProgress={renderProgress} />);
    expect(renderProgress).toHaveBeenCalled();
  });

  it('should set state.percent as props.percent', () => {
    const expected = 50;
    const renderedComponent = mount(<Ticker percent={expected} />);
    expect(renderedComponent.state().percent).toEqual(expected);
  });

  it('should set state.maxPercent as props.maxPercent', () => {
    const expected = 50;
    const renderedComponent = mount(<Ticker maxPercent={expected} />);
    expect(renderedComponent.state().maxPercent).toEqual(expected);
  });

  it('should fallback to default maxPercent', () => {
    const passed = 150;
    const expected = 85;
    const renderedComponent = mount(<Ticker maxPercent={passed} />);
    expect(renderedComponent.state().maxPercent).toEqual(expected);
  });

  it('should fallback to default maxPercent when string is passed', () => {
    const passed = '95';
    const expected = 85;
    const renderedComponent = mount(<Ticker maxPercent={passed} />);
    expect(renderedComponent.state().maxPercent).toEqual(expected);
  });

  it('should call componentDidMount', () => {
    sinon.spy(Ticker.prototype, 'componentDidMount');
    // eslint-disable-next-line
    const renderedComponent = mount(
      <Ticker percent={0} updateProgress={noop => noop} />,
    );
    expect(Ticker.prototype.componentDidMount.calledOnce).toEqual(true);
    Ticker.prototype.componentDidMount.restore();
  });

  it('should call componentWillReceiveProps', () => {
    sinon.spy(Ticker.prototype, 'componentWillReceiveProps');
    const renderedComponent = mount(
      <Ticker percent={0} updateProgress={noop => noop} />,
    );
    renderedComponent.setProps({ percent: 50 });
    expect(Ticker.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
    Ticker.prototype.componentWillReceiveProps.restore();
  });

  it('should unset Ticker.interval after getting new props', () => {
    const renderedComponent = mount(
      <Ticker percent={0} updateProgress={noop => noop} />,
    );
    const inst = renderedComponent.instance();

    clock.tick(1000);
    expect(inst.interval).toBeDefined();
    inst.componentWillReceiveProps({ percent: 50 });
    expect(inst.interval).toBeUndefined();
  });

  it('should unset Ticker.timeout after getting new props', () => {
    const renderedComponent = mount(
      <Ticker percent={100} updateProgress={noop => noop} />,
    );
    const inst = renderedComponent.instance();

    clock.tick(1000);
    expect(inst.timeout).toBeDefined();
    inst.componentWillReceiveProps({ percent: 50 });
    expect(inst.timeout).toBeUndefined();
  });

  it('should set state to -1 after new route mounts', () => {
    const renderedComponent = mount(
      <Ticker percent={0} updateProgress={noop => noop} />,
    );
    renderedComponent.setProps({ percent: 100 });
    clock.tick(501);
    expect(renderedComponent.state().percent).toEqual(-1);
  });

  it('should call componentWillUnmount', () => {
    sinon.spy(Ticker.prototype, 'componentWillUnmount');
    const renderedComponent = mount(
      <Ticker percent={0} updateProgress={noop => noop} />,
    );
    renderedComponent.unmount();
    expect(Ticker.prototype.componentWillUnmount.calledOnce).toEqual(true);
    Ticker.prototype.componentWillUnmount.restore();
  });

  it('should unset Ticker.interval after unmounting', () => {
    sinon.spy(Ticker.prototype, 'componentWillUnmount');
    const renderedComponent = mount(
      <Ticker percent={0} updateProgress={noop => noop} />,
    );
    const inst = renderedComponent.instance();

    clock.tick(1000);
    expect(inst.interval).toBeDefined();
    renderedComponent.unmount();
    expect(inst.interval).toBeUndefined();
    Ticker.prototype.componentWillUnmount.restore();
  });

  it('should unset Ticker.timeout after unmounting', () => {
    sinon.spy(Ticker.prototype, 'componentWillUnmount');
    const renderedComponent = mount(
      <Ticker percent={100} updateProgress={noop => noop} />,
    );
    const inst = renderedComponent.instance();

    clock.tick(1000);
    expect(inst.timeout).toBeDefined();
    renderedComponent.unmount();
    expect(inst.timeout).toBeUndefined();
    Ticker.prototype.componentWillUnmount.restore();
  });

  describe('increment progress', () => {
    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should start incrementing progress if 0 <= percent < 100', () => {
      const initialPercent = 50;
      const renderedComponent = mount(
        <Ticker percent={initialPercent} updateProgress={noop => noop} />,
      );
      clock.tick(1000);
      expect(renderedComponent.state().percent).toBeGreaterThan(initialPercent);
    });

    it('should stop incrementing progress if percent >= 100', () => {
      const initialPercent = 100;
      const expected = -1;
      const renderedComponent = mount(
        <Ticker percent={initialPercent} updateProgress={noop => noop} />,
      );
      clock.tick(1000);
      expect(renderedComponent.state().percent).toEqual(expected);
    });
  });
});
