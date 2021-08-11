import { gql } from 'react-apollo';
import fetch from '../../core/fetch';
import { setSiteSettings } from '../siteSettings';
import { change } from 'redux-form';

import {
  LOGO_UPLOAD_LOADER_START,
  LOGO_UPLOAD_START,
  LOGO_UPLOAD_SUCCESS,
  LOGO_UPLOAD_ERROR,
  REMOVE_LOGO_START,
  REMOVE_LOGO_SUCCESS,
  REMOVE_LOGO_ERROR,
  HOME_LOGO_UPLOAD_LOADER_START,
  HOME_LOGO_UPLOAD_START,
  HOME_LOGO_UPLOAD_SUCCESS,
  HOME_LOGO_UPLOAD_ERROR,
  REMOVE_HOME_LOGO_START,
  REMOVE_HOME_LOGO_SUCCESS,
  REMOVE_HOME_LOGO_ERROR,
  EMAIL_LOGO_UPLOAD_LOADER_START,
  EMAIL_LOGO_UPLOAD_START,
  EMAIL_LOGO_UPLOAD_SUCCESS,
  EMAIL_LOGO_UPLOAD_ERROR,
  REMOVE_EMAIL_LOGO_START,
  REMOVE_EMAIL_LOGO_SUCCESS,
  REMOVE_EMAIL_LOGO_ERROR
} from '../../constants';

const query = gql`
  query getLogo{
    getLogo {
      id
      title
      name
      value
      type
    }
  }
`;

const HomeQuery = gql`
  query getHomeLogo{
    getHomeLogo {
      id
      title
      name
      value
      type
    }
  }
`;

const emailLogoQuery = gql`
  query getEmailLogo{
    getEmailLogo {
      id
      title
      name
      value
      type
    }
  }
`;

export function startLogoUploaderLoader() {
  return (dispatch, getState, { client }) => {
    dispatch({
      type: LOGO_UPLOAD_LOADER_START,
      payload: {
        logoUploaderLoading: true
      }
    });
  };
}

export function doUploadLogo(fileName, filePath, oldPicture) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: LOGO_UPLOAD_START });

    try {


      let mutation = gql`
          mutation uploadLogo($fileName: String, $filePath: String) {
            uploadLogo (fileName:$fileName, filePath: $filePath) {
              status
            }
          }
        `;

      // Send Request to create a record for logo
      const { data } = await client.mutate({
        mutation,
        variables: { fileName, filePath },
        refetchQueries: [{ query }]
      });

      if (data) {
        dispatch({
          type: LOGO_UPLOAD_SUCCESS,
          payload: {
            logoUploaderLoading: false
          }
        });
        dispatch(setSiteSettings());
        if (oldPicture != null) {
          await removeLogoFile(oldPicture);
        }

      }
    } catch (error) {
      dispatch({
        type: LOGO_UPLOAD_ERROR,
        payload: {
          error,
          logoUploaderLoading: false
        }
      });

      return false;
    }

    return true;
  };

}


export function doRemoveLogo(fileName) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: REMOVE_LOGO_START });
    dispatch(startLogoUploaderLoader());
    dispatch(change('SiteSettingsForm', 'Logo', null));

    try {

      let mutation = gql`
        mutation removeLogo{
          removeLogo{
            status
          }
        }
      `;

      // Send Request to create a record for logo
      const { data } = await client.mutate({
        mutation,
        refetchQueries: [{ query }]
      });

      if (data) {
        dispatch({
          type: REMOVE_LOGO_SUCCESS,
          payload: {
            logoUploaderLoading: false
          }
        });
        dispatch(setSiteSettings());
        await removeLogoFile(fileName);
      }

    } catch (error) {
      dispatch({
        type: REMOVE_LOGO_ERROR,
        payload: {
          error,
          logoUploaderLoading: false
        }
      });

      return false;
    }

    return true;
  };

}

