require('dotenv').config();

/* eslint-disable max-len */
export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
export const url = process.env.WEBSITE_URL || 'http://localhost:3001';
export const sitename = process.env.SITENAME || 'Your Website Name';
export const adminEmail = process.env.ADMIN_EMAIL || 'admin@yourdomain.com';

export const adminEmaillist = [
  'admin_001@yourdomain.com'
];

// Max File upload size in MB
export const maxUploadSize = 10;

// default locale is the first one
export const locales = ['en-US', 'es', 'it-IT', 'fr-FR', 'pt-PT'];

export const databaseUrl = process.env.DATABASE_URL;

// Listing Photos Upload Directory
export const fileuploadDir = process.env.FILEUPLOAD_DIR || './images/upload/';

// Logo upload directory
export const logouploadDir = process.env.LOGOUPLOAD_DIR || './images/logo/';

// Home page Banner upload directory
export const banneruploadDir = process.env.BANNER_UPLOAD_DIR || './images/banner/';

// User Profile Photos Upload Directory
export const profilePhotouploadDir = process.env.PROFILE_PHOTO_UPLOAD_DIR || './images/avatar/';

//Document Upload
export const documentuploadDir = process.env.FILEUPLOAD_DIR || './images/document/';

// Location upload directory
export const locationuploadDir = process.env.LOGOUPLOAD_DIR || './images/popularLocation/';

// Static block image upload directory
export const homebanneruploadDir = process.env.HOME_BANNER_UPLOAD_DIR || './images/home/';

// Amenities upload directory
export const amenitiesUploadDir = process.env.AMENITIES_UPLOAD_DIR || './images/amenities/';

export const analytics = {

  // https://analytics.google.com/
  google: {
    trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X',
  },

};

export const googleMapAPI = process.env.GOOGLE_MAP_API || '<Your API Key>';

export const serverKey = process.env.PUSH_NOTIFICATION_SERVER_KEY || '<Your API Key>';

export const payment = {

  paypal: {
    email: process.env.PAYPAL_APP_EMAIL, /* From ENV */
    clientId: process.env.PAYPAL_APP_CLIENT_ID,
    secret: process.env.PAYPAL_APP_SECRET,
    host: process.env.PAYPAL_HOST || 'api.sandbox.paypal.com',
    hostMode: process.env.PAYPAL_HOST_DETAIL || 'sandbox',
    returnURL: process.env.PAYPAL_RETURN_URL || `${url}/success`,
    cancelURL: process.env.PAYPAL_CANCEL_URL || `${url}/cancel`,
    redirectURL: {
      success: process.env.PAYPAL_SUCCESS_URL || '/users/trips/itinerary',
      cancel: process.env.PAYPAL_CANCEL_URL || '/contact',
    },
  },

  stripe: {
    secretKey: process.env.STRIPE_SECRET, /* From ENV */
    publishableKey: 'pk_test_C5ukBJM7qr5P1F8dY4XKhdyp' /* Your Stripe Publishable key */
  }

};

// site key for google recaptcha
export const googleCaptcha = {
  sitekey: '<Your Site key>',
};

// SMS verification
export const sms = {
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNTSID,
    authToken: process.env.TWILIO_AUTHTOKEN,
    phoneNumber: process.env.TWILIO_PHONENUMBER
  }
};

// Email Settings
export const emailConfig = {
  host: process.env.SMTP_HOST, /* From ENV */
  port: process.env.SMTP_PORT || 25,
  email: process.env.SMTP_LOGIN_EMAIL || '<Your Login Email>',
  sender: process.env.SMTP_FROM_NAME || '<Your From Name>',
  senderEmail: process.env.SMTP_SENDER_EMAIL || '<Your Sender Email>',
  password: process.env.SMTP_LOGIN_PASSWORD,
  secure: process.env.SMTP_SECURE || false,
  tls: process.env.SMTP_TLS || false,
};

export const auth = {

  jwt: { secret: process.env.JWT_SECRET },

  redirectURL: {
    login: process.env.LOGIN_URL || '/dashboard',
    verification: process.env.LOGIN_URL || '/user/verification',
    userbanned: process.env.USER_BANNED_URL || '/userbanned',
    returnURLDeletedUser: process.env.DELETE_USER_URL || '/userbanned'
  },

  // https://developers.facebook.com/
  facebook: {
    id: process.env.FACEBOOK_APP_ID,
    secret: process.env.FACEBOOK_APP_SECRET,
    returnURL: process.env.FACEBOOK_CLIENT_URL || `${url}/login/facebook/return`,
  },

  // https://cloud.google.com/console/project
  google: {
    id: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_CLIENT_SECRET,
    returnURL: process.env.GOOGLE_CLIENT_URL || `${url}/login/google/return`,
  }
};
