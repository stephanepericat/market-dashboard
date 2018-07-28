<template>
  <div class="home">
    <layout-golden class="workbook" :show-popout-icon="false">
      <gl-row>
        <gl-col>
          <gl-row>
            <gl-component title="S&P 500 Top 50">
              <watchlist
                ref="watchlist"
              ></watchlist>
            </gl-component>
          </gl-row>
        </gl-col>
        <gl-col>
          <gl-row>
            <gl-component title="Component 2">
              COMPONENT 2
            </gl-component>
          </gl-row>
          <gl-row>
            <gl-component title="Component 3">
              COMPONENT 3
            </gl-component>
          </gl-row>
          <gl-row>
            <gl-component title="Component 4">
              COMPONENT 4
            </gl-component>
          </gl-row>
        </gl-col>
      </gl-row>
		</layout-golden>
  </div>
</template>

<script>
import watchlist from "@/components/watchlist";

export default {
  name: "home",
  components: {
    watchlist
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
