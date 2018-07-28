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

export default {
  components: {
    BaseLineChart
  },

  props: {
    focus: {
      type: String,
      required: true
    }
  },

  computed: {
    viewData() {
      return [
        [1469799000000, 104.21],
        [1470058200000, 106.05],
        [1470144600000, 104.48],
        [1470231000000, 105.79],
        [1470317400000, 105.87]
      ];
    }
  },

  mounted() {}
};
</script>

<style lang="scss">
.price-chart-container {
  height: 100%;
}
</style>
