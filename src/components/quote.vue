<template>
  <div class="quote-container">
    <div class="header" v-if="headerData.name">
      <div class="as-of-info" v-text="asOfInfo"></div>
      <h2 class="company-name">
        <span class="full-name" v-text="headerData.name"></span>
        <span
          class="ticker"
          v-text="'(' + headerData.ticker + ')'">
        </span>
      </h2>
      <h1 class="last-price">
        <span
          class=" change-icon fas"
          v-if="changeType !== 'zero'"
          v-bind:class="[arrowClass, changeType]">
        </span>
        <span v-text="headerData.latestPrice"></span>
      </h1>
      <p
        class="change-info"
        v-bind:class="changeType"
        v-text="changeInfo">
      </p>
    </div>
    <div class="tiles" v-if="headerData.name">
      <div class="box" v-for="dp in bodyData" :key="dp.key">
        <p class="label" v-text="dp.label"></p>
        <p class="value" v-text="dp.value"></p>
      </div>
    </div>
  </div>
</template>

<script>
import QuoteService from "@/services/quote";
import DataPointsList from "@/config/quote-datapoints-list";

export default {
  name: "QuoteComponent",

  mixins: [QuoteService],

  props: {
    focus: {
      type: String,
      required: true
    },

    locale: {
      type: String,
      required: false,
      default: "en"
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

    bodyData() {
      return DataPointsList.map(dp => {
        return {
          key: dp,
          label: this.labels[dp],
          value: this.viewData[dp]
        };
      });
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

    arrowClass() {
      return `fa-arrow-${this.changeType}`;
    },

    asOfInfo() {
      return `${this.headerData.market} | ${this.headerData.sector} | As Of ${
        this.headerData.latestUpdate
      }`;
    },

    labels() {
      return this.$i18n.messages[this.locale].quote;
    }
  },

  created() {
    this.getStatsData(this.focus);
  },

  mounted() {
    console.log();
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

      .full-name {
        margin-right: 5px;
      }

      .ticker {
        font-weight: 300;
        font-size: 12px;
      }
    }

    .last-price {
      font-weight: 700;
      font-size: 32px;

      .change-icon {
        font-size: 24px;
        margin-right: 5px;
      }
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

  .tiles {
    display: grid;
    grid-template-columns: repeat(4, calc(25% - 10px));
    grid-gap: 10px;

    height: calc(55%);
    overflow-y: scroll;

    .box {
      padding: 10px;
      border-bottom: 1px solid #555;

      .label {
        font-size: 11px;
        font-weight: 700;
      }

      .value {
        font-size: 12px;
      }
    }
  }
}
</style>
