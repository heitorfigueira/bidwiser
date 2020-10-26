import firebase from '../../firebase/index'
import router from '../../router'

export default {
  state: {
    profile: null
  },
  mutations: {
    setProfile(state: any, profile: any) {
      debugger
      state.profile = profile
    },
    clearProfile(state: any) {
      state.profile = null
    }
  },
  actions: {
    getProfile({ commit }: any, payload: any) {
      firebase.db.collection('perfil').where('email', '==', payload.email)
        .get().then((profile) => {
          commit('setProfile', profile.docs.map((x) => {
            return {
              key: x.id,
              content: {
                ...x.data()
              }
            }
          })[0])
        })
        .catch(e => { console.log(e) })
    },
    createProfile({ commit }: any, payload: any){
      let addProfile = {
        email: payload.email,
        nome: '',
        sobrenome: '',
        aniversario: '',
        biografia: '',
        entrada: new Date().toISOString().substr(0, 10)
      }
      firebase.db.collection('perfil').add(addProfile)
      .then((profile) => {
          let newProfile = {
            id: profile?.id,
            content: {
              email: payload.email,
              nome: '',
              sobrenome: '',
              aniversario: '',
              biografia: '',
              entrada: new Date().toISOString().substr(0, 10)
            }
          }
          commit('setProfile', newProfile)
        })
        .catch((e) => { console.log(e) })
    },
    updateProfile({ commit }: any, payload: any) {
      firebase.db.collection('perfil').doc(payload.key).set(payload.content)
      .then(() => {})
      .catch((e) => { console.log(e) })
    }
  },
  getters: {
    fetchProfile(state: any) {
      return state.profile
    },
  }
}