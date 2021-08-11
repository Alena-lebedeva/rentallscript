import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import HomeHeader from '../Header/HomeHeader';
import Feedback from '../Feedback';
import Footer from '../Footer';
import CookiesDisclaimer from '../CookiesDisclaimer';
class HomeLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { layoutType } = this.props;

    return (
      <div>
        <HomeHeader
          borderLess={true}
          layoutType={layoutType}
        />
        {this.props.children}
        <Feedback />
        <Footer />
        <CookiesDisclaimer />
      </div>
    );
  }
}

export default withStyles(s)(HomeLayout);
