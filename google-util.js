const { google } = require("googleapis");
const {authenticate} = require('@google-cloud/local-auth');

const googleConfig = {
  clientId: "363629891506-lsnf3h0bndkvat1aopf6gda3hoij5rbv.apps.googleusercontent.com",
  clientSecret: "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",
  redirect: "http://localhost:5000/login"
};
function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

//module.exports.createConnection = createConnection;

/**
 * This scope tells google what information we want to request.
 */
const defaultScope = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];

/**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: defaultScope
  });
}

/**
 * Create the google url to be sent to the client.
 */
function urlGoogle() {
  const auth = createConnection(); // this is from previous step
  const url = getConnectionUrl(auth);
  return url;
}

/**
 * Helper function to get the library with access to the google plus api.
 */
function getGooglePeopleApi(auth) {
  const people = google.people("v1");
  return people;
}

/**
 * Extract the email and id of the google account from the "code" parameter.
 */
async function getGoogleAccountFromCode(code) {
  const auth = createConnection();

  // get the auth "tokens" from the request
  const data = await auth.getToken(code);
  const tokens = data.tokens;

  // add the tokens to the google api so we have access to the account

  auth.setCredentials(tokens);

  // connect to google plus - need this to get the user's email
  const people = getGooglePeopleApi(auth);
  const me = await people.people.get({
    resourceName: 'people/me',
    personFields: 'emailAddresses,names'
  });
  console.log(me);
  // get the google id and email
  const userGoogleId = me.data.id;
  const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;

  // return so we can login or sign up the user
  return {
    id: userGoogleId,
    email: userGoogleEmail,
    tokens: tokens, // you can save these to the user if you ever want to get their details without making them log in again
  };
}

module.exports.urlGoogle = urlGoogle;
module.exports.getGoogleAccountFromCode = getGoogleAccountFromCode;


