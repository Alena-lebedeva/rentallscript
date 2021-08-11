import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm, formValueSelector } from 'redux-form';
import submit from './submit';
import validate from './validate';

// Redux
import { connect } from 'react-redux';

// Style
import {
  Button,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Panel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SiteSettingsForm.css';
import Uploader from './Uploader';
import HomeUploader from './HomeUploader';
import EmailLogoUploader from './EmailLogoUploader';

class SiteSettingsForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      homePageType: null,
    }
  }

  componentWillMount() {
    const { homePageType } = this.props;

    if (homePageType) {
      this.setState({ hostTypeState: homePageType });
    }
  }

  componentDidMount() {
    const { homePageType } = this.props;

    if (homePageType) {
      this.setState({ hostTypeState: homePageType });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { homePageType } = nextProps;

    if (homePageType) {
      this.setState({ hostTypeState: homePageType });
    }
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, maxlength }) => {
    return (
      <Row>
        <FormGroup className={s.formGroup}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <label className={s.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            {touched && error && <span className={s.errorMessage}>{error}</span>}
            <FormControl {...input} placeholder={label} type={type} className={className} maxlength={maxlength} />
          </Col>
        </FormGroup>
      </Row>
    );
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {

    return (
      <Row>
        <FormGroup className={s.formGroup}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <label className={s.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            {touched && error && <span className={s.errorMessage}>{error}</span>}
            <FormControl
              {...input}
              className={className}
              componentClass="textarea"
            >
              {children}
            </FormControl>
          </Col>
        </FormGroup>
      </Row>
    );
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    return (
      <Row>
        <FormGroup className={s.formGroup}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <label className={s.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div>
              <FormControl componentClass="select" {...input} className={className} >
                {children}
              </FormControl>
            </div>
          </Col>
        </FormGroup>
      </Row>
    )
  }


  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues, title, appAvailableStatus } = this.props;
    const { hostTypeState } = this.state;
    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <Row className={s.mar0}>
            <h1 className={s.headerTitle}>{title}</h1>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Panel className={s.panelHeader}>
                <form onSubmit={handleSubmit(submit)}>
                  {error && <strong>{error}</strong>}

                  <Col xs={12} sm={12} md={12} lg={4}>
                    <Row>
                      <FormGroup className={s.formGroup}>
                        <Col xs={12} sm={12} md={12} lg={12} >
                          <label className={s.labelTextNew} >Logo</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} className={s.marbtm14}>
                          <Uploader />
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} className={s.space2}>
                          <Field name="logoHeight" type="text" component={this.renderFormControl} label={"Logo Height"} />
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} className={s.space2}>
                          <Field name="logoWidth" type="text" component={this.renderFormControl} label={"Logo Width"} />
                        </Col>
                      </FormGroup>
                    </Row>
                  </Col>

                  <Col xs={12} sm={12} md={12} lg={4}>
                    <Row>
                      <FormGroup className={s.formGroup}>
                        <Col xs={12} sm={12} md={12} lg={12} >
                          <label className={s.labelTextNew} >Home Page Logo</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} className={s.marbtm14}>
                          <HomeUploader />
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} className={s.space2}>
                          <Field name="homeLogoHeight" type="text" component={this.renderFormControl} label={"Home Logo Height"} />
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} className={s.space2}>
                          <Field name="homeLogoWidth" type="text" component={this.renderFormControl} label={"Home Logo Width"} />
                        </Col>
                      </FormGroup>
                    </Row>
                  </Col>

                  <Col xs={12} sm={12} md={12} lg={4} className={s.marbtm14}>
                    <Col xs={12} sm={12} md={12} lg={12} >
                      <label className={s.labelTextNew} >Email Logo</label>
                    </Col>
                    <EmailLogoUploader />
                  </Col>

                  <Col xs={12} sm={12} md={12} lg={6} className={s.space2}>
                    <Field name="siteName" type="text" component={this.renderFormControl} label={"Site Name"} maxlength={15} />
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6} className={s.space2}>
                    <Field name="siteTitle" type="text" component={this.renderFormControl} label={"Site Title"} />
                  </Col>

                  <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                    <Col xs={12} sm={12} md={12} lg={6} className={s.space2}>
                      <Field name="metaKeyword" type="text" component={this.renderFormControlTextArea} label={"Meta Keyword"} />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} className={s.space2}>
                      <Field name="metaDescription" type="text" component={this.renderFormControlTextArea} label={"Meta Description"} />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={4} className={s.space2}>
                      <Field name="facebookLink" type="text" component={this.renderFormControl} label={"Facebook URL"} />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={4} className={s.space2}>
                      <Field name="twitterLink" type="text" component={this.renderFormControl} label={"Twitter URL"} />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={4} className={s.space2}>
                      <Field name="instagramLink" type="text" component={this.renderFormControl} label={"Instagram URL"} />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={4} className={s.space2}>
                      <Field
                        name="homePageType"
                        type="text"
                        className={cx(s.formControlSelect, s.fullWithSelect, s.noFontWeight)}
                        component={this.renderFormControlSelect}
                        label={"Home Page Layout"}
                      >
                        <option value={1}>Banner Text with Image Slider Layout</option>
                        <option value={2}>Banner Text Only Layout</option>
                        <option value={3}>Banner Text Layout with Detailed Search form</option>
                        <option value={4}>Single Banner Image Layout with Detailed Search form</option>
                      </Field>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={4} className={s.space2}>
                      <Field
                        name="phoneNumberStatus"
                        type="text"
                        className={cx(s.formControlSelect, s.fullWithSelect, s.noFontWeight)}
                        component={this.renderFormControlSelect}
                        label={"Phone Number Format"}
                      >
                        <option value={1}>Twilio SMS</option>
                        <option value={2}>Normal Phone Number</option>
                      </Field>

                    </Col>
                    <Col xs={12} sm={12} md={12} lg={4} className={s.space2}>
                      <Field
                        name="appAvailableStatus"
                        type='text'
                        className={cx(s.formControlSelect, s.fullWithSelect, s.noFontWeight)}
                        component={this.renderFormControlSelect}
                        label={"App Available"}
                      >
                        <option value={1}>Enable</option>
                        <option value={0}>Disable</option>

                      </Field>
                    </Col>

                    {
                      appAvailableStatus == 1 && <div>
                        <Col xs={12} sm={12} md={12} lg={6} className={s.space2}>
                          <Field name="playStoreUrl" type="text" component={this.renderFormControl} label={"Play store URL"} />
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6} className={s.space2}>
                          <Field name="appStoreUrl" type="text" component={this.renderFormControl} label={"App store URL"} />
                        </Col>

                      </div>
                    }
                  </Col>

                  <Col xs={12} sm={12} md={12} lg={12} className={s.space2}>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={6}>
                        <Field name="email" type="text" component={this.renderFormControl} label={"Email Id"} />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={6}>
                        <Field name="phoneNumber" type="text" component={this.renderFormControl} label={"Mobile Number"} />
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={12} sm={12} md={12} lg={12} className={s.space2}>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={6}>
                        <Field name="address" type="text" component={this.renderFormControlTextArea} label={"Address"} />
                      </Col>
                    </Row>
                  </Col>
                  <FormGroup className={s.formGroup}>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Button bsSize="small" className={cx(s.button, s.btnPrimary, s.btnlarge)} type="submit" disabled={submitting} >Save</Button>
                    </Col>
                  </FormGroup>
                </form>
              </Panel>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}


SiteSettingsForm = reduxForm({
  form: 'SiteSettingsForm', // a unique name for this form
  validate
})(SiteSettingsForm);

const selector = formValueSelector('SiteSettingsForm');

const mapState = (state) => ({
  homePageType: selector(state, 'homePageType'),
  appAvailableStatus: selector(state, 'appAvailableStatus')
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(SiteSettingsForm));
