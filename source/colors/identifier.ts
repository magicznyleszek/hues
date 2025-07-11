import matcher from '../dictionary/matcher'
import validator from './validator'

class ColorIdentifier {
  public identify(text: string): ColorValue | null {
    const finalColor: ColorValue = ['hsl', -1, -1, -1]

    // cleanup whitespace
    text = text.trim()

    // drop semicolon that could've been included by mistake
    if (text.endsWith(';')) {
      text = text.slice(0, -1).trimRight()
    }

    // rgb case
    if (text.startsWith('rgb(') && text.endsWith(')')) {
      finalColor[0] = 'rgb'
      this.applyValues(finalColor, text)
      if (validator.isValid(finalColor)) {
        return finalColor
      }
    }

    // hsl case
    if (text.startsWith('hsl(') && text.endsWith(')')) {
      finalColor[0] = 'hsl'
      this.applyValues(finalColor, text)
      if (validator.isValid(finalColor)) {
        return finalColor
      }
    }

    // hwb case
    if (text.startsWith('hwb(') && text.endsWith(')')) {
      finalColor[0] = 'hwb'
      this.applyValues(finalColor, text)
      if (validator.isValid(finalColor)) {
        return finalColor
      }
    }

    // named color case
    const named = matcher.findColorByName(text)
    if (named) {
      return named.color
    }

    // hex case
    // we assume "#" character could've been mistakingly ommited
    // and we have hex as last case because of this versatility
    if (!text.startsWith('#') && [3, 6].includes(text.length)) {
      text = `#${text}`
    }
    if (text.startsWith('#') && [4, 7].includes(text.length)) {
      finalColor[0] = 'hex'
      if (text.length === 4) {
        finalColor[1] = text[1].repeat(2)
        finalColor[2] = text[2].repeat(2)
        finalColor[3] = text[3].repeat(2)
      }
      if (text.length === 7) {
        finalColor[1] = text.slice(1, 3)
        finalColor[2] = text.slice(3, 5)
        finalColor[3] = text.slice(5, 7)
      }
      if (validator.isValid(finalColor)) {
        return finalColor
      }
    }

    return null
  }

  private applyValues(color: ColorValue, text: string): void {
    // replace commas with space (we still handle the old notation, i.e. `rgb(1,2,3)`)
    text = text.replace(/,/g, ' ')

    // replace multiple whitespace characters with single one, now we should end up with either `rgb(1 2 3)` or in worst
    // case scenario `rgb( 1 2 3 )`
    text = text.replace(/ +/g, ' ')

    // remove space prefix
    text = text.slice(3)
    // remove parens opening, taking into account both possible cases
    text = text.replace('( ', '').replace('(', '')

    // remove parens closing, taking into account both possible cases
    text = text.replace(' )', '').replace(')', '')

    text.split(' ').forEach((part, index) => {
      if (['hsl', 'hwb'].includes(color[0])) {
        if ([1, 2].includes(index) && part.endsWith('%')) {
          color[index + 1] = parseInt(part.slice(0, -1), 10)
        } else if (index === 0) {
          color[index + 1] = parseInt(part, 10)
        }
      } else {
        color[index + 1] = parseInt(part, 10)
      }
    })
  }
}

export default new ColorIdentifier()
