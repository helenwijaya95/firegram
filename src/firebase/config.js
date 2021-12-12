  // Import the functions you need from the SDKs you need
  import firebase from 'firebase/app';
  import 'firebase/storage';
  import 'firebase/firestore'
  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCacrWIvJepN_0ORw8yIQoBc5bRw3ZMhUE",
    authDomain: "ninja-firegram-40954.firebaseapp.com",
    projectId: "ninja-firegram-40954",
    storageBucket: "ninja-firegram-40954.appspot.com",
    messagingSenderId: "42962727383",
    appId: "1:42962727383:web:80c749dbca9c0f40ecdb92"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFireStore, timestamp };