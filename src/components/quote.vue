<template>
  <div class="quote-container">
    <div class="header"></div>
    <div class="tiles"></div>
  </div>
</template>

<script>
import QuoteService from "@/services/quote";

export default {
  name: "QuoteComponent",

  mixins: [QuoteService],

  props: {
    focus: {
      type: String,
      required: true
    }
  },

  computed: {
    viewData() {
      return this.$store.getters.getQuoteData;
    }
  },

  created() {
    this.getStats(this.focus)
      .then(res => {
        this.setStatsData(res.data);
      })
      .catch(e => console.error(e));
  },

  methods: {
    setStatsData(rawData) {
      this.$store.commit("setStatsData", rawData);
    }
  }
};
</script>

<style lang="scss">
.quote-container {
  height: 100%;
}
</style>
