import userLogoutType from '../types/userLogoutType';

const userLogout = {
  type: userLogoutType,
  async resolve({ request, response }) {

    try {
      response.clearCookie('id_token');
      return {
        status: "success"
      }
    } catch (error) {
      return {
        status: "failed"
      }
    }
  },
};

export default userLogout;
