import api from '../../utils/api'
import axios from 'axios'

const state = {
  user: null
}

const mutations = {
  SET_USER_DATA (state, userData) {
    state.user = userData
    localStorage.setItem('user', JSON.stringify(userData))
    // set header of axios
    axios.defaults.headers["content-type"] = "application/json";
    axios.defaults.headers.common['authorization'] = `Bearer ${
      userData.body.token
    }`

  },
  CLEAR_USER_DATA () {
    // Best way for more scalable
    localStorage.removeItem('user')
    location.reload() // refresh page make vuex state and axios header are clearing
  }
}

const actions = {
  login ({ commit }, credentials) {
    console.log("vuex-->Actions")
  
    return api
      .post('/login', credentials)
      .then(({ data }) => {
        console.log("Finish")
        commit('SET_USER_DATA', data)
      })
  },
  logout ({ commit }) {
    commit('CLEAR_USER_DATA')
  }
}

const getters = {
}

export default {
  state,
  mutations,
  actions,
  getters
}
