<template>
  <div id="index">
    <div id="stepper">
      <mu-stepper :activeStep="0">
        <mu-step>
          <mu-step-label>
            报名
          </mu-step-label>
        </mu-step>
        <mu-step>
          <mu-step-label>
            预选赛
          </mu-step-label>
        </mu-step>
        <mu-step>
          <mu-step-label>
            团体赛
          </mu-step-label>
        </mu-step>
        <mu-step>
          <mu-step-label>
            复活赛
          </mu-step-label>
        </mu-step>
        <mu-step>
          <mu-step-label>
            个人赛
          </mu-step-label>
        </mu-step>
      </mu-stepper>
    </div>
    <div id="login">
      <mu-card>
        <mu-card-header>
          登录
        </mu-card-header>
        <div id="input">
          <mu-text-field label="一卡通账号" labelFloat icon=":iconfont icon-account" :maxLength="8" v-model="cardID" />
          <mu-text-field label="密码" :type="passwordVisible?'text':'password'" labelFloat v-model="password" icon=":iconfont icon-password" />
          <mu-checkbox uncheckIcon=":iconfont icon-invisible" checkedIcon=":iconfont icon-visible" v-model="passwordVisible" />
        </div>
        <mu-raised-button label="登录" primary @click.native="onLoginClick" />
      </mu-card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'index',
  data: function () {
    return {
      password: '',
      cardID: '',
      passwordVisible: false,
      showLogin: false
    }
  },
  methods: {
    onLoginClick: function () {
      this.$http.post('/api/login/', {
        card_id: this.cardID,
        password: this.password
      }).then((response) => {
        console.log(response)
        let data = response.data
        console.log(this.$store.state.user)
        this.$store.commit('login', {
          cardID: data.id,
          name: data.name,
          avatar: data.avatar,
          token: data.token,
          loginState: true
        })
      })
      this.showLogin = true
    }
  }
}
</script>

<style lang="stylus" scoped>
  #index
    margin 0
    height 100%
  
  #stepper
    padding-top 100px
    width 80%
    margin 0 auto
    .mu-step-label
      font-size 20px
    .mu-step-label.active
        color #fff !important
      
  #login
    width 400px
    margin 0 auto
    padding 100px 0
  
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


