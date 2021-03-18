<template>
  <div>
  <RaguComponent
      src="https://ragu-framework.github.io/ragu-vue-server-adapter/quick-start.json"
      v-on:rendered="rendered"
      v-on:fetched="fetched"
      v-on:fetch-fail="fetchFail"
  >
  </RaguComponent>
  </div>
</template>

<script>
import Vue from "vue";
import RaguComponent from "./RaguComponent";

export default Vue.extend({
  name: 'Demo',
  methods: {
    rendered() {
      console.log('rendered');
    },
    fetched() {
      console.log('fetched');
    },
    fetchFail() {
      console.log('fetched-fail');
    }
  },
  components: {
    RaguComponent
  }
});
</script>
