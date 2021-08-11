import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import cx from 'classnames';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AvailabilityCalendar.css';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

class CustomDayContents extends React.Component {
    static propTypes = {
        day: PropTypes.any
    };

    static defaultProps = {
        day: null
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { day, startDate, endDate, minimumNights } = this.props;
        let showTooltip = false;

        if (startDate && startDate.format('MM-DD-YYYY') == day.format('MM-DD-YYYY')) {
            showTooltip = true;
        }

        return (
            <div className={s.customDayContainer}>
                {
                    day && <div className={cx(s.customDayDateOnly, s.newhover)}>
                        {showTooltip && <div className={cx(s.hoverSection, s.relativeSection)}>{minimumNights + (minimumNights > 1 ? ' nights' : ' night') + ' ' + 'minimum stay '}</div>}
                        {day.format('D')}
                    </div>
                }
            </div>
        );
    }
}

export default injectIntl(withStyles(s)(CustomDayContents));