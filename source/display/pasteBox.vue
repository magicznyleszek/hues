<template lang="html">
  <div>
    <input
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
      @keydown="onKeyDown"
      title="paste here"
      type="text"
      placeholder="…"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import identifier from "../colors/identifier";
import { useHuesStore } from '../store/huesStore'
export default defineComponent({
  name: "PasteBox",
  methods: {
    identifyValue(value): void {
      const store = useHuesStore()
      const identified = identifier.identify(value);
      if (identified !== null) {
        store.setColor({ color: identified });
      }
    },
    onInput(evt): void {
      this.identifyValue(evt.target.value);
    },
    onFocus(evt): void {
      evt.target.setAttribute("placeholder", "paste or type here");
    },
    onBlur(evt): void {
      evt.target.setAttribute("placeholder", "…");
    },
    onKeyDown(evt): void {
      switch (evt.key) {
        case "Enter":
          this.identifyValue(evt.target.value);
          break;
        default:
          return;
      }
    },
  },
});
</script>

<style lang="css" scoped>
input {
  width: 100%;
  color: var(--c-shady-lady);
}
input:not(:placeholder-shown) {
  font-style: italic;
}
input:focus {
  color: var(--c-shark);
}
</style>
