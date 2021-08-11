import { gql } from 'react-apollo';

import {
    ADMIN_DELETE_BlOGDETAILS_START,
    ADMIN_DELETE_BlOGDETAILS_SUCCESS,
    ADMIN_DELETE_BlOGDETAILS_ERROR
} from '../../constants';

// Redirection
import history from '../../core/history';

// Toaster
import { toastr } from 'react-redux-toastr';

const query = gql`
    query getBlogDetails {
    getBlogDetails{
        id
        metaTitle
        metaDescription
        pageUrl
        pageTitle
        content
        footerCategory
        isEnable
        createdAt
    }
    }
`;

export function deleteBlogDetails(id) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: ADMIN_DELETE_BlOGDETAILS_START,
            data: id
        });
        try {

                let mutation = gql`
                mutation deleteBlogDetails ($id: Int!) {
                    deleteBlogDetails (id: $id) {
                        status
                    }
                    }
                `;

                const { data } = await client.mutate({
                    mutation,
                    variables: { id },
                    refetchQueries: [{ query }]
                });


                if (data.deleteBlogDetails.status == "200") {
                    dispatch({
                        type: ADMIN_DELETE_BlOGDETAILS_SUCCESS,
                    });
                    toastr.success("Delete Blog Details", "Deleted successfully!");
                    history.push('/siteadmin/content-management');
                } else {
                    toastr.error("Delete Blog Details", "Deletion failed!");
                }

        } catch (error) {
            dispatch({
                type: ADMIN_DELETE_BlOGDETAILS_ERROR,
                payload: {
                    error
                }
            });

        }

    };
}

export function updateBlogStatus(id, isEnable) {

    return async (dispatch, getState, { client }) => {


        try {
            let mutation = gql`
                  mutation updateBlogStatus ($id: Int, $isEnable: Boolean){
                    updateBlogStatus(id: $id, isEnable: $isEnable){
                          status
                      }
                  }
              `;

            const { data } = await client.mutate({
                mutation,
                variables: { id, isEnable },
                refetchQueries: [{ query }]
            });


            if (data.updateBlogStatus.status === "success") {
                toastr.success("Success!", "Status has changed");
            }

        } catch (error) {
            toastr.error("Failed!", "Failed to change  status");
            return false;
        }
        return true;
    };
}