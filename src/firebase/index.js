import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAyXaVgEcplAyTOGw1gAWS5LgwV2DfAUvA",
    authDomain: "my-library-50eb6.firebaseapp.com",
    projectId: "my-library-50eb6",
    storageBucket: "my-library-50eb6.appspot.com",
    messagingSenderId: "262080696928",
    appId: "1:262080696928:web:e12575aad8c7686e3fe905",
    measurementId: "G-3SQKP2EFSL"
  };

const app = initializeApp(firebaseConfig);

let db = getFirestore(app);
let auth = getAuth(app);
let storage = getStorage(app)

export { db, auth, storage }