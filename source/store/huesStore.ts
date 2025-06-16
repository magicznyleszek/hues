import { defineStore } from 'pinia'
import * as packageJsonData from '../../package.json'
import converter from '../colors/converter.ts'
import identifier from '../colors/identifier.ts'
import matcher from '../dictionary/matcher.ts'
const version = (packageJsonData as unknown as { version: string }).version

interface State {
  color: IColorValue
  match: IColorMatch
  primaryHue: IColorMatch
  version: string
}

interface SetColorPayload {
  color: IColorValue
}

let initialColorValue = converter.getRandomColor('hsl')

// read possible color strings from the hash
if (window.location.hash) {
  const hashColor = identifier.identify(window.location.hash.substring(1))
  if (hashColor !== null) {
    initialColorValue = hashColor
  }
}

export const useHuesStore = defineStore('huesStore', {
  state: (): State => {
    return {
      color: initialColorValue,
      match: matcher.matchColor(initialColorValue),
      primaryHue: matcher.matchHue(initialColorValue),
      version,
    }
  },
  getters: {
    getColorInSpace: (state: State) => (space: TSpace) => converter.convertTo(state.color, space),
  },
  actions: {
    setColor(payload: SetColorPayload) {
      const primaryHue = matcher.matchHue(payload.color)
      const match = matcher.matchColor(payload.color)
      this.color = payload.color
      this.match = match
      this.primaryHue = primaryHue
    },
  },
})
