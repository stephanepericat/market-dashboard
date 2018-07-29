<template>
  <div class="price-chart-container">
    <base-line-chart
      ref="lineChart"
      :chartData="viewData"
      :focus="focus">
    </base-line-chart>
  </div>
</template>

<script>
import BaseLineChart from "@/components/base-line-chart";
import ChartService from "@/services/chart";

export default {
  name: "PriceChartComponent",

  components: {
    BaseLineChart
  },

  mixins: [ChartService],

  props: {
    focus: {
      type: String,
      required: true
    }
  },

  computed: {
    viewData() {
      return this.$store.getters.getChartData;
    }
  },

  created() {
    this.getHistoricalData(this.focus)
      .then(res => {
        if (res && res.data) {
          this.setHistoricalData(res.data);
        }
      })
      .catch(e => console.error(e));
  },

  methods: {
    setHistoricalData(rawData) {
      this.$store.commit("setHistoricalData", rawData);
    }
  }
};
</script>

<style lang="scss">
.price-chart-container {
  height: 100%;
}
</style>
