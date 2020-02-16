<template>
  <v-card
    class="number_of_hires_per_year"
    outlined
  >
    <v-card-title class="title">
      年ごとの入社人数
    </v-card-title>
    <v-card-text>
      <v-row align="center">
        <v-col
          class="text-center"
          cols="12"
        >
          平均入社数
          <span class="number_of_hires_per_year__average_hire">
             {{ averageHire }}
          </span>
          人
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
import * as utils from '@/utils'
import { Component, Vue, Prop } from 'vue-property-decorator'

interface NumberOfHiresPerYearIF {
  [key: number]: number
}

@Component({
  components: {
    BarChart: () => import('@/components/pages/dashboard/BarChart.vue'),
  },
})
export default class numberOfHiresPerYear extends Vue {
  @Prop({type: Object, default: {}})
  private numberOfHiresPerYear: NumberOfHiresPerYearIF

  private get chartData() {
    if (Object.keys(this.numberOfHiresPerYear).length === 0) return null
    const minYear = Math.min(...Object.keys(this.numberOfHiresPerYear).map((e) => +e))
    const maxYear = utils.now().year()
    const labels = [...Array(maxYear - minYear + 1)].map((v, i) => i + minYear)
    const data = [...Array(maxYear - minYear + 1)].map((v, i) => i + minYear).map(v => this.numberOfHiresPerYear[+v])

    return {
			labels,
      datasets: [{
        backgroundColor: '#00A6ED33',
        borderColor: '#00A6ED',
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

  private get averageHire() {
    if (Object.keys(this.numberOfHiresPerYear).length === 0) return 0
    const averageHire = Object.keys(this.numberOfHiresPerYear).map(e => +e).reduce((a, b) => a + b, 0) / Object.keys(this.numberOfHiresPerYear).length
    return Math.round(averageHire)
  }
}
</script>

<style lang="scss" scoped>
.number_of_hires_per_year {
  &__average_hire {
    color: $secondary;
    font-weight: bold;
    font-size: 1.4rem;
  }
}
</style>