import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WishListGroupItem.css';
import { Button, Grid, Row, Col, Breadcrumb } from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import { FormattedMessage, injectIntl } from 'react-intl';

// Component
import StarRating from '../../StarRating';
import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';
import ListCoverPhoto from '../../ListCoverPhoto';

// Locale
import messages from '../../../locale/messages';

class WishListGroupItem extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    data: PropTypes.object
  };

  render() {
    const { data, data: { id, name, userId, isPublic, updatedAt, createdAt, wishListCount, wishListCover } } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <Link className={s.linkContainer} to={"/wishlists/" + id}>
          <div className={cx(s.imgContainer)}>
            <div className={cx(s.parent)}>
              <div className={cx(s.children)}>
                <div className={cx(s.content)} >
                  {
                    wishListCover && wishListCover.listData && wishListCover.listData.listPhotos && <div>
                      <ListCoverPhoto
                        className={cx(s.imageContent)}
                        coverPhoto={wishListCover.listData.coverPhoto != null ? wishListCover.listData.coverPhoto : wishListCover.listData.listPhotos[0].id}
                        listPhotos={wishListCover.listData.listPhotos}
                        photoType={"x_medium"}
                        bgImage
                      />
                    </div>
                  }

                  <div className={s.infoContainer}>
                    <div className={cx(s.infoTitle, s.textEllipsis)}>{name}</div>
                    {
                      wishListCount > 0 && <div className={s.infoText}>
                        {wishListCount} {wishListCount > 1 ? formatMessage(messages.homes) : formatMessage(messages.home)}
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
    /*return (
      <div>
        <div className={cx(s.imgContainer)}>
          <div className={cx(s.parent)}>
            <div className={cx(s.children)}>
              <div className={cx(s.content)}>
                <Link to={"rooms/" + id}>
                  <ListCoverPhoto
                    className={cx(s.imageContent)}
                    coverPhoto={coverPhoto}
                    listPhotos={listPhotos}
                    photoType={"x_medium"}
                    bgImage
                  />
                </Link>
                
              </div>
            </div>
          </div>
        </div>
        <div className={s.infoContainer}>
          <Link className={s.linkContainer} to={"/rooms/" + id}>
            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                className={cx(s.textStrong, s.space1, s.textEllipsis, s.infoTitle, s.infoText)}
              >
                <span className={s.roomTitleBlock}>
                  <CurrencyConverter
                      amount={basePrice}
                      from={currency}
                  />
                  {
                    bookingType === "instant" && <span><FontAwesome.FaBolt className={s.instantIcon}/></span>
                  } 
                </span>
                <span>{title}</span>
              </Col>
              <Col
                xs={12}
                sm={12}
                md={12}
                className={cx(s.space1, s.textEllipsis, s.infoDesc, s.infoText)}>
                <span>{roomType}</span>
                <span>&nbsp;&#183;&nbsp;</span>
                <span>{beds} {beds > 1 ? 'beds' : 'bed'}</span>
              </Col>
              <Col
                xs={12}
                sm={12}
                md={12}
                className={cx(s.textEllipsis, s.infoReview, s.infoText)}>
                <StarRating className={s.reviewStar} value={starRatingValue} name={'review'}/>
                <span className={s.reviewText}>
                  {reviewsCount} {reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}
                </span>
              </Col>
            </Row>
          </Link>
        </div>
      </div>
    );*/
  }
}

export default injectIntl(withStyles(s)(WishListGroupItem));
