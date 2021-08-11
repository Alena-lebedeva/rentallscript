import { createAdminUser } from '../../../actions/siteadmin/AdminUser/manageAdminUser';

async function submit(values, dispatch) {
 

  dispatch(createAdminUser(
    values.id,
    values.email,
    values.password,
    values.roleId
  ));
}

export default submit;
