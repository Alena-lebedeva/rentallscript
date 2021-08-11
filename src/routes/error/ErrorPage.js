import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ErrorPage.css';

// Locale
import messages from '../../locale/messages';

class ErrorPage extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.func,
    error: PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    if (__DEV__) {
      const { error } = this.props;
      return (
        <div>
          <h1>{error.name}</h1>
          <p>{error.message}</p>
          <pre>{error.stack}</pre>
        </div>
      );
    }

    return (
      <div>
        <h1><FormattedMessage {...messages.pageError} /></h1>
        <p><FormattedMessage {...messages.pageErrorInfo} /></p>
      </div>
    );
  }
}

export { ErrorPage as ErrorPageWithoutStyle };
export default withStyles(s)(ErrorPage);
