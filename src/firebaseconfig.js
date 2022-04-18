// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { getAuth} from "firebase/auth";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4njFw0gn4waATqFp6nGMHnAo3Vr-s1Nk",
  authDomain: "rideshare-da360.firebaseapp.com",
  projectId: "rideshare-da360",
  storageBucket: "rideshare-da360.appspot.com",
  messagingSenderId: "509394563422",
  appId: "1:509394563422:web:fb6b4fb07b79e6e93cdfcf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export {app,auth};