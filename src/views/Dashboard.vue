<template>
  <v-container 
    class="dashboard"
    fluid 
  >
    <v-row>
      <v-col cols="12">
        <MemberComposition :statistics="statistics" />
      </v-col>
      <v-col cols="12">
        <template v-if="!loading">
          <AgeComposition :statistics="statistics" />
        </template>
      </v-col>
      <v-col cols="12">
        <template v-if="!loading">
          <JoinedLeftComposition :statistics="statistics" />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
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
  private statistics = StatisticsService.newInstance()

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
.dashboard {
  background-color: #fafafa;
}
</style>