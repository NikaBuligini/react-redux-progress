// @flow

import React from 'react';

const MAX_PERCENT = 85;

type Props = {
  percent: number,
  updateProgress: (progress: number) => void,
  autoIncrement: boolean,
  intervalTime: number,
  color: string,
  styles?: Object,
  className?: string,
};

type State = {
  percent: number,
};

const styles = {
  wrapper: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    transition: 'all 500mx ease-in-out',
  },
  hiddenWrapper: {
    visibility: 'hidden',
    opacity: '0',
    zIndex: '-10',
  },
  visibleWrapper: {
    visibility: 'visible',
    opacity: '1',
    zIndex: '9999',
  },
  percent: {
    transition: 'all 400ms ease',
    height: '2px',
    boxShadow: '0 0 10px rgba(119, 182, 255, 0.7)',
  },
};

function getWrapperStyles(isHidden: boolean) {
  const visibilityStyles = isHidden
    ? styles.hiddenWrapper
    : styles.visibleWrapper;

  return { ...styles.wrapper, ...visibilityStyles };
}

function getPercentStyles(
  color: string,
  percent: number,
  clientStyles: Object = {},
) {
  const customStyles = {
    width: percent <= 0 ? '0' : `${percent}%`,
    opacity: percent >= 99.9 ? '0' : '1',
    background: color,
  };

  return { ...styles.percent, ...clientStyles, ...customStyles };
}

class ProgressBar extends React.Component<Props, State> {
  static defaultProps = {
    percent: -1,
    autoIncrement: true,
    intervalTime: 450,
    color: '#77b6ff',
  };

  state = {
    percent: this.props.percent,
  };

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
    percent = percent < MAX_PERCENT ? percent : MAX_PERCENT;

    this.setState({ percent });
  };

  interval: ?number;

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

  timeout: ?number;

  render() {
    const { percent } = this.state;

    // Hide progress bar if percent is less than 0.
    const isHidden = percent < 0 || percent >= 100;

    // Set `state.percent` as width.
    return (
      <div style={getWrapperStyles(isHidden)}>
        <div
          className={this.props.className}
          style={getPercentStyles(this.props.color, percent, this.props.styles)}
        />
      </div>
    );
  }
}

export default ProgressBar;
