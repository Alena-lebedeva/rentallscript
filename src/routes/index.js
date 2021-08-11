/* eslint-disable global-require */

// The top-level (parent) route
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./home').default,
    require('./contact').default,
    require('./login').default,
    require('./register').default,
    require('./editProfile').default,
    require('./admin').default,
    require('./profile').default,
    require('./becomeHost').default,
    require('./viewListing').default,
    require('./manageListing').default,
    require('./search').default,
    require('./profilePhoto').default,
    require('./trustAndVerification').default,
    require('./changePassword').default,
    require('./dashboard').default,
    require('./inbox').default,
    require('./viewMessage').default,
    require('./book').default,
    require('./payout').default,
    require('./addPayout').default,
    require('./payment').default,
    require('./itinerary').default,
    require('./receipt').default,
    require('./reservation').default,
    require('./trips').default,
    require('./transaction').default,
    require('./warning').default,
    require('./cancel').default,
    require('./cancellationPolicies').default,
    require('./reviews').default,
    require('./writeReview').default,
    require('./passwordVerification').default,
    require('./userbanned').default,
    require('./addPayoutFailure').default,
   //document upload

   require('./documentVerification').default,

   //blog
   require('./blog').default,
   require('./siteadmin/blogManagement').default,
   require('./siteadmin/addBlogDetails').default,
   require('./siteadmin/editBlogDetails').default,


    // Static Pages
    require('./static/about').default,
    require('./static/privacy').default,
    require('./static/careers').default,
    require('./static/press').default,
    require('./static/policies').default,
    require('./static/help').default,
    require('./static/trustAndSafety').default,
    require('./static/travelCredit').default,
    require('./static/citizen').default,
    require('./static/business').default,
    require('./static/guide').default,
    require('./static/whyhost').default,
    require('./whyhostnew').default,
    require('./static/responsible-hosting').default,
    require('./static/hospitality').default,
    // Add Admin Panel Pages Here
    require('./siteadmin/adminDashboard').default,
    require('./siteadmin/adminLogin').default,
    require('./siteadmin/changeAdmin').default,
    require('./siteadmin/edituser').default,
    require('./siteadmin/users').default,
    require('./siteadmin/siteSettings').default,
    require('./siteadmin/listSettings').default,
    require('./siteadmin/listings').default,
    require('./siteadmin/currencies').default,
    require('./siteadmin/paymentSettings').default,
    require('./siteadmin/searchSettings').default,
    require('./siteadmin/bannerSettings').default,
    require('./siteadmin/imageBanner').default,
    require('./siteadmin/reservations').default,
    require('./siteadmin/viewReceipt').default,
    require('./siteadmin/serviceFeesSettings').default,
    require('./siteadmin/adminReviews').default,
    require('./siteadmin/writeReview').default,
    require('./siteadmin/editReview').default,
    require('./siteadmin/viewreservation').default,
    require('./siteadmin/footerBlock').default,
    require('./siteadmin/messages').default,   
    require('./siteadmin/reportUser').default,
    require('./siteadmin/popularLocation').default,
    require('./siteadmin/editPopularLocation').default,
    require('./siteadmin/addPopularLocation').default,
    require('./siteadmin/staticPage').default,
    require('./siteadmin/editStaticPage').default,
    require('./siteadmin/staticBlock').default,
    require('./siteadmin/homeBanner').default,

    //Profile View
    require('./siteadmin/profileView').default,
    //document view
    require('./siteadmin/document').default,
    require('./siteadmin/userReviews').default,
    require('./siteadmin/userEditReviews').default,

    //Admin users and roles
    require('./siteadmin/adminRoles').default,
    require('./siteadmin/adminUser').default,

    //WhyHost
    require('./siteadmin/whyHostPageSettings/whyHostBlock1').default,
    require('./siteadmin/whyHostPageSettings/whyHostBlock2').default,
    require('./siteadmin/whyHostPageSettings/whyHostBlock3').default,
    require('./siteadmin/whyHostPageSettings/whyHostBlock4').default,
    require('./siteadmin/whyHostPageSettings/whyHostBlock5').default,
    require('./siteadmin/whyHostPageSettings/whyHostBlock6').default,
    require('./siteadmin/whyHostPageSettings/whyHostBlock7').default,

    // Wish Lists
    require('./wishLists').default,

    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    require('./notFound').default,
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'}`;
    route.description = route.description || '';

    return route;
  },

};
