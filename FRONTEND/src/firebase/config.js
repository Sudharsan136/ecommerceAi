import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCpqM3pvr4xyfCU_C6HHkt5bJIHRUOp6xY",
    authDomain: "aiecom-62980.firebaseapp.com",
    projectId: "aiecom-62980",
    storageBucket: "aiecom-62980.firebasestorage.app",
    messagingSenderId: "373582627555",
    appId: "1:373582627555:web:4a5648f12a8aa22c9d3bd6",
    measurementId: "G-J2SZY9DMMJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
