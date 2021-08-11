import { createAdminRole } from '../../../actions/siteadmin/AdminRoles/manageAdminRoles';

async function submit(values, dispatch) {
  
  dispatch(createAdminRole(
    values.id,
    values.name,
    values.description,
    values.privileges
  ));
}

export default submit;
