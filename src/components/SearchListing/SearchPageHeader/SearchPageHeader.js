import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchPageHeader.css';

import Dates from '../Dates';
import Guests from '../Guests';
import MapSwitch from '../MapSwitch';

class SearchPageHeader extends Component {

    render() {

        return (
            <div className={s.root}>
                <div className={s.container}>
                    <div className={s.header}>
                        <Dates />
                        <Guests />
                    </div>
                </div>
            </div>
        );
    }
}


export default withStyles(s)(SearchPageHeader);