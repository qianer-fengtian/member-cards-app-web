<template>
  <BarChart 
    chart-id="number-of-turnover-per-year"
    :height="200"
    :chart-data="chartData"
    :chart-options="chartOptions"
  />
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
    DashboardCard: () => import('@/components/pages/dashboard/DashboardCard.vue'),
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
}
</script>

<style lang="scss" scoped>
</style>