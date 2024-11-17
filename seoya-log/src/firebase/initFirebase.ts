import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC65LkL3sdj5kPoXTbVcGq3H4B0O6Dxn-E",
  authDomain: "seoyalog.firebaseapp.com",
  projectId: "seoyalog",
  storageBucket: "seoyalog.firebasestorage.app",
  messagingSenderId: "675801475819",
  appId: "1:675801475819:web:e4b06865e5556e88132cae",
  measurementId: "G-9XCVTR8T14",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
