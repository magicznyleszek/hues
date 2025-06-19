<template lang="html">
  <form>
    <div
      v-for="(part, index) in parts"
      :key="index"
    >
      <span
        v-if="typeof part.before === 'string'"
        class="part-before"
      >{{ part.before }}</span>

      <space-part
        :part-index="index"
        :part-type="part.partType"
        :range="part.range"
        :space="space"
      />

      <span
        v-if="typeof part.after === 'string'"
        class="part-after"
      >{{ part.after }}</span>
    </div>

    <button
      title="copy to clipboard"
      @click="onCopyClick"
    >
      &darr;
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import SpacePart from './SpacePart.vue'
import { spaces } from './spacesConfig'
import formatter from '../colors/formatter'
import clipboardier from '../misc/clipboardier'
import { useHuesStore } from '../store/huesStore'

export default defineComponent({
  name: 'SpaceForm',
  components: {
    SpacePart,
  },
  props: {
    space: {
      type: String as PropType<Space>,
      required: true,
    },
  },
  data: function () {
    return {
      parts: spaces.get(this.space)?.parts,
    }
  },
  methods: {
    onCopyClick(evt: MouseEvent): void {
      evt.preventDefault()
      const store = useHuesStore()
      const colorValue = store.getColorInSpace(this.space)
      clipboardier.copyToClipboard(formatter.formatColor(colorValue))
    },
  },
})
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

.part-before,
.part-after {
  white-space: pre;
}
</style>
