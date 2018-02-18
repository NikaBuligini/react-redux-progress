// @flow

import React from 'react';
import RawProgress from './Raw';
import { nameToHex, hexToRgb } from './hexToRgb';

const DEFAULT_COLOR = '#77b6ff';

type Props = {
  isActive: boolean,
  color: string,
  className?: string,
  styles?: Object,
  absolute?: boolean,
};

type State = {
  color: string,
};

const styles = {
  wrapper: {
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
  },
};

function getWrapperStyles(isHidden: boolean, isAbsolute: ?boolean = false) {
  const visibilityStyles = isHidden
    ? styles.hiddenWrapper
    : styles.visibleWrapper;

  return {
    ...styles.wrapper,
    ...visibilityStyles,
    position: isAbsolute ? 'absolute' : 'fixed',
  };
}

function getPercentStyles(
  color: string,
  percent: number,
  clientStyles: Object = {},
) {
  const customStyles = {
    width: percent <= 0 ? '0' : `${percent}%`,
    opacity: percent >= 99.9 ? '0' : '1',
  };

  return {
    ...styles.percent,
    background: color,
    boxShadow: `0 0 10px ${hexToRgb(color, 0.7)}`,
    ...clientStyles,
    ...customStyles,
  };
}

class ProgressBarProvider extends React.PureComponent<Props, State> {
  static displayName = 'ProgressBarProvider';

  static defaultProps = {
    absolute: false,
    color: DEFAULT_COLOR,
  };

  state = {
    color: nameToHex(this.props.color, DEFAULT_COLOR),
  };

  renderProgress = (percent: number) => {
    // Hide progress bar if percent is less than 0.
    const isHidden = percent < 0 || percent >= 100;

    // Set `state.percent` as width.
    return (
      <div style={getWrapperStyles(isHidden, this.props.absolute)}>
        <div
          className={this.props.className}
          style={getPercentStyles(this.state.color, percent, this.props.styles)}
        />
      </div>
    );
  };

  render() {
    return (
      <RawProgress
        isActive={this.props.isActive}
        renderProgress={this.renderProgress}
      />
    );
  }
}

export default ProgressBarProvider;
