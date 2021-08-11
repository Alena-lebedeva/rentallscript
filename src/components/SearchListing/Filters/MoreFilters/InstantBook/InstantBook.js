
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './InstantBook.css';

import cx from 'classnames';

// Redux Form
import { Field, reduxForm, formValueSelector, change, submit as submitForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Locale
import messages from '../../../../../locale/messages';

// Submit
import submit from '../../../SearchForm/submit';

import Switch from '../../../../Switch';

class InstantBook extends Component {

  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
  }

  renderSwitch = ({ input, label, meta: { touched, error }, className, min, max, rangeCurrency }) => {
    const { formatMessage } = this.props.intl;
    const { change, bookingType } = this.props;

    return (
      <div>
        <Switch
          {...input}
          checked={bookingType == 'instant'}
          formName={'SearchForm'}
          fieldName={'bookingType'}
          checkedValue={'instant'}
          unCheckedValue={'request'}
        />
      </div>
    )
  }

  render() {
    const { className, handleTabToggle, isExpand, bookingType } = this.props;
    return (
      <div className={className}>
        <div className={cx(s.displayTable, s.space4)}>
          <div className={cx(s.displayTableCell)}>
            <p className={cx(s.moreFilterTitle, s.textBold)}>
              <FormattedMessage {...messages.instantBook} />
            </p>
            <p className={s.captionTitle}>
              <FormattedMessage {...messages.instantBookInfo} />
            </p>
          </div>
          <div className={cx(s.displayTableCell, 'searchSwitch', s.alignRight)}>
            <Field
              name="bookingType"
              component={this.renderSwitch}
            />
          </div>
        </div>
      </div>
    );
  }
}

InstantBook = reduxForm({
  form: 'SearchForm', // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(InstantBook);

// Decorate with connect to read form values
const selector = formValueSelector('SearchForm'); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data,
  bookingType: selector(state, 'bookingType')
});

const mapDispatch = {
  change,
  submitForm
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(InstantBook)));