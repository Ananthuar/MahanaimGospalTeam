README_FIREBASE.md
===================

Mahanaim Firestore Admin - Setup Guide
--------------------------------------

This guide shows how to configure Firebase so the admin UI (admin/firestore_admin.html)
can let authorized users manage events stored in Firestore. The public site will read
events from Firestore too.

STEPS OVERVIEW
1. Create a Firebase project
2. Add a Web App (obtain config)
3. Enable Firestore (in production mode)
4. Enable Google Sign-In under Authentication
5. Add Firebase config to assets/js/firebase-config.js
6. Deploy or serve admin/firestore_admin.html; authorize admin users by setting a custom claim `admin: true`
7. Update Firestore rules with firestore.rules

DETAILED STEPS
-------------- 

1) Create Firebase project
   - Visit: https://console.firebase.google.com/
   - Click "Add project" and follow steps.

2) Add a Web App
   - In Firebase Console -> Project Overview -> Add app (</> Web).
   - Register app (nickname) and copy the config snippet (apiKey, authDomain, projectId, ...)
   - Paste values into `assets/js/firebase-config.js` replacing placeholders.

3) Enable Firestore
   - In Firebase Console -> Build -> Firestore Database -> Create Database
   - Choose location and start in Production mode (recommended).
   - Create a collection manually once (optional) or let the admin UI create docs.

4) Enable Authentication (Google)
   - In Firebase Console -> Build -> Authentication -> Sign-in method
   - Enable "Google" (optionally enable Email/Password).
   - Configure authorized domains if needed (for local dev: add "localhost").

5) Update Firestore rules
   - In Firebase Console -> Build -> Firestore -> Rules
   - Replace rules with contents of `firestore.rules` provided in repo.
   - Publish rules.

6) Assign admin custom claim to users
   - Admin writes require `request.auth.token.admin == true`.
   - To set this claim, use Firebase Admin SDK (server) or Firebase CLI + scripts.
   - Example (Node.js admin script):
     ```
     // set-admin-claim.js (run locally with Admin SDK credentials)
     const admin = require('firebase-admin');
     admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
     admin.auth().setCustomUserClaims(uid, { admin: true })
       .then(() => console.log('Admin claim set'));
     ```
   - Alternative: Use Cloud Function to allow a trusted user to mark others as admin.
   - IMPORTANT: Only set admin:true for accounts you trust.

7) Test admin UI
   - Host `admin/firestore_admin.html` (you can open it locally with a local server like `npx http-server`).
   - Click Sign in with Google, sign in with an account that has `admin:true`.
   - Create / edit / delete events; documents will appear in Firestore `events` collection.

8) Public site behavior
   - The public pages (index.html / church.html) will attempt to read events from Firestore using the client SDK.
   - If FIREBASE_CONFIG is not filled, or the fetch fails, pages fall back to `content/events.json` if present.

LOCAL DEV
---------
- Serve site locally with a static server (e.g., `npx http-server .`).
- Ensure `localhost` is added to Firebase Authentication -> Authorized domains.

SECURITY NOTES
--------------
- Keep admin privileges tightly restricted.
- Don't expose server-side admin credentials in client code. Use Admin SDK on server for setting custom claims.
- Monitor Firestore usage to avoid unexpected billing.

That's it — if you want, I can provide the Node script to set custom claims or give you step-by-step commands to run it.
