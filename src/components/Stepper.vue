<template>
  <div id="stepper">
    <mu-stepper :activeStep="step">
      <mu-step>
        <mu-step-label>
          报名
        </mu-step-label>
      </mu-step>
      <mu-step>
        <mu-step-label>
          预选赛(10/15~10/23)
        </mu-step-label>
      </mu-step>
      <mu-step>
        <mu-step-label>
          团体赛(11/4 12:30~13:15)
        </mu-step-label>
      </mu-step>
      <mu-step>
        <mu-step-label>
          复活赛(13:30~13:45)
        </mu-step-label>
      </mu-step>
      <mu-step>
        <mu-step-label>
          个人赛(15:00~16:00)
        </mu-step-label>
      </mu-step>
    </mu-stepper>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'stepper',
  data () {
    return {
      step: 1
    }
  },
  created () {
    console.log('created')
    this.$http.get('/api/stage/')
      .then((response) => {
        this.step = response.data.stage + 1
      })
  }
}
</script>

<style lang="stylus" scoped>
  #stepper
    padding-top 0
    width 90%
    margin 0 auto
    .mu-step-label
      font-size 15px
    .mu-step-label.active
        color #fff !important
</style>
