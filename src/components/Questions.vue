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
            <div class="qstn-title">{{this.status.name}}</div>
            <div class="qstn-description">{{this.status.description}} </div>
            <div class="qstn-legend" style="text-align:center;">{{progress}}/{{total}}已提交</div>
          </div>
          <mu-linear-progress mode="determinate" :value="progress" :max="total" />
          <div class="qstn-list">
            <mu-card v-for="(item, index) in questions.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index">
              <mu-card-title :title="index + 1 + '、 ' + item.title" />
              <mu-card-text v-for="(option, oindex) in item.options" :key="oindex">
                <mu-radio :disabled="answers[index+realIndex].maxtry===0 && answers[index+realIndex].selection!==oindex" :label='option' :name="'group' + index" :nativeValue="oindex" v-model="answers[index+realIndex].selection" class="demo-radio" /> <br/>
              </mu-card-text>
              <mu-card-actions class="item-actions">
                <mu-flat-button :label="answers[index+realIndex].maxtry===2?'未提交':'已提交'" />
                <mu-flat-button :label="answers[index+realIndex].maxtry===2?'提交答案':'修改答案'" @click="postAnswer(index+realIndex)" :disabled="answers[index+realIndex].maxtry===0" />
              </mu-card-actions>
            </mu-card>
            <mu-divider />
          </div>
        </div>
        <div class="page-control">
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
      stage: 0
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
    // total: function () {
    //   return this.questions.length
    // }
  },
  created () {
    this.getAllQuestions()
    this.$http.get('/api/stage/').then((response) => {
      this.stage = response.data
    })
    // console.log(this.currentPage)
  },
  methods: {
    pageChange: function (page) {
      this.currentPage = page
      console.log(page)
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
          for (var i = 1; i < response.data.length; i++) {
            this.questions.push({
              title: response.data[i].content,
              options: response.data[i].options
            })
            this.answers.push({
              answer: ''
            })
          }
          this.total = response.data.length
          this.getAllAnswers()
        })
    },
    getAllAnswers: function () {
      this.$http.get('/api/questionset/0/answers/')
        .then((response) => {
          this.answers = response.data
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
          this.answers[index].selection = response.data.selection
          this.answers[index].maxtry = response.data.maxtry
          // console.log(this.answers)
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
  min-height 25vh
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
  font-size: 34px;
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
  margin-top 10px;
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
  padding 100px 167px;
}
.raised-button {
  float left;
}
.copyright {
  margin-bottom 0;
  padding-bottom 20px;
}
</style>