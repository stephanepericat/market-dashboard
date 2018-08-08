<template>
  <div class="home">
    <layout-golden class="workbook" :show-popout-icon="false">
      <gl-row>
        <gl-col>
          <gl-row>
            <gl-component title="S&P 500 Top 50">
              <watchlist
                ref="watchlist"
                :focus="focus"
              ></watchlist>
            </gl-component>
          </gl-row>
          <gl-row>
            <gl-stack>
              <gl-component title="Gainers">
                <glma
                  :viewType="'gainers'"
                ></glma>
              </gl-component>
              <gl-component title="Losers">
                <glma
                  :viewType="'losers'"
                ></glma>
              </gl-component>
              <gl-component title="Most Active">
                <glma
                  :viewType="'mostActives'"
                ></glma>
              </gl-component>
            </gl-stack>
          </gl-row>
        </gl-col>
        <gl-col>
          <gl-row>
            <gl-component :title="'Stock Price: ' + this.focus">
              <price-chart
                ref="priceChart"
                :focus="focus"
              ></price-chart>
            </gl-component>
          </gl-row>
          <gl-row>
            <gl-stack>
              <gl-component :title="'Quote: ' + this.focus">
                <quote
                  ref="quote"
                  :focus="focus"
                ></quote>
              </gl-component>
              <gl-component :title="'Related News: ' + this.focus">
                <news
                  ref="news"
                  :focus="focus"
                ></news>
              </gl-component>
            </gl-stack>
          </gl-row>
        </gl-col>
      </gl-row>
		</layout-golden>
  </div>
</template>

<script>
import quote from "@/components/quote";
import priceChart from "@/components/price-chart";
import watchlist from "@/components/watchlist";
import glma from "@/components/glma";
import news from "@/components/news";

export default {
  name: "HomeView",

  components: {
    glma,
    news,
    priceChart,
    quote,
    watchlist
  },

  computed: {
    focus() {
      return this.$store.state.focus;
    }
  }
};
</script>
<style lang="scss">
.home {
  height: 100%;
  overflow: hidden;
}

.workbook {
  width: 100%;
  height: 100%;
}
/* This is a hack to remove when fuse-box has a well-set npm mode */
.glComponent {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
