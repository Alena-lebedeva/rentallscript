import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import me from './queries/me';
import news from './queries/news';
import intl from './queries/intl';
import userLogin from './queries/userLogin';
import userLogout from './queries/userLogout';
import userRegister from './queries/userRegister';
import userAccount from './queries/userAccount';
import userEditProfile from './queries/userEditProfile';
import showUserProfile from './queries/showUserProfile';
import locationItem from './queries/locationItem';
import createListing from './queries/createListing';
import showListing from './queries/showListing';
import showListingSteps from './queries/showListingSteps';
import ManageListingSteps from './queries/ManageListingSteps';
import getListingSettings from './queries/getListingSettings';
import updateListing from './queries/updateListing';
import updateListingStep2 from './queries/updateListingStep2';
import updateListingStep3 from './queries/updateListingStep3';
import updateListingStep4 from './queries/updateListingStep4'
import DateAvailability from './queries/DateAvailability';
import getListingSpecSettings from './queries/getListingSpecSettings';
import GetAddressComponents from './queries/GetAddressComponents';
import getCountries from './queries/getCountries';
import getBanner from './queries/getBanner';
import getRecommend from './queries/getRecommend';
import ChangePassword from './queries/ChangePassword';
import getUserVerifiedInfo from './queries/getUserVerifiedInfo';
import updateUserVerifiedInfo from './queries/updateUserVerifiedInfo';
import UploadProfilePicture from './queries/UploadProfilePicture';
import RemoveProfilePicture from './queries/RemoveProfilePicture';
import getImageBanner from './queries/getImageBanner';
import GetListViews from './queries/GetListViews';
import GetMostViewedListing from './queries/GetMostViewedListing';
import EmailVerification from './queries/EmailVerification';
import ResendConfirmEmail from './queries/ResendConfirmEmail';
// import getStaticInfoBlock from './queries/getStaticInfoBlock';
import getHomeBanner from './queries/getHomeBanner';
// Forgot Password
import sendForgotPassword from './mutations/ForgotPassword/SendForgotPassword';
import forgotPasswordVerification from './queries/ForgotPassword/ForgotPasswordVerification';
import changeForgotPassword from './mutations/ForgotPassword/ChangeForgotPassword';

// Payout
import getPaymentMethods from './queries/Payout/getPaymentMethods';
import addPayout from './mutations/Payout/addPayout';
import removePayout from './mutations/Payout/removePayout';
import setDefaultPayout from './mutations/Payout/setDefaultPayout';
import getPayouts from './queries/Payout/getPayouts';

// Payment/Booking
import createReservation from './mutations/Payment/createReservation';

// Reservation
import getItinerary from './queries/Reservation/getItinerary';
import getListReservation from './queries/Reservation/getListReservation';
import getAllReservation from './queries/Reservation/getAllReservation';
import getAllReservationAdmin from './queries/Reservation/getAllReservationAdmin';
import checkReservation from './queries/Reservation/checkReservation';
import getPayoutStatus from './queries/Reservation/getPayoutStatus';
import updateReservation from './mutations/Reservation/updateReservation';
import getPaymentData from './queries/Reservation/getPaymentData';
import cancelReservationData from './queries/Reservation/cancelReservationData';
import cancelReservation from './mutations/Reservation/cancelReservation';
import viewReservationAdmin from './queries/Reservation/viewReservationAdmin'

// Transaction History
import getTransactionHistory from './queries/TransactionHistory/getTransactionHistory';
import updatePayoutForReservation from './mutations/TransactionHistory/updatePayoutForReservation';

// Message System
import CreateThreadItems from './mutations/CreateThreadItems';
import GetAllThreads from './queries/GetAllThreads';
import getThread from './queries/getThread';
import sendMessage from './mutations/SendMessage';
import getUnreadThreads from './queries/getUnreadThreads';
import getUnreadCount from './queries/getUnreadCount';
import readMessage from './mutations/ReadMessage';
import getAllThreadItems from './queries/Messages/getAllThreadItems';

// Ban/ Unban user
import getUserBanStatus from './queries/getUserBanStatus';

// Remove Listing
import RemoveListing from './mutations/Listing/RemoveListing';

// Currency
import getCurrencies from './queries/getCurrencies';
import Currency from './queries/Currency';
import StoreCurrencyRates from './queries/StoreCurrencyRates';
import getBaseCurrency from './queries/getBaseCurrency';
import managePaymentCurrency from './mutations/Currency/managePaymentCurrency'

