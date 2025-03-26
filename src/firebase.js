import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5GBKY9GeLxy-e5eH5R5NwdkE8bQyblJc",
  authDomain: "salud-conectada-2acdb.firebaseapp.com",
  projectId: "salud-conectada-2acdb",
  storageBucket: "salud-conectada-2acdb.firebasestorage.app",
  messagingSenderId: "610995826258",
  appId: "1:610995826258:web:0808f371770d12d02e798b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
