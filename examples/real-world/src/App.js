import React from 'react';
import { connect } from 'react-redux';

import ProgressBar from '../../../index';
import { setTimeout } from 'core-js/library/web/timers';
import Contributors from './containers/Contributors';

type Props = {
  isProgressActive: boolean,
};

class App extends React.Component<Props> {
  handleStartProgress = () => {
    this.setState({ isActive: true }, () => {
      setTimeout(this.handleStopProgress, 5000);
    });
  };

  handleStopProgress = () => {
    this.setState({ isActive: false });
  };

  render() {
    const { isProgressActive } = this.props;

    return (
      <div>
        <ProgressBar isActive={isProgressActive} />
        <Contributors />
      </div>
    );
  }
}

export default connect(state => ({
  isProgressActive: state.progress.isActive,
}))(App);
