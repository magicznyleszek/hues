import identifier from './identifier'

const testCases = [
  // proper ones
  { in: 'rgb(240,255,0)', out: ['rgb', 240, 255, 0] },
  { in: 'rgb(240 255 0)', out: ['rgb', 240, 255, 0] },
  { in: '#ff00aa', out: ['hex', 'ff', '00', 'aa'] },
  { in: '#f0a', out: ['hex', 'ff', '00', 'aa'] },
  { in: 'hsl(359,50%,60%)', out: ['hsl', 359, 50, 60] },
  { in: 'hsl(359 50% 60%)', out: ['hsl', 359, 50, 60] },
  { in: 'hsl(359deg 50% 60%)', out: ['hsl', 359, 50, 60] },
  { in: 'hwb(300,100%,50%)', out: ['hwb', 300, 100, 50] },
  { in: 'hwb(300 100% 50%)', out: ['hwb', 300, 100, 50] },
  { in: 'hwb(300deg 100% 50%)', out: ['hwb', 300, 100, 50] },
  // Named CSS color
  { in: 'Black', out: ['hex', '00', '00', '00'] },
  // Dictionary colors (they use HSL)
  { in: 'Sapphire', out: ['hsl', 222, 54, 40] },
  { in: 'Rebecca Purple', out: ['hsl', 270, 50, 40] },
  // hex without "#" prefix can be still identified
  { in: 'ff00aa', out: ['hex', 'ff', '00', 'aa'] },
  // semicolon case
  { in: 'rgb(1,2,3);', out: ['rgb', 1, 2, 3] },
  { in: 'rgb(1 2 3);', out: ['rgb', 1, 2, 3] },
  // white space
  { in: 'rgb (1,2,3)', out: null },
  { in: 'rgb(1, 2,3)', out: ['rgb', 1, 2, 3] },
  { in: ' rgb( 1 , 2 , 3 ) ', out: ['rgb', 1, 2, 3] },
  { in: '    rgb(  1  ,  2 , 3    ); ', out: ['rgb', 1, 2, 3] },
  { in: 'hsl( 1,2%,3% )', out: ['hsl', 1, 2, 3] },
  { in: 'hwb(1, 2%, 3%)', out: ['hwb', 1, 2, 3] },
  { in: 'hwb(1   2%   3%)', out: ['hwb', 1, 2, 3] },
  // wrong rgb
  { in: 'rgb(a,2,3)', out: null },
  { in: 'rgb(-2,4,3)', out: null },
  { in: 'rgb(256,4,3)', out: null },
  { in: 'rgb(1,2,2600)', out: null },
  { in: 'rgb(1,2)', out: null },
  { in: 'rgb(1,,3)', out: null },
  // wrong hex
  { in: '#ff', out: null },
  { in: '#ffff', out: null },
  { in: '#fffff', out: null },
  { in: '#fffffff', out: null },
  // wrong hsl
  { in: 'hsl(240,100,100)', out: null },
  { in: 'hsl(240deg 100 100)', out: null },
  { in: 'hsl(240deg 100% 100)', out: null },
  { in: 'hsl(400,50%,50%)', out: null },
  { in: 'hsl(125,50%,120%)', out: null },
  { in: 'hsl(125,,120%)', out: null },
  { in: 'hsl(a,b,c)', out: null },
  // wrong hwb
  { in: 'hwb(240,100,100)', out: null },
  { in: 'hwb(400,50%,50%)', out: null },
  { in: 'hwb(125,50%,120%)', out: null },
  { in: 'hwb(125,,120%)', out: null },
  { in: 'hwb(a,b,c)', out: null },
]

describe('identifier.identify', () => {
  testCases.forEach((testCase) => {
    it(`should properly identify color ${testCase.in}`, () => {
      expect(identifier.identify(testCase.in)).toStrictEqual(testCase.out)
    })
  })
})
