interface DictionaryNamed {
  0: string
  1: string
}

interface DictionaryColor {
  0: number
  1: number
  2: number
  3: string
}

interface Dictionary {
  primaryHues: DictionaryColor[]
  cssNamedColors: DictionaryNamed[]
  colors: DictionaryColor[]
}

interface Color {
  color: ColorValue
  name: string
}

interface ColorMatch extends Color {
  difference: number
}
