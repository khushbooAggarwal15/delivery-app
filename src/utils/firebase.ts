import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAaHDIEMdHxoDdkMAL_uswhYCMNQ3ayD10",
  authDomain: "e-learning-wil.firebaseapp.com",
  projectId: "e-learning-wil",
  storageBucket: "e-learning-wil.appspot.com",
  messagingSenderId: "171751901800",
  appId: "1:171751901800:web:9ab062b84a9b5c188049dd",
  measurementId: "G-HCXTH2V4Q5",
};

export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
