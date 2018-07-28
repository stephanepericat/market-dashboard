import Vue from "vue";
import Vuex from "vuex";

import state from "@/store_modules/state";
import getters from "@/store_modules/getters";
import mutations from "@/store_modules/mutations";
import actions from "@/store_modules/actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
