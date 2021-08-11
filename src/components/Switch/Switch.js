import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
// Redux form
import { change } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!lyef-switch-button/css/main.css';

import * as SwitchButton from 'react-switch';

// Redux  Action
import { setPersonalizedValues } from '../../actions/personalized';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';

export const uncheckedIcon = (
    <svg viewBox="0 0 52 52" fill="currentColor" fillOpacity="0"
        stroke="currentColor" strokeWidth="3"
        role="presentation" strokeLinecap="round" strokeLinejoin="round"
        style={{ position: "absolute", top: 1, height: '30px', width: '30px', display: 'block', transform: 'scale(1.5)' }}>
        <path d="m19.1 19.1 l14 14 m 0 -14 l -14 14"></path>
    </svg>
);

export const checkedIcon = (
    <svg viewBox="0 0 52 52" fill="currentColor" fillOpacity="0"
        stroke="currentColor" strokeWidth="3"
        role="presentation" strokeLinecap="round" strokeLinejoin="round"
        style={{ position: "absolute", top: 1, height: '30px', width: '30px', display: 'block', transform: 'scale(1.5)' }}>
        <path d="m19.1 25.2 4.7 6.2 12.1-11.2"></path>
    </svg>
);

class Switch extends Component {
    static propTypes = {
        change: PropTypes.any.isRequired,
        handleSubmit: PropTypes.any,
        formName: PropTypes.string,
        fieldName: PropTypes.string,
        checkedValue: PropTypes.any,
        unCheckedValue: PropTypes.any
    };

    static defaultProps = {
        checked: false,
        checkedValue: true,
        unCheckedValue: false,
        offColor: '#dce0e0',
        onColor: '#008489',
        checkedIcon: checkedIcon,
        uncheckedIcon: uncheckedIcon,
        height: 32,
        width: 48,
        boxShadow: 'none',
        activeBoxShadow: '0px 0px 2px 3px #008489',
        isPersonalize: false
    };

    constructor(props) {
        super(props);
        this.state = {
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

    async handleCallback() {
        const { change, handleSubmit } = this.props;
        const { formName, fieldName, checkedValue, unCheckedValue } = this.props;
        const { isPersonalize, personalizedName, setPersonalizedValues } = this.props;
        const { setLoaderStart, setLoaderComplete } = this.props;
        let showMapLoader = null;
        await this.setState({ checked: !this.state.checked });
        let type;
        if (!this.state.checked) {
            type = unCheckedValue;
        } else {
            type = checkedValue;
        }

        if (isPersonalize) {
            await setPersonalizedValues({ name: personalizedName, value: type });
        }

        await setLoaderStart('showMapLoading');
        await setLoaderComplete('showMapLoading');

        await change(formName, fieldName, type);
        //await change('SearchForm', 'currentPage', 1);
        //await handleSubmit();
    }

    render() {
        const { offColor, onColor, checkedIcon, uncheckedIcon, height, width, boxShadow } = this.props;
        const { checked } = this.state;

        return (
            <SwitchButton
                id="booking-type"
                checked={checked}
                onChange={this.handleCallback}
                offColor={offColor}
                onColor={onColor}
                checkedIcon={checkedIcon}
                uncheckedIcon={uncheckedIcon}
                height={height}
                width={width}
                boxShadow={boxShadow}
                onClick={() => { }}
            />
        );
    }
}

const mapState = (state) => ({
});

const mapDispatch = {
    change,
    setPersonalizedValues,
    setLoaderStart,
    setLoaderComplete
};

export default withStyles(s)(connect(mapState, mapDispatch)(Switch));

