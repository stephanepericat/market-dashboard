<template>
  <div class="watchlist-container">
    <base-grid
      ref="grid"
      :columnSet="columns"
      :viewData="quotes"
      :gridOptions="gridOptions"
      :onCellClicked="handleCellClick"
      :onCellFocused="handleCellFocus"
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

  data() {
    return {
      gridOptions: {
        enableCellChangeFlash: true,
        deltaRowDataMode: true,
        getRowNodeId: function(data) {
          return data.symbol;
        }
      },

      frequency: 1000
    };
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
    }, this.frequency);
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

    setFocus(ticker) {
      this.$store.commit("setFocusedInvestment", ticker);
    },

    handleCellClick(cell) {
      if (!cell.column || cell.column.colId !== "companyName") {
        return;
      }

      if (cell.data && cell.data.symbol) {
        this.setFocus(cell.data.symbol);
      }
    },

    handleCellFocus(cell) {
      if (!cell.column || cell.column.colId !== "companyName") {
        return;
      }

      const row = cell.api.getDisplayedRowAtIndex(cell.rowIndex);

      if (row.data && row.data.symbol) {
        this.setFocus(row.data.symbol);
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
