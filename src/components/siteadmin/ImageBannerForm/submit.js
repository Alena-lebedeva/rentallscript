import {doUpdateImageBanner} from '../../../actions/siteadmin/manageImageBanner';

async function submit(values, dispatch) {
  await dispatch(doUpdateImageBanner(values));
}

export default submit;
