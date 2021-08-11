import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Header from '../Header';
import Footer from '../Footer';
import CookiesDisclaimer from '../CookiesDisclaimer';
import cx from 'classnames';
class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div>
        <Header />
        <div className={s.paddingTop}>
          {this.props.children}
        </div>
        <div className={cx('hidden-xs hidden-sm')}>
          <Footer />
        </div>
        <CookiesDisclaimer />
      </div>
    );
  }
}

export default withStyles(s)(Layout);
