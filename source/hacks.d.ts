declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

export type Json = Json[] | boolean | number | string | { [key: string]: Json } | null

declare module '*.json' {
  const value: Json
  export default value
}
