/* assets/js/firebase-config.js
 *
 * IMPORTANT:
 * - Replace the placeholder values below with your Firebase web app config.
 * - You can find these values in Firebase Console → Project Settings → General → Your apps (Web).
 *
 * Example:
 *  const FIREBASE_CONFIG = {
 *    apiKey: "AIza...",
 *    authDomain: "your-project.firebaseapp.com",
 *    projectId: "your-project-id",
 *    storageBucket: "your-project-id.appspot.com",
 *    messagingSenderId: "12345",
 *    appId: "1:12345:web:abcdef",
 *  };
 *
 * Do NOT commit sensitive production credentials to public repos. (Firebase config is safe to ship for public clients,
 * but keep service account/admin keys secret.)
 */

const FIREBASE_CONFIG = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_PROJECT.firebaseapp.com",
  projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket: "REPLACE_WITH_YOUR_PROJECT.appspot.com",
  messagingSenderId: "REPLACE_WITH_YOUR_SENDER_ID",
  appId: "REPLACE_WITH_YOUR_APP_ID"
};

// Expose to window (used by pages)
window.FIREBASE_CONFIG = FIREBASE_CONFIG;
