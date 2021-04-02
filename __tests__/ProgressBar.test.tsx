import React from 'react';
import renderer from 'react-test-renderer';

import { ProgressBarProvider } from '../src/ProgressBarProvider';

jest.useFakeTimers();

describe('<ProgressBarProvider />', () => {
  it('should render <ProgressBar />', () => {
    const component = renderer.create(<ProgressBarProvider isActive={false} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render progress bar with color name', () => {
    const component = renderer.create(
      <ProgressBarProvider isActive={false} color="red" />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render progress bar with color hex', () => {
    const component = renderer.create(
      <ProgressBarProvider isActive={false} color="#db7093" />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render progress bar with styles', () => {
    const component = renderer.create(
      <ProgressBarProvider isActive={false} styles={{ height: '5px' }} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render progress bar with className', () => {
    const component = renderer.create(
      <ProgressBarProvider isActive={false} className="my-custom-classname" />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
