<template>
  <v-card
    class="population-by-age"
    outlined
  >
    <v-card-title class="title">
      年齢比
    </v-card-title>
    <v-card-text>
      <v-row align="center">
        <v-col
          class="text-center"
          cols="12"
        >
          <span class="population-by-age__average-age">
            {{ averageAge }}
          </span>
          歳
        </v-col>
        <v-col
          cols="12"
        >
          <BarChart 
            :chart-data="chartData"
            :chart-options="chartOptions"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'


interface PopulationByAgeIF {
  [key: number]: number
}

@Component({
  components: {
    BarChart: () => import('@/components/pages/dashboard/BarChart.vue'),
  },
})
export default class PopulationByAge extends Vue {
  @Prop({type: Object, default: {}})
  private populationByAge: PopulationByAgeIF

  private get chartData() {
    if (Object.keys(this.populationByAge).length === 0) return null
    const minAge = Math.min(...Object.keys(this.populationByAge).map((e) => +e))
    const maxAge = Math.max(...Object.keys(this.populationByAge).map((e) => +e))
    const labels = [...Array(maxAge - minAge + 1)].map((v, i) => i + minAge)
    const data = [...Array(maxAge - minAge + 1)].map((v, i) => i + minAge).map(v => this.populationByAge[+v] || 0)
    return {
			labels,
      datasets: [{
        backgroundColor: '#B3E5FC',
        borderColor: '#03A9F4',
        borderWidth: 1,
        data,
      }]
    };
  }

  private get chartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0,
              stepSize: 1,
            },
          },
        ],
      }
    }    
  }

  private get averageAge() {
    if (Object.keys(this.populationByAge).length === 0) return 0
    const averageAge = Object.keys(this.populationByAge).map(e => +e).reduce((a, b) => a + b, 0) / Object.keys(this.populationByAge).length
    return Math.round(averageAge)
  }
}
</script>

<style lang="scss" scoped>
.population-by-age {
  &__average-age {
    color: $secondary;
    font-weight: bold;
    font-size: 1.4rem;
  }
}
</style>