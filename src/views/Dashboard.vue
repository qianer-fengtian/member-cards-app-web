<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <MemberComposition
          :total="statistics.total"
          :male-total="statistics.maleTotal"
          :female-total="statistics.femaleTotal"
        />
      </v-col>
      <v-col cols="12">
        <template v-if="!loading">
          <AgeComposition :population-by-age="statistics.populationByAge" />
        </template>
      </v-col>
      <v-col cols="12">
        <template v-if="!loading">
          <JoinedLeftComposition
            :number-of-joined-per-year="statistics.numberOfJoinedPerYear"
            :number-of-left-per-year="statistics.numberOfLeftPerYear"
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

@Component({
  components: {
    MemberComposition: () => import('@/components/pages/dashboard/member-composition/MemberComposition.vue'),
    AgeComposition: () => import('@/components/pages/dashboard/age-composition/AgeComposition.vue'),
    JoinedLeftComposition: () => import('@/components/pages/dashboard/joined-left-composition/JoinedLeftComposition.vue'),  
  },
})
export default class Dashboard extends Vue {
  private loading: boolean = false
  private statistics: MemberStatistics = {
    total: 0,
    maleTotal: 0,
    femaleTotal: 0,
    numberOfJoinedPerYear: {},
    numberOfLeftPerYear: {},
    populationByAge: {},
  }

  async created() {
    try {
      this.loading = true
      this.statistics = await MemberService.statistics()
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