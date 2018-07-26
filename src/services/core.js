import axios from "axios";

export default {
  created() {
    this.$_baseURL = "https://api.iextrading.com/1.0";
    this.$_ajax = axios.create({
      baseURL: this.$_baseURL
    });
  },

  methods: {
    getData(url) {
      return this.$_ajax.get(url);
    }
  }
};
