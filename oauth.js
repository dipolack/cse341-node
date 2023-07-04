
const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken');

let oAuth2Client = null;

function initOAuth() {
    oAuth2Client = new OAuth2Client(
        '524162860155-qefbtrsccfiersp8abl7ikiih748sdao.apps.googleusercontent.com', 
        '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',
        'http://localhost:8080/auth/google/redirect' 
    );
    return oAuth2Client;
}

module.exports = { initOAuth };
