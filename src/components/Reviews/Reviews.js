import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Col,
  Row,
  Panel 
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reviews.css';

// Components
import PastReviews from './PastReviews';
import WriteReviews from './WriteReviews';
import YourReviews from './YourReviews';

// Locale
import messages from '../../locale/messages';

class Reviews extends React.Component {

  static propTypes = { 
    reviewsData: PropTypes.shape({
      loading: PropTypes.bool,
      formatMessage: PropTypes.any,
      userReviews: PropTypes.array,
      refetch: PropTypes.any
    }),
    pendingData: PropTypes.shape({
      loading: PropTypes.bool,
      pendingReviews: PropTypes.array
    }),
    loadMore: PropTypes.any.isRequired
	};

  static defaultProp = {
    reviewsData: {
      loading: true
    },
    pendingData: {
      loading: true
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 'others'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(current){
    const { reviewsData: {refetch} } = this.props;
    let variables = { ownerType: current, offset: 0 };
    this.setState({ current });
    refetch(variables);
  }

  render() {
    const { current } = this.state;
    const { reviewsData, pendingData, loadMore } = this.props;
    return (
      <div>
        <ul className={cx('list-inline', s.tabs)}>
          <li className={current === 'others' ? s.active : ''}>
            <a className={s.tabItem} onClick={() => this.handleClick('others')}>
              <FormattedMessage {...messages.reviewPanelTitle1} />
            </a>
          </li>
          <li className={current === 'me' ? s.active : ''}>
            <a className={s.tabItem} onClick={() => this.handleClick('me')}>
              <FormattedMessage {...messages.reviewPanelTitle2} />
            </a>
          </li>
        </ul>
        {
          current === 'others' && <YourReviews data={reviewsData} loadMore={loadMore} />
        }
        {
          current === 'me' && <div className={s.spaceTop4}>
            <WriteReviews data={pendingData} />
            <PastReviews data={reviewsData} loadMore={loadMore} />
          </div>
        }
      </div>
    );
  }
}

export default withStyles(s)(Reviews);
