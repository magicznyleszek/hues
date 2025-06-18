<template>
  <div class="app">
    <header>
      <h1>h(u,e,s)</h1>
      <a
        href="https://github.com/magicznyleszek/hues"
        target="_blank"
      >*</a>
    </header>

    <main>
      <paste-box />
      <spaces-list />
      <current-color />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PasteBox from './display/PasteBox.vue'
import SpacesList from './spaces/SpacesList.vue'
import CurrentColor from './display/CurrentColor.vue'
export default defineComponent({
  name: 'App',
  components: {
    PasteBox,
    SpacesList,
    CurrentColor,
  },
})
</script>

<style lang="css" scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
header h1 {
  font-size: inherit;
  font-weight: bold;
}
</style>
