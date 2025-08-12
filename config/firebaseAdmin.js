// firebaseAdmin.ts

import * as firebaseAdmin from 'firebase-admin';

// get this JSON from the Firebase board
// you can also store the values in environment variables

// @ts-ignore
const { privateKey } = JSON.parse(process.env.NEXT_PUBLIC_PRIVATE_KEY);

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey,
      clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    }),
    databaseURL: process.env.DATABASE_URL,
  });
}

export { firebaseAdmin };