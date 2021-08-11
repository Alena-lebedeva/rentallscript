import { gql } from 'react-apollo';
import fetch from '../core/fetch';

import {
    PROFILE_PICTURE_LOADER_START,
    UPLOAD_PROFILE_PICTURE_START,
    UPLOAD_PROFILE_PICTURE_SUCCESS,
    UPLOAD_PROFILE_PICTURE_ERROR,
    REMOVE_PROFILE_PICTURE_START,
    REMOVE_PROFILE_PICTURE_SUCCESS,
    REMOVE_PROFILE_PICTURE_ERROR
} from '../constants';

import { loadAccount } from './account';

// To Refresh the verification status
const query = gql`
    query {
        userAccount {
            picture
        }
    }
`;

export function startProfilePhotoLoader() {
    return (dispatch, getState, { client }) => {
        dispatch({
            type: PROFILE_PICTURE_LOADER_START,
            payload: {
                profilePhotoLoading: true
            }
        });
    };
}

export function stopProfilePhotoLoader() {
    return (dispatch, getState, { client }) => {
        dispatch({
            type: REMOVE_PROFILE_PICTURE_SUCCESS,
            payload: {
                profilePhotoLoading: false
            }
        });
    };
}

export function doUploadProfilePicture(picture, oldPicture) {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: UPLOAD_PROFILE_PICTURE_START
        });

        let mutation = gql`
            mutation UploadProfilePicture($picture: String!){
                UploadProfilePicture(picture: $picture) {
                    status
                }
            }
        `;

        try {

            if (oldPicture != null) {
                await removeProfilePhoto(oldPicture);
            }

            const { data } = await client.mutate({
                mutation,
                variables: {
                    picture
                },
                refetchQueries: [{ query }]
            });

            if (data.UploadProfilePicture.status === "success") {
                dispatch({
                    type: UPLOAD_PROFILE_PICTURE_SUCCESS,
                    payload: {
                        profilePhotoLoading: false
                    }
                });
                dispatch(loadAccount());
            } else {
                dispatch({
                    type: UPLOAD_PROFILE_PICTURE_ERROR,
                    payload: {
                        status,
                        profilePhotoLoading: false
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: UPLOAD_PROFILE_PICTURE_ERROR,
                payload: {
                    error,
                    profilePhotoLoading: false
                }
            });
        }
    };
}


export function doRemoveProfilePicture(fileName) {

    return async (dispatch, getState, { client }) => {

        dispatch({ type: REMOVE_PROFILE_PICTURE_START });
        dispatch(startProfilePhotoLoader());

        try {

            let mutation = gql`
                mutation RemoveProfilePicture{
                    RemoveProfilePicture {
                        status
                    }
                }
            `;
            const { data } = await client.mutate({
                mutation,
                refetchQueries: [{ query }]
            });

            if (data.RemoveProfilePicture.status === "success") {
                dispatch({
                    type: REMOVE_PROFILE_PICTURE_SUCCESS,
                    payload: {
                        profilePhotoLoading: false
                    }
                });
                dispatch(loadAccount());
                await removeProfilePhoto(fileName);
            } else {
                dispatch({
                    type: REMOVE_PROFILE_PICTURE_ERROR,
                    payload: {
                        status: data.RemoveProfilePicture.status,
                        profilePhotoLoading: false
                    }
                });
            }

        } catch (error) {
            dispatch({
                type: REMOVE_PROFILE_PICTURE_ERROR,
                payload: {
                    error,
                    profilePhotoLoading: false
                }
            });
        }
    };
}


async function removeProfilePhoto(fileName) {
    try {
        const resp = await fetch('/deleteProfilePicture', {
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
            console.log('status from remove logo file', status);
        }

    } catch (error) {
        console.log('error from remove file', error);

        return false;
    }

    return true;
}
