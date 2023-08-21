// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDzvWZ0a9gwBWwNF2qoJ9iI5zrjZViP-Jc',
  authDomain: 'ai-chat14.firebaseapp.com',
  projectId: 'ai-chat14',
  storageBucket: 'ai-chat14.appspot.com',
  messagingSenderId: '308962562049',
  appId: '1:308962562049:web:e393b80f53147b5abd3000',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
