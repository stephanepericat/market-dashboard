<template>
  <div class="line-chart-container"></div>
</template>

<script>
/* globals Highcharts */

export default {
  name: "BaseLineChart",

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
      if (data && data.length && !this.lineChart) {
        this.initChart();
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
        // title: {
        //   text: `Stock Price for ${this.focus}`
        // },
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
