type ColorValuePart = string | number

interface ColorValue extends Array<Space | ColorValuePart> {
  0: Space
  1: ColorValuePart
  2: ColorValuePart
  3: ColorValuePart
}
