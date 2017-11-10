# react-redux-progress
Progress bar for React and Redux applications

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
<script src="https://unpkg.com/react-redux-progress/umd/react-router-progress.min.js"></script>
```

You can find the library on `window.ReactReduxProgress`.

## Usage

```js
import ProgressBar from 'react-redux-progress';

const Layout = ({ isProgressActive, children }) => (
  <div>
    <ProgressBar isActive={isProgressActive} />
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

Start progress (checkout api.js in examples/real-word folder)

```js
// dispatch thunk action
export function startAsyncAction() {
  return dispatch => {
    dispatch({
      [CALL_API]: {
        types: [REQUEST_ACTION, SUCCESS_ACTION, FAILURE_ACTION],
        endpoint: `http://example.com/api/users`,
        schema: Schemas.NORMALIZR_SCHEMA,
        showProgress: true,
      },
    });
  };
}
```
