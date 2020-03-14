<template>
  <v-row>
    <v-col
      cols="12"
      md="2"
    >
      <DashboardCard title="平均年齢">
        <div class="average-age">
          {{ statistics.averageAge }}
        </div>
      </DashboardCard>
    </v-col>
    <v-col
      cols="12"
      md="10"
    >
      <DashboardCard title="年齢別人数">
        <PopulationByAge :population-by-age="statistics.populationByAge" />
      </DashboardCard>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Statistics } from '@/models/statistics/Statistics'

@Component({
  components: {
    DashboardCard: () => import('@/components/pages/dashboard/DashboardCard.vue'),
    PopulationByAge: () => import('@/components/pages/dashboard/age-composition/PopulationByAge.vue'),
  },
})
export default class AgeComposition extends Vue {
  @Prop({ type: Object, required: true })
  private statistics: Statistics
}
</script>

<style lang="scss" scoped>
.average-age {
  color: $accent;
  margin: auto;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  line-height: 60px;
}
</style>