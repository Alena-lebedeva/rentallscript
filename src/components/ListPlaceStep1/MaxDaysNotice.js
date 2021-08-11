// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm } from 'redux-form';

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
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Component
import ListPlaceTips from '../ListPlaceTips';
import SyncCalendar from './SyncCalendar';

import updateStep3 from './updateStep3';

class MaxDaysNotice extends Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    listId: PropTypes.number.isRequired,
    listingSteps: PropTypes.shape({
      step3: PropTypes.string.isRequired,
      listing: PropTypes.shape({
        isPublished: PropTypes.bool.isRequired
      })
    }),
  };

  static defaultProps = {
    listingSteps: {
      step3: "inactive",
      listing: {
        isPublished: false
      }
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      maxDaysNotice: [],
    }
  }

  componentWillMount() {
    const { listingFields } = this.props;

    if (listingFields != undefined) {
      this.setState({
        maxDaysNotice: listingFields.maxDaysNotice,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps;

    if (listingFields != undefined) {
      this.setState({
        maxDaysNotice: listingFields.maxDaysNotice,
      });
    }
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span>{formatMessage(error)}</span>}
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
      </div>
    )
  }

  render() {
    const { handleSubmit, submitting, pristine, valid, previousPage, nextPage, existingList, listId } = this.props;
    const { maxDaysNotice } = this.state;
    const { listingSteps } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}><FormattedMessage {...messages.maxDaysTitle} /></h3>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <FormGroup className={s.formGroup}>

                    <Field name="maxDaysNotice" component={this.renderFormControlSelect} className={cx(s.formControlSelect, s.jumboSelect)} >
                      <option value={"available"}>{formatMessage(messages.datesOption5)}</option>
                      <option value={"3months"}>{formatMessage(messages.datesOption1)}</option>
                      <option value={"6months"}>{formatMessage(messages.datesOption2)}</option>
                      <option value={"9months"}>{formatMessage(messages.datesOption3)}</option>
                      <option value={"12months"}>{formatMessage(messages.datesOption4)}</option>
                      <option value={"unavailable"}>{formatMessage(messages.datesDropDown)}</option>
                    </Field>
                  </FormGroup>

                  <FormGroup className={cx(s.formGroup, s.spaceTop4)}>
                    <ControlLabel className={s.landingStep3}>
                      <FormattedMessage {...messages.chooseCancellationPolicy} />
                    </ControlLabel>
                    <Field name="cancellationPolicy" component={this.renderFormControlSelect} className={cx(s.formControlSelect, s.jumboSelect)} >
                      <option value={"1"}>{formatMessage(messages.flexible)}</option>
                      <option value={"2"}>{formatMessage(messages.moderate)}</option>
                      <option value={"3"}>{formatMessage(messages.strict)}</option>
                    </Field>
                  </FormGroup>
                  {
                    listingSteps && listingSteps.step3 === "completed"
                    && listingSteps.listing && listingSteps.listing.isPublished && <div className={s.spaceTop4}>
                      <h3 className={cx(s.landingContentTitle)}><FormattedMessage {...messages.syncCalendars} /></h3>
                      <SyncCalendar listId={listId} />
                    </div>
                  }
                </div>
                <div className={s.nextPosition}>
                  <div className={s.nextBackButton}>

                    <hr className={s.horizontalLineThrough} />


                    <FormGroup className={s.formGroup}>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                        <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("advance-notice")}>
                          <FormattedMessage {...messages.back} />
                        </Button>
                        <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} onClick={() => nextPage("min-max-nights")}>
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

MaxDaysNotice = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3,
  onSubmit: updateStep3
})(MaxDaysNotice);

const mapState = (state) => ({
  listingFields: state.listingFields.data,
  listingSteps: state.location.listingSteps,
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(MaxDaysNotice)));
