
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAf6pfcMPtmEI5mzGETmzsBgmYSRzJ-J1M",
  authDomain: "e-learning-dd274.firebaseapp.com",
  projectId: "e-learning-dd274",
  storageBucket: "e-learning-dd274.appspot.com",
  messagingSenderId: "686365982599",
  appId: "1:686365982599:web:dbded1d89dd38d52cf9d22",
  measurementId: "G-2EEN69R957"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);