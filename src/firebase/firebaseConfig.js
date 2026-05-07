import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 🔥 Configuración de Firebase (la tuya)
const firebaseConfig = {
  apiKey: "AIzaSyDCe6nG8ScDXP9P5gGKy5FQZjK2McTihNU",
  authDomain: "distri-pachitos.firebaseapp.com",
  projectId: "distri-pachitos",
  storageBucket: "distri-pachitos.firebasestorage.app",
  messagingSenderId: "786113379912",
  appId: "1:786113379912:web:588bf5c5b9989ab960e27d"
};

// 🚀 Inicializar Firebase
const app = initializeApp(firebaseConfig);

// 📦 Base de datos (productos)
export const db = getFirestore(app);

// 🔐 Autenticación (admin login)
export const auth = getAuth(app);