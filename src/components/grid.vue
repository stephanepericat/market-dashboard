<template>
	<div class="grid-container">
    <ag-grid-vue class="grid ag-theme-balham" :columnDefs="columnDefs" :rowData="rowData"></ag-grid-vue>
  </div>
</template>


<script>
import { AgGridVue } from "ag-grid-vue";

import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/ag-theme-balham.css";

export default {
  name: "Grid",
  data() {
    return {
      columnDefs: null,
      rowData: null
    };
  },

  components: {
    AgGridVue
  },

  beforeMount() {
    this.columnDefs = [
      { headerName: "Make", field: "make", pinned: "left" },
      { headerName: "Model", field: "model" },
      { headerName: "Price", field: "price" }
    ];

    this.rowData = [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 }
    ];
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
