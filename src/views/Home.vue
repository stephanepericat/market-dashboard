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
            <gl-col>
              <gl-component :title="'Company Info: ' + this.focus">
                COMPONENT 3
              </gl-component>
            </gl-col>
            <gl-col>
              <gl-component :title="'Related News: ' + this.focus">
                COMPONENT 4
              </gl-component>
            </gl-col>
          </gl-row>
        </gl-col>
      </gl-row>
		</layout-golden>
  </div>
</template>

<script>
import watchlist from "@/components/watchlist";
import priceChart from "@/components/price-chart";

export default {
  name: "HomeView",

  components: {
    watchlist,
    priceChart
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
