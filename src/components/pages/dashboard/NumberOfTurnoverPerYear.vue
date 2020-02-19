<template>
  <v-card
    class="number_of_turnover_per_year"
    outlined
  >
    <v-card-title class="title">
      入退社数
    </v-card-title>
    <v-card-text>
      <v-row align="center">
        <v-col
          class="text-center"
          cols="12"
        >
          平均入社数
          <span class="number_of_turnover_per_year__average_joined">
             {{ averageJoined }}
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

interface NumberOfTurnoverPerYearIF {
  [key: number]: number
}

@Component({
  components: {
    BarChart: () => import('@/components/pages/dashboard/BarChart.vue'),
  },
})
export default class NumberOfTurnoverPerYear extends Vue {
  @Prop({type: Object, default: {}})
  private numberOfJoinedPerYear: NumberOfTurnoverPerYearIF

  @Prop({type: Object, default: {}})
  private numberOfLeftPerYear: NumberOfTurnoverPerYearIF

  private get chartData() {
    const joinedKeys = Object.keys(this.numberOfJoinedPerYear)
    const leftKeys = Object.keys(this.numberOfLeftPerYear)
    const maxYear = utils.now().year()
    const minJoinedYear = joinedKeys.length > 0 ? Math.min(...joinedKeys.map((e) => +e)) : maxYear;
    const minLeftYear = leftKeys.length > 0 ? Math.min(...leftKeys.map((e) => +e)) : maxYear;
    const minYear = Math.min(minJoinedYear, minLeftYear)
    const labels = [...Array(maxYear - minYear + 1)].map((v, i) => i + minYear)
    const joinedData = [...Array(maxYear - minYear + 1)].map((v, i) => i + minYear).map(v => this.numberOfJoinedPerYear[+v] || 0)
    const leftData = [...Array(maxYear - minYear + 1)].map((v, i) => i + minYear).map(v => this.numberOfLeftPerYear[+v] || 0)

    return {
			labels,
      datasets: [
        {
          label: '入社',
          backgroundColor: '#C8E6C9',
          borderColor: '#4CAF50',
          borderWidth: 1,
          data: joinedData,
        },
        {
          label: '退社',
          backgroundColor: '#FFCDD2',
          borderColor: '#F44336',
          borderWidth: 1,
          data: leftData,
        },
      ],
    };
  }

  private get chartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
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

  private get averageJoined() {
    if (Object.keys(this.numberOfJoinedPerYear).length === 0) return 0
    const minYear = Math.min(...Object.keys(this.numberOfJoinedPerYear).map((e) => +e))
    const maxYear = utils.now().year()
    const averageJoined = Object.values(this.numberOfJoinedPerYear).map(e => +e).reduce((a, b) => a + b, 0) / (maxYear - minYear)
    return Math.floor(averageJoined)
  }
}
</script>

<style lang="scss" scoped>
.number_of_turnover_per_year {
  &__average_joined {
    color: $secondary;
    font-weight: bold;
    font-size: 1.4rem;
  }
}
</style>