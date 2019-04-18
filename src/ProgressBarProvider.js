// @flow

import React from 'react';

import useProgress, { usePrevious } from './useProgress';
import { nameToHex, hexToRgb } from './hexToRgb';

const DEFAULT_COLOR = '#77b6ff';

type Props = {
  isActive: boolean,
  color: string,
  className?: string,
  styles?: Object,
  absolute?: boolean,
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
    width: percent <= 0 ? '0%' : `${percent}%`,
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

const ProgressBarProvider = ({
  isActive,
  color,
  absolute,
  className,
  styles,
  children,
}: Props) => {
  const [progressColor, setProgressColor] = React.useState(() =>
    nameToHex(color, DEFAULT_COLOR),
  );

  const [iterationKey, setIteration] = React.useState(0);

  const prevIsActive = usePrevious(isActive);

  React.useEffect(() => {
    if (isActive && !prevIsActive) {
      setIteration(prevIteration => prevIteration + 1);
    }
  }, [isActive]);

  const percent = useProgress(isActive);

  // Hide progress bar if percent is less than 0.
  const isHidden = percent < 0 || percent > 100;

  // Set `state.percent` as width.
  return (
    <div key={iterationKey} style={getWrapperStyles(isHidden, absolute)}>
      <div
        className={className}
        style={getPercentStyles(progressColor, percent, styles)}
      />
    </div>
  );
};

ProgressBarProvider.displayName = 'ProgressBarProvider';

ProgressBarProvider.defaultProps = {
  absolute: false,
  color: DEFAULT_COLOR,
  styles: {},
};

export default ProgressBarProvider;
