<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <MemberComposition
          :total="statistics.memberStastics.total"
          :male-total="statistics.memberStastics.maleTotal"
          :female-total="statistics.memberStastics.femaleTotal"
        />
      </v-col>
      <v-col cols="12">
        <template v-if="!loading">
          <AgeComposition :population-by-age="statistics.memberStastics.populationByAge" />
        </template>
      </v-col>
      <v-col cols="12">
        <template v-if="!loading">
          <JoinedLeftComposition
            :new-graduates="statistics.memberStastics.newGraduates"
            :mid-careers="statistics.memberStastics.midCareers"
            :numbers-of-employments="statistics.numbersOfEmployments"
            :numbers-of-retirements="statistics.numbersOfRetirements"
          />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import DepartmentService from '@/models/department/DepartmentService'
import MemberService from '@/models/member/MemberService'
import {MemberStatistics} from '@/models/member/Member'
import { Statistics } from '@/models/statistics/Statistics'
import StatisticsService from '@/models/statistics/StatisticsService'

@Component({
  components: {
    MemberComposition: () => import('@/components/pages/dashboard/member-composition/MemberComposition.vue'),
    AgeComposition: () => import('@/components/pages/dashboard/age-composition/AgeComposition.vue'),
    JoinedLeftComposition: () => import('@/components/pages/dashboard/joined-left-composition/JoinedLeftComposition.vue'),  
  },
})
export default class Dashboard extends Vue {
  private loading: boolean = false
  private statistics: Statistics = {
    numbersOfEmployments: [],
    numbersOfRetirements: [],  
    memberStastics: {
      total: 0,
      maleTotal: 0,
      femaleTotal: 0,
      newGraduates: 0,
      midCareers: 0,
      populationByAge: {},
    },
  }

  async created() {
    try {
      this.loading = true
      this.statistics = await StatisticsService.getAll()
    } catch (err) {
      this.$notify({
        type: 'error',
        text: 'ダッシュボードの取得に失敗しました',
      });      
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>