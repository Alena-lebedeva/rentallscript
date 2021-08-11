import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Dates.css';
class PriceRange extends Component {

    render() {
        const { min, max } = this.props;

        return (
            <div className={s.root}>
                <div className={s.container}>
                    <div className={s.buttonBlock}>
                        <Button className={s.button}><FormattedMessage {...messages.dates} /></Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(s)(PriceRange);