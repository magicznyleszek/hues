<template lang="html">
  <input
    :value="partValue"
    type="text"
    :style="widthStyle"
    @input="onInput"
    @keydown="onKeyDown"
  >
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import converter from '../colors/converter'
import { useHuesStore } from '../store/huesStore'
export default defineComponent({
  name: 'SpacePart',
  props: {
    partIndex: {
      type: Number,
      required: true,
    },
    partType: {
      type: String as PropType<SpacePartType>,
      required: true,
    },
    range: {
      type: Array<number>,
      required: true,
    },
    space: {
      type: String as PropType<Space>,
      required: true,
    },
  },
  computed: {
    partValue() {
      const store = useHuesStore()
      const color = store.getColorInSpace(this.space)
      return color[this.partIndex + 1]
    },
    widthStyle() {
      const valueTextLength = String(this.partValue).length
      return `width: ${valueTextLength * 0.75}rem;`
    },
  },
  methods: {
    onInput(evt: Event): void {
      const target = evt.target as HTMLInputElement
      this.setValueWithChange(target.value)
    },
    onKeyDown(evt: KeyboardEvent) {
      switch (evt.key) {
        case 'ArrowUp':
          if (evt.shiftKey) {
            this.setValueWithChange(this.partValue, 10)
          } else {
            this.setValueWithChange(this.partValue, 1)
          }
          evt.preventDefault()
          break
        case 'ArrowDown':
          if (evt.shiftKey) {
            this.setValueWithChange(this.partValue, -10)
          } else {
            this.setValueWithChange(this.partValue, -1)
          }
          evt.preventDefault()
          break
        default:
          return
      }
    },
    setValueWithChange(newValue: ColorValuePart, change: number = 0): void {
      const store = useHuesStore()

      let finalValue = newValue || '0'
      if (this.partType === 'hexadecimal') {
        finalValue = converter.hexToInt(finalValue)
      } else {
        finalValue = parseInt(String(finalValue), 10)
      }

      finalValue += change

      // fix by range limits
      finalValue = Math.max(finalValue, this.range[0])
      finalValue = Math.min(finalValue, this.range[1])

      // change it back to proper type if necessary
      if (this.partType === 'hexadecimal') {
        finalValue = converter.intToHex(finalValue)
      }

      // update store color
      const color = store.getColorInSpace(this.space)
      if (this.partType === 'integer') {
        finalValue = Number(finalValue)
      }
      color[this.partIndex + 1] = finalValue
      store.setColor({ color: color })
    },
  },
})
</script>

<style lang="css" scoped>
input {
  min-width: 1rem;
  text-align: center;
}
</style>
