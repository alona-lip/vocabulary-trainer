export interface Vocabulary {
  id: number
  de: string
  en: string
}

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

/** Base colors of one level; the remaining shades are derived in theme.ts */
export interface LevelTheme {
  bg: string
  card: string
  border: string
  back: string
  accent: string
}

export interface LevelInfo {
  id: Level
  title: string
  theme: LevelTheme
  words: Vocabulary[]
}
