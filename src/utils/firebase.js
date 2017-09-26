import firebase from "firebase";

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
}
