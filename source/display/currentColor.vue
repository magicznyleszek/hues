<template lang="html">
  <div class="wrapper">
    <div class="current">
      <color-square
        :color="currentColor"
        title="current color"
      />
    </div>

    <div class="matched">
      <color-square
        :color="matchedColor"
        title="closest match"
      />
      <span
        class="distance"
        title="difference/distance"
      >&larr;&rarr; {{ matchedDifference }}</span>
      <label>{{ matchedName }}</label>
      <button
        title="copy as CSS variable"
        @click="onCopyClick"
      >
        &darr;
      </button>
    </div>

    <div class="hue">
      <color-square
        space="hsl"
        :color="primaryHueColor"
        title="primary hue"
      />
      <label>{{ primaryHueName }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColorSquare from './ColorSquare.vue'
import formatter from '../colors/formatter'
import clipboardier from '../misc/clipboardier'
import { useHuesStore } from '../store/huesStore'
export default defineComponent({
  name: 'CurrentColor',
  components: {
    ColorSquare,
  },
  computed: {
    primaryHueColor() {
      const store = useHuesStore()
      return store.primaryHue.color
    },
    primaryHueName() {
      const store = useHuesStore()
      return store.primaryHue.name
    },
    currentColor() {
      const store = useHuesStore()
      return store.getColorInSpace('hsl')
    },
    matchedColor() {
      const store = useHuesStore()
      return store.match.color
    },
    matchedName() {
      const store = useHuesStore()
      return store.match.name
    },
    matchedDifference() {
      const store = useHuesStore()
      return store.match.difference
    },
  },
  methods: {
    onCopyClick(evt): void {
      evt.preventDefault()
      clipboardier.copyToClipboard(formatter.formatVariable(this.matchedName, this.matchedColor))
    },
  },
})
</script>

<style lang="css" scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.current {
  width: 100%;
}

.matched {
  flex: 1;
}

.hue {
  text-align: center;
}

.distance {
  color: var(--c-shady-lady);
}
</style>
