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

export const createUserProfileDocument = async (userAuth, additionalData ) => {
  if (!userAuth) return;
  console.log('berto');
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot);
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    console.log(`Display Name: ${displayName}`);
    console.log(`email: ${email}`);
    console.log(`createdAt: ${createdAt}`);
    console.log(`additionalData: ${additionalData}`);

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user: ', error.message);
    }
  }

  return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  // console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    // get a new doc reference with a unique id; could pass id if wanted ie .doc('123');
    const newDocRef = collectionRef.doc(); 
    console.log(newDocRef);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routename: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  console.log(transformedCollection);

  // convert array to object map
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  });
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Using a google signin popup
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters( { prompt: 'select_account' });
//export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;