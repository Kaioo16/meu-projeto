import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfaZATSwSpbE0U_I9AukS13V1XNjXKwh4",
  authDomain: "kaio-app-28142.firebaseapp.com",
  projectId: "kaio-app-28142",
  appId: "1:815747127384:web:4e55ef0c904d9e8a79122d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
