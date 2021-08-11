import React from 'react';
import PropTypes from 'prop-types';

class Loading extends React.Component {
  static propTypes = {
    loadingText: PropTypes.string.isRequired,
  };

  render() {
    const { loadingText } = this.props;
    return <div>{loadingText}</div>;
  }
}

export default Loading;
