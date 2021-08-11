
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RoomsBeds.css';
import {
  Button
} from 'react-bootstrap';
import cx from 'classnames';

// Redux Form
import { Field, reduxForm, formValueSelector, change, submit as submitForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Locale
import messages from '../../../../../locale/messages';

// Internal Component
import IncrementBtnCircle from '../../../../IncrementBtnCircle';

// Submit
import submit from '../../../SearchForm/submit';

class RoomsBeds extends Component {
  
  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool
  };

  static defaultProps = {
    isExpand: false,
    fieldsSettingsData: {
      bedrooms: [],
      bathrooms: [],
      beds: []
    },
  };

  constructor(props) {
    super(props);
  }

  renderIncrementButton = (field) => (
    <IncrementBtnCircle
      {...field}
    />
  );
  
  render() {
    const { className, handleTabToggle, isExpand } = this.props;
    const { fieldsSettingsData: { bedrooms, bathrooms, beds } } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={className}>
        <p className={cx(s.moreFilterTitle, s.space3, s.textBold)}>
          <FormattedMessage {...messages.roomsAndBeds} />
        </p>
        <div className={cx(s.displayTable, s.space2)}>
          <div className={cx(s.displayTableCell, s.captionTitle, s.fullWidth, s.capitalizeText)}>
            {beds[0].otherItemName}
          </div>
          <div className={cx(s.displayTableCell, s.fullWidth)}>
            <Field
              name="beds"
              type="text"
              component={this.renderIncrementButton}
              maxValue={beds[0].endValue}
              minValue={0}
              incrementBy={1}
            />
          </div>
        </div>
        <div className={cx(s.displayTable, s.space2)}>
          <div className={cx(s.displayTableCell, s.captionTitle, s.fullWidth, s.capitalizeText)}>
            {bedrooms[0].otherItemName}
          </div>
          <div className={cx(s.displayTableCell, s.fullWidth)}>
            <Field
              name="bedrooms"
              type="text"
              component={this.renderIncrementButton}
              maxValue={bedrooms[0].endValue}
              minValue={0}
              incrementBy={1}
            />
          </div>
        </div>
        <div className={cx(s.displayTable, s.space4)}>
          <div className={cx(s.displayTableCell, s.captionTitle, s.fullWidth, s.capitalizeText)}>
            {bathrooms[0].otherItemName}
          </div>
          <div className={cx(s.displayTableCell, s.fullWidth)}>
            <Field
              name="bathrooms"
              type="text"
              component={this.renderIncrementButton}
              maxValue={bathrooms[0].endValue}
              minValue={0}
              incrementBy={1}
            />
          </div>
        </div>
      </div>
    );
  }
}

RoomsBeds = reduxForm({
  form: 'SearchForm', // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(RoomsBeds);

// Decorate with connect to read form values
const selector = formValueSelector('SearchForm'); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data
});

const mapDispatch = {
  change,
  submitForm
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(RoomsBeds)));