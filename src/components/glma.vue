<template>
  <div class="glma-container" v-bind:class="viewType">
    <base-grid
      ref="grid"
      :columnSet="columns"
      :viewData="stats"
      :gridOptions="gridOptions"
    ></base-grid> 
  </div>
</template>

<script>
import BaseGrid from "@/components/base-grid";
import GLMAService from "@/services/list";

// config
import columnSet from "@/config/watchlist-columns";

export default {
  name: "GLMAComponent",

  components: {
    BaseGrid
  },

  mixins: [GLMAService],

  data() {
    return {
      gridOptions: {
        enableCellChangeFlash: true,
        deltaRowDataMode: true,
        getRowNodeId: function(data) {
          return data.symbol;
        }
      },

      frequency: 5000
    };
  },

  props: {
    viewType: {
      required: true,
      type: String
    }
  },

  computed: {
    columns() {
      return columnSet;
    },

    stats() {
      return this.$store.getters.getGlmaData
        ? this.$store.getters.getGlmaData[this.viewType]
        : [];
    }
  },

  created() {
    this.getGlmaData();

    this.$_dataPoll = setInterval(() => {
      this.getGlmaData();
    }, this.frequency);
  },

  beforeDestroy() {
    if (this.$_dataPoll) {
      clearInterval(this.$_dataPoll);
      this.$_dataPoll = null;
    }
  },

  methods: {
    getGlmaData() {
      return this.getGlmaStats()
        .then(res => {
          this.setGlmaData(res);
        })
        .catch(e => console.error(e));
    },

    setGlmaData(rawData) {
      this.$store.commit("setGlmaData", rawData);
    }
  }
};
</script>

<style lang="scss">
.glma-container {
  background-color: #2d3436;
  height: 100%;
  width: 100%;
}
</style>
