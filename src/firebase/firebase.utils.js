import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCczCUIfX9H7qvmBfdq0d874e5qG9_pzmw",
    authDomain: "crown-clothing-42605.firebaseapp.com",
    projectId: "crown-clothing-42605",
    storageBucket: "crown-clothing-42605.appspot.com",
    messagingSenderId: "291686049574",
    appId: "1:291686049574:web:6aeff2430bd4f5df5a83e7",
    measurementId: "G-8GQG4Z66L8"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Using a popup.
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters( { prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;