// Manage Listing
import ManageListings from './queries/ManageListings';
import managePublish from './mutations/Listing/ManagePublish';

import getListingCalendars from './queries/Listing/getListingCalendars';
import deleteCalendar from './mutations/Listing/DeleteImportCalendar';
import getBlockedDates from './queries/Listing/getBlockedDates';
import blockImportedDates from './mutations/Listing/BlockImportedDates';

// Search Listing
import SearchListing from './queries/SearchListing';

// List Photos
import CreateListPhotos from './mutations/CreateListing/CreateListPhotos';
import RemoveListPhotos from './mutations/CreateListing/RemoveListPhotos';
import ShowListPhotos from './queries/ShowListPhotos';

import UserListing from './queries/UserListing';
import getListMeta from './queries/Listing/getListMeta';

import getProfile from './queries/UserProfile';

import getSearchSettings from './queries/getSearchSettings';

import UpdateListViews from './queries/UpdateListViews';

// Payment Settings - For now, it's PayPal
import getPaymentInfo from './queries/getPaymentInfo';

// For Site Admin

// User Management
import deleteUser from './mutations/UserManagement/deleteUser';

// Listing Management
import addRecommend from './mutations/SiteAdmin/ListingManagement/addRecommend';
import removeRecommend from './mutations/SiteAdmin/ListingManagement/removeRecommend';
import adminRemoveListing from './mutations/SiteAdmin/ListingManagement/adminRemoveListing';

// Currency Management
import currencyManagement from './mutations/SiteAdmin/CurrencyManagement/currencyManagement';
import baseCurrency from './mutations/SiteAdmin/CurrencyManagement/baseCurrency';

// Logo
import uploadLogo from './mutations/SiteAdmin/Logo/uploadLogo';
import removeLogo from './mutations/SiteAdmin/Logo/removeLogo';
import getLogo from './queries/siteadmin/getLogo';

// Location
import uploadLocation from './mutations/SiteAdmin/PopularLocation/uploadLocation';
import removeLocation from './mutations/SiteAdmin/PopularLocation/removeLocation';

import adminUserLogin from './queries/siteadmin/adminUserLogin';
import changeAdminUser from './mutations/SiteAdmin/changeAdminUser';

import userManagement from './queries/siteadmin/userManagement';
import editUser from './queries/siteadmin/editUser';
import updateUser from './queries/siteadmin/updateUser';
import siteSettings from './queries/siteadmin/siteSettings';
import updateSiteSettings from './queries/siteadmin/updateSiteSettings';
import getAdminListingSettings from './queries/siteadmin/getAdminListingSettings';

import addListSettings from './queries/siteadmin/addListSettings';
import updateListSettings from './queries/siteadmin/updateListSettings';
import deleteListSettings from './queries/siteadmin/deleteListSettings';
import getListSettings from './queries/siteadmin/getListSettings'

import getAllListings from './queries/siteadmin/getAllListings';
import updatePaymentSettings from './queries/siteadmin/updatePaymentSettings';
import updateSearchSettings from './queries/siteadmin/updateSearchSettings';
import updateBannerSettings from './queries/siteadmin/updateBannerSettings';

import getUserDashboard from './queries/siteadmin/getUserDashboard';
import getListingDashboard from './queries/siteadmin/getListingDashboard';
import updateImageBanner from './queries/siteadmin/updateImageBanner';
import uploadImageBanner from './queries/siteadmin/uploadImageBanner';
// import uploadStaticInfoBlockImage from './queries/siteadmin/uploadStaticInfoBlockImage';
// import updateStaticInfoBlock from './queries/siteadmin/updateStaticInfoBlock';
import removeImageBanner from './queries/siteadmin/removeImageBanner';
import getReservationDashboard from './queries/siteadmin/getReservationDashboard';
import messageManagement from './queries/siteadmin/messageManagement';
import reviewsManagement from './queries/siteadmin/reviewsManagement';
import reportUserManagement from './queries/siteadmin/reportUserManagement';


