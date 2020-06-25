<template>
  <v-card>
    <v-card-title>
      チームリスト
    </v-card-title>
    <v-card-text>
      <v-data-table
        hide-default-footer
        sort-by="registeredDate"
        sort-desc
        loading-text="検索中..."
        :headers="headers"
        :items="teams"
        :items-per-page="itemsPerPage"
        :loading="loading"
        :page.sync="page"
        :search="keyword"
        @page-count="pageCount = $event"
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
            <TeamRegister
              :members="members"
              @after="search"
            />
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <TeamUpdate
            :id="item.id"
            :members="members"
            @after="search"
          />
          <TeamRemove
            :id="item.id"
            @after="search"
          />
        </template>
      </v-data-table>
      <v-pagination
        v-model="page"
        :length="pageCount"
      />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import {Team} from '@/models/team/Team'
import TeamService from '@/models/team/TeamService'
import {Member} from '@/models/member/Member'
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
  private members: Array<Member> = []
  private memberNameMap: Map<string, string> = new Map()
  private dialog: boolean = false
  private loading: boolean  = false
  private keyword: string = ''
  private page = 1
  private pageCount = 0
  private itemsPerPage = 10
  
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
    ];
  }

  async created() {
    this.search()
  }

  private async search() {
    try {
      this.loading = true
      this.teams = await TeamService.search()
      this.members = await MemberService.search()
      this.memberNameMap = await MemberService.getNameMap(this.members)
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
