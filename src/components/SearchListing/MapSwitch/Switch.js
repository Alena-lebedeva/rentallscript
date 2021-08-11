import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwitchButton from 'lyef-switch-button';
// Redux
import { connect } from 'react-redux';
// Redux form
import { change } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!lyef-switch-button/css/main.css';


class Switch extends Component {


    render() {
        const { checked } = this.state;
        return (
            <SwitchButton
                id="booking-type"
            />
        );
    }
}

const mapState = (state) => ({});

const mapDispatch = {
    change
};

export default withStyles(s)(connect(mapState, mapDispatch)(Switch));

