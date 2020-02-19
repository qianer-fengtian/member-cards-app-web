<template>
  <v-card>
    <v-card-title>
      チームリスト
    </v-card-title>
    <v-card-text>
      <v-data-table
        sort-by="formattedRegisteredDate"
        sort-desc
        loading-text="検索中..."
        :headers="headers"
        :items="teams"
        :loading="loading"
        :search="keyword"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-text-field
              v-model="keyword"
              append-icon="mdi-magnify"
              label="検索"
              hide-details
            />
            <v-spacer />
            <TeamRegister @after="search" />
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <TeamUpdate
            :id="item.id"
            @after="search"
          />
          <TeamRemove
            :id="item.id"
            @after="search"
          />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import {Team} from '@/models/team/Team'
import TeamService from '@/models/team/TeamService'
import MemberService from '@/models/member/MemberService'

@Component({
  components: {
    TeamRegister: () => import('@/components/pages/team/TeamRegister.vue'),
    TeamRemove: () => import('@/components/pages/team/TeamRemove.vue'),
    TeamUpdate: () => import('@/components/pages/team/TeamUpdate.vue'),
  },
})
export default class TeamList extends Vue {
  private teams: Array<Team> = []
  private memberNameMap: Map<string, string> = new Map()
  private dialog: boolean = false
  private loading: boolean  = false
  private keyword: string = ''
  
  get headers(): Array<object> {
    return [
      {
        value: 'action',
        sortable: false,
        width: 100,
      },
      {
        text: 'チーム名',
        value: 'name',
      },
      {
        text: 'リーダー名',
        value: 'leaderName',
        width: 200,
      },
      {
        text: '登録年月日',
        align: 'center',
        value: 'formattedRegisteredDate',
        width: 120,
      },
      {
        text: '更新年月日',
        align: 'center',
        value: 'formattedModifiedDate',
        width: 120,
      },
    ];
  }

  async created() {
    this.search()
  }

  private async search() {
    try {
      this.loading = true
      this.teams = await TeamService.search()
      this.memberNameMap = await MemberService.getNameMap()
      this.teams.forEach(team => {
        team.leaderName = this.memberNameMap.get(team.leaderId) || ''
      })
    } catch (err) {
      this.$notify({
        type: 'error',
        text: 'チームの取得に失敗しました',
      });      
      this.teams = []
    } finally {
      this.loading = false
    }
  }
}
</script>