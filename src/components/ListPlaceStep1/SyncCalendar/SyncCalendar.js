import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import { FormattedMessage } from 'react-intl';
import {
    Button,
    Col
} from 'react-bootstrap';
import s from '../ListPlaceStep1.css';

// Component
import ImportCalendar from './ImportCalendar';
import ExportCalendar from './ExportCalendar';
import CalendarsList from './CalendarsList';
import Loader from '../../Loader';

// Locale
import messages from '../../../locale/messages';

class SyncCalendar extends Component {

    static propTypes = {
        listId: PropTypes.number.isRequired,
        loading: PropTypes.bool,
    };

    static defaultProps = {
        loading: false
    };

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showExport: false,
        };
        this.openImportModal = this.openImportModal.bind(this);
        this.closeImportModal = this.closeImportModal.bind(this);
        this.openExportModal = this.openExportModal.bind(this);
        this.closeExportModal = this.closeExportModal.bind(this);
    }

    openImportModal() {
        this.setState({ showModal: true });
    }

    closeImportModal() {
        this.setState({ showModal: false });
    }

    openExportModal() {
        this.setState({ showExport: true });
    }

    closeExportModal() {
        this.setState({ showExport: false });
    }

    render() {
        const { showModal, showExport } = this.state;
        const { listId, loading } = this.props;
        return (
            <div>
                <Loader
                    show={loading}
                    type={"page"}
                >
                    <ImportCalendar listId={listId} showModal={showModal} close={this.closeImportModal} />
                    <ExportCalendar
                        listId={listId}
                        showModal={showExport}
                        close={this.closeExportModal}
                    />
                    <CalendarsList />

                    <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop1, s.space5, s.noPadding)}>
                        <ul className={s.listType}>
                            <li className={s.space2}>
                                <Button className={s.btnContainer} onClick={this.openImportModal}>
                                    <div className={s.displayTable}>
                                        <div className={s.displayTableCellVertical}>
                                            <FontAwesome.FaDownload className={cx(s.iconColor, s.iconSize)} />
                                        </div>
                                        <div className={cx(s.paddingLeft, s.displayTableCellVertical)}>
                                            <span><FormattedMessage {...messages.importCalendarBtn} /></span>
                                        </div>
                                    </div>
                                </Button>
                            </li>
                            <li>
                                <Button className={s.btnContainer} onClick={this.openExportModal}>
                                    <div className={s.displayTable}>
                                        <div className={s.displayTableCellVertical}>
                                            <FontAwesome.FaUpload className={cx(s.iconColor, s.iconSize)} />
                                        </div>
                                        <div className={cx(s.paddingLeft, s.displayTableCellVertical)}>
                                            <span><FormattedMessage {...messages.exportCalendar} /></span>
                                        </div>
                                    </div>
                                </Button>
                            </li>
                        </ul>
                    </Col>
                </Loader>
            </div>
        );
    }
}

const mapState = (state) => ({
    loading: state.calendar.importCalLoading,
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(SyncCalendar)); 