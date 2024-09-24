// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTT2tHvtVX6H8jJbp634GVK8dp2dYTQZ0",
    authDomain: "eventify-db434.firebaseapp.com",
    projectId: "eventify-db434",
    storageBucket: "eventify-db434.appspot.com",
    messagingSenderId: "823922910099",
    appId: "1:823922910099:web:2aded0004a5a9f2b7f3e66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;