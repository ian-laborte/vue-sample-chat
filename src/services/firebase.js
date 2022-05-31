import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyDx8ohiY5ir77IO6O_q-MAl57YoDwt0eN8",
    authDomain: "everydaytasak.firebaseapp.com",
    databaseURL: "https://everydaytasak-default-rtdb.firebaseio.com/",
    storageBucket : "gs://everydaytasak.appspot.com"
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const storage = firebase.storage();
export const db = firebase.database();