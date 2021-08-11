import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingIntro.css';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Component
import Avatar from '../../Avatar';
import StarRating from '../../StarRating';
import Link from '../../Link';

//Images
import HomeIcon from './home.svg';
import Building from './hotel.svg';
import User from './user.svg';
import Slumber from './slumber.svg';
class ListingIntro extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    formatMessage: PropTypes.any,
    reviewsCount: PropTypes.number.isRequired,
    reviewsStarRating: PropTypes.number.isRequired,
  };

  render() {
    const { data } = this.props;
    const { formatMessage } = this.props.intl;
    const { reviewsCount, reviewsStarRating } = this.props;
    let starRatingValue = 0;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Number(reviewsStarRating / reviewsCount)
    }



    return (
      <div>
        <Row className={s.introPadding}>
          <Col xs={12} sm={9} md={9} lg={9}>
            <h1 className={cx(s.titleText, s.space1)}>
              {data.title != null ? data.title : data.settingsData && data.settingsData.length > 0 && data.settingsData[0].listsettings.itemName + ' ' + formatMessage(messages.in) + ' ' + data.city}
            </h1>
            <div className={cx(s.space3)}>
              <a className={s.textMuted}>{data.city}, {data.state}, {data.country}</a>
              <div className={'visible-xs'}>
                <span><StarRating name={'review'} value={starRatingValue} /></span>
              </div>
            </div>
            <div className={cx(s.space2, 'visible-xs')}>
              <div className={s.displayTable}>
                {/* <div className={cx(s.displayTableCell, s.vrAlignBottom)}>
                  <a className={s.textMuted}>{data.city}, {data.state}, {data.country}</a>
                  <div className={'visible-xs'}>
                    <span><StarRating name={'review'} value={starRatingValue} /></span>
                  </div>
                </div> */}
                <div className={s.displayTableCell}>
                  <div className={cx(s.profileAvatarSection, s.mobileBg)}>
                    <Avatar
                      source={data.user.profile.picture}
                      type={"small"}
                      title={data.user.profile.firstName}
                      className={s.profileAvatarNew}
                      withLink
                      linkClassName={s.profileAvatarLink}
                      profileId={data.user.profile.profileId}
                    />
                  </div>
                  <p className={cx('text-center', s.hostNameText)}>
                    <Link to={"/users/show/" + data.user.profile.profileId}>
                      <span className={cx(s.textMuted)}>
                        {data.user.profile.firstName}
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className={cx(s.displayTable)}>
              <div className={s.displayTableRow}>
                <div className={cx(s.displayTableCell, s.listingIntroWidth, s.responsiveListIngIntro)}>
                  <div className={cx(s.displayTable)}>
                    <div className={s.displayTableRow}>
                      <div className={s.displayTableCellIcon}>
                        <img src={HomeIcon} className={s.overviewIcon} alt={'Room'} />
                      </div>
                      <div className={cx(s.displayTableCell, s.introTextPadding)}>
                        <div className={cx(s.textMutedNew)}><FormattedMessage {...messages.roomType} /></div>
                        <div>{data.settingsData && data.settingsData.length > 0 && data.settingsData[0].listsettings.itemName}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx(s.displayTableCell, s.responsiveListIngIntro)}>
                  <div className={cx(s.displayTable, s.tableMarginTop)}>
                    <div className={s.displayTableRow}>
                      <div className={s.displayTableCellIcon}>
                        <img src={User} className={s.overviewIcon} alt={'Guest'} />
                      </div>
                      <div className={cx(s.displayTableCell, s.introTextPadding)}>
                        <div className={cx(s.textMutedNew)}>
                          {/* Guest */}
                          <FormattedMessage {...messages.guest} />
                        </div>
                        <div>
                          {data.personCapacity} {data.personCapacity > 1 ? formatMessage(messages.guests) : formatMessage(messages.guest)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx(s.displayTable)}>
              <div className={s.displayTableRow}>
                <div className={cx(s.displayTableCell, s.listingIntroWidth, s.responsiveListIngIntro)}>
                  <div className={cx(s.displayTable, s.tableMarginTop)}>
                    <div className={s.displayTableRow}>
                      <div className={s.displayTableCellIcon}>
                        <img src={Building} className={s.overviewIcon} alt={'Bedroom'} />
                      </div>
                      <div className={cx(s.displayTableCell, s.introTextPadding)}>
                        <div className={cx(s.textMutedNew)}>
                          <FormattedMessage {...messages.bedroom} />
                      </div>
                        <div>
                          {data.bedrooms} {data.bedrooms > 1 ? formatMessage(messages.bedrooms) : formatMessage(messages.bedroom)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx(s.displayTableCell, s.responsiveListIngIntro)}>
                  <div className={cx(s.displayTable, s.tableMarginTop)}>
                    <div className={s.displayTableRow}>
                      <div className={s.displayTableCellIcon}>
                        <img src={Slumber} className={s.overviewIcon} alt={'Bed'} />
                      </div>
                      <div className={cx(s.displayTableCell, s.introTextPadding)}>
                        <div className={cx(s.textMutedNew)}>
                          <FormattedMessage {...messages.bed} />
                      </div>
                        <div>
                          {data.beds} {data.beds > 1 ? formatMessage(messages.beds) : formatMessage(messages.bed)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={3} md={3} lg={3} className={'hidden-xs'}>
            <div className={cx(s.profileAvatarSection, s.mobileBg)}>
              <Avatar
                source={data.user.profile.picture}
                type={"small"}
                height={115}
                width={115}
                title={data.user.profile.firstName}
                className={s.profileAvatar}
                withLink
                linkClassName={s.profileAvatarLink}
                profileId={data.user.profile.profileId}
              />
            </div>
            <p className={cx('text-center', s.hostNameText)}>
              <Link to={"/users/show/" + data.user.profile.profileId}>
                <span className={cx(s.textMuted)}>
                  {data.user.profile.firstName}
                </span>
              </Link>
            </p>
          </Col>
        </Row>
        <hr />
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(ListingIntro));
