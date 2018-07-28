<template>
	<div class="grid-container">
    <ag-grid-vue
      ref="ag"
      class="grid ag-theme-balham-dark"
      :columnDefs="columnSet"
      :rowData="viewData"
      ></ag-grid-vue>
  </div>
</template>


<script>
import { AgGridVue } from "ag-grid-vue";

import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/ag-theme-balham-dark.css";

export default {
  name: "BaseGrid",

  props: {
    columnSet: {
      type: Array,
      required: true
    },

    viewData: {
      required: false
    }
  },

  components: {
    AgGridVue
  }
};
</script>

<style lang="scss">
.grid-container {
  height: 100%;

  .grid {
    height: 100%;
    width: 100%;
  }
}
</style>
