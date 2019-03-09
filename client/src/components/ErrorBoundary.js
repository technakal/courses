import React, { Component } from 'react';

/**
 * React ErrorBoundary component.
 * Prevents the site from crashing if one component fails.
 */
class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error--boundary">
          <h3>Something went horribly awry with this component.</h3>
          <p>We'll get right on fixing that...</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
