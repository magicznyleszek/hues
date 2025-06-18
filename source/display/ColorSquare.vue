<template lang="html">
  <figure
    :style="bgStyle"
    :title="title"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import formatter from '../colors/formatter'
export default defineComponent({
  name: 'ColorSquare',
  props: {
    color: {
      type: Array as unknown as PropType<ColorValue>,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    bgStyle() {
      const colorString = formatter.formatColor(this.color)
      return `background-color: ${colorString};`
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
