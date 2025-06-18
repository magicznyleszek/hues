type Space = 'hex' | 'rgb' | 'hsl' | 'hwb'

interface SpaceDefinition {
  parts: SpacePart[]
}

type SpacePartName =
  | 'red'
  | 'green'
  | 'blue'
  | 'hue'
  | 'saturation'
  | 'lightness'
  | 'whiteness'
  | 'blackness'

type SpacePartType = 'hexadecimal' | 'integer'

interface SpacePart {
  after?: string
  before?: string
  partName: SpacePartName
  partType: SpacePartType
  range: number[]
}
