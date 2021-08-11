import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewProfile.css';

// Component
import ReviewItem from './ReviewItem';

// Locale
import messages from '../../locale/messages';
class Reviews extends React.Component {

  static propTypes = {
    reviewsCount: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      reservationId: PropTypes.number.isRequired,
      listId: PropTypes.number.isRequired,
      authorId: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      authorData: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        profileId: PropTypes.number.isRequired,
      }),
      reviewContent: PropTypes.string.isRequired,
      parentId: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      response: PropTypes.shape({
        reservationId: PropTypes.number.isRequired,
        listId: PropTypes.number.isRequired,
        authorId: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        authorData: PropTypes.shape({
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          picture: PropTypes.string.isRequired,
          profileId: PropTypes.number.isRequired,
        }),
        reviewContent: PropTypes.string.isRequired,
        parentId: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
      })
    })),
    loadMore: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {};

  render() {
    const { reviewsCount, data, loadMore } = this.props;

    let showLoadMore = true;
    if (reviewsCount === data.length) {
      showLoadMore = false;
    }
    return (
      <div className={cx(s.recommendations, s.spaceTop4)}>
        <div className={s.heading}>{reviewsCount > 1 ? 'Reviews' : 'Review'} <small>({reviewsCount})</small></div>
        {
          data && data.map((item, index) => {
            if (item.isAdmin) {
              return <ReviewItem
                key={index}
                reviewContent={item.reviewContent}
                createdAt={item.createdAt}
                response={item.response}
                isAdmin={item.isAdmin}
              />
            } else {
              if (item.authorData) {
                return <ReviewItem
                  key={index}
                  picture={item.authorData.picture}
                  firstName={item.authorData.firstName}
                  lastName={item.authorData.lastName}
                  profileId={item.authorData.profileId}
                  reviewContent={item.reviewContent}
                  createdAt={item.createdAt}
                  response={item.response}
                  location={item.authorData.location}
                  isAdmin={item.isAdmin}
                />
              } else {
                return <div />
              }
            }
          })
        }
        {
          showLoadMore && <div className={cx(s.space2, s.textCenter, s.loadMoreText)}><a className={cx(s.btn, s.btnPrimary)} onClick={() => loadMore()}><FormattedMessage {...messages.loadMore} />...</a></div>
        }

      </div>
    );
  }
}

export default withStyles(s)(Reviews);