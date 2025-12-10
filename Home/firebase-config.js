// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWGa9XsYtUOp39SOwvkWQfi5cmxWlyT98",
  authDomain: "jsi23-dd265.firebaseapp.com",
  projectId: "jsi23-dd265",
  storageBucket: "jsi23-dd265.firebasestorage.app",
  messagingSenderId: "1014686201680",
  appId: "1:1014686201680:web:4c2e77cf22b99dbf41de55",
  measurementId: "G-RGVKGZJ602"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();