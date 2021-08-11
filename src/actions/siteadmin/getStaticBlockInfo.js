import { gql } from 'react-apollo';

import {
  STATIC_BLOCK_INFO_START,
  STATIC_BLOCK_INFO_SUCCESS,
  STATIC_BLOCK_INFO_ERROR
} from '../../constants';

const query = gql`
  query {
    getStaticInfo {
          title
          content
          name
          image
          isEnable
    }
  }
`;

export function getStaticBlockInfo() {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: STATIC_BLOCK_INFO_START,
    });

    try {
      let settingsData = {};
      const { data } = await client.query({
        query,
        fetchPolicy: 'network-only'
      });
      if (data && data.getStaticInfo) {
        data.getStaticInfo.map((item, key) => {
          if (item.name == 'header') {
            settingsData['headerTitle'] = item.title;
            settingsData['headerContent'] = item.content;
            settingsData['isEnable'] = item.isEnable;
          } else if (item.name == 'block1') {
            settingsData['blockTitle1'] = item.title;
            settingsData['blockContent1'] = item.content;
            settingsData['blockImage1'] = item.image;
          } else {
            settingsData['blockTitle2'] = item.title;
            settingsData['blockContent2'] = item.content;
            settingsData['blockImage2'] = item.image;
          }
        });

        // Successully logged out
        dispatch({
          type: STATIC_BLOCK_INFO_SUCCESS,
          // data: settingsData,
          payload: {
            data: settingsData
          }
        });

      } else {
        dispatch({
          type: STATIC_BLOCK_INFO_ERROR,
        });
      }
    } catch (error) {
      dispatch({
        type: STATIC_BLOCK_INFO_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}
