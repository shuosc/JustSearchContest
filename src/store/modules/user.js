const state = {
  account: {
    cardID: '',
    name: '',
    password: '',
    avatar: '',
    token: '',
    loginState: false
  }
}

const mutations = {
  login: function (state, payload) {
    state.account = payload
  },
  logout: function (state) {
    // 提交答案函数
    state.loginState = false
  }
}

export default {
  state,
  mutations
}
