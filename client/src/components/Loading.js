import React, { Component } from 'react';

/**
 * DOM component for isLoading state.
 * @class Loading
 * @extends {Component}
 */
class Loading extends Component {
  state = {
    message: 'Loading...',
  };

  /**
   * Sets an interval timer for loading animation.
   * @memberof Loading
   */
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 500);
  }

  /**
   * Clears the interval timer for loading animation.
   * @memberof Loading
   */
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  /**
   * Runs loading animation based on interval timing.
   * @memberof Loading
   */
  tick = () => {
    if (this.state.message === 'Loading...') {
      this.setState({ message: 'Loading' });
    } else {
      this.setState(prevState => ({
        message: `${prevState.message}.`,
      }));
    }
  };

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
      </div>
    );
  }
}

export default Loading;