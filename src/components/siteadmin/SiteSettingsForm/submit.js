// Fetch Request
import fetch from '../../../core/fetch';

// Toaster
import { toastr } from 'react-redux-toastr';
import { setSiteSettings } from '../../../actions/siteSettings';

async function submit(values, dispatch) {
  
  values.appAvailableStatus= Number(values.appAvailableStatus);
  
  const query = `
  query (
    $siteName: String,
    $siteTitle: String,
    $metaDescription: String,
    $metaKeyword: String,
    $logo: String,
    $facebookLink: String,
    $twitterLink: String,
    $instagramLink: String
    $logoHeight: Int,
    $logoWidth: Int,
    $homePageType: Int,
    $videoLink: String,
    $phoneNumberStatus: Int,
    $homeLogo: String,
    $emailLogo: String,
    $homeLogoHeight: Int,
    $homeLogoWidth: Int,
    $appAvailableStatus: Boolean,
    $playStoreUrl: String,
    $appStoreUrl: String,
    $email: String,
    $phoneNumber: String,
    $address: String
  ) {
    updateSiteSettings (
      siteName: $siteName,
      siteTitle: $siteTitle,
      metaDescription: $metaDescription,
      metaKeyword: $metaKeyword,
      logo: $logo,
      facebookLink: $facebookLink,
      twitterLink: $twitterLink,
      instagramLink: $instagramLink,
      logoHeight: $logoHeight,
      logoWidth: $logoWidth,
      homePageType: $homePageType,
      videoLink: $videoLink,
      phoneNumberStatus: $phoneNumberStatus,
      homeLogo: $homeLogo,
      emailLogo: $emailLogo,
      homeLogoHeight: $homeLogoHeight,
      homeLogoWidth: $homeLogoWidth,
      appAvailableStatus: $appAvailableStatus,
      playStoreUrl: $playStoreUrl,
      appStoreUrl: $appStoreUrl,
      email: $email,
      phoneNumber: $phoneNumber,
      address: $address
    ) {
        status
    }
  }
  `;

  let logoHeight = values.logoHeight != '' ? values.logoHeight : 0;
  let logoWidth = values.logoWidth != '' ? values.logoWidth : 0;
  let homeLogoHeight = values.homeLogoHeight != '' ? values.homeLogoHeight : 0;
  let homeLogoWidth = values.homeLogoWidth != '' ? values.homeLogoWidth : 0;
  let variables = Object.assign({}, values, { logoHeight, logoWidth, homeLogoHeight, homeLogoWidth });

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data.updateSiteSettings.status === "success") {
    toastr.success("Update Settings", "Changes are updated!");
    dispatch(setSiteSettings());
  } else {
    toastr.error("Update Settings", "Updating Site Settings failed");
  }

}

export default submit;
