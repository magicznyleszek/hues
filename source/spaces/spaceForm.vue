<template lang="html">
  <form>
    <div v-for="(part, index) in parts">
      <span v-if="part.before">{{ part.before }}</span>
      <space-part
        v-bind:partIndex="index"
        v-bind:partType="part.partType"
        v-bind:range="part.range"
        v-bind:space="space"
      ></space-part>
      <span v-if="part.after">{{ part.after }}</span>
    </div>
    <button @click="onCopyClick" title="copy to clipboard">&darr;</button>
  </form>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import SpacePart from "./SpacePart.vue";
import { spaces } from "./spacesConfig";
import formatter from "../colors/formatter";
import clipboardier from "../misc/clipboardier";
import { useHuesStore } from '../store/huesStore'

export default defineComponent({
  name: "SpaceForm",
  components: {
    SpacePart,
  },
  props: {
    space: {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      parts: spaces.get(this.space).parts,
    };
  },
  methods: {
    onCopyClick(evt): void {
      evt.preventDefault();
      const store = useHuesStore()
      const colorValue = store.getColorInSpace(this.space);
      clipboardier.copyToClipboard(formatter.formatColor(colorValue));
    },
  },
});
</script>

<style lang="css" scoped>
form,
div {
  display: flex;
  flex-direction: row;
}
button {
  margin-left: 0.25rem;
}
</style>
