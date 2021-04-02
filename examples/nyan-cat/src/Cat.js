import React from 'react';
import { useInterval } from 'react-redux-progress/useProgress';

import Nyan1 from './nyan1.svg';
import Nyan2 from './nyan2.svg';
import Nyan3 from './nyan3.svg';
import Nyan4 from './nyan4.svg';
import Nyan5 from './nyan5.svg';
import Nyan6 from './nyan6.svg';

const cats = [Nyan1, Nyan2, Nyan3, Nyan4, Nyan5, Nyan6];

export const Cat = () => {
  const [iteration, setIteration] = React.useState(0);

  const handleIteration = React.useCallback(() => {
    setIteration((prevIteration) =>
      prevIteration >= 5 ? 0 : prevIteration + 1
    );
  }, []);

  useInterval(handleIteration, 100);

  return (
    <span
      className="cat"
      dangerouslySetInnerHTML={{ __html: cats[iteration] }}
    />
  );
};
