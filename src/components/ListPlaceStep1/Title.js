// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Helpers
import validateStep2 from './validateStep2';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Row,
  FormGroup,
  Col,
  FormControl
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Component
import ListPlaceTips from '../ListPlaceTips';

import updateStep2 from './updateStep2';

class Title extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      chars_left: 50
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { listingFields, valid } = this.props;
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  componentDidMount() {
    const { title } = this.props;
    let max_chars = title ? 50 - title.length : 50;
    this.setState({
      chars_left: max_chars
    });
  }

  componentWillReceiveProps(nextProps) {
    const { listingFields, valid } = nextProps;
    const { title } = nextProps;
    let max_chars = title ? 50 - title.length : 50;
    this.setState({
      chars_left: max_chars
    });

    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleChange(event) {
    var input = event.target.value;
    let max_chars = 300;
    this.setState({
      chars_left: max_chars - input.length
    });
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl {...input} placeholder={label} type={type} className={className} maxLength={50} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage, invalid } = this.props;
    const { formatMessage } = this.props.intl;
    const { isDisabled, chars_left } = this.state;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}><FormattedMessage {...messages.placeTitle} /></h3>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <h3 className={cx(s.noMarginMaximum, s.maximumSpace2)}>
                    <span className={s.maximumCharcter}>
                      <FormattedMessage {...messages.maximumCharcter} />
                    </span>
                  </h3>
                  <p className={s.maximumCharColor}>
                    {chars_left} <FormattedMessage {...messages.maximumCharcterLeft} />
                  </p>
                  <FormGroup className={s.formGroup}>
                    <Field name="title"
                      type="text"
                      component={this.renderFormControl}
                      label={formatMessage(messages.titleLabel)}
                      className={cx(s.formControlInput, s.jumboInput)}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </div>
                <div className={s.nextPosition}>
                  <div className={s.nextBackButton}>
                    <hr className={s.horizontalLineThrough} />

                    <FormGroup className={s.formGroup}>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                        <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("description")}>
                          <FormattedMessage {...messages.back} />
                        </Button>
                        <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} type="submit" disabled={isDisabled}>
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

Title = reduxForm({
  form: 'ListPlaceStep2', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep2,
  onSubmit: updateStep2
})(Title);

const selector = formValueSelector('ListPlaceStep2');


const mapState = (state) => ({
  listingFields: state.listingFields.data,
  title: selector(state, 'title')
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Title)));
