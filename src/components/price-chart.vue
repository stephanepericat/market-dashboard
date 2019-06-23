<template>
  <div class="price-chart-container">
    <base-line-chart
      v-show="!busy"
      ref="lineChart"
      :chartData="viewData"
      :focus="focus"
    >
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

  data() {
    return {
      busy: true
    };
  },

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

  watch: {
    focus(ticker) {
      if (ticker) {
        this.reloadData(ticker);
      }
    }
  },

  created() {
    this.getChartData(this.focus);
  },

  methods: {
    getChartData(ticker) {
      return this.getHistoricalData(ticker)
        .then(res => {
          if (res && res.data) {
            this.setHistoricalData(res.data);
          }

          this.busy = false;
        })
        .catch(e => console.error(e));
    },

    setHistoricalData(rawData) {
      this.$store.commit("setHistoricalData", rawData);
    },

    reloadData(ticker) {
      this.busy = true;
      this.setHistoricalData([]);
      return this.getChartData(ticker);
    }
  }
};
</script>

<style lang="scss">
.price-chart-container {
  height: 100%;
}
</style>
