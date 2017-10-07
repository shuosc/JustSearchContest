<template>
  <div id="navbar">
    <mu-appbar>
      <mu-flat-button color="white" label="登录" slot="right" icon=":iconfont icon-login" @click="goPath('/login')" v-if="!loginState"></mu-flat-button>
      <mu-flat-button color="white" label="个人中心" slot="right" icon=":iconfont icon-person" v-else @click="goPath('/center')"></mu-flat-button>
      <mu-flat-button color="white" label="开始答题" slot="right" icon=":iconfont icon-question" @click="goPath('/questions')"></mu-flat-button>
       <!-- <mu-flat-button color="white" label="排行榜" slot="right" icon=":iconfont icon-rules" @click="goPath('/rank')"></mu-flat-button> -->
      <mu-flat-button color="white" label="比赛须知" slot="right" icon=":iconfont icon-rules" @click="goPath('/information')"></mu-flat-button>
      <mu-flat-button color="white" label="关于" slot="right" icon=":iconfont icon-information" @click="goPath('/about')"></mu-flat-button>
    </mu-appbar>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'navbar',
  methods: {
    goPath: function (path) {
      this.$router.push(path)
    }
  },
  computed: {
    loginState: function () {
      return this.$store.state.user.account.loginState
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
