<template>
  <div id="information">
    <mu-card>
      <mu-card-header>
        比赛须知
      </mu-card-header>
      <h2>报名</h2>
      <p>以三人为团体报名，每队一个队长，每人限报一队</p>
      <h2>预选赛</h2>
      <p>1.以团体答题模式，在预选赛期间登陆网站答题，按照正确率进行排名</p>
      <p>2.排名前50的团队最终进入决赛
      <p>3.每道题仅有两次提交机会</p>
      <h2>总决赛</h2>
      <h3>团体赛</h3>
      <p>1.以团体为单位进行答题，一共15题</p>
      <p>2.每道题两次提交机会，提交错误则罚时2分钟，最终以答题数目和总耗时进行排名，并获得积分</p>
      <p>3.排名前25组内全员进入个人赛</p>
      <h3>复活赛</h3>
      <p>1.未进入决赛的团队中队员可以个人身份参加复活赛，角逐个人赛的参赛名额</p>
      <p>2.通过抢答形式完成10道搜索题，限时15分钟，最终按照正确率和完成时间综合排名决定出发顺序</p>
      <p>3.校园内C,CJ,D,DJ,泮池草坪，这些地点放置了Just搜搜的logo图片，参赛选手按照出发顺序开始寻找logo并撕下带回机房</p>
      <p>4.按照个人寻找到的logo数量进行排名，如果logo数量相同，则按照达到终点的时间排名</p>
      <p>5.复活赛排名前15进入个人赛</p>
      <h3>个人赛</h3>
      <p>1.由团体赛排名前25的团队成员和复活赛前15的个人参与</p>
      <p>2.个人赛一共40题，每道题有两次提交机会</p>
      <p>3.提交错误则罚时5分钟，最终以答题数目和总耗时进行排名，并获得积分</p>
      <h2>积分规则</h2>
      <p>1.每个环节（团体赛，个人赛）中，按照名词排序，每个人所获的积分N=(100/n)*(n-f+1)</p>
      <p> 其中N为所获得的积分，n为此环节参与的人数（组数），f为此人（组）此环节的排名</p>
      <p>2.每个环节占据的比重有所不一</p>
      <p>（1）最终团队得分按照：团队答题的100%进行计算</p>
      <p>（2）最终个人得分按照：团队答题得分30%，个人赛得分的70%进行计算</p>
      <h2>备注</h2>
      <p>1.比赛开始前半小时入场（12：00），比赛开始后不得入场</p>
      <p>2.比赛过程中若出现问题设备，请立即与现场工作人员联系，必要时更换设备</p>
      <p>3.比赛过程中若出现违规行为，一律取消参赛成绩</p>
      <p>4.小组成员必须达到二人或二人以上才能进行比赛，否则禁止答题</p>
    </mu-card>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'information',
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #information
    width 70%
    margin 0 auto
    padding-top 150px
    padding-bottom 50px
  
  .mu-card
    background-color rgba(255, 255, 255, 0.9)
    padding-bottom 80px
    border-radius 5px
    padding-left 100px
    padding-right 100px
    .mu-card-header
      font-size 1.5rem
      padding-top 40px
      text-align center
    h2
      color #6B7179
    h3
      color #9e9e9e
      text-align center
    p
      font-size 16px
      padding-left 40px
      padding-right 40px

</style>