import getPopularLocation from './queries/siteadmin/getPopularLocation';
import editPopularLocation from './queries/siteadmin/editPopularLocation';
import deletePopularLocation from './mutations/SiteAdmin/deletePopularLocation';
import updatePopularLocation from './mutations/SiteAdmin/updatePopularLocation';
import updatePopularLocationStatus from './mutations/SiteAdmin/updatePopularLocationStatus';
import addPopularLocation from './mutations/SiteAdmin/addPopularLocation';
import deleteHomeBanner from './mutations/SiteAdmin/deleteHomeBanner';


// Service Fees
import updateServiceFees from './mutations/ServiceFees/updateServiceFees';
import getServiceFees from './queries/ServiceFees/getServiceFees';

// Cancellation
import getAllCancellation from './queries/Cancellation/getAllCancellation';
import getSpecificCancellation from './queries/Cancellation/getSpecificCancellation';

// Reviews
import userReviews from './queries/Reviews/userReviews';
import pendingReviews from './queries/Reviews/pendingReviews';
import writeReview from './mutations/Reviews/writeReview';
import writeReviewData from './queries/Reviews/writeReviewData';
import moreListReviews from './queries/Reviews/moreListReviews';
import writeAdminReview from './mutations/SiteAdmin/AdminReview/writeAdminReview';
import getAdminReviews from './queries/siteadmin/getAdminReviews';
import deleteAdminReview from './mutations/SiteAdmin/AdminReview/deleteAdminReview';
import editAdminReview from './queries/siteadmin/editAdminReview';

//document 
import uploadDocument from './mutations/Document/uploadDocument';
import CreateDocumentList from './mutations/DocumentList/CreateDocumentList';
import RemoveDocumentList from './mutations/DocumentList/RemoveDocumentList';
import ShowDocumentList from './queries/DocumentList/ShowDocumentList';
import getAllDocument from './queries/siteadmin/Document/getAllDocument';
import showAllDocument from './queries/siteadmin/Document/showAllDocument';
import DocumentManagement from './mutations/SiteAdmin/DocumentVerification/DocumentManagement';


// Wish List
import getAllWishListGroup from './queries/WishList/getAllWishListGroup';
import CreateWishListGroup from './mutations/WishList/CreateWishListGroup';
import getWishListGroup from './queries/WishList/getWishListGroup';
import UpdateWishListGroup from './mutations/WishList/UpdateWishListGroup';
import DeleteWishListGroup from './mutations/WishList/DeleteWishListGroup';
import CreateWishLists from './mutations/WishList/CreateWishLists';
import CreateWishList from './mutations/WishList/CreateWishList';

import CreateFooterSetting from './mutations/SiteAdmin/FooterBlock/CreateFooterSetting';

import getFooterSetting from './queries/siteadmin/getFooterSetting';
import getAllMessageHistory from './queries/siteadmin/getAllMessageHistory';

import CreateReportUser from './mutations/ReportUser/CreateReportUser';

// Similar Listings
import getSimilarListing from './queries/SimilarListings/getSimilarListing';
import getAllReport from './queries/siteadmin/ReportUser/getAllReport';


// SMS Verification
import getPhoneData from './queries/SmsVerification/getPhoneData';
import AddPhoneNumber from './mutations/SmsVerification/AddPhoneNumber';
import VerifyPhoneNumber from './mutations/SmsVerification/VerifyPhoneNumber';
import RemovePhoneNumber from './mutations/SmsVerification/RemovePhoneNumber';
import updateListStatus from './mutations/WishList/updateListStatus';
import getUserStatus from './queries/getUserStatus';

// Update user ban

import updateBanServiceHistoryStatus from './mutations/SiteAdmin/updateBanServiceHistoryStatus';

//View profile
import ManageListingsProfile from './queries/ViewProfile/ManageListingsProfile';

// Transaction 
import ManageListingTransaction from './queries/ManageListing/ManageListingTransaction';

// Popular Location 
import getPopularLocationAdmin from './queries/siteadmin/getPopularLocationAdmin';

// Day Drag Calendar
import ListingDataUpdate from './mutations/Listing/ListingDataUpdate';
import UpdateBlockedDates from './mutations/Listing/UpdateBlockedDates';
import getListAvailableDates from './queries/Listing/getListAvailableDates';
import getSpecialPricing from './queries/Listing/getSpecialPricing';
import getUpcomingBookings from './queries/getUpcomingBookings'
import getCheckUserStatus from './queries/getCheckUserStatus';
import getStepTwo from './queries/Listing/getStepTwo';


