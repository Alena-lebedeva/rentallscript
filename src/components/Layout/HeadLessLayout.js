import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import CookiesDisclaimer from '../CookiesDisclaimer';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div>
        {this.props.children}
        <CookiesDisclaimer />
      </div>
    );
  }
}

export default withStyles(s)(Layout);
