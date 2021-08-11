import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Constants
import { googleMapAPI } from '../../../../config';

import Geosuggest from 'react-geosuggest';
import ReactGoogleMapLoader from "react-google-maps-loader";

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader/!css-loader!react-geosuggest/module/geosuggest.css';

// Redux  Action
import { setPersonalizedValues } from '../../../../actions/personalized';

class PlaceGeoSuggest extends Component {

    static propTypes = {
        label: PropTypes.string,
        className: PropTypes.string,
        containerClassName: PropTypes.string,
        setPersonalizedValues: PropTypes.func,
        googleMaps: PropTypes.object,
        personalized: PropTypes.shape({
            locationAddress: PropTypes.string,
            lat: PropTypes.number,
            lng: PropTypes.number,
            geography: PropTypes.string
        })
    };

    static defaultProps = {
        formName: 'AddPopularLocation',
        personalized: {
            locationAddress: null
        }
    }

    constructor(props) {
        super(props);
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    onSuggestSelect(data) {
        const { onChange } = this.props;

        if (data) {
            onChange(data.label);
        }
    }

    onTextChange(value) {
        const { onChange } = this.props;
        if (value !== undefined && value.trim() === '') {
            onChange(value);
        }
    }

    render() {
        const { value, onChange, label, className, formName } = this.props;
        const { containerClassName, personalized } = this.props;

        return (
            <div className={'popularLocationAutoComplete'}>
                <ReactGoogleMapLoader
                    params={{
                        key: googleMapAPI, // Define your api key here
                        libraries: "places", // To request multiple libraries, separate them with a comma
                    }}
                    render={googleMaps =>
                        googleMaps && (
                            <Geosuggest
                                ref={el => this._geoSuggest = el}
                                placeholder={label}
                                inputClassName={className}
                                className={containerClassName}
                                initialValue={value}
                                onChange={this.onTextChange}
                                onSuggestSelect={this.onSuggestSelect}
                            />
                        )}
                />
            </div>
        )
    }
}

const mapState = (state) => ({
    personalized: state.personalized
});

const mapDispatch = {
    setPersonalizedValues
};

// export default GoogleMapLoader(withStyles(s)(connect(mapState, mapDispatch)(PlaceGeoSuggest)), {
//     libraries: ["places"],
//     region: "US",
//     language: "en",
//     key: googleMapAPI,
// });

export default withStyles(s)(connect(mapState, mapDispatch)(PlaceGeoSuggest));