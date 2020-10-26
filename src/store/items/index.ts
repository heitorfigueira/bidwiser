import firebase from '../../firebase/index'
import router from '../../router'

export default {
  state: {
    itemList: [],
    itemListFiltered: []
  },
  mutations: {
    setItemList(state: any, itemList: any) {
      state.itemList = itemList
    },
    setItemListFiltered(state: any, itemListFiltered: any) {
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
    fetchItemList({ commit }: any){
      firebase.db.collection('items').get()
      .then((list) => {
        var itemList = list.docs.map((x) => {
          return {
            key: x.id,
            expired: new Date(x.data().expireDate) < new Date(),
            ended: x.data().desiredValue <= Math.max.apply(Math, x.data().lances.map((lance: any) => { return lance.value; })),
            content: {
              ...x.data()
            }
          }
        })
        console.log(itemList.filter((a: any) => !a.expired && !a.ended))
        commit('setItemList', itemList)
        commit('setItemListFiltered', itemList.filter((a: any) => !a.expired && !a.ended))
      })
      .catch((e) => { console.log(e) })
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
      return state.itemListFiltered
    },
  }
}