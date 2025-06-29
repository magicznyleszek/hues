import * as dictionaryJsonData from './dictionary.json' with { type: 'json' }
const dictionary = dictionaryJsonData as unknown as Dictionary
import converter from '../colors/converter'

class ColorMatcher {
  public matchColor(color: ColorValue): ColorMatch {
    return this.matchDictionaryColor(color, dictionary.colors)
  }

  public matchHue(color: ColorValue): ColorMatch {
    return this.matchDictionaryColor(color, dictionary.primaryHues)
  }

  public findColorByName(name: string): Color | undefined {
    const lowerName = String(name).toLowerCase()
    const found = dictionary.colors.find(dictionaryColor => String(dictionaryColor[3]).toLowerCase() === lowerName)
    if (found) {
      return {
        color: ['hsl', found[0], found[1], found[2]],
        name: found[3],
      }
    } else {
      return undefined
    }
  }

  private matchDictionaryColor(
    color: ColorValue,
    dict: DictionaryColor[]
  ): ColorMatch {
    const targetRgb = converter.convertTo(color, 'rgb')
    const targetHsl = converter.convertTo(color, 'hsl')

    const match = {
      color: this.getColorByIndex(0).color,
      difference: Infinity,
      name: this.getColorByIndex(0).name,
    }

    dict.forEach((dictColor: DictionaryColor): void => {
      const dictHsl: ColorValue = [
        'hsl',
        dictColor[0],
        dictColor[1],
        dictColor[2],
      ]
      const differenceHsl = this.getHslDifference(targetHsl, dictHsl)

      const dictRgb = converter.convertTo(dictHsl, 'rgb')
      const differenceRgb = this.getRgbDifference(targetRgb, dictRgb)

      const totalDifference = differenceRgb + differenceHsl * 2

      if (totalDifference < match.difference) {
        match.color = dictHsl
        match.difference = totalDifference
        match.name = dictColor[3]
      }
    })
    return match
  }

  private getRgbDifference(target: ColorValue, dict: ColorValue): number {
    const differenceR = Math.abs(Number(target[1]) - Number(dict[1]))
    const differenceG = Math.abs(Number(target[2]) - Number(dict[2]))
    const differenceB = Math.abs(Number(target[3]) - Number(dict[3]))
    return differenceR + differenceG + differenceB
  }

  private getHslDifference(target: ColorValue, dict: ColorValue): number {
    let differenceH = Math.abs(Number(target[1]) - Number(dict[1]))
    let differenceS = Math.abs(Number(target[2]) - Number(dict[2]))
    const differenceL = Math.abs(Number(target[3]) - Number(dict[3]))

    // with only light or no light at all, saturation and hue are meaningless
    if (target[3] === 100 || target[3] === 0) {
      differenceH = 0
      differenceS = 0
    }

    // with zero saturation hue is meaningless
    if (target[2] === 0) {
      differenceH = 0
    }

    return differenceH + differenceS + differenceL
  }

  private getColorByIndex(index: number): Color {
    const dictColor = dictionary.colors[index]
    return {
      color: ['hsl', dictColor[0], dictColor[1], dictColor[2]],
      name: dictColor[3],
    }
  }
}

export default new ColorMatcher()
