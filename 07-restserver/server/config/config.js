// ===========================
//  PORT
// ===========================
process.env.PORT = process.env.PORT || 3000;

// ===========================
//  ENVIROMENT
// ===========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===========================
//  EXPIRATION DATE
// ===========================
process.env.EXPIRATION_TOKEN = 60 * 60 * 24 * 30;

// ===========================
//  ENVIROMENT
// ===========================
process.env.SEED = process.env.SEED || 'secret';

// ===========================
//  Google Client ID
// ===========================
process.env.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '584360462118-j8ib76nestjki48f001oh9h06djc3mkq.apps.googleusercontent.com';

// ===========================
//  DB
// ===========================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URL;
}
process.env.urlDB = urlDB;