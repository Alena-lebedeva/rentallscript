import { gql } from 'react-apollo';

import {
    ADMIN_UPDATE_STATIC_START,
    ADMIN_UPDATE_STATIC_SUCCESS,
    ADMIN_UPDATE_STATIC_ERROR
} from '../../constants';

// Redirection
import history from '../../core/history';

// Toaster
import { toastr } from 'react-redux-toastr';


const mutation = gql`
mutation updateStaticPage(
  $id: Int,
  $content: String,
  $metaTitle: String,
  $metaDescription: String,
) {
  updateStaticPage(
    id: $id,
    content: $content,
    metaTitle: $metaTitle,
    metaDescription: $metaDescription,
  ) {
      status
  }
}
`;

const query = gql`query getEditStaticPage ($id: Int!) {
  getEditStaticPage (id: $id) {
      id
      pageName
      content
      metaTitle
      metaDescription
      createdAt
  }
}`;

export function updateStaticPageAction(values) {

    return async (dispatch, getState, { client }) => {
        try {
            dispatch({ type: ADMIN_UPDATE_STATIC_START });
            const { data } = await client.mutate({
                mutation,
                variables: {
                    content: values.content,
                    metaTitle: values.metaTitle,
                    metaDescription: values.metaDescription,
                    id: values.id
                },
                refetchQueries: [{ query, variables: { id: values.id } }]
            });


            if (data.updateStaticPage.status === "success") {
                toastr.success("Success!", "Changes are updated!");
                history.push('/siteadmin/staticpage/management');
                dispatch({ type: ADMIN_UPDATE_STATIC_SUCCESS });
            }
            else {
                toastr.error("Error", "Updating failed");
                dispatch({ type: ADMIN_UPDATE_STATIC_ERROR });
            }

        } catch (error) {
            toastr.error("Failed!", "Failed to change  status");
            dispatch({ type: ADMIN_UPDATE_STATIC_ERROR });
            return false;
        }
        return true;
    };
}