async function removeLogoFile(fileName) {
  try {
    const resp = await fetch('/removeLogoFile', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName
      }),
      credentials: 'include',
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

async function removeEmailLogoFile(fileName) {
  try {
    const resp = await fetch('/removeEmailLogo', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName
      }),
      credentials: 'include',
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

export function startHomeLogoUploaderLoader() {
  return (dispatch, getState, { client }) => {
    dispatch({
      type: HOME_LOGO_UPLOAD_LOADER_START,
      payload: {
        homeLogoUploaderLoading: true
      }
    });
  };
}

export function doUploadHomeLogo(fileName, filePath, oldPicture) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: HOME_LOGO_UPLOAD_START });

    try {

      let mutation = gql`
          mutation uploadHomeLogo($fileName: String, $filePath: String) {
            uploadHomeLogo (fileName:$fileName, filePath: $filePath) {
              status
            }
          }
        `;

      // Send Request to create a record for logo
      const { data } = await client.mutate({
        mutation,
        variables: { fileName, filePath },
        refetchQueries: [{ query: HomeQuery }]
      });

      if (data) {
        dispatch({
          type: HOME_LOGO_UPLOAD_SUCCESS,
          payload: {
            homeLogoUploaderLoading: false
          }
        });
        dispatch(setSiteSettings());
        if (oldPicture != null) {
          await removeLogoFile(oldPicture);
        }

      }
    } catch (error) {
      dispatch({
        type: HOME_LOGO_UPLOAD_ERROR,
        payload: {
          error,
          homeLogoUploaderLoading: false
        }
      });

      return false;
    }

    return true;
  };

}

export function doRemoveHomeLogo(fileName) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: REMOVE_HOME_LOGO_START });
    dispatch(startHomeLogoUploaderLoader());
    dispatch(change('SiteSettingsForm', 'homeLogo', null));

    try {

      let mutation = gql`
        mutation removeHomeLogo{
          removeHomeLogo{
            status
          }
        }
      `;

      // Send Request to create a record for logo
      const { data } = await client.mutate({
        mutation,
        refetchQueries: [{ query: HomeQuery }]
      });

      if (data) {
        dispatch({
          type: REMOVE_HOME_LOGO_SUCCESS,
          payload: {
            homeLogoUploaderLoading: false
          }
        });
        dispatch(setSiteSettings());
        await removeLogoFile(fileName);
      }

    } catch (error) {
      dispatch({
        type: REMOVE_HOME_LOGO_ERROR,
        payload: {
          error,
          homeLogoUploaderLoading: false
        }
      });

      return false;
    }

    return true;
  };

}

export function startEmailLogoUploaderLoader() {
  return (dispatch, getState, { client }) => {
    dispatch({
      type: EMAIL_LOGO_UPLOAD_LOADER_START,
      payload: {
        emailLogoUploaderLoading: true
      }
    });
  };
}

export function doUploadEmailLogo(fileName, filePath, oldPicture) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: EMAIL_LOGO_UPLOAD_START });

    try {

      let mutation = gql`
          mutation uploadEmailLogo($fileName: String, $filePath: String) {
            uploadEmailLogo (fileName:$fileName, filePath: $filePath) {
              status
            }
          }
        `;

      // Send Request to create a record for logo
      const { data } = await client.mutate({
        mutation,
        variables: { fileName, filePath },
        refetchQueries: [{ query: emailLogoQuery }]
      });

      if (data) {
        dispatch({
          type: EMAIL_LOGO_UPLOAD_SUCCESS,
          payload: {
            emailLogoUploaderLoading: false
          }
        });
        dispatch(setSiteSettings());
        if (oldPicture != null) {
          await removeLogoFile(oldPicture);
        }

      }
    } catch (error) {
      dispatch({
        type: EMAIL_LOGO_UPLOAD_ERROR,
        payload: {
          error,
          emailLogoUploaderLoading: false
        }
      });

      return false;
    }

    return true;
  };

}

export function doRemoveEmailLogo(fileName) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: REMOVE_EMAIL_LOGO_START });
    dispatch(startEmailLogoUploaderLoader());
    dispatch(change('SiteSettingsForm', 'emailLogo', null));

    try {

      let mutation = gql`
        mutation removeEmailLogo{
          removeEmailLogo{
            status
          }
        }
      `;

      // Send Request to create a record for logo
      const { data } = await client.mutate({
        mutation,
        refetchQueries: [{ query: emailLogoQuery }]
      });

      if (data) {
        dispatch({
          type: REMOVE_EMAIL_LOGO_SUCCESS,
          payload: {
            emailLogoUploaderLoading: false
          }
        });
        await dispatch(setSiteSettings());
        await removeEmailLogoFile(fileName);
      }

    } catch (error) {
      dispatch({
        type: REMOVE_EMAIL_LOGO_ERROR,
        payload: {
          error,
          emailLogoUploaderLoading: false
        }
      });

      return false;
    }

    return true;
  };

}