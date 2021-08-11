import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditStaticPage.css';
import { Field, reduxForm, change } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { injectIntl } from 'react-intl';

// Style
import {
  Button,
  FormGroup,
  FormControl,
  Col,
  ControlLabel,
  Panel,
} from 'react-bootstrap';
import Link from '../../Link';


class EditStaticPage extends React.Component {

  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill')
    }
    this.state = { editorHtml: '' } // You can also pass a Quill Delta here

  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
  };

  renderFormControl = ({ input, label, placeholder, type, meta: { touched, error }, className }) => {
    return (
      <FormGroup className={s.formGroup}>
        <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
          <label className={s.labelText} >{label}</label>
        </Col>
        <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
          {touched && error && <span className={s.errorMessage}>{error}</span>}
          <FormControl {...input} placeholder={placeholder} type={type} className={className} />
        </Col>
      </FormGroup>
    );
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    return (
      <FormGroup className={s.formGroup}>
        <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
          <label className={s.labelText} >{label}</label>
        </Col>
        <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
          {touched && error && <span className={s.errorMessage}>{error}</span>}
          <FormControl
            {...input}
            className={className}
            placeholder={label}
            componentClass={"textarea"}
          />
        </Col>
      </FormGroup>
    )
  }

  renderQuill = ({ input, label, type, meta: { touched, error }, className }) => {
    const ReactQuill = this.ReactQuill;
    let modules = {
      toolbar: [
        [{ 'header': '1' }, { 'header': '2' }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link'],
        // ['link', 'image'],
      ],
      clipboard: {
        matchVisual: false,
      }
    };

    let formats = [
      'header', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link'
      // 'link', 'image'
    ];
    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{error}</span>}

        <ReactQuill
          {...input}
          onChange={(newValue, delta, source) => {
            if (source === 'user') {
              input.onChange(newValue);
            }
          }}
          onBlur={(range, source, quill) => {
            if (quill.getHTML() == '<p><br></p>') {
              input.onBlur('');
            }
            else {
              input.onBlur(quill.getHTML());
            }
          }}
          modules={modules}
          formats={formats}
          theme="snow"
        />
      </div>
    );
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;
    const { parentData } = this.props;
    const ReactQuill = this.ReactQuill;
    const gobackcss = { padding: '10px' };
    if (typeof window !== 'undefined' && ReactQuill) {
      return (
        <div className={cx(s.pagecontentWrapper)}>
          <div className={s.contentBox}>
            <h1 className={s.headerTitle}>{title}</h1>
            <Link to={"/siteadmin/staticpage/management"} className={cx('pull-right')} style={gobackcss}>
              Go back
              </Link>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Panel className={s.panelHeader}>
                <form onSubmit={handleSubmit(submit)}>
                  {error && <strong>{error}</strong>}
                  <Field name="metaTitle" type="text" component={this.renderFormControl} label={"Meta Title"} placeholder={"Meta Title"} />
                  <Field name="metaDescription" className={s.textareaInput} component={this.renderFormControlTextArea} label={"Meta Description"} placeholder={"Meta Description"} />
                  <FormGroup className={s.formGroup}>
                    <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
                      <label className={s.labelText} >Content</label>
                    </Col>
                    <Col xs={12} sm={9} md={9} lg={9}>
                      <Field name="content" component={this.renderQuill} />
                    </Col>
                  </FormGroup>
                  <FormGroup className={s.formGroup}>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Button bsSize="small" className={cx(s.button, s.btnPrimary, s.btnlarge)} type="submit" disabled={submitting} >Save</Button>
                    </Col>
                  </FormGroup>
                </form>
              </Panel>
            </Col>
          </div>
        </div>
      );
    } else {
      return <textarea />;
    }
  }

}

EditStaticPage = reduxForm({
  form: 'EditStaticPage', // a unique name for this form
  validate
})(EditStaticPage);



const mapState = (state) => ({});

const mapDispatch = {
  change
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(EditStaticPage)));



