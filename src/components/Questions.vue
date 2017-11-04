<template>
  <div id="index">
    <div id="header">
      <stepper/>
    </div>
    <div id="main-content">
      <mu-paper class="demo-paper" :zDepth="1">
        <div class="banner-top">
        </div>
        <div class="wrapper-qstn">
          <div class="qstn-header">
            <div class="qstn-title">{{stage
              <0? '报名阶段':STAGE[stage]}} <mu-flat-button v-if="questions.length" primary style="float:right;" @click="onFinishClick">{{ finish?"已提交":"提交答卷"}}</mu-flat-button>
                <mu-flat-button v-if="questions.length" style="float:right;margin-right:20px;" @click="getAllAnswers">刷新答案</mu-flat-button>

                <!-- <mu-flat-button primary style="float:right;" @click="finish">{{ clock}}</mu-flat-button> -->
            </div>
            <div class="qstn-description">
              <br/>* 在结束之前，您可以点击提交答卷按钮提前结束，提前结束将得到时间奖励，答题得分相同时，排名按所耗时间加罚时决定。
              <br/>* 每一道题目都需要手动点击题目右下角的提交按钮来提交答案，并且每个题目有一次修改机会，但是每次错误提交都会导致罚时。
              <br/>* 小组中的任何人都可以提交题目，请做好沟通以避免冲突
              <!-- {{this.status.description}}当前时间：{{clock}} -->
              <br/>
              <span v-if="stage>=0">当前比赛于 {{timeLeft}}结束</span>
              <br/>下一场比赛于{{timeToNext}}开始</div>
            <div class="qstn-legend" style="text-align:center;" v-if="questions.length">{{progress}}/{{total}}已提交</div>
          </div>
          <mu-linear-progress mode="determinate" :value="progress" :max="total" v-if="questions.length" />
          <div class="page-control" v-if="questions.length">
            <mu-pagination :current="currentPage" :pageSize="pageSize" :total="total" @pageChange="pageChange">
            </mu-pagination>
          </div>
          <div v-if="questions.length" class="qstn-list">
            <mu-card v-for="(item, index) in questions.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index">
              <mu-card-title :title="index + 1 + '、 ' + item.title" />
              <mu-card-text v-for="(option, oindex) in item.options" :key="oindex">
                <mu-radio :disabled="(finish|| answers[index+realIndex].maxtry===0) && answers[index+realIndex].selection!==oindex.toString()" :label='option' :name="'group' + index" :nativeValue="oindex.toString()" v-model="answers[index+realIndex].selection" class="demo-radio" /> <br/>
              </mu-card-text>
              <mu-card-actions class="item-actions">
                <mu-flat-button :label="answers[index+realIndex].maxtry===2?'未提交':'已提交'" />
                <mu-flat-button :label="answers[index+realIndex].maxtry===2?'提交答案':'修改答案'" @click="postAnswer(index+realIndex)" :disabled="finish||answers[index+realIndex].maxtry===0" />
              </mu-card-actions>
            </mu-card>
            <mu-divider />
          </div>
          <div v-else>
            <mu-card style="height:100px;text-align:center;margin:20px;">
              <mu-card-title title="您在当前阶段没有题目" />
            </mu-card>
          </div>
        </div>
        <div class="page-control" v-if="questions.length">
          <mu-pagination :current="currentPage" :pageSize="pageSize" :total="total" @pageChange="pageChange">
          </mu-pagination>
        </div>
      </mu-paper>
      <div class="copyright">
        <p>Copyright &copy; 2017 Shanghai University Open Source Community</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable no-unused-vars */
