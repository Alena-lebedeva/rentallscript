import { gql } from 'react-apollo';

import {
    ADMIN_DELETE_POPULARLOCATION_START,
    ADMIN_DELETE_POPULARLOCATION_SUCCESS,
    ADMIN_DELETE_POPULARLOCATION_ERROR
} from '../../constants';

// Redirection
import history from '../../core/history';

// Toaster
import { toastr } from 'react-redux-toastr';

const query = gql`
    query getPopularLocation {
        getPopularLocation{
        id
        location
        locationAddress
        image
        isEnable
        createdAt
        updatedAt
        }
    }
`;

const mutation = gql`
  mutation deletePopularLocation ($id: Int!) {
    deletePopularLocation (id: $id) {
        status
      }
    }
  `;

export function deletePopularLocation(id) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: ADMIN_DELETE_POPULARLOCATION_START,
            data: id
        });
        try {
            const { data } = await client.mutate({
                mutation,
                variables: { id },
                refetchQueries: [{ query }]
            });


            if (data.deletePopularLocation.status == "200") {
                dispatch({
                    type: ADMIN_DELETE_POPULARLOCATION_SUCCESS,
                });
                toastr.success("Delete Popular Locations", "Deleted successfully!");
                history.push('/siteadmin/popularlocation');
            } else {
                toastr.error("Delete Popular Locations", "Deletion failed!");
            }

        } catch (error) {
            dispatch({
                type: ADMIN_DELETE_POPULARLOCATION_ERROR,
                payload: {
                    error
                }
            });

        }

    };
}

export function updateLocationStatus(id, isEnable) {

    return async (dispatch, getState, { client }) => {

        try {
            let mutation = gql`
                  mutation updatePopularLocationStatus ($id: Int, $isEnable: String){
                    updatePopularLocationStatus(id: $id, isEnable: $isEnable){
                          status
                      }
                  }
              `;

            const { data } = await client.mutate({
                mutation,
                variables: { id, isEnable },
                refetchQueries: [{ query }]
            });

            if (data.updatePopularLocationStatus.status === "success") {
                toastr.success("Success!", "Location status has changed");
            }

        } catch (error) {
            toastr.error("Failed!", "Failed to change Location status");
            return false;
        }
        return true;
    };
}