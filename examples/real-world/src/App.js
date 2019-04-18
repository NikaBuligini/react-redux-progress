import React from 'react';
import { connect } from 'react-redux';
import { ProgressBarProvider } from 'react-redux-progress';

import Contributors from './containers/Contributors';

const customStyles = {
  height: '3px',
};

const App = ({ isProgressActive }) => (
  <div>
    <ProgressBarProvider
      isActive={isProgressActive}
      className="my-custom-class"
      styles={customStyles}
    />
    <Contributors />
  </div>
);

export default connect(state => ({
  isProgressActive: state.progress.isActive,
}))(App);
