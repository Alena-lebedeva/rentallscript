
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ShowMap.css';
import messages from '../../../../locale/messages';


import cx from 'classnames';

// Redux Form
import { Field, reduxForm, formValueSelector, change, submit as submitForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Submit
import submit from '../../SearchForm/submit';

import Switch from '../../../Switch';

class ShowMap extends Component {

  constructor(props) {
    super(props);
  }


  renderSwitch = ({ input, label, meta: { touched, error }, className, min, max, rangeCurrency }) => {
    const { formatMessage } = this.props.intl;
    const { change, showMap } = this.props;

    return (
      <div>
        <Switch
          {...input}
          checked={showMap == true}
          formName={'SearchForm'}
          fieldName={'showMap'}
          checkedValue={true}
          unCheckedValue={false}
          isPersonalize={true}
          personalizedName={'showMap'}
        />
      </div>
    )
  }

  render() {
    const { className, showMap } = this.props;

    return (
      <div className={className}>
        <div className={cx(s.displayTable)}>
          <div className={cx(s.displayTableCell)}>
            <label className={s.labelText}><FormattedMessage {...messages.showMap} /></label>
          </div>
          <div className={cx(s.displayTableCell)}>
            <Field
              name="showMap"
              component={this.renderSwitch}
            />
          </div>
        </div>
      </div>
    );
  }
}

ShowMap = reduxForm({
  form: 'SearchForm', // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(ShowMap);

// Decorate with connect to read form values
const selector = formValueSelector('SearchForm'); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data,
  showMap: state.personalized.showMap
});

const mapDispatch = {
  change,
  submitForm
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ShowMap)));