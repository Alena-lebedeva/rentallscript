import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { injectIntl } from 'react-intl';

import cx from 'classnames';
import {
  Button,
  Form,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Panel
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyHostFormBlock3.css';

class WhyHostFormBlock3 extends Component {

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {

    return (
      <div>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
        >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{error}</span>}
      </div>
    )
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    return (
      <div>
        <FormControl {...input} placeholder={label} type={type} className={className} />
        {touched && error && <span className={s.errorMessage}>{error}</span>}
      </div>
    )
  }


  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper)}>
        <div className={s.contentBox}>
          <h1 className={s.headerTitle}>{title}</h1>
          <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
            <Panel className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}

                <FormGroup className={s.formGroup}>
                    <Row>
                        <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
                            <label className={s.labelText} >Hosting Block Title Heading</label>
                        </Col>
                        <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                            <Field 
                                name="hostingBlockTitleHeading" 
                                type="text" 
                                component={this.renderFormControl} 
                                label={"Title"}
                            />
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup className={s.formGroup}>
                    <Row>
                        <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
                            <label className={s.labelText} >Hosting Block Title 1</label>
                        </Col>
                        <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                            <Field 
                                name="hostingBlockTitle1" 
                                type="text" 
                                component={this.renderFormControl} 
                                label={"Title"}
                            />
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup className={s.formGroup}>
                    <Row>
                        <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
                            <label className={s.labelText} >Hosting Block Content 1</label>
                        </Col>
                        <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                            <Field
                                name="hostingBlockContent1"
                                component={this.renderFormControlTextArea}
                                className={s.formControlInput}
                            />
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup className={s.formGroup}>
                    <Row>
                        <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
                            <label className={s.labelText} >Hosting Block Title 2</label>
                        </Col>
                        <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                            <Field 
                                name="hostingBlockTitle2" 
                                type="text" 
                                component={this.renderFormControl} 
                                label={"Title"}
                            />
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup className={s.formGroup}>
                    <Row>
                        <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
                            <label className={s.labelText} >Hosting Block Content 2</label>
                        </Col>
                        <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                            <Field
                                name="hostingBlockContent2"
                                component={this.renderFormControlTextArea}
                                className={s.formControlInput}
                            />
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup className={s.formGroup}>
                    <Row>
                        <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
                            <label className={s.labelText} >Hosting Block Title 3</label>
                        </Col>
                        <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                            <Field 
                                name="hostingBlockTitle3" 
                                type="text" 
                                component={this.renderFormControl} 
                                label={"Title"}
                            />
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup className={s.formGroup}>
                    <Row>
                        <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
                            <label className={s.labelText} >Hosting Block Content 3</label>
                        </Col>
                        <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                            <Field
                                name="hostingBlockContent3"
                                component={this.renderFormControlTextArea}
                                className={s.formControlInput}
                            />
                        </Col>
                    </Row>
                </FormGroup>
                
                <FormGroup className={s.formGroup}>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <Button
                                bsSize="small"
                                className={cx(s.button, s.btnPrimary, s.btnlarge)}
                                type="submit"
                                disabled={submitting}
                            >
                            Save
                            </Button>
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

WhyHostFormBlock3 = reduxForm({
  form: 'WhyHostForm',
  validate
})(WhyHostFormBlock3);

export default injectIntl(withStyles(s)(WhyHostFormBlock3));