//blog
import getBlogDetails from './queries/getBlogDetails';
import getBlogHome from './queries/siteadmin/getBlogHome';
import getEnabledBlog from './queries/siteadmin/getEnabledBlog';
import editBlogDetails from './queries/siteadmin/editBlogDetails';
import deleteBlogDetails from './mutations/SiteAdmin/deleteBlogDetails';
import addBlogDetails from './mutations/SiteAdmin/addBlogDetails';
import updateBlogDetails from './mutations/SiteAdmin/updateBlogDetails';
import updateBlogStatus from './mutations/SiteAdmin/updateBlogStatus';


import getEditStaticPage from './queries/siteadmin/getEditStaticPage';
import updateStaticPage from './mutations/SiteAdmin/updateStaticPage';

// SiteAdmin Reviews
import getReviewsDetails from './queries/siteadmin/Reviews/getReviewsDetails';
import editUserReviews from './queries/siteadmin/Reviews/editUserReviews';

import writeUserReview from './mutations/SiteAdmin/userReview/writeUserReview';
import updateReview from './mutations/SiteAdmin/userReview/updateReview';

// Home page logo
import getHomeLogo from './queries/siteadmin/getHomeLogo';
import uploadHomeLogo from './mutations/SiteAdmin/Logo/uploadHomeLogo';
import removeHomeLogo from './mutations/SiteAdmin/Logo/removeHomeLogo';
import getEmailLogo from './queries/siteadmin/getEmailLogo';
import uploadEmailLogo from './mutations/SiteAdmin/Logo/uploadEmailLogo';
import removeEmailLogo from './mutations/SiteAdmin/Logo/removeEmailLogo';

import addHomeBanner from './mutations/SiteAdmin/addHomeBanner';
import updateStaticBlockSettings from './mutations/SiteAdmin/updateStaticBlockSettings';
import getStaticInfo from './queries/siteadmin/getStaticInfo';
import uploadStaticBlock from './mutations/SiteAdmin/uploadStaticBlock'
import removeStaticImages from './mutations/SiteAdmin/removeStaticImages';

//remove special pricing or blocked dates
import RemoveBlockedDates from './mutations/Listing/RemoveBlockedDates';

// Admin Roles
import createAdminRole from './mutations/SiteAdmin/AdminRoles/createAdminRole';
import getAllAdminRoles from './queries/siteadmin/AdminRoles/getAllAdminRoles';
import deleteAdminRole from './mutations/SiteAdmin/AdminRoles/deleteAdminRole';

// Admin Users
import getAllAdminUsers from './queries/siteadmin/AdminUser/getAllAdminUsers';
import createAdminUser from './mutations/SiteAdmin/AdminUser/createAdminUser';
import deleteAdminUser from './mutations/SiteAdmin/AdminUser/deleteAdminUser';
import getAdminUser from './queries/siteadmin/AdminUser/getAdminUser';

//WhyHostInfoBlock
import getWhyHostPage from './queries/siteadmin/getWhyHostPage';
import updateWhyHostPage from './mutations/SiteAdmin/updateWhyHostPage'

