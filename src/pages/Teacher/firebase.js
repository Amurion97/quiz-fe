import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBVGtJI9PoZbeouEqXNZ7mU3KZMo8dFDsE",
    authDomain: "md5-firebase.firebaseapp.com",
    projectId: "md5-firebase",
    storageBucket: "md5-firebase.appspot.com",
    messagingSenderId: "735569060943",
    appId: "1:735569060943:web:51cfaf8739db200bb1b63a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);