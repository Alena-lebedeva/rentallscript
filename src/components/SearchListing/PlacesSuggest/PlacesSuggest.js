// General
import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Redux form
import { Field, reduxForm, change } from 'redux-form';

// Google Places Suggest Component
//import GoogleMapLoader from "react-google-maps-loader";
import ReactGoogleMapLoader from "react-google-maps-loader";
import Geosuggest from 'react-geosuggest';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader/!css-loader!react-geosuggest/module/geosuggest.css';
import { FormControl } from 'react-bootstrap';

// Constants
import { googleMapAPI } from '../../../config';

// Redux  Action
import { setPersonalizedValues } from '../../../actions/personalized';

class PlacesSuggest extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    handleSubmit: PropTypes.any,
    change: PropTypes.any,
    googleMaps: PropTypes.object,
    setPersonalizedValues: PropTypes.any,
    personalized: PropTypes.shape({
      location: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  };

  static defaultProps = {
      personalized: {
          location: null
      }
  };

  constructor (props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSelectSuggest = this.handleSelectSuggest.bind(this);
  }

  handleSearchChange (value) {
    const { setPersonalizedValues } = this.props;
    setPersonalizedValues({ name: 'location', value });
    setPersonalizedValues({ name: 'lat', value: null });
    setPersonalizedValues({ name: 'lng', value: null });
    setPersonalizedValues({ name: 'geography', value: null });
  }

  async handleSelectSuggest (data) {
    const { change, handleSubmit, setPersonalizedValues } = this.props;
    let locationData = {};
    if (data && data.gmaps) {
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
      setPersonalizedValues({ name: 'location', value: data.label });
      setPersonalizedValues({ name: 'lat', value: data.location.lat });
      setPersonalizedValues({ name: 'lng', value: data.location.lng });
      setPersonalizedValues({ name: 'geography', value: JSON.stringify(locationData) });
      await change('SearchForm', 'location', data.label);
      await change('SearchForm', 'geography', JSON.stringify(locationData));
      await change('SearchForm', 'currentPage', 1);
      await handleSubmit();
    }
  }

  render() {
    const { label, className, containerClassName, personalized } = this.props;

    return (
        <div>
        <ReactGoogleMapLoader
          params={{
            key: googleMapAPI, // Define your api key here
            libraries: "places"// To request multiple libraries, separate them with a comma
          }}
          render={googleMaps =>
            googleMaps && (
              <Geosuggest
                ref={el => this._geoSuggest = el}
                placeholder={label}
                inputClassName={className}
                className={containerClassName}
                initialValue={personalized.location}
                onChange={this.handleSearchChange}
                onSuggestSelect={this.handleSelectSuggest}
              />
            )}
        />
          
        </div>
    );
  }
}

const mapState = (state) => ({
  personalized: state.personalized
});

const mapDispatch = {
  change,
  setPersonalizedValues
};

export default withStyles(s)(connect(mapState, mapDispatch)(PlacesSuggest));
