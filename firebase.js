import firebase from "firebase/compat/app";
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDiGWIAVODFHva8JJQl90JuUC2qFKMtam8",
  authDomain: "linkedin-f9629.firebaseapp.com",
  databaseURL: "https://linkedin-f9629-default-rtdb.firebaseio.com",
  projectId: "linkedin-f9629",
  storageBucket: "linkedin-f9629.appspot.com",
  messagingSenderId: "139288506564",
  appId: "1:139288506564:web:0ca10a0d0084ae7dab9991"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export { firebase }