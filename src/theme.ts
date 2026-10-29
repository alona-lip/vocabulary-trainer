import type { LevelTheme } from './types'

const TEXT = '#eef2ff'

function mix(a: string, b: string, t: number): string {
  const channels = [1, 3, 5].map((i) => {
    const value = parseInt(a.slice(i, i + 2), 16) * (1 - t) + parseInt(b.slice(i, i + 2), 16) * t
    return Math.round(value).toString(16).padStart(2, '0')
  })
  return `#${channels.join('')}`
}

/** CSS custom properties for one level, applied via :style on a container */
export function themeVars(theme: LevelTheme): Record<string, string> {
  const muted = mix(TEXT, theme.back, 0.15)
  return {
    '--bg': theme.bg,
    '--card-front': theme.card,
    '--card-front-border': theme.border,
    '--card-back': theme.back,
    '--card-back-border': mix(theme.border, TEXT, 0.12),
    '--card-back-label': muted,
    '--accent': theme.accent,
    '--muted': muted,
    '--track': mix(theme.card, '#000000', 0.35),
  }
}
