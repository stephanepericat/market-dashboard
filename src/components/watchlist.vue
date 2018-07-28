<template>
  <div class="watchlist-container">
    <base-grid
      ref="grid"
      :column-set="columns"
      :view-data="quotes"
    ></base-grid>  
  </div>  
</template>

<script>
import BaseGrid from "@/components/grid";
import QuoteService from "@/services/quote";

// config
import columnSet from "@/config/watchlist-columns";

export default {
  components: {
    BaseGrid
  },

  mixins: [QuoteService],

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
  },

  methods: {
    setQuoteData(data) {
      this.$store.dispatch("transformQuoteData", data);
    }
  }
};
</script>
<style lang="scss">
.watchlist-container {
  height: 100%;
}
</style>
