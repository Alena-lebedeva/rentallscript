
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Guests.css';
import {
  Button,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import MdClear from 'react-icons/lib/md/clear';

// Redux Form
import {
  Field,
  reduxForm,
  formValueSelector,
  change,
  submit as submitForm
} from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Locale
import messages from '../../../../locale/messages';

// Internal Component
import IncrementBtnCircle from '../../../IncrementBtnCircle';

// Submit
import submit from '../../SearchForm/submit';

class Guests extends Component {

  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool
  };

  static defaultProps = {
    isExpand: false,
    fieldsSettingsData: {
      personCapacity: []
    },
    // guests: 0,
    smallDevice: false
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
    handleTabToggle('guests', !isExpand)
  }

  handleReset() {
    const { className, handleTabToggle, isExpand } = this.props;
    const { change, submitForm } = this.props;
    change('personCapacity', null);
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
        handleTabToggle('guests', !isExpand)
      }
    }
  }

  renderIncrementButton = (field) => (
    <IncrementBtnCircle
      {...field}
    />
  );

  render() {
    const { className, handleTabToggle, isExpand } = this.props;
    const { fieldsSettingsData: { personCapacity }, guests, smallDevice } = this.props;
    const { formatMessage } = this.props.intl;

    let buttonLabel = formatMessage(messages.guest);

    if (guests && Number(guests) > 0 && personCapacity && personCapacity.length > 0) {
      buttonLabel = guests + ' ';
      // buttonLabel = buttonLabel + ((Number(guests) > 1) ? personCapacity[0].otherItemName : personCapacity[0].itemName);
      buttonLabel = buttonLabel + ((Number(guests) > 1) ? 'Guests' : 'Guest');
    }

    return (
      <div className={className}>
        <div ref={this.setBtnWrapperRef}>
          <Button
            className={cx({ [s.btnSecondary]: (isExpand === true || Number(guests) > 0) }, s.btn, s.btnFontsize, s.responsiveFontsize, s.searchBtn)}
            onClick={() => handleTabToggle('guests', !isExpand)}>
            {buttonLabel}
          </Button>
        </div>
        {
          isExpand && <div className={cx(s.searchFilterPopover, { [s.searchFilterPopoverFull]: smallDevice == true })} ref={this.setWrapperRef}>
            <div className={s.searchFilterPopoverContent}>
              <div className={cx('visible-xs visible-sm', s.searchFilterPopoverHeader)}>
                <div className={cx(s.displayTable)}>
                  <div className={cx('text-left', s.displayTableCell, s.searchFilterCloseIcon)}>
                    <span onClick={this.handleSubmit}>
                      <MdClear />
                    </span>
                  </div>
                  <div className={cx('text-right', s.displayTableCell)}>
                    <Button
                      bsStyle="link"
                      className={cx(s.btnLink)}
                      onClick={this.handleReset}>
                      <FormattedMessage {...messages.clear} />
                    </Button>
                  </div>
                </div>
              </div>
              <div
                className={cx(s.displayTable, s.space4, { [s.spaceTop7]: smallDevice == true }, { [s.paddingTop2]: smallDevice == true })}>
                <div className={cx(s.displayTableCell, s.captionTitle, s.fullWidth, s.capitalizeText)}>
                  {personCapacity[0].otherItemName}
                </div>
                <div className={cx(s.displayTableCell, s.fullWidth)}>
                  <Field
                    name="personCapacity"
                    type="text"
                    component={this.renderIncrementButton}
                    maxValue={personCapacity[0].endValue}
                    minValue={0}
                    // minValue={personCapacity[0].startValue}
                    incrementBy={1}
                  />
                </div>
              </div>
              <div className={cx(s.searchFilterPopoverFooter, s.displayTable, s.applyBtnDesktopNoPaddingRight)}>
                <div className={cx('hidden-xs hidden-sm', s.displayTableCell)}>
                  {
                    guests > 0 && <Button
                      bsStyle="link"
                      className={cx(s.btnLink)}
                      onClick={this.handleReset}>
                      <FormattedMessage {...messages.clear} />
                    </Button>
                  }
                </div>
                <div className={cx( s.displayTableCell, s.applyBtnDesktop, s.applyBtnDesktopRight)}>
                  <Button
                    bsStyle="link"
                    className={cx(s.btnLink, s.applyBtn, 'hidden-xs')}
                    onClick={this.handleSubmit}>
                    <FormattedMessage {...messages.apply} />
                  </Button>

                  <Col xs={12} className={cx(s.noPadding, 'visible-xs')}>
                    <Button
                      className={cx(s.btn, s.applyBtn)}
                      onClick={this.handleSubmit}>
                      <FormattedMessage {...messages.apply} />
                    </Button>
                  </Col>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

Guests = reduxForm({
  form: 'SearchForm', // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(Guests);

// Decorate with connect to read form values
const selector = formValueSelector('SearchForm'); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data,
  guests: selector(state, 'personCapacity')
});

const mapDispatch = {
  change,
  submitForm
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Guests)));