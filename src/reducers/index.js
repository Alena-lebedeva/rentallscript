import { combineReducers } from 'redux';

// Internal Reducers
import user from './user';
import runtime from './runtime';
import intl from './intl';
import content from './content';
import account from './account';
import siteSettings from './siteSettings';
import location from './listYourSpace';
import modalStatus from './modalReducer';
import listingFields from './listingFields';
import viewListing from './viewListing';
import currency from './currency';
import search from './search';
import toggle from './toggle';
import personalized from './personalized';
import mobileSearch from './mobileSearch';
import book from './book';
import reservation from './reservation';
import loader from './loader';
import calendar from './calendar';
import sticky from './stickyReducers';
import onChangeListing from './onChangeListing';
import payout from './payout';

// Site Admin
import userManagement from './siteadmin/users';
import listSettings from './siteadmin/listSettings';
import adminModalStatus from './siteadmin/adminModalReducer';
import adminListSettingsData from './siteadmin/adminListSettingsData';
import popularLocation from './siteadmin/popularLocation';
import payoutChangeListing from './payoutChangeListing';
import homeBannerImages from './siteadmin/homeBannerImages';
import adminPrevileges from './siteadmin/adminUserReducer';
import image from './siteadmin/image'

// External Reducers
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { loadingBarReducer } from 'react-redux-loading-bar';

export default function createRootReducer({ apolloClient }) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    //loadingBar: loadingBarReducer,
    user,
    runtime,
    intl,
    siteSettings,
    form: formReducer,
    content,
    account,
    userManagement,
    toastr: toastrReducer,
    location,
    modalStatus,
    listSettings,
    adminModalStatus,
    listingFields,
    adminListSettingsData,
    viewListing,
    currency,
    search,
    toggle,
    personalized,
    mobileSearch,
    book,
    reservation,
    loader,
    calendar,
    sticky,
    onChangeListing,
    payoutChangeListing,
    popularLocation,
    homeBannerImages,
    adminPrevileges,
    payout,
    image
  });
}


