const state = {
  account: {
    cardID: '',
    name: '',
    password: '',
    avatar: '',
    token: '',
    loginState: false
  },
  team: {
    id: '',
    name: ''
  },
  personalTeam: {
    id: '',
    name: ''
  }
}

const mutations = {
  login: function (state, payload) {
    state.account = payload
  },
  logout: function (state) {
    state.account.loginState = false
  },
  updateTeam: function (state, payload) {
    state.team = payload
  },
  updatePersonalTeam: function (state, payload) {
    state.personalTeam = payload
  }
}

export default {
  state,
  mutations
}
