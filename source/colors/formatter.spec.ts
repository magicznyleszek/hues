import formatter from './formatter'

interface FormatterTest {
  in: ColorValue
  out: string
}

const testCases: FormatterTest[] = [
  // proper ones
  { in: ['rgb', 240, 255, 0], out: 'rgb(240 255 0)' },
  { in: ['hex', 'ff', '00', 'aa'], out: '#ff00aa' },
  { in: ['hsl', 359, 50, 60], out: 'hsl(359deg 50% 60%)' },
  { in: ['hwb', 300, 100, 50], out: 'hwb(300deg 100% 50%)' },
  // wrong ones
  { in: ['hwb', 500, 600, 1000], out: '' },
]

describe('formatter.formatColor', () => {
  testCases.forEach((testCase) => {
    it(`should format (in)valid color ${testCase.in}`, () => {
      expect(formatter.formatColor(testCase.in)).toStrictEqual(testCase.out)
    })
  })
})

interface FormatterTest2 {
  in1: string
  in2: ColorValue
  out: string
}

const testCases2: FormatterTest2[] = [
  { in1: 'Black', in2: ['hsl', 0, 0, 0], out: '--c-black: hsl(0deg 0% 0%);' },
  {
    in1: 'Purple Mountain\'s Majesty',
    in2: ['hsl', 269, 30, 59],
    out: '--c-purple-mountain-s-majesty: hsl(269deg 30% 59%);',
  },
]

describe('formatter.formatVariable', () => {
  testCases2.forEach((testCase) => {
    it(`should format variable for: ${testCase.in1} ${testCase.in2}`, () => {
      expect(
        formatter.formatVariable(testCase.in1, testCase.in2)
      ).toStrictEqual(testCase.out)
    })
  })
})
