<template>
  <div>
    <input type="text" v-bind:value="src" v-on:blur.prevent="changeRoute">
    <RaguComponent
        v-bind:src="src"
        v-on:rendered="rendered"
        v-on:fetched="fetched"
        v-on:fetch-fail="fetchFail"
    >
    </RaguComponent>
    <button v-on:click="increase">{{counter}}</button>
  </div>
</template>

<script>
import Vue from "vue";
import RaguComponent from "../dist/ragu-client-vue.umd";

export default Vue.extend({
  name: 'Demo',
  data() {
    return {
      counter: 0,
      src: 'https://ragu-framework.github.io/ragu-vue-server-adapter/quick-start.json'
    }
  },
  methods: {
    increase() {
      this.counter++;
    },
    changeRoute(e) {
      this.src = e.target.value;
    },
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

<style scoped>
  input {
    width: 100%;
  }
</style>
