import admin from "firebase-admin";

const serviceAccount = {
  type: process.env.FIREBASE_ADMIN_TYPE,
  project_id: process.env.FIREBASE_ADMIN_ID,
  private_key_id: process.env.FIREBASE_ADMIN_KEY_ID,
  private_key: process.env.FIREBASE_ADMIN_KEY,
  client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
  token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER,
  client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_CERT_URL,
  universe_domain: process.env.FIREBASE_ADMIN_DOMAIN,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const firebaseAdmin = admin;
