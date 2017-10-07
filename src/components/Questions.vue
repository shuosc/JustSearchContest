<template>
  <div id="index">
    <div id="header"></div>
    <div id="main-content">
      <mu-paper class="demo-paper" :zDepth="1">
        <div class="banner-top"></div>
        <div class="wrapper-qstn">
          <div class="qstn-header">
            <div class="qstn-title">{{this.status.name}}</div>
            <div class="qstn-description">{{this.status.description}} </div>
            <div class="qstn-legend">{{this.status.legend}}</div>
          </div>
          <div class="qstn-list">
            <mu-card v-for="(item, index) in questions" :key="index">
              <mu-card-title :title="index + 1 + '、 ' + item.title" />
              <mu-card-text v-for="(option, oindex) in item.options" :key="oindex">
                <mu-radio :label='option' :name="'group' + index" :nativeValue="'option' + oindex" v-model="answers[index].answer" class="demo-radio" /> <br/>
              </mu-card-text>
              <mu-card-actions class="item-actions">
                <mu-flat-button :label="item.updateButtonLabel" @click="postAnswer(index)" :disable="item.updateButtonIsDisable" />
              </mu-card-actions>
            </mu-card>
            <mu-divider />
          </div>
        </div>
        <div class="page-control">
          <mu-raised-button label="下一页" class="raised-button" primary/>
        </div>
      </mu-paper>
      <div class="copyright">
        <p>Copyright &copy; 2017 Shanghai University Open Source Community</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      status: {
        name: '初选赛',
        code: ''
      },
      allItems: [],
      currentPage: '',
      allPages: '',
      questions: [],
      answers: [
        {
          answer: '',
          changeAble: true
        },
        {
          answer: '',
          changeAble: true
        }
      ]
    }
  },
  created () {
    this.getAllQuestions()
  },
  methods: {
    loadInfo: function () {
    },
    getStatus: function () {
      this.$http.get('/')
        .then(function (response) {
          this.status = response
        })
    },
    getAllQuestions: function () {
      this.$http.get(`/api/questionset/0/questions/`)
        .then((response) => {
          for (var i = 1; i < response.data.length; i++) {
            this.questions.push({
              title: response.data[i].content,
              options: response.data[i].options
            })
            // this.allItems.title = response.data[i].content
            // this.allItems.options = response.data[i].options
            // this.allItems.$set('updateButtonLabel', '提交答案')
            // this.allItems.$set('updateButtonIsDisable', false)
            this.answers.push({
              answer: ''
            })
          }
          // 加载全部页数
          if (response.data.length % 20 === 0) {
            this.allPages = response.data.length / 20
          } else {
            this.allPages = response.data.length / 20 + 1
          }
        })
    },
    loadQuestions: function () { },
    postAnswer: function (index) {
      console.log(this.answers[index].answer)
      this.$http.post('/', this.answers[index])
        .then(function (response) {
          this.answers = response
          if (this.answers[index].changeAble === true) {
            this.items[index].updateButtonLabel = '修改答案'
          } else {
            this.items[index].updateButtonLabel = '不可修改'
            this.items[index].updateButtonIsDisable = true
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
#header {
  height 250px;
  background-color #3C3C3C;
}
#main-content {
  background-color rgb(228,229,207);
}
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
  padding 40px 150px
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