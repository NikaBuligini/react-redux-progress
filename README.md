# react-redux-progress
Progress bar for React and Redux applications

![](https://media.giphy.com/media/26u48f9ry3CH9D9Vm/giphy.gif)

[Demo](http://react-redux-progress.surge.sh/)

## Installation

Using [npm](https://www.npmjs.com/):

$ npm install --save react-redux-progress

Using [yarn](https://yarnpkg.com/):

$ yarn add react-redux-progress

```js
// using ES6 modules
import ProgressBar from 'react-redux-progress';

// using CommonJS modules
var ProgressBar = require('react-redux-progress');
```
The UMD build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/react-redux-progress/umd/react-redux-progress.min.js"></script>
```

You can find the library on `window.ReactReduxProgress`.

## Usage

```js
import ProgressBar from 'react-redux-progress';

// default color is #77b6ff
const Layout = ({ isProgressActive, children }) => (
  <div>
    <ProgressBar isActive={isProgressActive} color="#db7093" />
    {children}
  </div>
)
```

You can store isProgressActive variable in redux store and control it with your actions

```js
import { combineReducers } from 'redux';
import progress from 'react-redux-progress/reducer'

const rootReducers = combineReducers({
  progress,
  // other reducers
});

export default rootReducers;
```

Get progress status

```js
import ProgressBar from 'react-redux-progress';
import { connect } from 'react-redux';

const Layout = ({ isProgressActive, children }) => (
  <div>
    <ProgressBar isActive={isProgressActive} />
    {children}
  </div>
);

export default connect(
  state => ({ isProgressActive: state.progress.isActive })
)(Layout);
```

Async action

```js
const startAction = (progressId) => ({
  type: 'START_ASYNC_ACTION',
  progressId,
});

const stopAction = (progressId) => ({
  type: 'STOP_ASYNC_ACTION',
  progressId,
});

// dispatch thunk action
export function startAsyncAction() {
  return dispatch => {
    const progressId = 'unique-string';
    
    dispatch(startAction(progressId));

    setTimeout(() => {
      dispatch(stopAction(progressId));
    }, 3000);
  };
}
```

Checkout examples/real-world for more

## Tests

$ yarn test
