import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_9wfqFt3iEzUR3rN1T3dPABlOOPE7is8",
  authDomain: "voice-bot-d55e5.firebaseapp.com",
  projectId: "voice-bot-d55e5",
  storageBucket: "voice-bot-d55e5.appspot.com",
  messagingSenderId: "223858249243",
  appId: "1:223858249243:web:43ce4c0aafdad5ea0fb2be",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
