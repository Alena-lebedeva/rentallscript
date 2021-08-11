// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ReportUserModal.css';
import {
    Modal
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeReportUserModal } from '../../actions/modalActions';

// Components
import ReportUserForm from '../ReportUserForm';

// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';


class ReportUserModal extends Component {
    static propTypes = {
        closeLoginModal: PropTypes.any,
        reportModal: PropTypes.bool,
        closeReportUserModal: PropTypes.any,
        formatMessage: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.state = {
            reportModalStatus: false,
        };
    }

    componentDidMount() {
        const { reportModal } = this.props;
        if (reportModal === true && reportModal) {
            this.setState({ reportModalStatus: true });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { reportModal } = nextProps;
        if (reportModal === true) {
            this.setState({ reportModalStatus: true });
        } else {
            this.setState({ reportModalStatus: false });
        }
    }


    render() {
        const { closeReportUserModal, reporterId, profileId, reporterName, userData } = this.props;
        const { reportModalStatus } = this.state;

        let initialValues = {};

        initialValues = {
            reporterId,
            profileId,
            reportType: 'Not_allowed',
            reporterName
        }

        return (
            <div>
                <Modal
                    show={reportModalStatus}
                    animation={false}
                    onHide={closeReportUserModal}
                    dialogClassName={cx(s.logInModalContainer, 'loginModal', 'reportModel')}
                >
                    <Modal.Header closeButton className={s.panelHeader}>
                        <Modal.Title>
                            <FormattedMessage {...messages.anonymousMessage} />
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsClass={s.logInModalBody}>
                        <div>
                            <ReportUserForm
                                initialValues={initialValues}
                            />
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}


const mapState = state => ({
    reportModal: state.modalStatus.isReportUserModalOpen,
    reporterId: state.account.data.userId,
    reporterName: state.account.data.firstName,
    userData: state.account.data,

});

const mapDispatch = {
    closeReportUserModal,
};

export default withStyles(s)(connect(mapState, mapDispatch)(ReportUserModal));
