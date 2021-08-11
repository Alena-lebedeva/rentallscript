import GetAddressComponentsType from '../types/GetAddressComponentsType';

import {
  GraphQLString as StringType
} from 'graphql';

import fetch from '../../core/fetch';

// Constants
import { googleMapAPI } from '../../config';

const GetAddressComponents = {

  type: GetAddressComponentsType,

  args: {
    address: { type: StringType },
  },

  async resolve({ request }, { address }) {

    const URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(address) + '&key=' + googleMapAPI;
    const resp = await fetch(URL);
    const data = await resp.json();
    let locationData = {};
    let addressComponents;
    let types = [], geoType, viewport;
    let sw_lat, sw_lng, ne_lat, ne_lng;

    if (data) {
      data.results.map((value, key) => {
        viewport = value.geometry.viewport;
        types = value.types;
        sw_lat = viewport.southwest.lat;
        sw_lng = viewport.southwest.lng;
        ne_lat = viewport.northeast.lat;
        ne_lng = viewport.northeast.lng;
        value.address_components.map((item, key) => {
          if (item.types[0] == "administrative_area_level_1") {
            locationData["administrative_area_level_1_short"] = item.short_name;
            locationData["administrative_area_level_1_long"] = item.long_name;
          } else if (item.types[0] == "country") {
            locationData[item.types[0]] = item.short_name;
          } else {
            locationData[item.types[0]] = item.long_name;
          }
        });
      });

      if (types) {
        if (types.indexOf("country") > -1) {
          geoType = "country";
        } else if (types.indexOf("administrative_area_level_1") > -1) {
          geoType = "state";
        } else {
          geoType = null;
        }
      }

      addressComponents = JSON.stringify(locationData);

      return {
        addressComponents,
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
        geoType,
        sw_lat,
        sw_lng,
        ne_lat,
        ne_lng
      }
    }

  },
};

export default GetAddressComponents;
