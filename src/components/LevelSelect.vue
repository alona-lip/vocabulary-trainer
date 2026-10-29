<script setup lang="ts">
import { useProgress } from '../composables/useProgress'
import { themeVars } from '../theme'
import type { Level, LevelInfo } from '../types'

defineProps<{
  levels: LevelInfo[]
}>()

const emit = defineEmits<{
  select: [level: Level]
}>()

const { knownCount, reset } = useProgress()

function percent(level: LevelInfo) {
  return Math.round((knownCount(level.id) / level.words.length) * 100)
}

function confirmReset(level: LevelInfo) {
  if (window.confirm(`Fortschritt für Niveau ${level.id} wirklich zurücksetzen?`)) {
    reset(level.id)
  }
}
</script>

<template>
  <section class="levels" aria-label="Sprachniveaus">
    <article v-for="level in levels" :key="level.id" class="level" :style="themeVars(level.theme)">
      <div class="level-head">
        <span class="level-id">{{ level.id }}</span>
        <span class="level-title">{{ level.title }}</span>
      </div>

      <div class="level-progress">
        <span>{{ knownCount(level.id) }} / {{ level.words.length }} gewusst</span>
        <div
          class="progress-track"
          role="progressbar"
          :aria-label="`Fortschritt ${level.id}`"
          :aria-valuenow="percent(level)"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div class="progress-bar" :style="{ width: `${percent(level)}%` }"></div>
        </div>
      </div>

      <button type="button" class="btn" @click="emit('select', level.id)">Lernen</button>
      <button
        type="button"
        class="link-btn"
        :disabled="knownCount(level.id) === 0"
        @click="confirmReset(level)"
      >
        Fortschritt zurücksetzen
      </button>
    </article>
  </section>
</template>

<style scoped>
.levels {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 1rem;
  width: 100%;
}

@media (max-width: 1100px) {
  .levels {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .levels {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 400px) {
  .levels {
    grid-template-columns: minmax(0, 1fr);
  }
}

.level {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem 1rem 0.75rem;
  border: 2px dashed var(--card-front-border);
  border-radius: 18px;
  background: var(--card-front);
  text-align: left;
}

.level-head {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.level-id {
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--accent);
}

.level-title {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.3;
}

/* Pushes progress bar and button to the bottom so they line up across tiles */
.level-progress {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--muted);
}

.level .btn {
  min-width: 0;
  width: 100%;
  height: 44px;
}

.level .link-btn {
  align-self: center;
}
</style>
