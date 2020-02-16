<script lang="ts">
import { Component, Mixins, Prop } from "vue-property-decorator"
import Chart from "chart.js"
import { Line, Bar, mixins } from "vue-chartjs"

@Component({})
export default class BarChart extends Mixins(Bar, mixins.reactiveProp) {
  @Prop() public chartData: Chart.ChartData;
  @Prop() public chartOptions: Chart.ChartOptions;

  public mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  }
}
</script>