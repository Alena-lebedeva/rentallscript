import { gql } from 'react-apollo';

import {
  ADMIN_DELETE_USER_START,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_ERROR
} from '../../constants';

// Redirection
import history from '../../core/history';

// Toaster
import { toastr } from 'react-redux-toastr';

const query = gql`
query userManagement($currentPage: Int){
  userManagement(currentPage: $currentPage) {
    count
    usersData{
      id,
        email,
        profile
        {
        profileId,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        phoneNumber,
        preferredLanguage,
        preferredCurrency,
        location,
        info,
        createdAt
        },
        userBanStatus,
    }
   }
}
`;

const mutation = gql`
  mutation deleteUser ($userId:String!) {
      deleteUser (userId:$userId) {
        status
      }
    }
  `;

export function deleteUser(userId, profileId) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: ADMIN_DELETE_USER_START,
      data: userId
    });

    try {

      const { data } = await client.mutate({
        mutation,
        variables: { userId },
        refetchQueries: [{ query, variables: { currentPage: 1 } }]
      });

      if (data.deleteUser.status == "success") {
        dispatch({
          type: ADMIN_DELETE_USER_SUCCESS,
        });
        toastr.success("Delete User", "User deleted successfully!");
        history.push('/siteadmin/users');
      } else {
        toastr.error("Delete User", "User deletion failed!");
      }

    } catch (error) {
      dispatch({
        type: ADMIN_DELETE_USER_ERROR,
        payload: {
          error
        }
      });

    }

  };
}
