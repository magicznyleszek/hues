type TColorValuePart = string | number

interface IColorValue extends Array {
  0: TSpace
  1: TColorValuePart
  2: TColorValuePart
  3: TColorValuePart
}
