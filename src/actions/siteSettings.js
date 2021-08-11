import {gql} from 'react-apollo';

import {
  SET_SITE_SETTINGS_START,
  SET_SITE_SETTINGS_SUCCESS,
  SET_SITE_SETTINGS_ERROR } from '../constants';

const query = gql`
  query ($type: String) {
    siteSettings(type: $type) {
      name
      value
    }
  }
`;

export function setSiteSettings() {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: SET_SITE_SETTINGS_START,
    });

    try {
      const type = "site_settings";
      let settingsData = {};
      const {data} = await client.query({
        query,
        variables: {type},
        fetchPolicy: 'network-only'
      });
      if(data.siteSettings) {
        data.siteSettings.map((item, key) => {
          settingsData[item.name] = item.value;
        });

        // Successully logged out
        dispatch({
          type: SET_SITE_SETTINGS_SUCCESS,
          data: settingsData
        });

      } else {
          dispatch({
            type: SET_SITE_SETTINGS_ERROR,
          });
      }
    } catch (error) {
      dispatch({
        type: SET_SITE_SETTINGS_ERROR,
        payload:{
          error
        }
      });
      return false;
    }

    return true;
  };
}
