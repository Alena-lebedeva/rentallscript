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
  mutation addBlogDetails(
    $metaTitle: String,
    $metaDescription: String,
    $pageUrl: String,
    $pageTitle: String,
    $content: String,
    $footerCategory: String,
  ) {
    addBlogDetails(
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

    if (data.addBlogDetails.status === "success") {
      toastr.success("Added Blog", "Successfully Added!");
      history.push('/siteadmin/content-management');
    }
    else if (data.addBlogDetails.status === 'URL exist') {
      toastr.error("Added Blog Failed", "The page URL already exist!");
    }
    else {
      toastr.error("Added Blog", "Failed to create");
    }
  }

}

export default submit;
