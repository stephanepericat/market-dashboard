<template>
  <div class="quote-container">
    <div class="header">
      <div class="as-of-info" v-text="asOfInfo"></div>
      <h2 class="company-name" v-text="headerData.name"></h2>
      <h1 class="last-price" v-text="headerData.latestPrice"></h1>
      <p class="change-info" v-bind:class="changeType" v-text="changeInfo"></p>
    </div>
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
      return this.$store.getters.getQuoteData || {};
    },

    headerData() {
      return {
        name: this.viewData.companyName,
        ticker: this.viewData.symbol,
        market: this.viewData.primaryExchange,
        sector: this.viewData.sector,
        latestUpdate: new Date(this.viewData.latestUpdate).toString(),
        latestPrice: this.viewData.latestPrice,
        change: this.viewData.change,
        changePercent: this.viewData.changePercent
      };
    },

    changeType() {
      if (!this.viewData.change) {
        return "zero";
      }

      return this.viewData.change > 0 ? "up" : "down";
    },

    changeInfo() {
      return `${this.headerData.change} | ${this.headerData.changePercent}%`;
    },

    asOfInfo() {
      return `${this.headerData.market} | ${this.headerData.sector} | As Of ${
        this.headerData.latestUpdate
      }`;
    }
  },

  created() {
    this.getStatsData(this.focus);
  },

  methods: {
    getStatsData(ticker) {
      return this.getStats(ticker)
        .then(res => {
          this.setStatsData(res.data);
        })
        .catch(e => console.error(e));
    },

    setStatsData(rawData) {
      this.$store.commit("setStatsData", rawData);
    }
  }
};
</script>

<style lang="scss">
.quote-container {
  background-color: #2d3436;
  height: calc(100% - 20px);
  overflow: hidden;
  padding: 10px;

  .header {
    border-bottom: 1px solid #555;
    padding-bottom: 15px;
    margin-bottom: 15px;

    .as-of-info {
      font-weight: 100;
      font-size: 12px;
      margin-bottom: 15px;
    }

    .company-name,
    .last-price,
    .change-info {
      margin: 0;
    }

    .company-name {
      font-weight: 600;
      font-size: 18px;
    }

    .last-price {
      font-weight: 700;
      font-size: 32px;
    }

    .change-info {
      font-weight: 100;
      font-size: 12px;

      &.down {
        color: red;
      }

      &.up {
        color: green;
      }
    }
  }
}
</style>
