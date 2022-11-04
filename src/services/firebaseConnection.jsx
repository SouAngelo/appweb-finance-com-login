import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCo4_usIe5yF9cBjLlkzcrH_RWtvKTD-SE",
    authDomain: "pizzaria-63e32.firebaseapp.com",
    projectId: "pizzaria-63e32",
    storageBucket: "pizzaria-63e32.appspot.com",
    messagingSenderId: "168371412034",
    appId: "1:168371412034:web:9df452c813ac0cc0eea1db",
    measurementId: "G-FB0VK7M5TT"
  };
  
  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }
  
  
export default firebase