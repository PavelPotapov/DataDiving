// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

// https://firebase.google.com/docs/web/setup#available-libraries

/* eslint-disable no-undef */
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
