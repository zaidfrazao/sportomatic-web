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
    apiKey: "AIzaSyDvXtkyZHPaz36m_VKG4-8SzERS8SAXJHE",
    authDomain: "sportomatic-beta.firebaseapp.com",
    databaseURL: "https://sportomatic-beta.firebaseio.com",
    projectId: "sportomatic-beta",
    storageBucket: "sportomatic-beta.appspot.com",
    messagingSenderId: "205205196418"
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
