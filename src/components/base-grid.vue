<template>
  <div class="grid-container">
    <ag-grid-vue
      ref="ag"
      class="grid ag-theme-balham-dark"
      :columnDefs="columnSet"
      :rowData="viewData"
      :enableSorting="true"
      :modelUpdated="onModelUpdated"
      :rowDataUpdated="onRowUpdated"
      :cellClicked="onCellClicked"
      :cellFocused="onCellFocused"
      :gridOptions="gridOptions"
    ></ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";

import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/ag-theme-balham-dark.css";

export default {
  name: "BaseGridComponent",

  props: {
    columnSet: {
      type: Array,
      required: true
    },

    viewData: {
      required: false
    },

    gridOptions: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    },

    onModelUpdated: {
      type: Function,
      required: false,
      default: () => {}
    },

    onRowUpdated: {
      type: Function,
      required: false,
      default: () => {}
    },

    onCellClicked: {
      type: Function,
      required: false,
      default: () => {}
    },

    onCellFocused: {
      type: Function,
      required: false,
      default: () => {}
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
