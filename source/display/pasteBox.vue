<template lang="html">
  <div>
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
