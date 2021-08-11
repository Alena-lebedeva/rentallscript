import { gql } from 'react-apollo';
import fetch from '../../core/fetch';

import {
    UPLOAD_HOME_BANNER_START,
    UPLOAD_HOME_BANNER_SUCCESS,
    UPLOAD_HOME_BANNER_ERROR,
    IMAGE_BANNER_UPLOAD_LOADER_START,
    IMAGE_BANNER_UPLOAD_LOADER_END
} from '../../constants';
import { getHomeBannerImages } from '../getHomeBannerImages';
// Toaster
import { toastr } from 'react-redux-toastr';

// To Refresh the verification status
const query = gql`
    {
        getHomeBanner {
            id
            name
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

export function endBannerUploaderLoader() {
    return (dispatch, getState, { client }) => {
        dispatch({
            type: IMAGE_BANNER_UPLOAD_LOADER_END,
            payload: {
                bannerUploaderLoading: false
            }
        });
    };
}

export function doUploadHomeBanner(name, oldImage) {

    return async (dispatch, getState, { client }) => {

        dispatch({ type: UPLOAD_HOME_BANNER_START });

        let mutation = gql`
            mutation addHomeBanner($name: String!){
                addHomeBanner(name: $name) {
                    status
                }
            }
        `;

        try {

            const { data } = await client.mutate({
                mutation,
                variables: {
                    name
                },
                refetchQueries: [{ query }]
            });
            if (data.addHomeBanner.status === "success") {
                toastr.success("Upload Home Banner", "Image Upload successfully!");
                await dispatch(getHomeBannerImages())
                dispatch({
                    type: UPLOAD_HOME_BANNER_SUCCESS,
                    payload: {
                        bannerUploaderLoading: false
                    }
                });
            } else {
                dispatch({
                    type: UPLOAD_HOME_BANNER_ERROR,
                    payload: {
                        status: data.addHomeBanner.status,
                        bannerUploaderLoading: false
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: UPLOAD_HOME_BANNER_ERROR,
                payload: {
                    error,
                    bannerUploaderLoading: false
                }
            });
        }
    };
}


export async function doRemoveHomeBanner(fileName) {
    try {
        const resp = await fetch('/deleteHomeBanner', {
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
