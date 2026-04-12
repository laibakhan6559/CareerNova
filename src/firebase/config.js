// Firebase initialization (v9 modular SDK)
// This file was updated with the Firebase config provided by the user.
// Keep secrets private in production. Consider using environment variables for CI/hosting.
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Provided Firebase configuration (as requested)
const firebaseConfig = {
  apiKey: "AIzaSyChPkKCVUQSYNQwVaoj1dksEDA-IovIbcw",
  authDomain: "nextstep-970cc.firebaseapp.com",
  projectId: "nextstep-970cc",
  storageBucket: "nextstep-970cc.firebasestorage.app",
  messagingSenderId: "142600276755",
  appId: "1:142600276755:web:071be0ed48374dd6f068e6",
  measurementId: "G-NCQFYH9ET3",
};

const app = initializeApp(firebaseConfig);
let analytics;
try {
  analytics = getAnalytics(app);
} catch (err) {
  // Analytics may fail in environments where browser APIs are unavailable or blocked.
  // This is non-fatal for local development.
  // eslint-disable-next-line no-console
  console.warn("Firebase analytics not initialized:", err?.message || err);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export { app, analytics };


