import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

import itemState from '../store/items'


const config = {
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

const db = firebase.firestore();
const auth = firebase.auth();
const google = new firebase.auth.GoogleAuthProvider();
const facebook = new firebase.auth.GoogleAuthProvider();



// Aqui é onde estabelecemos a conexão mais importante do projeto.
// Ela é responsável por captar mudanças do banco de dados e avisar o projeto que houve tal mudança.
// Também é feita uma adição ao objeto do item, criando algumas flags úteis.

// db.collection('items').onSnapshot((items) => {
//   var itemList = items.docs.map((x) => {
//     return {
//       key: x.id,
//       expired: new Date(x.data().expireDate) < new Date(),
//       ended: x.data().desiredValue <= Math.max.apply(Math, x.data().lances.map((lance: any) => { return lance.value; })),
//       content: {
//         ...x.data()
//       }
//     }
//   })
//   var itemListFiltered = itemList.filter((a: any) => !a.expired && !a.ended)

//   console.log(itemListFiltered)
//   itemState.mutations.setItemList(itemState, itemList)
//   itemState.mutations.setItemListFiltered(itemState, itemListFiltered)
// })


export default { db, auth, google, facebook };
