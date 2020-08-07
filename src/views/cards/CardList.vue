<template>
  <v-container fluid>
    <v-row justify="end">
      <v-btn-toggle
        v-model="viewMode"
        color="primary"
        tile
        group
      >
        <v-btn :value="0">すべて</v-btn>
        <v-btn :value="1">部署別</v-btn>
        <v-btn :value="2">チーム別</v-btn>
      </v-btn-toggle>
    </v-row>
    <v-row>
      <v-card class="card-list-wrapper" outlined>
        <v-card class="card-list" outlined>
          <v-tabs
            v-model="tab"
            color="secondary"
            slider-size="0"
            vertical
          >
            <v-tab
              v-for="([name], index) in cards"
              :key="index"
            >
              {{ name }}
            </v-tab>
            <v-tab-item
              v-for="([name, members], index) in cards"
              :key="index"
            >
              <v-container
                id="scroll-target"
                class="tab-container overflow-y-auto"
              >
                <v-row>
                  <template v-for="member in members">
                    <v-col
                      :key="member.id"
                      sm="6"
                      lg="4"
                    >
                      <MemberListItem
                        :member="member"
                        :loading="loading"
                      />
                    </v-col> 
                  </template>          
                </v-row>
              </v-container>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import { Member } from '@/models/member/Member'
import MemberService from '@/models/member/MemberService'
import { Department } from '@/models/department/Department'
import DepartmentService from '@/models/department/DepartmentService'
import { Team } from '@/models/team/Team'
import TeamService from '@/models/team/TeamService'
import StatisticsService from '@/models/statistics/StatisticsService'

@Component({
  components: {
    MemberListItem: () => import('@/components/pages/member/MemberListItem.vue'),
    DashboardCard: () => import('@/components/pages/dashboard/DashboardCard.vue'),
  },
})
export default class MemberList extends Vue {
  private loading: boolean = false
  private members: Array<Member> = []
  private departments: Array<Department> = []
  private teams: Array<Team> = []
  private viewMode: number = 0
  private tab = 0

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

      const { memberStastics } = await StatisticsService.getAll()
      this.members = Array(memberStastics.total).join(',').split(',').map(() => this.getDummyMember())

      this.members = await MemberService.getEmployees()
      
      MemberService.getEmployeeAvatars().then(memberAvatars => {
        const avatarMap = Object.fromEntries(memberAvatars.map(e => [e.id, e.avatar]))
        for (const member of this.members) {
          member.avatar = avatarMap[member.id]
        }
      })

      this.departments = await DepartmentService.search()
      this.teams = await TeamService.search()
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

  @Watch('viewMode')
  onViewModeChanged() {
    this.tab = 0
  }
}
</script>

<style lang="scss" scoped>
.card-list-wrapper,
.card-list {
  margin: auto;
  width: 90vw;
}

.card-list-wrapper {
  background: linear-gradient(135deg, rgba(0,166,237,1) 0%, rgba(136,73,194,1) 63%, rgba(246,81,29,1) 100%);
  padding: 1px;
}

.tab-container {
  max-height: 80vh;
}
</style>