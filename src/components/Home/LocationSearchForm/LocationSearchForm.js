
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LocationSearchForm.css';

import { reduxForm } from 'redux-form';

import {
  Button,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import ReactGoogleMapLoader from "react-google-maps-loader";

// Components
import PlaceGeoSuggest from '../PlaceGeoSuggest';

// Helper
import detectMobileBrowsers from '../../../helpers/detectMobileBrowsers';

// Locale
import messages from '../../../locale/messages';

// History
import history from '../../../core/history';

// Config
import { googleMapAPI } from '../../../config';
class LocationSearchForm extends React.Component {
  static propTypes = {
    personalized: PropTypes.shape({
      location: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
      chosen: PropTypes.number,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      formatMessage: PropTypes.any,
    }),
    settingsData: PropTypes.shape({
      listSettings: PropTypes.array.isRequired
    }).isRequired
  };

  static defaultProps = {
    listingFields: []
  };


  static defaultProps = {
    personalized: {
      location: null,
      lat: null,
      lng: null,
      startDate: null,
      endDate: null,
      chosen: null
    },
    settingsData: {
      listSettings: []
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      mobileDevice: false
    },
      this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps;
    if (listingFields != undefined) {
      this.setState({
        roomType: listingFields.roomType
      });
    }
  }

  componentWillMount() {
    const { listingFields } = this.props;
    if (detectMobileBrowsers.isMobile() === true) {
      this.setState({ mobileDevice: true });
    }
    if (listingFields != undefined) {
      this.setState({
        roomType: listingFields.roomType
      });
    }
  }

  handleClick() {
    const { personalized } = this.props;
    let updatedURI, uri = '/s?';

    if (personalized.chosen != null) {
      uri = uri + '&address=' + personalized.location + '&chosen=' + personalized.chosen;
    } else {
      if (personalized.location != null) {
        uri = uri + '&address=' + personalized.location;
      }
    }
    updatedURI = encodeURI(uri);
    history.push(updatedURI);
  }

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <form>
              <div className={cx(s.searchFormContainer, 'homeSearchForm', 'homeLocationSearchForm')}>
                <div className={s.searchForm}>
                  <div className={cx(s.displayTable)}>
                    <div className={cx(s.displayTableRow)}>
                      <div className={cx(s.displayTableCell, s.locationSection)}>
                        <div className={cx(s.displayTable)}>
                          <div className={cx(s.displayTableRow)}>
                            <div className={cx(s.searchIconContainer, s.displayTableCell)}>
                              <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true"
                                focusable="false" className={s.searchIcon}>
                                <path d="m10.4 18.2c-4.2-.6-7.2-4.5-6.6-8.8.6-4.2 4.5-7.2 8.8-6.6 4.2.6 7.2 4.5 6.6 8.8-.6 4.2-4.6 7.2-8.8 6.6m12.6 3.8-5-5c1.4-1.4 2.3-3.1 2.6-5.2.7-5.1-2.8-9.7-7.8-10.5-5-.7-9.7 2.8-10.5 7.9-.7 5.1 2.8 9.7 7.8 10.5 2.5.4 4.9-.3 6.7-1.7v.1l5 5c .3.3.8.3 1.1 0s .4-.8.1-1.1"></path>
                              </svg>
                            </div>
                            <div className={cx(s.locationTableCell, s.displayTableCell)}>
                              <ReactGoogleMapLoader
                                params={{
                                  key: googleMapAPI, // Define your api key here
                                  libraries: "places", // To request multiple libraries, separate them with a comma
                                }}
                                render={googleMaps =>
                                  googleMaps && (
                                    <PlaceGeoSuggest
                                      label={formatMessage(messages.homeWhere)}
                                      className={cx(s.formControlInput, s.input)}
                                      containerClassName={s.geoSuggestContainer}
                                    />)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={cx(s.searchBtnContainer)}>
                        <Button className={cx(s.btn, s.btnPrimary, s.btnBlock, s.btnLarge)} onClick={this.handleClick}>
                          <span className={cx('hidden-lg hidden-md')}>
                            <FontAwesome.FaSearch />
                          </span>
                          <span className={cx('hidden-sm hidden-xs')}>
                            <FormattedMessage {...messages.search} />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

LocationSearchForm = reduxForm({
  form: 'SearchForm', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(LocationSearchForm);

const mapState = (state) => ({
  personalized: state.personalized,
  settingsData: state.viewListing.settingsData,
  listingFields: state.listingFields.data,
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(LocationSearchForm)));
