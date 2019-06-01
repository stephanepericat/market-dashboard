import axios from "axios";

export default {
  created() {
    this.$_baseURL = "https://cloud.iexapis.com/stable";
    this.$_ajax = axios.create({
      baseURL: this.$_baseURL,
      params: {
        token: process.env.VUE_APP_IEX_TOKEN
      }
    });
  },

  methods: {
    getData(url) {
      return this.$_ajax.get(url);
    }
  }
};
