/* eslint-disable no-console */
// @flow

import React from 'react';

const MAX_PERCENT = 85;

const isDevelopment =
  ['production', 'test'].indexOf(process.env.NODE_ENV) === -1;

const warn = (...args) => {
  if (isDevelopment) {
    console.warn(...args);
  }
};

/* eslint-disable react/no-unused-prop-types */
type Props = {
  percent: number,
  updateProgress: (progress: number) => void,
  autoIncrement: boolean,
  intervalTime: number,
  renderProgress: (percent: number) => React$Element<*>,
  maxPercent: number,
};
/* eslint-enable react/no-unused-prop-types */

type State = {
  percent: number,
  maxPercent: number,
};

class Ticker extends React.Component<Props, State> {
  static defaultProps = {
    percent: -1,
    autoIncrement: true,
    intervalTime: 450,
    maxPercent: MAX_PERCENT,
    renderProgress: () => null,
  };

  state = this.getInitialState(this.props);

  getInitialState(props: Props): State {
    let { maxPercent } = props;

    if (
      typeof maxPercent !== 'number' ||
      (maxPercent < 1 || maxPercent > 100)
    ) {
      warn('fallback to default maxPercent');
      maxPercent = MAX_PERCENT;
    }

    return {
      maxPercent,
      percent: this.props.percent,
    };
  }

  componentDidMount() {
    this.handleProps(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.interval) {
      // stop progress when new props come in.
      clearInterval(this.interval);
      this.interval = undefined;
    }

    if (this.timeout) {
      // clear timeout when new props come in.
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }

    // start progress with updated props.
    this.handleProps(nextProps);
  }

  componentWillUnmount() {
    // cleaning up interval and timeout.
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }

  increment = () => {
    let { percent } = this.state;

    percent += (Math.random() + 1 - Math.random()) * 3; // eslint-disable-line
    percent = percent < this.state.maxPercent ? percent : this.state.maxPercent;

    this.setState({ percent });
  };

  interval: ?Interval;

  handleProps = (props: Props) => {
    const { autoIncrement, percent, intervalTime } = props;

    if (autoIncrement && percent >= 0 && percent < 99) {
      this.interval = setInterval(this.increment, intervalTime);
    }

    if (percent >= 100) {
      this.setState({ percent: 99.9 }, () => {
        this.timeout = setTimeout(() => {
          this.setState({ percent: -1 }, () => this.props.updateProgress(-1));
        }, 400);
      });
    } else {
      this.setState({ percent });
    }
  };

  timeout: ?Timeout;

  render() {
    return this.props.renderProgress(this.state.percent);
  }
}

export default Ticker;
