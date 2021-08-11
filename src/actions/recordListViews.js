import { gql } from 'react-apollo';

import {
  RECORD_LIST_VIEWS_START,
  RECORD_LIST_VIEWS_SUCCESS,
  RECORD_LIST_VIEWS_ERROR,
} from '../constants';

const query = gql`
    query ($listId:Int!) {
        GetListViews (listId:$listId) {
            count
        }
    }
`;

export function doRecordListViews(listId) {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: RECORD_LIST_VIEWS_START });

    const mutation = gql`
            mutation UpdateListViews($listId: Int!){
                UpdateListViews(listId: $listId) {
                    status
                }
            }
        `;

    try {
      const { data } = await client.mutate({
        mutation,
        variables: {
          listId,
        },

      });

      if (data.UpdateListViews.status === 'success') {
        dispatch({ type: RECORD_LIST_VIEWS_SUCCESS });
      } else {
        dispatch({
          type: RECORD_LIST_VIEWS_ERROR,
          payload: {
            status: data.UpdateListViews.status,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: RECORD_LIST_VIEWS_ERROR,
        payload: {
          error,
        },
      });
    }
  };
}
