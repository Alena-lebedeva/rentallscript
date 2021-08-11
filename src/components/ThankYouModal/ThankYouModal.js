// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ThankYouModal.css';
import {
    Button,
    FormGroup,
    Modal
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeThankYouModal } from '../../actions/modalActions';

// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';


class ThankYouModal extends Component {
    static propTypes = {
        closeLoginModal: PropTypes.any,
        reportModal: PropTypes.bool,
        closeReportUserModal: PropTypes.any,
        formatMessage: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.state = {
            thankYouModalStatus: false,
        };
    }

    componentDidMount() {
        const { thankYouModal } = this.props;
        if (thankYouModal === true) {
            this.setState({ thankYouModalStatus: true });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { thankYouModal } = nextProps;
        if (thankYouModal === true) {
            this.setState({ thankYouModalStatus: true });
        } else {
            this.setState({ thankYouModalStatus: false });
        }
    }


    render() {
        const { closeThankYouModal } = this.props;
        const { thankYouModalStatus } = this.state;

        return (
            <div>
                <Modal show={thankYouModalStatus} animation={false} onHide={closeThankYouModal} dialogClassName={cx(s.logInModalContainer, 'loginModal')} >
                    <Modal.Header closeButton className={s.panelHeader}>
                        <Modal.Title><FormattedMessage {...messages.thankyouTitle} /></Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsClass={s.logInModalBody}>
                        <div className={s.titleText}> <FormattedMessage {...messages.thankyouInfo1} /></div>
                        <FormGroup className={cx(s.formGroup, s.spaceTop3)}>
                            <Button className={cx(s.btnPrimaryBorder)} bsSize="large" block type="submit" onClick={closeThankYouModal}>
                                <FormattedMessage {...messages.close} />
                            </Button>
                        </FormGroup>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}


const mapState = state => ({
    thankYouModal: state.modalStatus.isThankYouModalOpen,
    reporterId: state.account.data.userId,
});

const mapDispatch = {
    closeThankYouModal,
};

export default withStyles(s)(connect(mapState, mapDispatch)(ThankYouModal));
