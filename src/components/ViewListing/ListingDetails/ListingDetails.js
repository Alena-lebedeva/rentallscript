import React from 'react';
import PropTypes from 'prop-types';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingDetails.css';
import {
  Button,
  Row,
  Col,
  Collapse
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
// Locale
import messages from '../../../locale/messages';
// Redux
import { connect } from 'react-redux';
// Redux Action
import { getSpecificSettings } from '../../../actions/getSpecificSettings';
import { contactHostOpen } from '../../../actions/message/contactHostModal';
// Helper functions
import { checkIn, checkValue } from './helper';
// Internal Component
import ListItem from './ListItem';
import Link from '../../Link';

import ListBedTypes from './ListBedTypes';

class ListingDetails extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      listingData: PropTypes.shape({
        cancellation: PropTypes.shape({
          policyName: PropTypes.string.isRequired,
          policyContent: PropTypes.string.isRequired
        })
      })
    }),
    getSpecificSettings: PropTypes.any,
    settingsData: PropTypes.object,
    isHost: PropTypes.bool.isRequired,
    formatMessage: PropTypes.any,
    userBanStatus: PropTypes.number,
  };
  static defaultProps = {
    isHost: false,
    description: []
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ open: !this.state.open })
  }


  render() {
    const { data, contactHostOpen, isHost, userBanStatus } = this.props;
    const { open } = this.state;
    const { formatMessage } = this.props.intl;
    let minNight, maxNight, checkInStart, checkInEnd, propertyType, roomType;
    let userAmenities = [], userSafetyAmenities = [], amenities = [];
    let sharedSpaces = [], houseRules = [], bedTypes = [], listBedTypes = [];
    let description, personCapacity, bathrooms, bedrooms, beds;
    if (data.listingData != undefined) {
      minNight = checkValue(data.listingData.minNight, 0);
      maxNight = checkValue(data.listingData.maxNight, 0);
      checkInStart = checkValue(data.listingData.checkInStart, '');
      checkInEnd = checkValue(data.listingData.checkInEnd, '');
    }
    if (data.settingsData != undefined && data.settingsData.length > 0) {
      propertyType = checkValue(data.settingsData && data.settingsData[1].listsettings.itemName, '');
      roomType = checkValue(data.settingsData && data.settingsData[0].listsettings.itemName, '');
    }
    sharedSpaces = checkValue(data.userSpaces, []);
    houseRules = checkValue(data.houseRules, []);
    userAmenities = checkValue(data.userAmenities, []);
    userSafetyAmenities = checkValue(data.userSafetyAmenities, []);
    description = checkValue(data.description, '');
    personCapacity = checkValue(data.personCapacity, 0);
    bathrooms = checkValue(data.bathrooms, 0);
    bedrooms = checkValue(data.bedrooms, 0);
    beds = checkValue(data.beds, 0);
    bedTypes = checkValue(data.userBedsTypes, []);
    listBedTypes = checkValue(data.listBedTypes, []);

    
    let count = 150, firstArray, restArray, dotString = false;
    if (description) {
      firstArray = description.slice(0, count);
      restArray = description.slice(count, description.length);
    }
    if (restArray && restArray.length > 0) {
      dotString = true;
    }
    
    let isAmenities;
    userAmenities.map( (item) => {
      if ( item.listsettings.isEnable == '1' ) {
        isAmenities = true;
      }
    } );

    let isSharedSpaces;
    sharedSpaces.map( (item) => {
      if ( item.listsettings.isEnable == '1' ) {
        isSharedSpaces = true
      }
    } ) 
    return (
      <Row className={cx(s.pageContent)}>
        <div className={cx(s.horizontalLineThrough)}>
          <h2 className={cx(s.sectionTitleText)}> <FormattedMessage {...messages.aboutListing} /></h2>
          <div>
            <p className={cx(s.listingFontSize)} >
              {!this.state.open && count >= 150 && dotString === true &&
                <span className={cx(s.subText, s.lineBreak)}>  {firstArray} ...</span>
              }
              {!this.state.open && count >= 150 && dotString === false &&
                <span className={cx(s.subText, s.lineBreak)}>  {firstArray}</span>
              }
              {
                restArray && restArray.length > 0 &&
                <span>
                  <Collapse in={open}>
                    <div> <span className={cx(s.subText, s.lineBreak)}>
                      {firstArray} {restArray}
                    </span></div>
                  </Collapse>
                  {
                    dotString && <div className={s.btnContainer}>
                      <div className={s.showHidePadding}>
                        <Button
                          bsStyle="link"
                          className={cx(s.button, s.noPadding, s.btnLInk, s.showHideBtn)}
                          onClick={() => this.handleClick()}
                        >
                          {this.state.open ? <FormattedMessage {...messages.hideDescription} /> : <FormattedMessage {...messages.showDescription} />}

                          {
                            this.state.open && <FontAwesome.FaAngleUp className={s.navigationIcon} />
                          }

                          {
                            !this.state.open && <FontAwesome.FaAngleDown className={s.navigationIcon} />
                          }

                        </Button>
                      </div>
                    </div>
                  }

                </span>

              }
            </p>
          </div>
          {
            !isHost && !userBanStatus && <div className={cx(s.spaceTop3, s.space4)}><p>
              <a href="javascript:void(0)" className={cx(s.sectionCaptionLink, s.sectionLink)} onClick={() => contactHostOpen(data.id)} >
                <FormattedMessage {...messages.contactHost} />
              </a>
            </p>
            </div>
          }
          <hr />
        </div>
        <div className={cx(s.horizontalLineThrough)}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space1)}>
              <p className={s.textMutedNew}><FormattedMessage {...messages.theSpace} /></p>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Row>
                <Col md={12} lg={12}>
                  <p className={s.splitList}>
                    <span className={cx(s.text)} >
                      <FormattedMessage {...messages.accommodates} />: <strong>{personCapacity}</strong>
                    </span>
                  </p>
                  <p className={s.splitList}>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.bathrooms} />: <strong>{bathrooms}</strong>
                    </span>
                  </p>
                  <p className={s.splitList}>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.bedrooms} />: <strong>{bedrooms}</strong>
                    </span>
                  </p>
                  {/* <p>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.beds} />: <strong>{beds}</strong>
                    </span>
                  </p> */}

                  <p className={s.splitList}>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.checkIn} />: <strong>{checkIn(checkInStart, checkInEnd)}</strong>
                    </span>
                   
                  </p>
                  <p className={s.splitList}>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.propertyType} />: <strong>{propertyType}</strong>
                    </span>
                  </p>
                  <p className={s.splitList}>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.roomType} />: <strong>{roomType}</strong>
                    </span>
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          <hr />
        </div>
        {
          listBedTypes && listBedTypes.length > 0 && listBedTypes[0].bedType && <div> <ListBedTypes
            itemList={listBedTypes}
            label={formatMessage(messages.beds)}
          />
            <div xs={12} sm={12} md={12} lg={12}>
              <hr />
            </div>
          </div>
        }

        {
          sharedSpaces && sharedSpaces.length > 0 && isSharedSpaces && <div> <ListItem
            itemList={sharedSpaces}
            label={formatMessage(messages.sharedSpaces)}
            showLabel={formatMessage(messages.showAllSharedSpaces)}
            hideLabel={formatMessage(messages.closeAllSharedSpaces)}
            icon={false}
          />
            <div >
              <hr />
            </div>
          </div>
        }

        {
          userAmenities && userAmenities.length > 0 && isAmenities && <div> <ListItem
            itemList={userAmenities}
            label={formatMessage(messages.aminities)}
            showLabel={formatMessage(messages.showAmenities)}
            hideLabel={formatMessage(messages.closeAmenities)}
            icon={true}
          />
            <div >
              <hr />
            </div>
          </div>
        }
        {
          /* <Col xs={12} sm={12} md={8} lg={8} className={cx(s.space2, s.horizontalLineThrough)}>
          <Row>
            <Col xs={12} sm={3} md={3} lg={3} className={cx(s.space1, s.spaceTop1)}>
              <p className={s.textMuted}> <FormattedMessage {...messages.prices} /> </p>
            </Col>
            <Col xs={12} sm={9} md={9} lg={9} className={cx(s.space1,s.spaceTop1)}>
              <Row>
                <Col md={6} lg={6}>
                  <p>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.extraPeople} />: <strong><FormattedMessage {...messages.noCharge} /></strong>
                    </span>
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col> */
        }

        {
          houseRules.length > 0 && <div> <ListItem
            itemList={houseRules}
            label={formatMessage(messages.houseRules)}
            showLabel={formatMessage(messages.showAllHouseRules)}
            hideLabel={formatMessage(messages.closeHouseRules)}
            icon={false}
          />
            <div>
              <hr />
            </div>
          </div>
        }

        {
          data && data.listingData && data.listingData.cancellation && <div className={cx(s.horizontalLineThrough)}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space1)}>
                <p className={s.textMutedNew}><FormattedMessage {...messages.cancellations} /></p>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop1)}>
                <Row>
                  <Col md={12} lg={12}>
                    <p className={s.listingFontSize}>
                      <span className={cx(s.text)}><strong>{data.listingData.cancellation.policyName}</strong></span>
                    </p>
                    <p className={s.listingFontSize}>
                      <span className={cx(s.text)}>{data.listingData.cancellation.policyContent}</span>
                    </p>
                    <div className={cx(s.listingFontSize, s.showHideMargin)}>
                      <Link
                        to={"/cancellation-policies/" + data.listingData.cancellation.policyName}
                        className={cx(s.sectionCaptionLink)}
                      >
                        <FormattedMessage {...messages.viewDetails} />
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />
          </div>
        }

        {
          userSafetyAmenities.length > 0 && <div><ListItem
            itemList={userSafetyAmenities}
            label={formatMessage(messages.safetyFeatures)}
            showLabel={formatMessage(messages.showAllSafetyFeatures)}
            hideLabel={formatMessage(messages.closeSafetyFeatures)}
            icon={true}
          />
            <div>
              <hr />
            </div>
          </div>
        }

        {/* {
          ((minNight != null && minNight) || (maxNight != null && maxNight > 0)) && <div>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space1)}>
                <p className={s.textMutedNew}> <FormattedMessage {...messages.availability} /> </p>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop1)}>
                <Row>
                  <Col md={12} lg={12}>
                    {
                      minNight != null && minNight > 0 &&
                      <p className={s.listingFontSize}><span className={cx(s.text)}> <strong>{minNight} {minNight > 1 ? 'nights' : 'night'}{' '}</strong>
                        <FormattedMessage {...messages.minimumStay} />
                      </span>
                      </p>
                    }
                    {
                      maxNight != null && maxNight > 0 &&
                      <p className={s.listingFontSize}><span className={cx(s.text)}> <strong>{maxNight} {maxNight > 1 ? 'nights' : 'night'}{' '}</strong>
                        <FormattedMessage {...messages.maximumNightStay} />
                      </span>
                      </p>
                    }
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />
          </div>
        } */}
      </Row>
    );
  }
}
const mapState = (state) => ({
  settingsData: state.viewListing.settingsData,
});
const mapDispatch = {
  getSpecificSettings,
  contactHostOpen
};
export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ListingDetails)));