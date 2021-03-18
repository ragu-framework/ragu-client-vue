<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue';
import {RaguComponent} from "ragu-dom";


export default Vue.extend({
  name: 'RaguComponent',
  props: {
    src: String,
    loader: Object
  },
  data() {
    return {
      component: null as null | RaguComponent
    }
  },
  watch: {
    src() {
      this.component?.fetchComponent(this.src);
    }
  },
  destroyed() {
    this.component?.disconnectComponent();
  },
  mounted() {
    this.component = new RaguComponent(this.$el as HTMLElement, this.loader);
    this.component.fetchComponent(this.src);

    this.$el.addEventListener('ragu:fetched', () => {
      this.$emit('fetched')
    });

    this.$el.addEventListener('ragu:fetch-fail', () => {
      this.$emit('fetch-fail')
    });

    this.$el.addEventListener('ragu:hydrated', () => {
      this.$emit('rendered')
    });
  }
});
</script>
