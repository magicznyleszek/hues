<template lang="html">
  <figure
    :style="bgStyle"
    :title="title"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import formatter from "../colors/formatter";
export default defineComponent({
  name: "ColorSquare",
  props: {
    color: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
  },
  computed: {
    bgStyle() {
      const colorString = formatter.formatColor(this.color as IColorValue);
      return `background-color: ${colorString};`;
    },
  },
})
</script>

<style lang="css" scoped>
figure {
  width: 100%;
  min-width: calc(var(--s-leading) * 3);
  height: calc(var(--s-leading) * 3);
}
</style>