import sendContactEmail from './mutations/sendContactEmail';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      news,
      intl,
      userLogin,
      userLogout,
      userRegister,
      userAccount,
      userEditProfile,
      userManagement,
      editUser,
      updateUser,
      showUserProfile,
      adminUserLogin,
      siteSettings,
      updateSiteSettings,
      locationItem,
      createListing,
      showListing,
      updateListing,
      showListingSteps,
      addListSettings,
      updateListSettings,
      deleteListSettings,
      getListingSettings,
      UserListing,
      getProfile,
      getAdminListingSettings,
      updateListingStep2,
      updateListingStep3,
      updateListingStep4,
      ManageListingSteps,
      ShowListPhotos,
      DateAvailability,
      getListingSpecSettings,
      getCurrencies,
      Currency,
      ManageListings,
      getAllListings,
      SearchListing,
      getBaseCurrency,
      getPaymentInfo,
      updatePaymentSettings,
      StoreCurrencyRates,
      updateSearchSettings,
      getSearchSettings,
      GetAddressComponents,
      getLogo,
      getCountries,
      getBanner,
      updateBannerSettings,
      getRecommend,
      getUserDashboard,
      getListingDashboard,
      getUserVerifiedInfo,
      getImageBanner,
      GetListViews,
      GetMostViewedListing,
      EmailVerification,
      ResendConfirmEmail,
      GetAllThreads,
      getThread,
      getUnreadThreads,
      getUnreadCount,
      getPaymentMethods,
      getPayouts,
      getItinerary,
      getListReservation,
      getAllReservation,
      getAllReservationAdmin,
      getPayoutStatus,
      getTransactionHistory,
      getServiceFees,
      getPaymentData,
      getAllThreadItems,
      getAllCancellation,
      getSpecificCancellation,
      cancelReservationData,
      userReviews,
      pendingReviews,
      writeReviewData,
      moreListReviews,
      forgotPasswordVerification,
      getListingCalendars,
      getBlockedDates,
      getListMeta,
      getAdminReviews,
      editAdminReview,
      getAllWishListGroup,
      getWishListGroup,
      viewReservationAdmin,
      getSimilarListing,
      getReservationDashboard,
      ShowDocumentList,
      getAllDocument,
      showAllDocument,
      getFooterSetting,
      getAllMessageHistory,
      getAllReport,
      getPhoneData,
      ManageListingsProfile,
      getUserBanStatus,
      ManageListingTransaction,
      getPopularLocation,
      editPopularLocation,
      getUserStatus,
      checkReservation,
      getPopularLocationAdmin,
      getListAvailableDates,
      getSpecialPricing,
      getUpcomingBookings,
      getBlogDetails,
      editBlogDetails,
      getBlogHome,
      getEnabledBlog,
      getCheckUserStatus,
      getCheckUserStatus,
      messageManagement,
      reviewsManagement,
      reportUserManagement,
      getEditStaticPage,
      getReviewsDetails,
      editUserReviews,
      getStepTwo,
      getHomeLogo,
      getStaticInfo,
      getHomeBanner,
      getEmailLogo,
      getAllAdminRoles,
      getAllAdminUsers,
      getAdminUser,
      getWhyHostPage,
      getListSettings
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      addRecommend,
      removeRecommend,
      ChangePassword,
      updateUserVerifiedInfo,
      UploadProfilePicture,
      RemoveProfilePicture,
      updateImageBanner,
      uploadImageBanner,
      // updateStaticInfoBlock,
      // uploadStaticInfoBlockImage,
      removeImageBanner,
      UpdateListViews,
      CreateThreadItems,
      sendMessage,
      readMessage,
      addPayout,
      removePayout,
      setDefaultPayout,
      createReservation,
      updatePayoutForReservation,
      updateServiceFees,
      updateReservation,
      managePaymentCurrency,
      RemoveListing,
      deleteUser,
      adminRemoveListing,
      currencyManagement,
      baseCurrency,
      uploadLogo,
      removeLogo,
      CreateListPhotos,
      RemoveListPhotos,
      cancelReservation,
      writeReview,
      sendForgotPassword,
      changeForgotPassword,
      managePublish,
      changeAdminUser,
      deleteCalendar,
      blockImportedDates,
      writeAdminReview,
      deleteAdminReview,
      CreateWishListGroup,
      UpdateWishListGroup,
      DeleteWishListGroup,
      CreateWishLists,
      uploadDocument,
      CreateDocumentList,
      RemoveDocumentList,
      DocumentManagement,
      CreateWishList,
      CreateFooterSetting,
      CreateReportUser,
      AddPhoneNumber,
      VerifyPhoneNumber,
      RemovePhoneNumber,
      updateBanServiceHistoryStatus,
      deletePopularLocation,
      updatePopularLocation,
      updatePopularLocationStatus,
      uploadLocation,
      removeLocation,
      addPopularLocation,
      updateListStatus,
      ListingDataUpdate,
      UpdateBlockedDates,
      deleteBlogDetails,
      addBlogDetails,
      updateBlogDetails,
      updateBlogStatus,
      updateStaticPage,
      writeUserReview,
      updateReview,
      uploadHomeLogo,
      removeHomeLogo,
      addHomeBanner,
      deleteHomeBanner,
      uploadEmailLogo,
      removeEmailLogo,
      updateStaticBlockSettings,
      uploadStaticBlock,
      removeStaticImages,
      RemoveBlockedDates,
      createAdminRole,
      deleteAdminRole,
      createAdminUser,
      deleteAdminUser,
      sendContactEmail,
      updateWhyHostPage
    }
  })
});

export default schema;
