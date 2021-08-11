// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Helpers
import validateStep3 from './validateStep3';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Form,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Component
import ListPlaceTips from '../ListPlaceTips';

import updateStep3 from './updateStep3';

class AdvanceNotice extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      bookingNoticeTime: [],
    }
  }

  componentWillMount() {
    const { listingFields } = this.props;

    if (listingFields != undefined) {
      this.setState({
        bookingNoticeTime: listingFields.bookingNoticeTime,
      });
    }
  }

  componentDidMount() {
    const { valid } = this.props;

    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { valid, listingFields } = nextProps;
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }

    if (listingFields != undefined) {
      this.setState({
        bookingNoticeTime: listingFields.bookingNoticeTime,
      });
    }
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
      </div>
    )
  }

  renderTimeSelect = ({ input, label, meta: { touched, error }, children, className, startValue, endValue }) => {
    const { formatMessage } = this.props.intl;

    let start = (startValue) ? startValue : 8;
    let end = (endValue) ? endValue : 25;
    let timeArray = [];

    for (let i = start; i <= end; i++) {
      timeArray.push(i);
    }

    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormControl componentClass="select" {...input} className={className} >
          <option value="Flexible">{formatMessage(messages.flexible)}</option>
          {
            timeArray.map((item, key) => {
              return (
                <option value={item} key={key}>
                  {((item > 12) ? ((item > 24) ? item - 24 : item - 12) : item)}
                  {(item >= 12 && item < 24) ? 'PM' : 'AM'}
                  {(item == 12) ? ' (noon)' : ''}
                  {(item == 24) ? ' (mid night)' : ''}
                  {(item > 24) ? ' (next day)' : ''}
                </option>
              )
            })
          }
        </FormControl>
      </div>
    )
  }

  render() {
    const { handleSubmit, submitting, pristine, valid, previousPage, nextPage, existingList } = this.props;
    const { isDisabled, bookingNoticeTime } = this.state;
    const { formatMessage } = this.props.intl;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}><FormattedMessage {...messages.advanceNoticeTitle} /></h3>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <FormGroup className={s.formGroup}>
                    <Field name="bookingNoticeTime" component={this.renderFormControlSelect} className={cx(s.formControlSelect, s.jumboSelect)} >
                      {
                        bookingNoticeTime.map((value, key) => {
                          return (
                            value.isEnable == 1 && <option value={value.id} key={key}>{value.itemName}</option>
                          )
                        })
                      }
                    </Field>
                  </FormGroup>

                  <ControlLabel className={s.landingLabel}>
                    <FormattedMessage {...messages.advanceNoticeCheckInTitle} />
                  </ControlLabel>

                  <FormGroup className={s.formGroup}>
                    <ControlLabel className={s.landingLabel}>
                      <FormattedMessage {...messages.advanceNoticeFrom} />
                    </ControlLabel>
                    <Field
                      name="checkInStart"
                      component={this.renderTimeSelect}
                      className={cx(s.formControlSelect, s.jumboSelect)}
                      startValue={8}
                      endValue={25}
                    />
                  </FormGroup>


                  <FormGroup className={s.formGroup}>
                    <ControlLabel className={s.landingLabel}>
                      <FormattedMessage {...messages.advanceNoticeTo} />
                    </ControlLabel>
                    <Field
                      name="checkInEnd"
                      component={this.renderTimeSelect}
                      className={cx(s.formControlSelect, s.jumboSelect)}
                      startValue={9}
                      endValue={26} />
                  </FormGroup>

                </div>
                <div className={s.nextPosition}>
                  <div className={s.nextBackButton}>
                    <hr className={s.horizontalLineThrough} />

                    <FormGroup className={s.formGroup}>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                        <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("review-how-guests-book")}>
                          <FormattedMessage {...messages.back} />
                        </Button>
                        <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} disabled={isDisabled} onClick={() => nextPage("booking-window")}>
                          <FormattedMessage {...messages.next} />
                        </Button>
                      </Col>
                    </FormGroup>
                  </div>
                </div>
              </form>
            </div>
          </Col>
          <ListPlaceTips />
        </Row>
      </Grid>
    );
  }
}

AdvanceNotice = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3,
  onSubmit: updateStep3
})(AdvanceNotice);

const mapState = (state) => ({
  listingFields: state.listingFields.data
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(AdvanceNotice)));
