import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBsLFpFgIB1ch6vV5xSzkd7LBLVo3yPKME",
    authDomain: "scrollmall.firebaseapp.com",
    projectId: "scrollmall",
    storageBucket: "scrollmall.appspot.com",
    messagingSenderId: "586267189053",
    appId: "1:586267189053:web:db3bf19a9bec765f5f2f54",
    measurementId: "G-W0929KJ0ZV"
};
// Initialize Firebase
let app;

if (firebase.apps.length ===0) {
    app = firebase.initializeApp(firebaseConfig)
}else {
    app = firebase.app()
}