// const STAGE = ['预选赛', '团体赛', '复活赛', '个人赛']
const STAGETIME = [
  new Date(2017, 9, 19, 0, 0, 0, 0),
  new Date(2017, 9, 23, 0, 0, 0, 0),
  new Date(2017, 10, 4, 12, 30, 0, 0),
  new Date(2017, 10, 4, 13, 15, 0, 0),
  new Date(2017, 10, 4, 13, 30, 0, 0),
  new Date(2017, 10, 4, 13, 45, 0, 0),
  new Date(2017, 10, 4, 15, 0, 0, 0),
  new Date(2017, 10, 4, 16, 0, 0, 0)
]
import Stepper from '@/components/Stepper.vue'
export default {
  components: {
    Stepper
  },
  data () {
    return {
      status: {
        name: '初选赛',
        code: ''
      },
      allItems: [],
      currentPage: 1,
      questions: [],
      answers: [],
      pageSize: 5,
      total: 10,
      stage: 0,
      finish: false,
      timerID: '',
      clock: '',
      timeLeft: '',
      timeToNext: '',
      STAGE: ['预选赛', '团体赛', '复活赛', '个人赛']
    }
  },
  computed: {
    realIndex: function () {
      return (this.currentPage - 1) * this.pageSize
    },
    progress: function () {
      let selected = 0
      for (let i = 0; i < this.answers.length; i++) {
        if (this.answers[i].maxtry !== 2) {
          selected++
        }
      }
      return selected
    }
  },
  created () {
    console.log(this.$store.state.user)
    if (this.$store.state.user.team.name === '') {
      alert('您必须参与一个小组方可开始答题')
      this.$router.push('/center')
    }
    this.$http.get('/api/stage/').then((response) => {
      this.stage = response.data.stage
      this.getAllQuestions()
    })
    this.timerID = setInterval(this.updateTime, 1000)
    this.updateTime()
  },
  beforeDestroy () {
    clearInterval(this.timerID)
  },
  methods: {
    zeroPadding (num, digit) {
      var zero = ''
      for (var i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    },
    updateTime () {
      // var cd = new Date()
      /* eslint-disable no-undef */
      this.clock = moment()
      // this.clock = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2)
      this.timeLeft = moment(STAGETIME[this.stage * 2 + 1]).endOf().fromNow()
      this.timeToNext = moment(STAGETIME[(this.stage + 1) * 2]).startOf().fromNow()
    },
    onFinishClick: function () {
      this.$http.get(`/api/questionset/${this.stage}/finish/`).then((response) => {
        alert('您已成功提交答卷')
      })
    },
    pageChange: function (page) {
      this.currentPage = page
    },
    loadInfo: function () {
    },
    getStatus: function () {
      this.$http.get('/')
        .then(function (response) {
          this.status = response
        })
    },
    getAllQuestions: function () {
      this.$http.get(`/api/questionset/${this.stage}/questions/`)
        .then((response) => {
          if (!response.data.success) {
            alert(response.data.reason)
            return
          }
          for (var i = 0; i < response.data.questions.length; i++) {
            this.questions.push({
              title: response.data.questions[i].content,
              options: response.data.questions[i].options
            })
            let answer = { selection: '-1', maxtry: 0 }
            this.answers.push(answer)
          }
          this.total = response.data.questions.length
          this.finish = response.data.finish
          this.getAllAnswers()
        })
    },
    getAllAnswers: function () {
      this.$http.get(`/api/questionset/${this.stage}/answers/`)
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            let item = response.data[i]
            this.answers[i].selection = item.selection.toString()
            this.answers[i].maxtry = item.maxtry
          }
        })
    },
    loadQuestions: function () { },
    postAnswer: function (index) {
      if (this.answers[index].selection === -1) {
        alert('请先选择')
        return
      }
      this.$http.post(`/api/questionset/0/answers/`, { index: index, selection: this.answers[index].selection })
        .then((response) => {
          this.answers[index].selection = response.data.selection.toString()
          this.answers[index].maxtry = response.data.maxtry
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
#index
  min-height 100vh

#header
  min-height 200px
  max-height 25vh
  background-color #3C3C3C;

#main-content
  background-color rgb(228,229,207)
  min-height 75vh
  
.demo-paper {
  display: inline-block;
  width: 70%;
  margin: 20px;
  position relative;
  top -150px;
}
.banner-top {
  height: 8px;
  width: 100%;
  background-color rgb(230, 248, 84);
  border-radius 2px 2px 0 0;
}
.wrapper-qstn  {
  padding 34px 17px;
  text-align left;
  padding-bottom 0;
}
.qstn-header {
  padding: 0 17px;
}
.qstn-title {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 35px
  line-height: 135%;
  max-width: 100%;
  min-width: 0%;
}
.qstn-description {
  white-space: pre-wrap;
  line-height: 135%;
  margin-top: 22px;
  font-size: 13px;
}
.qstn-list {
  margin-top 5px;
  // padding 40px 150px
  padding-bottom 0
}
.qstn-card {
  background-color: transparent;
  margin-top: 2px;
  padding: 16px 17px;
  page-break-inside: avoid;
  -webkit-transition: background-color 200ms cubic-bezier(0.0,0.0,0.2,1);
  transition: background-color 200ms cubic-bezier(0.0,0.0,0.2,1);
}
.mu-card-text {
  padding-top 0;
  padding-bottom 0;
}
.item-title {
  color: #000;
  font-size: 20px;
  line-height: 135%;
  width: 100%;
}
.demo-radio {
  margin-bottom: 16px;
}
.item-actions {
  text-align right;
}
.page-control {
  height 100px
  display flex
  align-items center
  justify-content center
  // padding 100px 167px;
}
.raised-button {
  float left;
}
.copyright {
  margin-bottom 0;
  padding-bottom 20px;
}
</style>