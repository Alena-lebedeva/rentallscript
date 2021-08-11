import LocationItemType from '../types/LocationItemType';

import {
  GraphQLString as StringType
} from 'graphql';

import fetch from '../../core/fetch';

// Constants
import { googleMapAPI } from '../../config';

const locationItem = {

  type: LocationItemType,

  args: {
    address: { type: StringType },
  },

  async resolve({ request }, { address }) {

    const URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(address) + '&key=' + googleMapAPI;
    const resp = await fetch(URL);
    const data = await resp.json();
    let locationData = {};
    if (data && data.results && data.results.length > 0) {
      data.results.map((item, key) => {
        item.address_components.map((value, key) => {
          if (value.types[0] == 'administrative_area_level_1' || value.types[0] == 'country') {
            locationData[value.types[0]] = value.short_name;
          } else {
            locationData[value.types[0]] = value.long_name;
          }

        });
      });
      let city = locationData.administrative_area_level_2 != undefined ? locationData.administrative_area_level_2 : locationData.locality;
      let streetNumber = locationData.street_number != undefined ? locationData.street_number + ' ' + locationData.route : locationData.route;

      return {
        street: streetNumber,
        country: locationData.country,
        city: city,
        state: locationData.administrative_area_level_1,
        zipcode: locationData.postal_code,
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
        status: 200
      }
    } else {
      return {
        status: 400
      }
    }

  },
};

export default locationItem;
