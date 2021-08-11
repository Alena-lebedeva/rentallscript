import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListItem.css';
import cx from 'classnames';

// Redux action
import { ManagePublishStatus } from '../../../actions/Listing/ManagePublishStatus';

// Locale
import messages from '../../../locale/messages';

class PublishOption extends Component {
    static propTypes = {
        listId: PropTypes.number.isRequired,
        isPublished: PropTypes.bool.isRequired,
        ManagePublishStatus: PropTypes.any.isRequired,
        formatMessage: PropTypes.any,
    };

    static defaultProps = {
        isPublished: false
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { listId, ManagePublishStatus } = this.props;
        let action = event.target.value;
        ManagePublishStatus(listId, action);
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { isPublished } = this.props;
        let defaultValue = 'unPublish';
        if (isPublished) {
            defaultValue = 'publish';
        }
        return (
            <span className="publishArrow">
                <select className={cx(s.formSelect, s.formSelectNew)} value={defaultValue} onChange={this.handleChange}>
                    <option value="publish">{formatMessage(messages.listed)}</option>
                    <option value="unPublish">{formatMessage(messages.unListed)}</option>
                </select>
            </span>
        )
    }
}

const mapState = (state) => ({});

const mapDispatch = {
    ManagePublishStatus
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PublishOption)));