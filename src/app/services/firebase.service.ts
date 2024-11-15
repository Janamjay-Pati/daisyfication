import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAoX4PCc76-2MDiOMnoLovmFGEYbhM30jQ",
    authDomain: "daisyfication.firebaseapp.com",
    projectId: "daisyfication",
    storageBucket: "daisyfication.firebasestorage.app",
    messagingSenderId: "252355074226",
    appId: "1:252355074226:web:de9110c00f3f8b83e651ab"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };