<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
    <mu-dialog :open="dialog" title="通知" @close="close">
      <mu-content-block style="text-align:left;line-height:200%;color:black;">
        受学校网络影响，登录可能不太稳定，请多尝试几次。<br/> 亲爱的皮卡丘们，just搜搜预选赛环节已结束啦，请各位皮卡丘前往排行榜查看自己队伍的排名，
        <br/> 如果你们的队伍排名为前50(包括第50)，那么恭喜你们进入决赛啦！
        <br/> 记得拉着你的队友按照队名＋学号＋名字验证方式加入just搜搜大群奥！群号码：
        <span style="color:red;">602284462</span><br/> 在参加决赛之前，你还有一场重要的培训会要参加哦，我们将在此次培训会中详细介绍决赛赛程赛制，更有专业的老师为大家详细讲解如何快速高效的进行信息检索，教你如何在决赛突出重围！
        <br/> 培训会有两个时间段，你可以选择任一时间段参加！具体时间地点如下：
        <br/>
        <p style="text-align:center;">10月27日（周五） 14:30-16:30 东区经管大楼101</p>
        <p style="text-align:center;">10月30日（周一） 18:00-20:00 Ej306</p>
        请各位皮卡丘们抓紧加群反馈参与培训会情况奥~<br/>
      </mu-content-block>
      <mu-flat-button slot="actions" primary @click="close" label="确定" />
      </mu-card>
    </mu-dialog>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: {
    Navbar
  },
  data () {
    return {
      dialog: false
    }
  },
  mounted () {
    this.dialog = true
  },
  methods: {
    close () {
      this.dialog = false
    }
  }
}
</script>

<style lang="stylus">
#app
  min-height 100vh
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  background-image url('./assets/index.jpg')
  background-size cover
  background-repeat no-repeat
  background-position center
  overflow hidden

html
  height 100%

body
  height 100%

::-webkit-scrollbar
  display none
</style>
