// @flow

import React from 'react';
import ProgressBar from './ProgressBar';

type Props = {
  isActive: boolean,
  renderProgress: (percent: number) => React$Element<*>,
};

type State = {
  progress: number,
};

class ProgressBarProvider extends React.PureComponent<Props, State> {
  static displayName = 'ProgressBarProvider';

  state = {
    progress: -1,
  };

  componentDidMount() {
    if (this.props.isActive) {
      this.updateProgress(0);
    }
  }

  componentWillUpdate(props: Props, state: State) {
    const { progress } = this.state;
    const { isActive: wasActive } = this.props;
    const { isActive } = props;

    // Start progress
    if (!wasActive && isActive) {
      this.updateProgress(0);
    }

    // Complete progress when status changes. But prevent state update while re-rendering.
    if (wasActive && !isActive && progress !== -1 && state.progress < 100) {
      this.updateProgress(100);
    }
  }

  updateProgress = (progress: number) => {
    this.setState({ progress });
  };

  render() {
    return (
      <ProgressBar
        {...this.props}
        percent={this.state.progress}
        updateProgress={this.updateProgress}
        renderProgress={this.props.renderProgress}
      />
    );
  }
}

export default ProgressBarProvider;
