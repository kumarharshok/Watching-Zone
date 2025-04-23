// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBprbv_V25wubMTsz0jQTF50XQmhNr4pcU",
    authDomain: "watchingzone-3ef86.firebaseapp.com",
    projectId: "watchingzone-3ef86",
    storageBucket: "watchingzone-3ef86.appspot.com",
    messagingSenderId: "215447905975",
    appId: "1:215447905975:web:194d0f39994b8d8ef2cf32",
    measurementId: "G-GYYGZF8T2C"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
