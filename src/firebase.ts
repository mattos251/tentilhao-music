import { FirebaseApp, initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

let firebaseApp: FirebaseApp;

try {
  firebaseApp = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Erro ao inicializar o Firebase:', error);
  throw error; // Rethrow para interromper a execução se ocorrer um erro na inicialização
}

const storage = getStorage(firebaseApp, 'gs://tentilhao-5d475.appspot.com');

export { storage };
