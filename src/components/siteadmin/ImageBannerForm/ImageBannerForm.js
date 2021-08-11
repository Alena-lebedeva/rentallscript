import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

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
import s from './ImageBannerForm.css';

// Component
import DropZone from './DropZone';
import Loader from '../../Loader';

class ImageBannerForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
    bannerUploaderLoading: PropTypes.bool
  };

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    return (
      <FormGroup className={s.formGroup}>
        <Row>
          <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
            <label className={s.labelText} >{label}</label>
          </Col>
          <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
            {touched && error && <span className={s.errorMessage}>{error}</span>}
            <FormControl {...input} placeholder={label} type={type} className={className} />
          </Col>
        </Row>
      </FormGroup>
    );
  }

  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues, title, image, bannerUploaderLoading } = this.props;
    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
            <Panel className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{error}</strong>}
                <FormGroup className={s.formGroup}>
                  <Row>
                    <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
                      <label className={s.labelText} >Banner Image</label>
                    </Col>
                    <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                      <DropZone data={image} />
                      <Loader
                        show={bannerUploaderLoading}
                        type={"page"}
                      >
                        {
                          image != null && <img src={'/images/banner/' + image} width="327" height="172" />
                        }
                      </Loader>
                    </Col>
                  </Row>
                </FormGroup>
                <Field name="title" type="text" component={this.renderFormControl} label={"Title"} />
                <Field name="description" type="text" component={this.renderFormControl} label={"Description"} />
                <Field name="buttonLabel" type="text" component={this.renderFormControl} label={"Button Label"} />
                <FormGroup className={s.formGroup}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Button bsSize="small" className={cx(s.button, s.btnPrimary, s.btnlarge)} type="submit" disabled={submitting} >Save</Button>
                    </Col>
                  </Row>
                </FormGroup>
              </form>
            </Panel>
          </Col>
        </div>
      </div>
    );
  }

}

ImageBannerForm = reduxForm({
  form: 'ImageBannerForm', // a unique name for this form
  validate
})(ImageBannerForm);

const mapState = (state) => ({
  bannerUploaderLoading: state.siteSettings.bannerUploaderLoading
});

const mapDispatch = {
};

export default withStyles(s)(connect(mapState, mapDispatch)(ImageBannerForm));
