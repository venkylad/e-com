// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8tERDZnuzWqkRnnMtkhlkskpsZSQYhsI",
  authDomain: "e-com-new-77a51.firebaseapp.com",
  projectId: "e-com-new-77a51",
  storageBucket: "e-com-new-77a51.appspot.com",
  messagingSenderId: "316895452048",
  appId: "1:316895452048:web:60be96739fb1c2f9857115",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;
