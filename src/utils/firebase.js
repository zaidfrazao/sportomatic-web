import firebase from "firebase";
import "firebase/firestore";

export function initFirebase() {
  const config: {
    apiKey: string,
    authDomain: string,
    databaseURL: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string
  } = {
    apiKey: "AIzaSyA1jmyVuNB8qDq6wvRGeBi4VneAe-TDKiA",
    authDomain: "sportomatic-5e646.firebaseapp.com",
    databaseURL: "https://sportomatic-5e646.firebaseio.com",
    projectId: "sportomatic-5e646",
    storageBucket: "sportomatic-5e646.appspot.com",
    messagingSenderId: "168504991467"
  };

  firebase.initializeApp(config);

  firebase
    .firestore()
    .enablePersistence()
    .catch(function(err) {
      if (err.code === "failed-precondition") {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
      } else if (err.code === "unimplemented") {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
      }
    });
}
