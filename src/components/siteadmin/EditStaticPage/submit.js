// Action
import { updateStaticPageAction } from '../../../actions/siteadmin/updateStaticPage';

// Toaster
import { toastr } from 'react-redux-toastr';
async function submit(values, dispatch) {
  if (values.content == null || values.content == '<p><br></p>' || values.content == '<p> </p>') {
    toastr.error("Error", "Please Add  Content");
  } else if (values.metaTitle == null || values.metaTitle && values.metaTitle.trim() == '') {
    toastr.error("Error", "Please Add  Meta Title");
  } else if (values.metaDescription == null || values.metaDescription && values.metaDescription.trim() == '') {
    toastr.error("Error", "Please Add  Meta Description");
  } else {
    await dispatch(updateStaticPageAction(values));
  }

}

export default submit;
