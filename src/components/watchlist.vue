<template>
  <div class="watchlist-container">
    <base-grid
      ref="grid"
      :columnSet="columns"
      :viewData="quotes"
      :onCellClicked="handleCellClick"
    ></base-grid>  
  </div>  
</template>

<script>
import BaseGrid from "@/components/base-grid";
import QuoteService from "@/services/quote";

// config
import columnSet from "@/config/watchlist-columns";

export default {
  name: "WatchlistComponent",

  components: {
    BaseGrid
  },

  mixins: [QuoteService],

  props: {
    focus: {
      type: String,
      required: true
    }
  },

  computed: {
    columns() {
      return columnSet;
    },

    list() {
      return this.$store.state.list;
    },

    quotes() {
      return this.$store.getters.getWatchlistData;
    }
  },

  created() {
    this.getQuoteData(this.list);

    this.$_dataPoll = setInterval(() => {
      this.getQuoteData(this.list);
    }, 1000);
  },

  beforeDestroy() {
    if (this.$_dataPoll) {
      clearInterval(this.$_dataPoll);
      this.$_dataPoll = null;
    }
  },

  methods: {
    getQuoteData(list) {
      return this.getQuotes(list)
        .then(res => this.setQuoteData(res.data))
        .catch(e => console.error(e));
    },

    setQuoteData(data) {
      this.$store.commit("setQuoteData", data);
    },

    handleCellClick(cell) {
      if (!cell.column || cell.column.colId !== "companyName") {
        return;
      }

      if (cell.data && cell.data.symbol) {
        this.$store.commit("setFocusedInvestment", cell.data.symbol);
      }
    }
  }
};
</script>
<style lang="scss">
.watchlist-container {
  height: 100%;
}
</style>
