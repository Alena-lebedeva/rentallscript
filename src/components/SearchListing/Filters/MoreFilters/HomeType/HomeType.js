
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HomeType.css';

import cx from 'classnames';

// Redux Form
import { Field, reduxForm, formValueSelector, change, submit as submitForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Locale
import messages from '../../../../../locale/messages';

// Submit
import submit from '../../../SearchForm/submit';

import CustomCheckbox from '../../../../CustomCheckbox';

class HomeType extends Component {

  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
  };

  static defaultProps = {
    fieldsSettingsData: {
      roomType: []
    },
    homeType: []
  };

  constructor(props) {
    super(props);
  }

  checkboxHorizontalGroup = ({ label, name, options, input }) => {
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.displayTable)}>
        {
          options.map((option, index) => {
            if (option.isEnable !== "1") {
              return <span key={index} />
            }

            return (
              <div className={cx(s.displayTableRow)} key={option.id}>
                <div className={cx(s.displayTableCell, s.checkBoxSection, s.padding2)}>
                  <CustomCheckbox
                    key={index}
                    className={'icheckbox_square-green'}
                    name={`${input.name}[${index}]`}
                    value={option.id}
                    checked={input.value.indexOf(option.id) !== -1}
                    onChange={event => {
                      const newValue = [...input.value];
                      if (event === true) {
                        newValue.push(option.id);
                      } else {
                        newValue.splice(newValue.indexOf(option.id), 1);
                      }
                      input.onChange(newValue);
                    }}
                  />
                </div>
                <div className={cx(s.displayTableCell, s.captionTitle, s.padding2)}>
                  {option.itemName}
                </div>
              </div>
            )
          })
        }
      </div>
    )
  };

  render() {
    const { className, handleTabToggle, isExpand } = this.props;
    const { fieldsSettingsData: { roomType }, homeType } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={className}>
        <p className={cx(s.moreFilterTitle, s.space3, s.textBold, s.spaceTop1)}>
          <FormattedMessage {...messages.homeType} />
        </p>
        <div className={cx(s.displayTable, s.space4)}>
          <Field
            name="roomType"
            component={this.checkboxHorizontalGroup}
            options={roomType} />
        </div>
      </div>
    );
  }
}

HomeType = reduxForm({
  form: 'SearchForm', // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(HomeType);

// Decorate with connect to read form values
const selector = formValueSelector('SearchForm'); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data,
  homeType: selector(state, 'roomType')
});

const mapDispatch = {
  change,
  submitForm
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(HomeType)));