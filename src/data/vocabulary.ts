import type { LevelInfo } from '../types'
import { a1 } from './a1'
import { a2 } from './a2'
import { b1 } from './b1'
import { b2 } from './b2'
import { c1 } from './c1'
import { c2 } from './c2'

// "Dämmerung": the color moves from mint (A1) to night violet (C2) and gets darker
export const levels: LevelInfo[] = [
  {
    id: 'A1',
    title: 'Anfänger',
    theme: { bg: '#1f4a40', card: '#29594d', border: '#4f8576', back: '#336657', accent: '#9bf2cc' },
    words: a1,
  },
  {
    id: 'A2',
    title: 'Grundlegende Kenntnisse',
    theme: { bg: '#18414a', card: '#215059', border: '#467e88', back: '#2a5c66', accent: '#8ee8f0' },
    words: a2,
  },
  {
    id: 'B1',
    title: 'Fortgeschritten',
    theme: { bg: '#12354a', card: '#1b4359', border: '#3e6f88', back: '#234f68', accent: '#86d3f5' },
    words: b1,
  },
  {
    id: 'B2',
    title: 'Selbständig',
    theme: { bg: '#10284a', card: '#19355c', border: '#3c5c8c', back: '#21406b', accent: '#8fb6ff' },
    words: b2,
  },
  {
    id: 'C1',
    title: 'Fachkundig',
    theme: { bg: '#151b45', card: '#1f2658', border: '#444c8c', back: '#282f68', accent: '#a9a2ff' },
    words: c1,
  },
  {
    id: 'C2',
    title: 'Annähernd muttersprachlich',
    theme: { bg: '#150f2e', card: '#20183f', border: '#47396f', back: '#2a2050', accent: '#c9a0ff' },
    words: c2,
  },
]
