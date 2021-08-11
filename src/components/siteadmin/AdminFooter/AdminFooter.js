import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminFooter.css';

class AdminFooter extends Component {

    static propTypes = {
        siteName: PropTypes.string.isRequired,
    };

    render() {
        const { siteName } = this.props;
        return (
            <div className={s.footerContainer}>
                Copyright &copy; <b>{siteName}.</b> All rights reserved.
            </div>
        )
    }
}

const mapState = (state) => ({
    siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(AdminFooter));
