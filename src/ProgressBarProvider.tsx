import { useEffect, useState, createElement, CSSProperties } from 'react';

import { useProgress, usePrevious } from './useProgress';
import { nameToHex, hexToRgb } from './hexToRgb';

const DEFAULT_COLOR = '#77b6ff';

type Props = {
  isActive: boolean;
  color?: string;
  className?: string;
  styles?: CSSProperties;
  absolute?: boolean;
};

const styles: Record<string, CSSProperties> = {
  wrapper: {
    top: 0,
    left: 0,
    width: '100%',
    transition: 'all 500mx ease-in-out',
  },
  hiddenWrapper: {
    visibility: 'hidden',
    opacity: 0,
    zIndex: -10,
  },
  visibleWrapper: {
    visibility: 'visible',
    opacity: 1,
    zIndex: 9999,
  },
  percent: {
    transition: 'all 400ms ease',
    height: '2px',
  },
};

function getWrapperStyles(
  isHidden: boolean,
  isAbsolute: boolean = false
): CSSProperties {
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
  clientStyles: Object = {}
): CSSProperties {
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

export const ProgressBarProvider = ({
  isActive,
  color = DEFAULT_COLOR,
  absolute = false,
  className,
  styles = {},
}: Props) => {
  const progressColor = nameToHex(color) ?? DEFAULT_COLOR;

  const [iterationKey, setIteration] = useState(0);

  const prevIsActive = usePrevious(isActive);

  useEffect(() => {
    if (isActive && !prevIsActive) {
      setIteration((prevIteration) => prevIteration + 1);
    }
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

  const percent = useProgress(isActive);

  // Hide progress bar if percent is less than 0.
  const isHidden = percent < 0 || percent > 100;

  // Set `state.percent` as width.
  return createElement(
    'div',
    {
      key: iterationKey,
      style: getWrapperStyles(isHidden, absolute),
    },
    createElement('div', {
      className,
      style: getPercentStyles(progressColor, percent, styles),
    })
  );
};

ProgressBarProvider.displayName = 'ProgressBarProvider';
