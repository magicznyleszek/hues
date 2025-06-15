<template lang="html">
  <div>
    <space-form space="rgb"></space-form>
    <space-form space="hex"></space-form>
    <space-form space="hsl"></space-form>
    <space-form space="hwb"></space-form>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import SpaceForm from "./SpaceForm.vue";
export default defineComponent({
  name: "SpacesList",
  components: {
    SpaceForm,
  },
});
</script>

<style lang="css" scoped>
div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
