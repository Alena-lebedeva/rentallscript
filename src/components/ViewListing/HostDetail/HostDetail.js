import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// Locale
import messages from '../../../locale/messages';
// Redux
import { connect } from 'react-redux';
// External Component
import moment from 'moment';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HostDetail.css';
import {
  Button,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
// Component
import Avatar from '../../Avatar';
import ContactHost from '../ContactHost';
import Link from '../../Link';
// Redux Action
import { contactHostOpen } from '../../../actions/message/contactHostModal';
class HostDetail extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    personCapacity: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    profile: PropTypes.shape({
      profileId: PropTypes.number.isRequired,
      displayName: PropTypes.string.isRequired,
      picture: PropTypes.string,
      location: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      info: PropTypes.string,
    }).isRequired,
    listingData: PropTypes.shape({
      minNight: PropTypes.number,
      maxNight: PropTypes.number,
      maxDaysNotice: PropTypes.string,
    }).isRequired,
    blockedDates: PropTypes.array,
    contactHostOpen: PropTypes.any.isRequired,
    isHost: PropTypes.bool.isRequired,
    formatMessage: PropTypes.any,
    userBanStatus: PropTypes.number,
  };
  static defaultProps = {
    id: 0,
    userId: null,
    userBanStatus: 0,
    personCapacity: 0,
    city: null,
    profile: {
      profileId: 0,
      displayName: null,
      picture: null,
      location: null,
      createdAt: null,
      info: null
    },
    listingData: {
      minNight: 0,
      maxNight: 0
    },
    blockedDates: [],
    showContactHostModal: false,
    isHost: false,
  }
  render() {
    const { contactHostOpen, isHost, hostEmail, userBanStatus } = this.props;
    const { id, personCapacity, userId, city, blockedDates } = this.props;
    const { profile: { profileId, displayName, firstName, lastName, picture, location, info, createdAt } } = this.props;
    const { listingData: { minNight, maxNight, maxDaysNotice } } = this.props;
    let joinedDate = createdAt != null ? moment(createdAt).format("MMMM YYYY") : '';
    let initialValues = {
      listId: id,
      host: userId,
      hostEmail,
      firstName
    };
    return (
      <div>
        <ContactHost
          initialValues={initialValues}
          id={id}
          userId={userId}
          city={city}
          profileId={profileId}
          picture={picture}
          displayName={firstName}
          personCapacity={personCapacity}
          blockedDates={blockedDates}
          minNight={minNight}
          maxNight={maxNight}
          maxDaysNotice={maxDaysNotice}
        />
        <Row className={cx(s.pageContent)}>
          {/* <Col xs={12} sm={12} md={8} lg={8} className={cx(s.padding3, s.paddingTop3, s.horizontalLineThrough)}>
            <h1 className={cx(s.sectionTitleText, s.space2)}><FormattedMessage {...messages.yourHost} /></h1>
          </Col> */}
          <div className={cx(s.space3, s.spaceTop3)}>
            <div className={s.displayTable}>
              <div className={s.displayTableRow}>
                <div className={cx(s.displayTableCell, s.vrAlignTop)}>
                  <Link to={"/users/show/" + profileId}>
                    <h1 className={cx(s.titleText, s.space1)}>
                    <FormattedMessage {...messages.hostedBy} /> {' '}  {firstName + ' ' + lastName}
                    </h1>
                  </Link>
                  <p className={s.textMuted}>{location} · <FormattedMessage {...messages.joinedIn} /> {joinedDate}</p>
                  <p><span className={cx(s.text)}>{info}</span></p>
                  {
                    !isHost && !userBanStatus && <Button className={cx(s.btn, s.btnlarge, s.btnPrimary)} onClick={() => contactHostOpen(id)}>
                      <FormattedMessage {...messages.contactHost} />
                    </Button>
                  }
                </div>
                <div className={s.displayTableCell}>
                  <div className={s.profileAvatarSection}>
                    <Avatar
                      source={picture}
                      height={115}
                      width={115}
                      title={firstName}
                      className={s.profileAvatar}
                      withLink
                      linkClassName={s.profileAvatarLink}
                      profileId={profileId}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Row>
        <hr />
      </div>
    );
  }
}
const mapState = (state) => ({
});
const mapDispatch = {
  contactHostOpen
};
export default withStyles(s)(connect(mapState, mapDispatch)(HostDetail));
