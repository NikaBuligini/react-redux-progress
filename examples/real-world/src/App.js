import React from 'react';
import { connect } from 'react-redux';

import ProgressBarProvider from '../../../index';
import Contributors from './containers/Contributors';

const customStyles = {
  height: '3px',
};

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <ProgressBarProvider
          isActive={this.props.isProgressActive}
          className="my-custom-class"
          styles={customStyles}
        />
        <Contributors />
      </div>
    );
  }
}

export default connect(state => ({
  isProgressActive: state.progress.isActive,
}))(App);
