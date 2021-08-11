import { gql } from 'react-apollo';
import fetch from '../../core/fetch';

import {
    UPDATE_IMAGE_BANNER_START,
    UPDATE_IMAGE_BANNER_SUCCESS,
    UPDATE_IMAGE_BANNER_ERROR,
    IMAGE_BANNER_UPLOAD_LOADER_START,
    UPLOAD_IMAGE_BANNER_START,
    UPLOAD_IMAGE_BANNER_SUCCESS,
    UPLOAD_IMAGE_BANNER_ERROR
} from '../../constants';

// Toaster
import { toastr } from 'react-redux-toastr';

// To Refresh the verification status
const query = gql`
    {
        getImageBanner {
            id
            title
            description
            buttonLabel
            image
        }
    }
`;

export function startBannerUploaderLoader() {
    return (dispatch, getState, { client }) => {
        dispatch({
            type: IMAGE_BANNER_UPLOAD_LOADER_START,
            payload: {
                bannerUploaderLoading: true
            }
        });
    };
}

export function doUpdateImageBanner(values) {

    return async (dispatch, getState, { client }) => {

        dispatch({ type: UPDATE_IMAGE_BANNER_START });

        let mutation = gql`
            mutation updateImageBanner(
                $title: String!,
                $description: String!,
                $buttonLabel: String!){
                updateImageBanner(
                    title: $title,
                    description: $description,
                    buttonLabel: $buttonLabel
                ) {
                    status
                }
            }
        `;

        try {

            const { data } = await client.mutate({
                mutation,
                variables: values,
                refetchQueries: [{ query }]
            });

            if (data.updateImageBanner.status === "success") {
                toastr.success("Update Banner Settings", "Changes are updated successfully!");
                dispatch({ type: UPDATE_IMAGE_BANNER_SUCCESS });
            } else {
                dispatch({
                    type: UPDATE_IMAGE_BANNER_ERROR,
                    payload: {
                        status: data.updateImageBanner.status
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: UPDATE_IMAGE_BANNER_ERROR,
                payload: {
                    error
                }
            });
        }
    };
}


export function doUploadImageBanner(image, oldImage) {

    return async (dispatch, getState, { client }) => {

        dispatch({ type: UPLOAD_IMAGE_BANNER_START });

        let mutation = gql`
            mutation uploadImageBanner($image: String!){
                uploadImageBanner(image: $image) {
                    status
                }
            }
        `;

        try {

            const { data } = await client.mutate({
                mutation,
                variables: {
                    image
                },
                refetchQueries: [{ query }]
            });

            if (data.uploadImageBanner.status === "success") {
                dispatch({
                    type: UPLOAD_IMAGE_BANNER_SUCCESS,
                    payload: {
                        bannerUploaderLoading: false
                    }
                });
                if (oldImage != null) {
                    await doRemoveImageBanner(oldImage);
                }
            } else {
                dispatch({
                    type: UPLOAD_IMAGE_BANNER_ERROR,
                    payload: {
                        status: data.uploadImageBanner.status,
                        bannerUploaderLoading: false
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: UPLOAD_IMAGE_BANNER_ERROR,
                payload: {
                    error,
                    bannerUploaderLoading: false
                }
            });
        }
    };
}


async function doRemoveImageBanner(fileName) {
    try {
        const resp = await fetch('/deleteBanner', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fileName }),
            credentials: 'include'
        });
        const { status } = await resp.json();
        if (status) {
            return true;
        }
    } catch (error) {
        console.log('error', error);
    }

}
