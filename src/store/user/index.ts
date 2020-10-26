import firebase from '../../firebase/index'
import router from '../../router'

export default {
  state: {
    isAuthorized: false,
    user: null
  },
  mutations: {
    setUser(state: any, user: any) {
      state.user = user
      state.isAuthorized = true
    },
    clearUser(state: any) {
      state.user = null
      state.profile = null
      state.isAuthorized = false
    }
  },
  actions: {
    signUpUser({commit, dispatch}: any, payload: any) {
      firebase.auth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then((auth) => {
          let newUser = {
            id: auth.user?.uid,
            email: auth.user?.email,
            fbKeys: {}
          }
          commit('setUser', newUser)
        })
        .catch((e) => { console.log(e) })
        .finally(() => {
          dispatch('createProfile', payload, { root: true })
          router.push({ name: 'ListaItems' })
        })
    },
    signInUser({ commit, dispatch }: any, payload: any) {
      firebase.auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then((auth) => {
          console.log(auth)
          let newUser = {
            id: auth.user?.uid,
            email: auth.user?.email,
            fbKeys: {}
          }
          commit('setUser', newUser)
        })
        .catch(e => { console.log(e) })
        .finally(() => {
          dispatch('getProfile', payload, { root:true })
          router.push({ name: 'ListaItems' })
        })
    },
    signUserOut({ commit }: any) {
      commit('clearUser')
      router.push({ name: 'Login' })
    }
  },
  getters: {
    isAuthorized(state: any) {
      return state.user != null
    },
    getUser(state: any) {
      return state.user
    },
    getProfile(state: any) {
      return state.profile
    }
  }
}