<template>
  <v-container fluid>
    <v-btn-toggle v-model="viewMode">
      <v-btn :value="0">すべて</v-btn>
      <v-btn :value="1">部署別</v-btn>
      <v-btn :value="2">チーム別</v-btn>
    </v-btn-toggle>
    <v-row>
      <template v-for="[name, members] in cards">
        <v-col :key="name" cols="12">
          <span class="headline">
            {{ name }}
          </span>
        </v-col>
        <template v-for="member in members">
          <v-col
            :key="member.id"
            sm="6"
            md="4"
            lg="3"
          >
            <MemberListItem
              :member="member"
              :loading="loading"
            />
          </v-col> 
        </template>
      </template>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {Member} from '@/models/member/Member'
import MemberService from '@/models/member/MemberService'
import {Department} from '@/models/department/Department'
import DepartmentService from '@/models/department/DepartmentService'
import {Team} from '@/models/team/Team'
import TeamService from '@/models/team/TeamService'

@Component({
  components: {
    MemberListItem: () => import('@/components/pages/member/MemberListItem.vue'),
  },
})
export default class MemberList extends Vue {
  private loading: boolean = false
  private members: Array<Member> = []
  private departments: Array<Department> = []
  private teams: Array<Team> = []
  private departmentNameMap: Map<string, string> = new Map()
  private teamNameMap: Map<string, string> = new Map()
  private viewMode: number = 0

  private get cards() {
    const cards = [
      new Map([['all', this.members]]),
      new Map(this.departments.map(department => {
        return [department.name, this.members.filter(member => member.departmentId === department.id)]
      })),
      new Map(this.teams.map(team => {
        return [team.name, this.members.filter(member => member.teamId === team.id)]
      }))      
    ]
    return cards[this.viewMode]
  }

  async created() {
    try {
      this.loading = true

      const { total } = await MemberService.statistics()      
      this.members = Array(total).join(',').split(',').map(() => this.getDummyMember())

      this.members = await MemberService.search()
      this.departments = await DepartmentService.search()
      this.teams = await TeamService.search()
      this.departmentNameMap = await DepartmentService.getNameMap()
      this.teamNameMap = await TeamService.getNameMap()
      this.members.forEach(member => {
        member.departmentName = this.departmentNameMap.get(member.departmentId) || ''
        member.teamName = this.teamNameMap.get(member.teamId) || ''
      })
    } catch (err) {
      this.$notify({
        type: 'error',
        text: 'メンバーカードの取得に失敗しました',
      });
    } finally {
      this.loading = false
    }
  }

  getDummyMember() {
    const member = MemberService.newInstance()
    member.name = '-'
    return member
  }
}
</script>
