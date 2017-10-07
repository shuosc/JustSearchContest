<template>
  <div style="margin:5rem;">
    <mu-flexbox style="margin-bottom:10px;">
      <mu-flexbox-item>
        <mu-paper :zDepth="1">
          <mu-card>
            <mu-card-title title="个人信息" subTitle="Personal Info" />
            <mu-card-header :title="user.name" :subTitle="user.cardID">
              <mu-avatar :src="`https://static.shuhelper.cn/${user.avatar}`" slot="avatar" />
            </mu-card-header>
          </mu-card>
        </mu-paper>
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-flexbox style="margin-bottom:10px;">
      <mu-flexbox-item>
        <mu-paper :zDepth="1">
          <mu-card v-if="team">
            <mu-card-title title="队伍信息" subTitle="Team Info" />
            <mu-card-header :title="team.name + '队'" :subTitle="team._id.$oid">
              <mu-avatar :src="`https://static.shuhelper.cn/avatar_default.jpg`" slot="avatar" />
            </mu-card-header>

            <mu-list>
              <mu-sub-header>队员</mu-sub-header>
              <mu-list-item :title="member.name" v-for="(member,index) in team.members" :key="member">
                <mu-avatar :src="`https://static.shuhelper.cn/${member.avatar}`" slot="leftAvatar" />{{member.name}}
                <div slot="right" v-if="true">
                  <mu-flat-button v-if="index===0" slot="right" @click="removeMember(index)">解散队伍</mu-flat-button>
                  <mu-flat-button v-else @click="removeMember(index)">踢出队伍</mu-flat-button>
                </div>
                <div slot="right" v-else>
                  <mu-flat-button v-if="true" @click="removeMember(index)">退出队伍</mu-flat-button>
                </div>
              </mu-list-item>
            </mu-list>
            <mu-card-text>
              <mu-flat-button primary>加队链接:</mu-flat-button>
              http://soso.shuhelper.cn/#/login/?team={{team._id.$oid}}<br/>
              <mu-flat-button primary>说明:</mu-flat-button>
              <span style="color:grey;font-size:0.8rem">将这个链接复制给您的队友，队友登陆后自动加入本队。</span>

            </mu-card-text>
          </mu-card>
          <mu-card v-else>
            <mu-card-title title="队伍信息" subTitle="Team Info" />
            <mu-card-text>
              您尚未加入任何队伍，您现在可以：
              <mu-flat-button primary @click="openJoin">加入队伍</mu-flat-button> 或
              <mu-flat-button primary @click="openCreate">创建队伍</mu-flat-button>
              <mu-dialog :open="joinDialog" title="加入队伍">
                请联系您的队长索取加队链接。
                <mu-flat-button label="确定" slot="actions" primary @click="close" />
              </mu-dialog>
              <mu-dialog :open="createDialog" title="输入队伍名来创建一支队伍">
                <mu-text-field style="width:100%;" label="队伍名" errorText="请输入队伍名" v-model="teamName" maxLength="10" required/><br/>
                <mu-flat-button label="创建队伍" slot="actions" primary @click="createTeam" />
                <mu-flat-button label="关闭" slot="actions" primary @click="close" />
              </mu-dialog>
            </mu-card-text>
          </mu-card>
        </mu-paper>
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-flexbox>
      <mu-flexbox-item>
        <mu-paper :zDepth="1">
          <mu-card>
            <mu-card-title title="比赛得分" subTitle="Contest Scores" />
            <mu-card-text>
              <mu-card-text>
                <mu-table>
                  <mu-tr>
                    <mu-th>预选赛</mu-th>
                  </mu-tr>
                  <mu-tr>
                    <mu-th>团体赛</mu-th>
                  </mu-tr>
                  <mu-tr>
                    <mu-th>复活赛</mu-th>
                  </mu-tr>
                  <mu-tr>
                    <mu-th>个人赛</mu-th>
                  </mu-tr>
                </mu-table>
              </mu-card-text>
            </mu-card-text>
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
      msg: 'Welcome to Your Vue.js App',
      team: {},
      joinDialog: false,
      createDialog: false,
      teamName: ''
    }
  },
  created () {
    this.getTeam()
  },
  computed: {
    user: function () {
      return this.$store.state.user.account
    }
  },
  methods: {
    getTeam: function () {
      this.$http.get('/api/teams/my/').then((response) => {
        this.team = response.data[0]
      })
    },
    openJoin: function () {
      this.joinDialog = true
    },
    openCreate: function () {
      this.createDialog = true
    },
    close: function () {
      this.joinDialog = false
      this.createDialog = false
    },
    createTeam: function () {
      this.$http.post('/api/teams/', {
        name: this.teamName
      }).then((response) => {
        console.log(response)
        this.close()
        this.getTeam()
      })
    },
    removeMember (index) {
      console.log(index)
      this.$http.delete(`/api/teams/${this.team._id.$oid}/members/?index=${index}`)
        .then((response) => {
          console.log(response)
          this.getTeam()
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
