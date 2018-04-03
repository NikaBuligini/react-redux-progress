import React from 'react';

class RainbowColor extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="color" style={{ backgroundColor: this.props.color }} />
    );
  }
}

export default RainbowColor;
