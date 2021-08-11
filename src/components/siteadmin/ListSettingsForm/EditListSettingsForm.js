// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';
import update from './update';
import validate from './validate';

// Translation
import { injectIntl } from 'react-intl';
import messages from './messages';

// Redux
import { connect } from 'react-redux';
import { deleteListSettings } from '../../../actions/siteadmin/deleteListSettings';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListSettingsForm.css';
import {
  Button,
  FormGroup,
  Col,
  Row,
  FormControl
} from 'react-bootstrap';

import DropZone from './DropZone'
import { url } from '../../../config'
import NoLogo from './NoLogo.jpg'

class EditListSettingsForm extends Component {

  static propTypes = {
    isEnable: PropTypes.string,
    id: PropTypes.number,
    typeId: PropTypes.number,
    fieldType: PropTypes.string,
    deleteListSettings: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      fieldType: null
    }
  }

  componentWillMount() {
    const { fieldType } = this.props;
    if (fieldType != undefined) {
      this.setState({ fieldType: fieldType });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fieldType } = nextProps;
    if (fieldType != undefined) {
      this.setState({ fieldType: fieldType });
    }
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormControl {...input} placeholder={label} type={type} className={className} />
      </div>
    )
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={label}
        >
          {children}
        </FormControl>
      </FormGroup>
    );
  }

  render() {
    const { error, handleSubmit, submitting, dispatch } = this.props;
    const { formatMessage } = this.props.intl;
    const { id, typeId, deleteListSettings, itemDescription } = this.props;
    const { fieldType } = this.state;
    
    return (
      <div className={cx(s.formMaxWidth, 'maxwidthcenter', 'empty')}>
        <form onSubmit={handleSubmit(update)}>
          {error && <strong>{formatMessage(error)}</strong>}
          <FormGroup className={s.formGroup}>
            <Field
              name="itemName"
              type="text"
              component={this.renderFormControl}
              label={formatMessage(messages.addNew)}
              className={cx(s.formControlInput)}
            />
          </FormGroup>
          {
            typeId == 11 &&
            <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
              <p className={cx('hidden-md hidden-lg hidden-sm')}>&nbsp;</p>
              <p className={s.textMuted}>Icon</p>
              { itemDescription && <img src={ url + '/images/amenities/' + itemDescription} className={s.imgSection} width="327" height="172"/>}
              { itemDescription == null && <img src={NoLogo} className={s.imgSection} width="327" height="172" />}
              <div className={s.centerFlex}>
                <Col xs={12} sm={4} md={4} lg={4} className={cx(s.spaceTop2, s.fullWidth, s.button, s.btnPrimaryBorder, s.paddingNo)}>
                  <DropZone formName={'EditListSettingsForm'} defaultMessage={'Upload Image'} />
                </Col>
              </div>
            </Col>
          }
          {
            typeId == 10 &&
            <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
              <p className={cx('hidden-md hidden-lg hidden-sm')}>&nbsp;</p>
              <p className={s.textMuted}>Icon</p>
              { itemDescription && <img src={ url + '/images/amenities/' + itemDescription} className={s.imgSection} width="327" height="172"/>}
              { itemDescription == null && <img src={NoLogo} className={s.imgSection} width="327" height="172" />}
              <div className={s.centerFlex}>
                <Col xs={12} sm={4} md={4} lg={4} className={cx(s.spaceTop2, s.fullWidth, s.button, s.btnPrimaryBorder, s.paddingNo)}>
                  <DropZone formName={'EditListSettingsForm'} defaultMessage={'Upload Image'} />
                </Col>
              </div>
            </Col>
          }
          {
            typeId && (typeId == 1) && <FormGroup className={s.formGroup}>
              <Field
                name="itemDescription"
                component={this.renderFormControlTextArea}
                label={formatMessage(messages.addNewDescription)}
                className={cx(s.formControlInput, s.space3)}
              />
            </FormGroup>
          }
          {
            fieldType == "numberType" && <div>
              <FormGroup className={s.formGroup}>
                <Field
                  name="otherItemName"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.addOtherItem)}
                  className={s.formControlInput}
                />
              </FormGroup>
              <FormGroup className={s.formGroup}>
                <Field
                  name="startValue"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.startValue)}
                  className={s.formControlInput}
                />
              </FormGroup>

              <FormGroup className={s.formGroup}>
                <Field
                  name="endValue"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.endValue)}
                  className={s.formControlInput}
                />
              </FormGroup>
            </div>
          }
          {
            fieldType != "numberType" && <div>
              <FormGroup className={s.formGroup}>
                <label className={s.labelText}><Field name="isEnable" component="input" type="radio" value="1" /> {formatMessage(messages.enable)} </label>
                <label className={s.labelText}><Field name="isEnable" component="input" type="radio" value="0" /> {formatMessage(messages.disable)} </label>
              </FormGroup>

              <FormGroup className={cx(s.formGroup, s.formSection)}>

                <Col xs={12} sm={3} md={3} lg={3} className={cx(s.noPadding, s.btnRight)}>
                  <Button className={cx(s.button, s.btnPrimary)} bsSize="large" bsStyle="primary" type="submit" disabled={submitting}>
                    {formatMessage(messages.update)}
                  </Button>
                </Col>
                <Col xs={12} sm={3} md={3} lg={3} className={s.noPadding}>
                  <Button className={cx(s.button, s.btnPrimaryBorder)} bsSize="large" onClick={() => deleteListSettings(id, typeId)} disabled={submitting}>
                    {formatMessage(messages.delete)}
                  </Button>
                </Col>

              </FormGroup>
            </div>
          }

          {
            fieldType === "numberType" && <FormGroup className={s.formGroup}>
              <Row>
                <Col xs={12} sm={3} md={3} lg={3} className={cx(s.btnAlignRight)}>
                  <Button className={cx(s.button, s.btnPrimary)} bsSize="large" type="submit" disabled={submitting}>
                    {formatMessage(messages.update)}
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          }
        </form>
      </div>
    )
  }

}

EditListSettingsForm = reduxForm({
  form: "EditListSettingsForm", // a unique name for this form
  validate
})(EditListSettingsForm);

// Decorate with connect to read form values
const selector = formValueSelector("EditListSettingsForm"); // <-- same as form name

const mapState = (state) => ({
  isEnable: selector(state, 'isEnable'),
  id: selector(state, 'id'),
  typeId: selector(state, 'typeId'),
  itemDescription: selector(state, 'itemDescription')
});

const mapDispatch = {
  deleteListSettings
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(EditListSettingsForm)));
