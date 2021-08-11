import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import {
    Button,
    Col
} from 'react-bootstrap';
import s from '../ListPlaceStep1.css';

// Redux Functions
import { deleteImportCal } from '../../../actions/Listing/DeleteImportCalendar';
import { importiCal } from '../../../actions/Listing/ImportCalendar';

class CalendarsList extends Component {

    static propTypes = {
        calendars: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            listId: PropTypes.number.isRequired,
        })),
        deleteImportCal: PropTypes.any.isRequired,
        importiCal: PropTypes.any.isRequired,
    };

    static defaultProps = {
        calendars: [],
    };

    render() {
        const { calendars, loading, deleteImportCal, importiCal } = this.props;
        if (calendars && calendars.length > 0) {
            return (
                <div className={s.landingText}>
                    {
                        calendars.map((item) => {
                            return (
                                <div key={item.id}>
                                    <Col xs={11} sm={11} md={11} lg={11} className={cx(s.space1, s.noPadding)}>
                                        <div className={s.calenderText}>{item.name}</div>
                                    </Col>
                                    <Col xs={1} sm={1} md={1} lg={1} className={s.noPadding}>
                                        <ul className={cx(s.listType, s.space0)}>
                                            <li>
                                                <Button
                                                    className={s.iconContainer}
                                                    onClick={() => importiCal(item.listId, item.name, item.url, item.id)}
                                                >
                                                    <FontAwesome.FaRefresh className={s.iconSize} />
                                                </Button>
                                            </li>
                                            <li>
                                                <Button
                                                    className={s.iconContainer}
                                                    onClick={() => deleteImportCal(item.listId, item.id)}
                                                >
                                                    <FontAwesome.FaTrashO className={s.iconSize} />
                                                </Button>
                                            </li>
                                        </ul>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                                        <hr className={cx(s.horizontalLineThrough, s.LineColor)} />
                                    </Col>
                                </div>
                            )
                        })
                    }
                </div>
            );
        }
        return <span />
    }
}

const mapState = (state) => ({
    calendars: state.calendar.data,
});

const mapDispatch = {
    deleteImportCal,
    importiCal
};

export default withStyles(s)(connect(mapState, mapDispatch)(CalendarsList)); 