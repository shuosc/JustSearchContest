<template>
  <div style="margin:5rem;">
    <mu-flexbox style="margin-bottom:10px;">
      <mu-flexbox-item>
        <mu-paper :zDepth="1">
          <mu-card>
            <mu-card-title title="排行榜" subTitle="Rank List" />
            <mu-tabs :value="stage" @change="handleTabChange">
              <mu-tab value="0" title="预选赛(半小时更新)" />
              <mu-tab value="1" title="团体赛" />
              <mu-tab value="2" title="复活赛" />
              <mu-tab value="3" title="个人赛" />
              <mu-tab value="4" title="总排名" />
            </mu-tabs>
            <mu-list>
              <!-- <mu-sub-header></mu-sub-header> -->
              <mu-list-item :title="`#${index+1} ${team.name} 队`" v-for="(team,index) in rank" :key="index">
                {{team._id}}
              </mu-list-item>
            </mu-list>
          </mu-card>
        </mu-paper>
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'hello',
  data () {
    return {
      rank: [],
      stage: '0'
    }
  },
  created () {
    this.$http.get('/api/stage/')
      .then((response) => {
        this.stage = response.data.stage >= 0 ? response.data.stage.toString() : '0'
        this.getRank()
      })
  },
  computed: {
  },
  methods: {
    handleTabChange: function (value) {
      this.stage = value
      this.getRank()
    },
    getRank: function (stage) {
      this.$http.get(`/api/rank/${this.stage}/`)
        .then((response) => {
          this.rank = response.data
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
