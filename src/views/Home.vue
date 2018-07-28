<template>
  <div class="home">
    <layout-golden class="workbook" :show-popout-icon="false">
      <gl-row>
        <gl-col>
          <gl-row>
            <gl-component title="S&P 500 Top 50">
              <watchlist></watchlist>
            </gl-component>
          </gl-row>
        </gl-col>
        <gl-col>
          <gl-row>
            <gl-component title="Watchlist B">
              <watchlist></watchlist>
            </gl-component>
          </gl-row>
          <gl-row>
            <gl-component title="Watchlist C">
              <watchlist></watchlist>
            </gl-component>
          </gl-row>
        </gl-col>
      </gl-row>
		</layout-golden>
  </div>
</template>

<script>
import watchlist from "@/components/watchlist";
// import { remote } from "electron";

export default {
  name: "home",
  components: {
    watchlist
  },
  mounted() {
    // remote.getGlobal("applicationBus").$emit("watchlist.loaded");
  }
};
</script>
<style lang="scss">
.home {
  height: 100%;
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
