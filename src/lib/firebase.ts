
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase configuration with environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "investbridge-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "investbridge-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "investbridge-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:investbridge123"
};

// Configuration status logging for development
console.log('InvestBridge Firebase Status:', {
  apiKeyConfigured: !!import.meta.env.VITE_FIREBASE_API_KEY,
  authDomainConfigured: !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectIdConfigured: !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
  runningInDemoMode: !import.meta.env.VITE_FIREBASE_API_KEY
});

// Initialize Firebase services
let firebaseApp;
let firestoreDb;
let firebaseAuth;
let firebaseStorage;

try {
  firebaseApp = initializeApp(firebaseConfig);
  firestoreDb = getFirestore(firebaseApp);
  firebaseAuth = getAuth(firebaseApp);
  firebaseStorage = getStorage(firebaseApp);
  console.log('InvestBridge: Firebase services initialized successfully');
} catch (initializationError) {
  console.error('InvestBridge Firebase initialization failed:', initializationError);
  
  // Fallback to null for demo mode
  firestoreDb = null;
  firebaseAuth = null;
  firebaseStorage = null;
}

// Export Firebase services
export { firestoreDb as db, firebaseAuth as auth, firebaseStorage as storage };
export default firebaseApp;
