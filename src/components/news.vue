<template>
  <div class="news-container">
    <div class="stock-news">
      <h2 v-text="focus + ' ' + labels.news"></h2>
      <div class="news-tiles" v-if="viewData.stock.length">
        <div class="box" v-for="(stockNews, index) in viewData.stock" :key="index" @click="openArticle(stockNews.url)">
          <h3 class="article-title" v-text="stockNews.headline"></h3>
          <p class="article-date" v-text="stockNews.datetime"></p>
          <p class="article-summary" v-text="stockNews.summary"></p>
        </div>
      </div>
      <p v-else v-text="noStockNewsLabel"></p>
    </div>
    <div class="market-news">
      <h2 v-text="labels.market + ' ' + labels.news"></h2>
      <div class="news-tiles" v-if="viewData.market.length">
        <div class="box" v-for="(marketNews, index) in viewData.market" :key="index" @click="openArticle(marketkNews.url)">
          <h3 class="article-title" v-text="marketNews.headline"></h3>
          <p class="article-date" v-text="marketNews.datetime"></p>
          <p class="article-summary" v-text="marketNews.summary"></p>
        </div>
      </div>
      <p v-else v-text="labels.noMarketNews"></p>
    </div>
  </div>
</template>

<script>
import NewsService from "@/services/news";

export default {
  name: "NewsComponent",

  mixins: [NewsService],

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

  data() {
    return {
      frequency: 300000
    };
  },

  computed: {
    labels() {
      return this.$i18n.messages[this.locale].news;
    },

    noStockNewsLabel() {
      return `${this.labels.noNewsAbout} ${this.focus} ${
        this.labels.atTheMoment
      }`;
    },

    viewData() {
      return this.$store.getters.getNewsData || [];
    }
  },

  watch: {
    focus(ticker) {
      if (ticker) {
        this.reloadStockNews(ticker);
      }
    }
  },

  created() {
    this.reloadStockNews(this.focus);
  },

  methods: {
    getNewsData(ticker) {
      return Promise.all([this.getStockNews(ticker), this.getMarketNews()]);
    },

    setNewsData(rawData) {
      this.$store.commit("setNewsData", rawData);
    },

    reloadStockNews(ticker) {
      this.getNewsData(ticker).then(res => {
        this.setNewsData(res);
      });
    },

    openArticle(url) {
      if (!url) {
        return;
      }

      if (window && window.process && window.process.type) {
        this.openExternal(url);
      } else {
        window.open(url);
      }
    },

    openExternal(url) {
      require("electron").shell.openExternal(url);
    }
  }
};
</script>

<style lang="scss">
.news-container {
  background-color: #2d3436;
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  padding: 10px;

  overflow-y: auto;

  h2 {
    margin: 0 0 5px 0;
  }

  .stock-news {
    margin-bottom: 15px;
  }

  .news-tiles {
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 10px));
    grid-gap: 10px;

    &:hover {
      cursor: pointer;
    }

    .box {
      border-bottom: 1px solid #555;

      .article-title {
        font-size: 16px;
      }

      .article-summary {
        font-size: 12px;
        font-weight: 300;
      }

      .article-date {
        font-size: 10px;
        font-style: italic;
        font-weight: 100;
      }
    }
  }
}
</style>
