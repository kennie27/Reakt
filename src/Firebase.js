// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3stqsmdxw9uukCc9CEqauJxGIkTVFJug",
  authDomain: "financialsys-9755e.firebaseapp.com",
  projectId: "financialsys-9755e",
  storageBucket: "financialsys-9755e.appspot.com",
  messagingSenderId: "775735824710",
  appId: "1:775735824710:web:a0cad01137ba5b242f9547",
  measurementId: "G-VEJ2907SG9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export{app}
export{analytics}
