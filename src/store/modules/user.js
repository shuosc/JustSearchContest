const state = {
  user: {
    card_id: '',
    password: '',
    loginState: false
  }
}

const mutations = {
  login: function (state) {
    state.loginState = true
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
