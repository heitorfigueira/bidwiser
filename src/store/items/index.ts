import firebase from '../../firebase/index'
import router from '../../router'

export default {
  state: {
    itemList: [],
    itemListFiltered: []
  },
  mutations: {
    setItemList(state: any, itemList: any) {
      console.log('full: ', itemList)
      state.itemList = itemList
    },
    setItemListFiltered(state: any, itemListFiltered: any) {
      console.log('filtered: ', itemListFiltered)
      state.itemListFiltered = itemListFiltered
    }
  },
  actions: {
    createItem({ commit }: any, payload: any){
      firebase.db.collection('items').add(payload)
        .then(() => {})
        .catch((e) => { console.log(e) })
        .finally(() => {
          router.push({ name: 'ListaItems' })
        })
    },
    // Aqui é onde estabelecemos a conexão mais importante do projeto.
    // Ela é responsável por captar mudanças do banco de dados e avisar o projeto que houve tal mudança.
    // Também é feita uma adição ao objeto do item, criando algumas flags úteis.
    fetchItemList({ commit }: any){
      firebase.db.collection('items').onSnapshot((items) => {
        debugger
        var itemList = items.docs.map((x) => {
          console.log(x.data().desired ? x.data().desiredValue : 'null', Math.max.apply(Math, x.data().lances.map((lance: any) => { return lance.value; })))
          return {
            key: x.id,
            expired: new Date(x.data().expireDate) < new Date(),
            ended: x.data().desired ? x.data().desiredValue <= Math.max.apply(Math, x.data().lances.map((lance: any) => { return lance.value; })) : false,
            content: {
              ...x.data()
            }
          }
        })
        commit('setItemList', itemList)
        commit('setItemListFiltered', itemList.filter((a: any) => !a.expired && !a.ended))
      })
    },
    sendNewBid({ commit }: any, payload: any) {
      firebase.db.collection('items').doc(payload.key).set(payload.content)
      .then(() => {})
      .catch((e) => { console.log(e) })
      .finally(() => {
      })
    }
  },
  getters: {
    getItemList(state: any) {
      return state.itemList
    },
    getItemListFiltered(state: any) {
      console.log('get')
      return state.itemListFiltered
    },
  }
}