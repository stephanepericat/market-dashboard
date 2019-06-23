<template>
  <div class="line-chart-container"></div>
</template>

<script>
/* globals Highcharts */

export default {
  name: "BaseLineChartComponent",

  props: {
    chartData: {
      type: Array,
      required: false,
      default: () => []
    },

    focus: {
      type: String,
      required: true
    }
  },

  watch: {
    chartData(data) {
      if (!data) {
        return;
      }

      if (!this.lineChart) {
        this.initChart();
      } else {
        this.updateChart();
      }
    }
  },

  created() {
    this.lineChart = null;
  },

  methods: {
    initChart() {
      this.lineChart = Highcharts.stockChart(this.$el, {
        rangeSelector: {
          selected: 1
        },
        series: [
          {
            name: this.focus,
            data: this.chartData,
            tooltip: {
              valueDecimals: 2
            }
          }
        ]
      });
    },

    updateChart() {
      this.lineChart.update({
        series: [
          {
            name: this.focus,
            data: this.chartData,
            tooltip: {
              valueDecimals: 2
            }
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss">
.line-chart-container {
  height: 100%;
}
</style>
