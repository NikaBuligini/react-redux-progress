# react-redux-progress
Progress bar for React and Redux applications

![](https://media.giphy.com/media/26u48f9ry3CH9D9Vm/giphy.gif)

## Demo

- [sample](http://react-redux-progress.surge.sh/)
- [nyan-cat-progress](http://nyan-cat-progress-demo.surge.sh/)

## Installation

Using [npm](https://www.npmjs.com/):

```shell
$ npm install --save react-redux-progress
```

Using [yarn](https://yarnpkg.com/):

```shell
$ yarn add react-redux-progress
```

```js
// using ES6 modules
import Progress, { ProgressBarProvider, reducer } from 'react-redux-progress';

// using CommonJS modules
var Progress, { ProgressBarProvider, reducer } = require('react-redux-progress');
```
The UMD build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/react-redux-progress/umd/react-redux-progress.min.js"></script>
```

You can find the library on `window.ReactReduxProgress`.

## Usage

### Custom Progress

```js
import Progress from 'react-redux-progress';

// give percent any shape you want
const MyProgress = ({ isProgressActive }) => (
  <Progress isActive={isProgressActive}>
    {percent => <div>{`${percent}%`}</div>}
  </Progress>
);

export default MyProgress;
```

### Simple usage with prepared component

```js
import { ProgressBarProvider } from 'react-redux-progress';

// default color is #77b6ff
const Layout = ({ isProgressActive, children }) => (
  <div>
    <ProgressBarProvider isActive={isProgressActive} color="#db7093" />
    {children}
  </div>
);
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
import { ProgressBarProvider } from 'react-redux-progress';
import { connect } from 'react-redux';

const Layout = ({ isProgressActive, children }) => (
  <div>
    <ProgressBarProvider isActive={isProgressActive} />
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

## Prop Types
| Property | Type | Required? | Default | Description |
|:---|:---|:---:|:---:|:---|
| isActive | Boolean | ✓ |  | Progress activation flag |
| color | String |   | `#77b6ff` | Custom color for progress bar percent |
| className | String |  |  | Optional custom CSS class name to attach to root `Percent` element. |
| styles | Object |  |  | Optional custom CSS styles to attach to root `Percent` element. |
| absolute | Boolean |  | `false` | Position property for `Percent` |

## Contributions

Use [GitHub issues](https://github.com/NikaBuligini/react-redux-progress/issues) for requests.

I actively welcome pull requests; learn how to [contribute](https://github.com/NikaBuligini/react-redux-progress/blob/master/CONTRIBUTING.md).

## Tests

```shell
$ yarn test
```
