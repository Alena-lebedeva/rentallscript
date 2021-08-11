import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';


import { Button } from 'react-bootstrap';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Guests.css';

class PriceRange extends Component {


    render() {
        const { min, max } = this.props;

        return (
            <div className={s.root}>
                <div className={s.container}>
                    <div className={s.buttonBlock}>
                        <Button className={s.button}><FormattedMessage {...messages.guests} /></Button>
                    </div>
                </div>
            </div>
        );
    }
}


export default withStyles(s)(PriceRange);