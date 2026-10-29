import { reactive } from 'vue'
import type { Level } from '../types'

const STORAGE_KEY = 'vocabulary-trainer:progress'

type Progress = Record<Level, number[]>

function emptyProgress(): Progress {
  return { A1: [], A2: [], B1: [], B2: [], C1: [], C2: [] }
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...emptyProgress(), ...JSON.parse(raw) }
  } catch {
    // Storage unavailable or corrupt – start with empty progress
  }
  return emptyProgress()
}

// Shared across all components so the level overview updates live
const progress = reactive<Progress>(load())

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // Progress just isn't persisted when storage is unavailable
  }
}

export function useProgress() {
  function isKnown(level: Level, id: number) {
    return progress[level].includes(id)
  }

  function markKnown(level: Level, id: number) {
    if (isKnown(level, id)) return
    progress[level].push(id)
    save()
  }

  function knownCount(level: Level) {
    return progress[level].length
  }

  function reset(level: Level) {
    progress[level] = []
    save()
  }

  return { isKnown, markKnown, knownCount, reset }
}
