import {
  APP_ID,
  AUTH_DOMAIN,
  DATABASE_URL,
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
  MESSAGING_SENDER_ID,
  STORAGE_BUCKET,
} from "@env"
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
}
// @ts-ignore
import * as firebase from "firebase"
export async function maybeSetUpFirebase() {
  console.log("here", firebase)
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
}
