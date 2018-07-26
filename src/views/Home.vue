<template>
  <div class="home">
    <watchlist></watchlist>
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
</style>
