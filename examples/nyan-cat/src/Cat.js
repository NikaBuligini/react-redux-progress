import React from 'react';
import Nyan1 from './nyan1.svg';
import Nyan2 from './nyan2.svg';
import Nyan3 from './nyan3.svg';
import Nyan4 from './nyan4.svg';
import Nyan5 from './nyan5.svg';
import Nyan6 from './nyan6.svg';

const cats = [Nyan1, Nyan2, Nyan3, Nyan4, Nyan5, Nyan6];

class Cat extends React.PureComponent {
  state = {
    iteration: 0,
  };

  interval = null;

  componentDidMount() {
    this.start(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isHidden && !nextProps.isHidden) {
      this.start(nextProps);
    } else if (!this.props.isHidden && nextProps.isHidden) {
      this.stop();
    }
  }

  start = props => {
    if (!this.interval && !props.isHidden) {
      this.interval = setInterval(() => {
        const { iteration } = this.state;
        const nextIteration = iteration >= 5 ? 0 : iteration + 1;
        this.setState({ iteration: nextIteration });
      }, 100);
    }
  };

  stop = () => {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  };

  componentWillUnmount() {
    this.stop();
  }

  render() {
    const { width, opacity } = this.props;
    const { iteration } = this.state;

    return (
      <span
        dangerouslySetInnerHTML={{ __html: cats[iteration] }}
        style={{
          position: 'absolute',
          visibility: width > 0 ? 'visible' : 'hidden',
          width: '40px',
          top: '-2px',
          right: '-20px',
          opacity,
        }}
      />
    );
  }
}

export default Cat;
