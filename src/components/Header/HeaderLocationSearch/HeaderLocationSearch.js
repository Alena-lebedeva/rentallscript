import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { change, submit as submitForm } from 'redux-form';

// Translation
import { injectIntl } from 'react-intl';

// Google Places Suggest Component
//import GoogleMapLoader from "react-google-maps-loader";
import ReactGoogleMapLoader from "react-google-maps-loader";

// Constants
import { googleMapAPI } from '../../../config';

import Geosuggest from 'react-geosuggest';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader/!css-loader!react-geosuggest/module/geosuggest.css';
import c from './HeaderLocationSearch.css';
import cx from 'classnames';

// Redux  Action
import { setPersonalizedValues } from '../../../actions/personalized';

// Locale
import messages from '../../../locale/messages';

// History
import history from '../../../core/history';

class HeaderLocationSearch extends Component {

    static propTypes = {
        label: PropTypes.string,
        className: PropTypes.string,
        containerClassName: PropTypes.string,
        setPersonalizedValues: PropTypes.any,
        googleMaps: PropTypes.object,
        personalized: PropTypes.shape({
            location: PropTypes.string,
            lat: PropTypes.number,
            lng: PropTypes.number,
            geography: PropTypes.string
        })
    };

    static defaultProps = {
        personalized: {
            location: ''
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            locationValue: ''
        };
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const { personalized, personalized: { location } } = this.props;
        if (personalized && location) {
            this.setState({
                locationValue: location
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { personalized, personalized: { location } } = nextProps;
        if (personalized) {
            this.setState({
                locationValue: location
            });
        }
    }

    onSuggestSelect(data) {
        const { setPersonalizedValues } = this.props;
        let locationData = {};
        let updatedURI, uri = '/s?';
        let types = [], geoType;
        if (data && data.gmaps) {
            types = data.gmaps.types;
            data.gmaps.address_components.map((item, key) => {
                if (item.types[0] == "administrative_area_level_1") {
                    locationData["administrative_area_level_1_short"] = item.short_name;
                    locationData["administrative_area_level_1_long"] = item.long_name;
                } else if (item.types[0] == "country") {
                    locationData[item.types[0]] = item.short_name;
                } else {
                    locationData[item.types[0]] = item.long_name;
                }
            });

            if (types && types.length > 0) {
                if (types.indexOf("country") > -1) {
                    geoType = "country";
                } else if (types.indexOf("administrative_area_level_1") > -1) {
                    geoType = "state";
                } else {
                    geoType = null;
                }
            }
            setPersonalizedValues({ name: 'geography', value: JSON.stringify(locationData) });
            setPersonalizedValues({ name: 'geoType', value: geoType });
            setPersonalizedValues({ name: 'location', value: data.label });
            setPersonalizedValues({ name: 'lat', value: data.location.lat });
            setPersonalizedValues({ name: 'lng', value: data.location.lng });
            setPersonalizedValues({ name: 'chosen', value: 1 });
            //setPersonalizedValues({ name: 'showMap', value: true });
            uri = uri + '&address=' + data.label + '&chosen=' + 1;

            updatedURI = encodeURI(uri);
            history.push(updatedURI);
        }
    }

    onChange(value) {
        const { setPersonalizedValues, change, submitForm } = this.props;
        let location;
        let updatedURI, uri = '/s';
        if (history.location) {
            location = history.location.pathname;
        }
        setPersonalizedValues({ name: 'location', value });
        setPersonalizedValues({ name: 'geoType', value: null });
        setPersonalizedValues({ name: 'chosen', value: null });
        setPersonalizedValues({ name: 'geography', value: null });
        setPersonalizedValues({ name: 'lat', value: null });
        setPersonalizedValues({ name: 'lng', value: null });
        //setPersonalizedValues({ name: 'showMap', value: true });

        if (location == '/s' && !value) {
            setPersonalizedValues({ name: 'location', value: "" });
            change('SearchForm', 'geography', null);
            change('SearchForm', 'geoType', null);
            change('SearchForm', 'lat', null);
            change('SearchForm', 'lng', null);
            change('SearchForm', 'lat', null);
            change('SearchForm', 'searchByMap', false);

            updatedURI = encodeURI(uri);
            history.push(updatedURI);
        }
    }

    render() {
        const { className, containerClassName, personalized } = this.props;
        const { formatMessage } = this.props.intl;
        const { locationValue } = this.state;

        return (
            <div className={'headerSearch'}>
                <div className={cx(c.displayTable, c.searchContainer)}>
                    <div className={cx(c.displayTableCell, c.searchIconContainer)}>
                        <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true"
                            focusable="false" className={c.searchIcon}>
                            <path d="m10.4 18.2c-4.2-.6-7.2-4.5-6.6-8.8.6-4.2 4.5-7.2 8.8-6.6 4.2.6 7.2 4.5 6.6 8.8-.6 4.2-4.6 7.2-8.8 6.6m12.6 3.8-5-5c1.4-1.4 2.3-3.1 2.6-5.2.7-5.1-2.8-9.7-7.8-10.5-5-.7-9.7 2.8-10.5 7.9-.7 5.1 2.8 9.7 7.8 10.5 2.5.4 4.9-.3 6.7-1.7v.1l5 5c .3.3.8.3 1.1 0s .4-.8.1-1.1"></path>
                        </svg>
                    </div>
                    <div className={c.displayTableCell}>
                        <ReactGoogleMapLoader
                            params={{
                                key: googleMapAPI, // Define your api key here
                                libraries: "places", // To request multiple libraries, separate them with a comma
                            }}
                            render={googleMaps =>
                                googleMaps && (
                                    <Geosuggest
                                        ref={el => this._geoSuggest = el}
                                        placeholder={formatMessage(messages.homeWhere)}
                                        inputClassName={className}
                                        className={containerClassName}
                                        initialValue={locationValue}
                                        onChange={this.onChange}
                                        onSuggestSelect={this.onSuggestSelect}
                                    />
                                )}
                        />

                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (state) => ({
    personalized: state.personalized
});

const mapDispatch = {
    setPersonalizedValues,
    change,
    submitForm
};

export default injectIntl(withStyles(s, c)(connect(mapState, mapDispatch)(HeaderLocationSearch)));