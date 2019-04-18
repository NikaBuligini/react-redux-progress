// @flow

import useProgress from './useProgress';

type Props = {
  isActive: boolean,
  children: (percent: number) => React$Element<*>,
};

const Progress = ({ isActive, children }: Props) => {
  const percent = useProgress(isActive);

  return children(percent);
};

Progress.displayName = 'Progress';

export default Progress;
