<template lang="html">
  <div class="paste-box">
    <input
      title="paste here"
      type="text"
      placeholder="paste or type here"
      @input="onInput"
      @keydown="onKeyDown"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import identifier from '../colors/identifier'
import { useHuesStore } from '../store/huesStore'
export default defineComponent({
  name: 'PasteBox',
  methods: {
    identifyValue(value: string): void {
      const store = useHuesStore()
      const identified = identifier.identify(value)
      if (identified !== null) {
        store.setColor({ color: identified })
      }
    },
    onInput(evt: Event): void {
      const target = evt.target as HTMLInputElement
      this.identifyValue(target.value)
    },
    onKeyDown(evt: KeyboardEvent): void {
      const target = evt.target as HTMLInputElement
      switch (evt.key) {
        case 'Enter':
          this.identifyValue(target.value)
          break
        default:
          return
      }
    },
  },
})
</script>

<style lang="css" scoped>
.paste-box {
  margin: var(--s-leading-half) 0;
}

input {
  width: 100%;
  color: var(--c-dove-gray);
  padding: var(--s-leading-half);
  box-shadow: inset 0 0 0 1px var(--c-celeste);
}

input:not(:placeholder-shown) {
  font-style: italic;
}

input:focus {
  color: var(--c-shark);
  background-color: var(--c-celeste);
}
</style>
