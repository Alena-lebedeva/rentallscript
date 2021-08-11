import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditBlogDetails.css';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { injectIntl } from 'react-intl';

// Style
import {
  Button,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Panel,
  InputGroup
} from 'react-bootstrap';
import { url, sitename } from '../../../config.js';
import { formatURL } from '../../../helpers/formatURL';
import Link from '../../Link';
class EditBlogDetails extends React.Component {

  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill')
    }
    this.state = { editorHtml: '' } // You can also pass a Quill Delta here
    this.handlePageTitle = this.handlePageTitle.bind(this);

  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
  };

  static defaultProps = {
    data: []
  };

  async handlePageTitle(e) {
    const { change } = this.props;
    if (e.target.value) {
      await change('pageUrl', formatURL(e.target.value));
    } else {
      await change('pageUrl', '');
    }
  }

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

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    return (
      <FormGroup className={s.formGroup}>
        <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
          <label className={s.labelText} >{label}</label>
        </Col>
        <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
          {touched && error && <span className={s.errorMessage}>{error}</span>}
          <div className={s.select}>
            <FormControl componentClass="select" {...input} className={className} >
              {children}
            </FormControl>
          </div>
        </Col>
      </FormGroup>
    )
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

  renderFormControlPageUrl = ({ input, label, placeholder, type, meta: { touched, error }, className }) => {
    return (
      <FormGroup className={s.formGroup}>
        <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3}>
          <label className={s.labelText} >{label}</label>
        </Col>
        <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
          <div>
            {touched && error && <span className={s.errorMessage}>{error}</span>}
            <InputGroup >
              <InputGroup.Addon>{url}/page/</InputGroup.Addon>
              <FormControl {...input} placeholder={placeholder} type={type} className={cx(className)} />
            </InputGroup>
          </div>
        </Col>
      </FormGroup>

    );
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
            <Link to={"/siteadmin/content-management"} className={cx('pull-right')} style={gobackcss}>
              Go back
              </Link>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Panel className={s.panelHeader}>
                <form onSubmit={handleSubmit(submit)}>
                  {error && <strong>{error}</strong>}
                  <Field name="metaTitle" type="text" component={this.renderFormControl} label={"Meta Title"} placeholder={"Meta Title"} />
                  <Field name="metaDescription" className={s.textareaInput} component={this.renderFormControlTextArea} label={"Meta Description"} placeholder={"Meta Description"} />
                  <Field name="pageTitle" type="text" component={this.renderFormControl} label={"Page Title"} placeholder={"Page Title"} onChange={(event) => this.handlePageTitle(event)} />
                  <Field name="pageUrl" type="text" component={this.renderFormControlPageUrl} label={"Page URL"} placeholder={"Page URL  eg.(pageURL)"} />
                  <Field name="footerCategory" className={s.formControlSelect} component={this.renderFormControlSelect} label={"Footer Category"} >
                    <option value="">Choose Footer Category</option>
                    <option value={sitename}>{sitename}</option>
                    <option value="discover">Discover</option>
                    <option value="hosting">Hosting</option>
                  </Field>
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

EditBlogDetails = reduxForm({
  form: 'BlogDetails', // a unique name for this form
  validate
})(EditBlogDetails);


const blogFormSelector = formValueSelector('BlogDetails');

const mapState = (state) => ({
  pageTitle: blogFormSelector(state, 'pageTitle'),
  parentPage: blogFormSelector(state, 'parentPage'),
});

const mapDispatch = {
  change
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(EditBlogDetails)));



