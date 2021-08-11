import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Panel, Row, Col } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reviews.css';

// Components
import ReviewItem from './ReviewItem';
import Loader from '../Loader';

// Locale
import messages from '../../locale/messages';

class YourReviews extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      userReviews: PropTypes.arrayOf(PropTypes.shape({
        reservationId: PropTypes.number.isRequired,
        listId: PropTypes.number.isRequired,
        authorId: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        yourReviewsCount: PropTypes.number.isRequired,
        authorData: PropTypes.shape({
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          picture: PropTypes.string.isRequired,
          profileId: PropTypes.number.isRequired,
        }),
        reviewContent: PropTypes.string.isRequired,
        parentId: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool,
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
          isAdmin: PropTypes.bool,
          formatMessage: PropTypes.any,
        })
      }))
    }),
    loadMore: PropTypes.any.isRequired
  };

  render() {
    const { data: { loading, userReviews }, loadMore } = this.props;
    const { formatMessage } = this.props.intl;
    var showLoadMore = false;
    if (userReviews && userReviews.length > 0) {
      showLoadMore = true;
    }
    return (
      <div className={s.spaceTop4}>
        <Panel header={formatMessage(messages.reviews)} className={s.panelNolist} >
          <p>
            <FormattedMessage {...messages.reviewWritten} />
          </p>
          {
            loading && <Loader type={"text"} />
          }
          {
            !loading && (!userReviews || (userReviews &&
              userReviews.length === 0)) && <p>
              <FormattedMessage {...messages.noReview} />
            </p>
          }
          {
            !loading && userReviews && <ul
              className={cx(s.listStyle, s.spaceTop4, s.recommondations)}>
              {
                userReviews.map((item, index) => {
                  if (item.yourReviewsCount === userReviews.length) {
                    showLoadMore = false;
                  }
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
                      />
                    }
                  }
                })
              }
            </ul>
          }
          {
            !loading && showLoadMore && <div className={cx(s.space2, s.textCenter, s.marginTop)}>
              <a className={cx(s.btn, s.btnPrimary)} onClick={() => loadMore('others')}>
                <FormattedMessage {...messages.loadMore} />...</a>
            </div>
          }
        </Panel>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(YourReviews));

