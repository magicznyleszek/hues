export const spaces: Map<Space, SpaceDefinition> = new Map([
  [
    'hex',
    {
      parts: [
        {
          before: '#',
          partName: 'red',
          partType: 'hexadecimal',
          range: [0, 255],
        },
        {
          partName: 'green',
          partType: 'hexadecimal',
          range: [0, 255],
        },
        {
          partName: 'blue',
          partType: 'hexadecimal',
          range: [0, 255],
        },
      ],
    },
  ],
  [
    'rgb',
    {
      parts: [
        {
          before: 'rgb(',
          partName: 'red',
          partType: 'integer',
          range: [0, 255],
        },
        {
          before: ' ',
          partName: 'green',
          partType: 'integer',
          range: [0, 255],
        },
        {
          before: ' ',
          after: ')',
          partName: 'blue',
          partType: 'integer',
          range: [0, 255],
        },
      ],
    },
  ],
  [
    'hsl',
    {
      parts: [
        {
          before: 'hsl(',
          after: 'deg',
          partName: 'hue',
          partType: 'integer',
          range: [0, 360],
        },
        {
          before: ' ',
          after: '%',
          partName: 'saturation',
          partType: 'integer',
          range: [0, 100],
        },
        {
          before: ' ',
          after: '%)',
          partName: 'lightness',
          partType: 'integer',
          range: [0, 100],
        },
      ],
    },
  ],
  [
    'hwb',
    {
      parts: [
        {
          after: 'deg',
          before: 'hwb(',
          partName: 'hue',
          partType: 'integer',
          range: [0, 360],
        },
        {
          before: ' ',
          after: '%',
          partName: 'whiteness',
          partType: 'integer',
          range: [0, 100],
        },
        {
          before: ' ',
          after: '%)',
          partName: 'blackness',
          partType: 'integer',
          range: [0, 100],
        },
      ],
    },
  ],
])
