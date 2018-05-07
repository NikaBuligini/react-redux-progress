import React from 'react';
import sinon from 'sinon';
import renderer from 'react-test-renderer';

import ProgressBarProvier from '../ProgressBarProvider';

let clock = null;

describe('<ProgressBarProvier />', () => {
  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('should render <ProgressBar />', () => {
    const component = renderer.create(<ProgressBarProvier />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render progress bar with color name', () => {
    const component = renderer.create(<ProgressBarProvier color="red" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render progress bar with color hex', () => {
    const component = renderer.create(<ProgressBarProvier color="#db7093" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render progress bar with styles', () => {
    const component = renderer.create(
      <ProgressBarProvier styles={{ height: '5px' }} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render progress bar with className', () => {
    const component = renderer.create(
      <ProgressBarProvier className="my-custom-classname" />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
