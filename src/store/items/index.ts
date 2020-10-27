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
    // Aqui é onde estabelecemos a conexão mais importante do projeto.
    // Ela é responsável por captar mudanças do banco de dados e avisar o projeto que houve tal mudança.
    // Também é feita uma adição ao objeto do item, criando algumas flags úteis.
    fetchItemList({ commit }: any){
      firebase.db.collection('items').onSnapshot((items) => {
        var itemList = items.docs.map((x) => { // mapeia a lista da resposta do request para uma que o front-end vai ler melhor
          return {
            key: x.id,
            expired: new Date(x.data().expireDate) < new Date(),
            ended: x.data().desired ? x.data().desiredValue <= Math.max.apply(Math, x.data().lances.map((lance: any) => { return lance.value; })) : false,
            content: {
              ...x.data()
            }
          }
        })
        commit('setItemList', itemList) // envia a lista de todos os items de leilão para ser gravada no estado da aplicação
        commit('setItemListFiltered', itemList.filter((a: any) => !a.expired && !a.ended)) // faz o mesmo mas filtrando os items expirados ou que ja bateram o valor desejado
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
      return state.itemListFiltered
    },
  }
}