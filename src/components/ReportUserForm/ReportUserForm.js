// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux form
import { Field, reduxForm } from 'redux-form';

import CustomCheckbox from '../CustomCheckbox';

import submit from './submit';

import { sitename } from '../../config';

// Locale
import messages from '../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ReportUserForm.css';
import {
    Button,
    FormGroup,
    FormControl
} from 'react-bootstrap';
class ReportUserForm extends Component {

    static propTypes = {
        openForgotPasswordModal: PropTypes.any.isRequired,
        formatMessage: PropTypes.any,
    };

    renderFormControlWork = ({ input, meta: { touched, error }, label, name }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <div className={cx(s.checkBoxLabelCell, s.checkBoxLabelCellIcon, s.checkBoxLabelCellInput)}>
                    <CustomCheckbox
                        name={name}
                        checked={input.value == true}
                        onChange={event => {
                            return input.onChange(event);
                        }}
                    />
                </div>
            </div>
        )
    }

    renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <FormControl
                    {...input}
                    placeholder={label}
                    type={type}
                    className={className}
                />
            </div>
        );
    }

    render() {
        const { error, handleSubmit, submitting, dispatch, reporterId } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <form onSubmit={handleSubmit(submit)}>
                {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}

                <div>
                    <p className={s.titleText}>
                        <FormattedMessage {...messages.reportUserInfo} />
                    </p>
                    <label className={cx(s.landingLabel)}>
                        <Field
                            name="reportType"
                            component="input"
                            type="radio"
                            value="Shouldn't available"
                            className={s.blockRadioButton}
                        />
                        <FormattedMessage {...messages.reportContent1} />
                        {' '} {sitename}
                    </label>

                    <label className={cx(s.landingLabel)}>
                        <Field
                            name="reportType"
                            component="input"
                            type="radio"
                            value="Direct contact"
                            className={s.blockRadioButton}
                        />
                        <FormattedMessage {...messages.reportContent2} />
                    </label>

                    <label className={cx(s.landingLabel)}>
                        <Field
                            name="reportType"
                            component="input"
                            type="radio"
                            value="Spam"
                            className={s.blockRadioButton}
                        />
                        <FormattedMessage {...messages.reportContent3} />
                    </label>

                    <FormGroup className={cx(s.spaceTop3, s.formGroup)}>
                        <Button
                            className={cx(s.btnPrimaryBorder)}
                            bsSize="large"
                            block type="submit"
                            disabled={submitting}
                        >
                            {formatMessage(messages.submit)}
                        </Button>
                    </FormGroup>
                </div>

            </form>
        );
    }
}

ReportUserForm = reduxForm({
    form: 'ReportUserForm', // a unique name for this form
    destroyOnUnmount: false
})(ReportUserForm);

const mapState = state => ({});

const mapDispatch = {};

export default injectIntl(
    withStyles(s)
        (
            connect(mapState, mapDispatch)
                (ReportUserForm)
        )
);
