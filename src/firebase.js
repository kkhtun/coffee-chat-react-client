// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import * as firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDYZ1fIu68YLSRe-HGmJWyW4wbZQ8V1zhY",
    authDomain: "coffee-chat-3b3e6.firebaseapp.com",
    projectId: "coffee-chat-3b3e6",
    storageBucket: "coffee-chat-3b3e6.appspot.com",
    messagingSenderId: "516331019937",
    appId: "1:516331019937:web:ac3d5becd3ba4e9c9b9ae0",
    measurementId: "G-YV8H04FR27",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export default app;
