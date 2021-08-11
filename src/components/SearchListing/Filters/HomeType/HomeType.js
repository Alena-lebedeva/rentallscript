
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HomeType.css';
import {
  Button
} from 'react-bootstrap';
import cx from 'classnames';

// Redux Form
import { Field, reduxForm, formValueSelector, change, submit as submitForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Locale
import messages from '../../../../locale/messages';

// Submit
import submit from '../../SearchForm/submit';

import CustomCheckbox from '../../../CustomCheckbox';

class HomeType extends Component {

  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool
  };

  static defaultProps = {
    isExpand: false,
    fieldsSettingsData: {
      roomType: []
    },
    homeType: []
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setBtnWrapperRef = this.setBtnWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  async handleSubmit() {
    const { className, handleTabToggle, isExpand } = this.props;
    const { change, submitForm } = this.props;
    await change('currentPage', 1);
    submitForm('SearchForm');
    handleTabToggle('homeType', !isExpand)
  }

  handleReset() {
    const { className, handleTabToggle, isExpand } = this.props;
    const { change, submitForm } = this.props;
    change('roomType', []);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  setBtnWrapperRef(node) {
    this.btnWrapperRef = node;
  }

  handleClickOutside(event) {
    const { className, handleTabToggle, isExpand } = this.props;
    const { change, submitForm } = this.props;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      change('currentPage', 1);
      submitForm('SearchForm');
      if (this.btnWrapperRef && !this.btnWrapperRef.contains(event.target)) {
        handleTabToggle('homeType', !isExpand)
      }
    }
  }

  checkboxHorizontalGroup = ({ label, name, options, input }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.displayTable)}>
        {
          options.map((option, index) => {

            if (option.isEnable !== "1") {
              return <span maxPrice />
            }
            let splitLineContent = option.itemDescription && option.itemDescription.split('\n');
            let newSplitLineContent = splitLineContent && splitLineContent.filter(function (el) { return el; });
            return (
              <div className={cx(s.displayTableRow)}>
                <div className={cx(s.displayTableCell, s.padding4, s.checkboxSection, s.NHtype)}>
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
                <div className={cx(s.displayTableCell, s.captionTitle, s.padding4, s.NhName)}>
                  {option.itemName}
                  <div>
                    {
                      newSplitLineContent && newSplitLineContent.length > 0 && newSplitLineContent.map((itemValue, indexes) => {
                        return (
                        <p className={s.dot} dangerouslySetInnerHTML={{ __html: itemValue }} />
                        )
                      })
                    }
                    {/* {option.itemDescription} */}
                  </div>
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

    let buttonLabel = formatMessage(messages.homeType);
    let singleHomeType;

    if (homeType && homeType.length > 0) {
      if (homeType.length > 1) {
        buttonLabel = buttonLabel + '	· ' + homeType.length;
      } else if (homeType.length == 1) {
        singleHomeType = roomType.filter((item) => { return item.id == homeType[0] });
        if (singleHomeType && singleHomeType.length > 0) {
          buttonLabel = singleHomeType[0].itemName;
        } else {
          buttonLabel = buttonLabel + '	· ' + homeType.length;
        }
      }
    }

    return (
      <div className={className}>
        <div ref={this.setBtnWrapperRef}>
          <Button
            className={cx({ [s.btnSecondary]: (isExpand === true || homeType.length > 0) }, s.btn, s.responsiveFontsize, s.searchBtn)}
            onClick={() => handleTabToggle('homeType', !isExpand)}>
            {buttonLabel}
          </Button>
        </div>
        {
          isExpand && <div className={s.searchFilterPopover} ref={this.setWrapperRef}>
            <div className={s.searchFilterPopoverContent}>
              <Field
                name="roomType"
                component={this.checkboxHorizontalGroup}
                options={roomType} />
              <div className={cx(s.searchFilterPopoverFooter, s.displayTable)}>
                <div className={cx('text-left', s.displayTableCell)}>
                  {/* <Button
                    bsStyle="link"
                    className={cx(s.btnLink)}
                    onClick={this.handleReset}>
                    <FormattedMessage {...messages.clear} />
                  </Button> */}
                </div>
                <div className={cx('text-right', s.displayTableCell)}>
                  <Button
                    bsStyle="link"
                    className={cx(s.btnLink, s.applyBtn)}
                    onClick={this.handleSubmit}>
                    <FormattedMessage {...messages.apply} />
                  </Button>
                </div>
              </div>
            </div> 
          </div>
        }
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