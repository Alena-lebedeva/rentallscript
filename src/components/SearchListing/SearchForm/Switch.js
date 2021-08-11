import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import SwitchButton from 'lyef-switch-button';
// Redux
import { connect } from 'react-redux';
// Redux form
import {change} from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!lyef-switch-button/css/main.css';

import * as SwitchButton from 'react-switch';

class Switch extends Component {
    static propTypes = {
    	change: PropTypes.any.isRequired,
        handleSubmit: PropTypes.any.isRequired
    };

    static defaultProps = {
        checked: false
    };

    constructor(props) {
        super(props);
        this.state ={
        	checked: false
        };
        this.handleCallback = this.handleCallback.bind(this);
    }

    componentDidMount() {
        const { checked } = this.props;
        this.setState({
            checked
        });
    }

    componentWillReceiveProps(nextProps) {
        const { checked } = nextProps;
        this.setState({
            checked
        });
    }

    async handleCallback(){
    	const { change, handleSubmit } = this.props;
    	this.setState({ checked: !this.state.checked });
    	let type;
    	if(!this.state.checked){
    		type = 'instant';
    	} else {
    		type = 'request';
    	}
    	await change('SearchForm', 'bookingType', type);
    }

    render() {
        const { checked } = this.state;
        
        return (
            <SwitchButton
	            id="booking-type"
	            checked={checked}
	            onChange={this.handleCallback}
	        />
        );
    }
}

const mapState = (state) => ({});

const mapDispatch = {
    change
};

export default withStyles(s) (connect(mapState, mapDispatch)(Switch));

