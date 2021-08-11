
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchHeader.css';
import cx from 'classnames';
// Locale
import messages from '../../../locale/messages';

// Components
import Dates from '../Filters/Dates';
import Guests from '../Filters/Guests';
import HomeType from '../Filters/HomeType';
import Price from '../Filters/Price';
import InstantBook from '../Filters/InstantBook';
import MoreFilters from '../Filters/MoreFilters';
import ShowMap from '../Filters/ShowMap';

class SearchHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        dates: false,
        guests: false,
        homeType: false,
        price: false,
        instantBook: false,
        moreFilters: false
      },
      overlay: false,
      smallDevice: false,
      verySmallDevice: false
    };

    this.handleTabToggle = this.handleTabToggle.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    }
  }

  componentWillUnmount() {
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  handleResize(e) {
    const { tabs } = this.state;
    let isBrowser = typeof window !== 'undefined';
    let smallDevice = isBrowser ? window.matchMedia('(max-width: 768px)').matches : true;
    let verySmallDevice = isBrowser ? window.matchMedia('(max-width: 480px)').matches : false;

    for (let key in tabs) {
        tabs[key] = false;
    }

    this.setState({ smallDevice, verySmallDevice, tabs, overlay: false });
  }

  handleTabToggle(currentTab, isExpand) {
    const { showForm, showResults, showFilter } = this.props;
    const { tabs, smallDevice } = this.state;

    for (let key in tabs) {
      if (key == currentTab) {
        tabs[key] = isExpand;
      } else {
        tabs[key] = false;
      }
    }

    this.setState({
      tabs,
      overlay: isExpand
    });

    if (smallDevice) {
      if (isExpand) {
        showFilter();
      } else {
        showResults();
      }
    }
  }

  render() {
    const { searchSettings } = this.props;
    const { tabs, overlay, smallDevice, verySmallDevice } = this.state;
    return (
      <div>
        <div className={cx(s.searchHeaderContainerBox, { [s.fullResponsiveContainer]: (tabs.dates == true || tabs.guests == true || tabs.moreFilters == true) })}>
          <div className={cx(s.searchHeaderContainer, s.responsiveNoPadding)}>
            <div className={cx(s.searchHeaderResponsiveScroll, 'searchHeaderScroll')}>
              <div className={s.searchHeaderResponsive}>
                <Dates
                  className={s.filterButtonContainer}
                  handleTabToggle={this.handleTabToggle}
                  isExpand={tabs.dates}
                  smallDevice={smallDevice}
                  verySmallDevice={verySmallDevice} />
                <Guests
                  className={s.filterButtonContainer}
                  handleTabToggle={this.handleTabToggle}
                  isExpand={tabs.guests}
                  smallDevice={smallDevice} />
                <HomeType
                  className={cx(s.filterButtonContainer, 'hidden-xs', s.hideTabletSection)}
                  handleTabToggle={this.handleTabToggle}
                  isExpand={tabs.homeType} />
                <Price
                  className={cx(s.filterButtonContainer, 'hidden-xs', s.hideTabletSection)}
                  handleTabToggle={this.handleTabToggle}
                  searchSettings={searchSettings}
                  isExpand={tabs.price} />
                <InstantBook
                  className={cx(s.filterButtonContainer, 'hidden-xs', s.hideTabletSection)}
                  handleTabToggle={this.handleTabToggle}
                  isExpand={tabs.instantBook} />
                <MoreFilters
                  className={s.filterButtonContainer}
                  handleTabToggle={this.handleTabToggle}
                  isExpand={tabs.moreFilters}
                  searchSettings={searchSettings}
                  smallDevice={smallDevice} />
                <ShowMap
                  className={cx(s.filterButtonContainer, s.showMapSection, 'pull-right', 'hidden-xs', s.hideTabletSection)}
                  handleTabToggle={this.handleTabToggle} />
              </div>
            </div>
          </div>
        </div>
        {
          //overlay && <div className={s.searchFilterPopoverOverlay} onClick={this.handleTabToggle}></div>
        }
      </div>
    );
  }
}

export default withStyles(s)(SearchHeader);