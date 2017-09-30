<template>
  <div id="index">
    <div id="login">
      <mu-card>
        <mu-card-header>
          登录
        </mu-card-header>
        <div id="input">
          <mu-text-field label="一卡通账号" labelFloat icon=":iconfont icon-account" :maxLength="8" />
          <mu-text-field label="密码" :type="passwordVisible?'text':'password'" labelFloat
                         icon=":iconfont icon-password" />
          <mu-checkbox uncheckIcon=":iconfont icon-invisible" checkedIcon=":iconfont icon-visible"
                       v-model="passwordVisible" />
        </div>
        <mu-raised-button label="登录" primary />
      </mu-card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'index',
    data: function () {
      return {
        passwordVisible: false,
        showLogin: false
      }
    },
    methods: {
      clickLogin: function () {
        this.showLogin = true
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #index
    margin 0
    height 100%
  
  #login
    width 400px
    margin 250px auto 0
  
  .mu-card
    background-color rgba(255, 255, 255, 0.9)
    text-align center
    padding-bottom 80px
    border-radius 5px
    .mu-card-header
      font-size 1.2rem
      padding-top 40px
    #input
      width 300px
      text-align left
      margin 0 auto
      padding-bottom 40px

</style>


