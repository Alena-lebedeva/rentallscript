import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Book.css';

// Component
import Booking from '../../components/Booking';

class Book extends Component {
    static propTypes = {
    };

    render() {
        return (
            <div className={s.container}>
                <div className={s.landingContainer}>
                    <Booking />
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Book);

