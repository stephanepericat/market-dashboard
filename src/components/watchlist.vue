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
      return this.$store.state.quotes;
    }
  },

  created() {
    this.getQuotes(this.list)
      .then(res => this.setQuoteData(res.data))
      .catch(e => console.error(e));

    // TODO: add data poll
  },

  methods: {
    setQuoteData(data) {
      this.$store.dispatch("transformQuoteData", data);
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
