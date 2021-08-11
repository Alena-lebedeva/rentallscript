
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MapListingItem.css';
import {
  Button,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Carousel,
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

import CurrencyConverter from '../../CurrencyConverter';
import MapListingPhotos from '../MapListingPhotos';
import StarRating from '../../StarRating';
import WishListIcon from '../../WishListIcon';

// Locale
import messages from '../../../locale/messages';

import { formatURL } from '../../../helpers/formatURL';


class MapListingItem extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    basePrice: PropTypes.number,
    currency: PropTypes.string,
    title: PropTypes.string,
    beds: PropTypes.number,
    personCapacity: PropTypes.number,
    roomType: PropTypes.string,
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    bookingType: PropTypes.string.isRequired,
    reviewsCount: PropTypes.number,
    reviewsStarRating: PropTypes.number,
    formatMessage: PropTypes.any,
    wishListStatus: PropTypes.bool,
    isListOwner: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('touchstart', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('touchstart', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    const { onCloseClick } = this.props;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      onCloseClick();
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    const {
      id,
      basePrice,
      currency,
      title,
      beds,
      personCapacity,
      roomType,
      coverPhoto,
      listPhotos,
      bookingType,
      reviewsCount,
      reviewsStarRating,
      wishListStatus,
      isListOwner
    } = this.props;
    const { count } = this.state;
    let bedsLabel = 'bed';
    let guestsLabel = 'guest';
    if (beds > 1) {
      bedsLabel = 'beds';
    }

    if (personCapacity > 1) {
      guestsLabel = 'guests';
    }

    let starRatingValue = 0;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Number(reviewsStarRating / reviewsCount)
    }
    let activeItem = 0, photoTemp, photosList = listPhotos.slice();
    if (listPhotos && listPhotos.length > 1) {
      listPhotos.map((x, y) => { if (x.id === coverPhoto) activeItem = y });
      if (activeItem > 0) {
        photoTemp = photosList[0];
        photosList[0] = photosList[activeItem];
        photosList[activeItem] = photoTemp;
      }
    }

    return (
      <div className={cx(s.listItemContainer, 'mapInfoWindow-')} ref={this.setWrapperRef}>
        <div className={cx(s.listPhotoContainer)}>
          {
            // !isListOwner && <WishListIcon listId={id} key={id} isChecked={wishListStatus} />
          }
          <Row>
            <Col xs={12} sm={12} md={12}>
              {
                photosList && photosList.length > 0 && <MapListingPhotos
                  id={id}
                  coverPhoto={coverPhoto}
                  listPhotos={photosList}
                  formatURL={formatURL}
                  title={title}
                />
              }
            </Col>
          </Row>
          <div className={s.listInfo}>
            <a className={s.listInfoLink} href={"/rooms/" + formatURL(title) + '-' + id} target={"_blank"}>
              <Row>
                <Col xs={12} sm={12} md={12} className={cx(s.textEllipsis, s.infoDesc, s.infoText, s.infoSpace)}>
                  <div className={s.listingInfo}>
                    <span>{roomType}</span>
                    <span>&nbsp;&#183;&nbsp;</span>
                    <span>{beds} {bedsLabel}</span>
                    {/* <span>&nbsp;&#183;&nbsp;</span>
                    <span>{personCapacity} {guestsLabel}</span> */}
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} className={cx(s.listingTitle)}>
                  {title}
                </Col>
                <Col xs={12} sm={12} md={12} className={cx(s.textEllipsis, s.infoPrice, s.infoText, s.infoSpaceTop1)}>
                  {
                    <CurrencyConverter
                      amount={basePrice}
                      from={currency}
                    />
                  }
                  {
                    bookingType === "instant" && <span><FontAwesome.FaBolt className={s.instantIcon} /></span>
                  }
                  {' '}<FormattedMessage {...messages.perNight} />
                </Col>
                <Col xs={12} sm={12} md={12}
                  className={cx(s.textEllipsis, s.infoReview, s.infoSpaceTop1)}
                >
                </Col>
              </Row>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(MapListingItem));
