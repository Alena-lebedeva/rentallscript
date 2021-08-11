import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Range.css';
class Range extends Component {

    static propTypes = {
        total: PropTypes.number.isRequired,
        range: PropTypes.array.isRequired,
        paginationLabel: PropTypes.string
    };

    static defaultProps = {
        paginationLabel: 'items'
    };

    render() {
        const { total, range, paginationLabel } = this.props;
        return (
            <div className={s.resultsCount}>
                <span>{range[0]}</span>
                <span>&nbsp;–&nbsp;</span>
                <span>{range[1]}</span>
                <span>&nbsp;of&nbsp;</span>
                <span>{total}</span>
                <span>&nbsp;{paginationLabel}</span>
            </div>
        );
    }
}
export default withStyles(s)(Range);