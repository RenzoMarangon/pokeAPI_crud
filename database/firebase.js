const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');


const firebaseConfig = {
    apiKey: `${ process.env.FIREBASE_API_KEY }`,
    authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://poke-api.firebaseio.com",
    projectId: `${ process.env.FIREBASE_PROJECT_ID }`,
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: `${ process.env.FIREBASE_MESSAGING }`,
    appId: `${ process.env.FIREBASE_APP_ID }`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getAuth( app );

module.exports =  db ;

