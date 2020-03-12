<template>
  <BarChart 
    chart-id="population-by-age"
    :height="200"
    :chart-data="chartData"
    :chart-options="chartOptions"
  />
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
}
</script>

<style lang="scss" scoped>
</style>