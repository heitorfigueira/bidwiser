import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

import itemState from '../store/items'

// Configuração do Database do Firebase

const config = { // CREDENCIAIS
  apiKey: "AIzaSyCg6aiYQ0ytFvTkM-ovQY8Nv30b47_9i8o",
  authDomain: "bidweiser.firebaseapp.com",
  databaseURL: "https://bidweiser.firebaseio.com",
  projectId: "bidweiser",
  storageBucket: "bidweiser.appspot.com",
  messagingSenderId: "527604097510",
  appId: "1:527604097510:web:ec5da288716fee90167627",
  measurementId: "G-24LTFYSREL"
};

firebase.initializeApp(config);


// Referencias de autenticação, database e provedores que não foram utilizados
const db = firebase.firestore();
const auth = firebase.auth();
const google = new firebase.auth.GoogleAuthProvider();
const facebook = new firebase.auth.GoogleAuthProvider();


export default { db, auth, google, facebook };
