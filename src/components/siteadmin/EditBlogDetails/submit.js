// Fetch Request
import fetch from '../../../core/fetch';

// Toaster
import { toastr } from 'react-redux-toastr';
import history from '../../../core/history';
async function submit(values, dispatch) {
  if (values.content == null || values.content == '<p><br></p>' || values.content == '<p> </p>') {
    toastr.error("Error Occured", "Please Add  Content");
  }
  else {

    const mutation = `
  mutation updateBlogDetails(
    $id: Int,
    $metaTitle: String,
    $metaDescription: String,
    $pageUrl: String,
    $pageTitle: String,
    $content: String,
    $footerCategory: String,
  ) {
    updateBlogDetails(
      id: $id,
      metaTitle: $metaTitle,
      metaDescription: $metaDescription,
      pageUrl: $pageUrl,
      pageTitle: $pageTitle,
      content: $content,
      footerCategory: $footerCategory
    ) {
        status
    }
  }
  `;

    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: mutation,
        variables: values
      }),
      credentials: 'include',
    });

    const { data } = await resp.json();


    if (data.updateBlogDetails.status === "success") {
      toastr.success("Update Blog", "Changes are updated!");
      history.push('/siteadmin/content-management');
    }
    else if (data.updateBlogDetails.status === 'URL exist') {
      toastr.error("Added Blog Failed", "The page URL already exist!");
    }
    else {
      toastr.error("Update Blog", "Updating location failed");
    }
  }

}

export default submit;
