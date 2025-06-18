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
      <div class="matched-info">
        <label>{{ matchedName }}</label>
        &nbsp;
        <span
          class="distance"
          title="distance from current color"
        >&#8596; {{ matchedDifference }}</span>
      </div>
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

  <div class="wrapper">
    <button
      title="copy as CSS variable"
      @click="onCopyClick"
    >
      {{ formattedVariable }}
    </button>
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
    formattedVariable() {
      return formatter.formatVariable(this.matchedName, this.matchedColor)
    },
  },
  methods: {
    onCopyClick(evt: MouseEvent): void {
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

.wrapper + .wrapper {
  margin-top: var(--s-leading-half);
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
  color: var(--c-dove-gray);
}

.matched-info {
  display: flex;
  flex-direction: row;
}
</style>
