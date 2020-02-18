<script lang="ts">
import { Component, Mixins, Prop } from "vue-property-decorator"
import Chart from "chart.js"
import { Line, mixins } from "vue-chartjs"

@Component({})
export default class LineChart extends Mixins(Line, mixins.reactiveProp) {
  @Prop() public chartData: Chart.ChartData;
  @Prop() public chartOptions: Chart.ChartOptions;

  public mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  }
}
</script>