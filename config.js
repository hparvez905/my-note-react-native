import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBvR3POTkEuu7VVn0NE_XTpTZRFpyMXUnY",
    authDomain: "my-note-4043f.firebaseapp.com",
    projectId: "my-note-4043f",
    storageBucket: "my-note-4043f.appspot.com",
    messagingSenderId: "850724220784",
    appId: "1:850724220784:web:815bc0b18b10a5d4b029b5",
    measurementId: "G-B5FC1P95S5"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

  export {firebase};