<template>
  <DashboardCard>
    <v-row>
      <v-col
        cols="12"
        md="2"
      >
        <DashboardCard
          title="平均年齢"
          height="120"
        >
          <div class="average-age">
            {{ averageAge }}
          </div>
        </DashboardCard>
      </v-col>
      <v-col
        cols="12"
        md="10"
      >
        <DashboardCard title="年齢別人数">
          <PopulationByAge :population-by-age="populationByAge" />
        </DashboardCard>
      </v-col>
    </v-row>
  </DashboardCard>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
    DashboardCard: () => import('@/components/pages/dashboard/DashboardCard.vue'),
    PopulationByAge: () => import('@/components/pages/dashboard/age-composition/PopulationByAge.vue'),
  },
})
export default class AgeComposition extends Vue {
  @Prop({ type: Object, default: {}})
  private populationByAge: object

  private get averageAge() {
    if (Object.keys(this.populationByAge).length === 0) return 0
    const averageAge = Object.keys(this.populationByAge).map(e => +e).reduce((a, b) => a + b, 0) / Object.keys(this.populationByAge).length
    return Math.round(averageAge)
  }
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