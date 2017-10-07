<template>
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
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
  #stepper
    padding-top 50px
    width 80%
    margin 0 auto
    .mu-step-label
      font-size 20px
    .mu-step-label.active
        color #fff !important
</style>
