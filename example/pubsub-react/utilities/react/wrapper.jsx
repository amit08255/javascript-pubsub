/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';

const styles = {
    error: {
        backgroundColor: '#f98e7e',
        borderTop: '1px solid #777',
        borderBottom: '1px solid #777',
        padding: '12px',
        display: 'block',
    },
};

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

  componentDidCatch = (error, errorInfo) => this.setState({ error, errorInfo });

  displayError = (error, errorInfo = {}) => {
      const { style } = this.props;
      return (
      // Error path
          <div style={style || styles.error}>
              <h2>Something went wrong.</h2>
              <details style={{ whiteSpace: 'pre-wrap' }}>
                  {error && error.toString()}
                  <br />
                  {errorInfo.componentStack}
              </details>
          </div>
      );
  }

  render() {
      const { error, errorInfo } = this.state;
      const { children } = this.props;

      if (error || errorInfo) {
          return this.displayError(error, errorInfo);
      }

      try {
          return (
              <>
                  {children}
              </>
          );
      } catch (err) {
          return this.displayError(err);
      }
  }
}

export const withErrorBoundary = (WrappedComponent) => (props) => (
    <ErrorBoundary>
        <WrappedComponent {...props} />
    </ErrorBoundary>
);
