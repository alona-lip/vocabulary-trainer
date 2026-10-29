<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import Flashcard from './Flashcard.vue'
import { useProgress } from '../composables/useProgress'
import type { LevelInfo, Vocabulary } from '../types'

const ROUND_SIZE = 25

const props = defineProps<{
  level: LevelInfo
}>()

const emit = defineEmits<{
  back: []
}>()

const { isKnown, markKnown, knownCount } = useProgress()

function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j]!, result[i]!]
  }
  return result
}

// Words not yet known come first; known ones only fill up the rest of the round
function pickRound(): Vocabulary[] {
  const { id, words } = props.level
  const unknownWords = shuffle(words.filter((word) => !isKnown(id, word.id)))
  const knownWords = shuffle(words.filter((word) => isKnown(id, word.id)))
  return [...unknownWords, ...knownWords].slice(0, ROUND_SIZE)
}

const deck = ref<Vocabulary[]>(pickRound())
const total = ref(deck.value.length)
const flipped = ref(false)
const known = ref(0)
const unknown = ref(0)

const current = computed(() => deck.value[0])
const finished = computed(() => deck.value.length === 0)
const cardNumber = computed(() => total.value - deck.value.length + 1)
const progress = computed(() => Math.round((known.value / total.value) * 100))

function flip() {
  flipped.value = !flipped.value
}

function answer(wasKnown: boolean) {
  const [card, ...rest] = deck.value
  if (!card) return
  if (wasKnown) {
    known.value++
    markKnown(props.level.id, card.id)
    deck.value = rest
  } else {
    unknown.value++
    deck.value = [...rest, card]
  }
  flipped.value = false
}

function nextRound() {
  deck.value = pickRound()
  total.value = deck.value.length
  flipped.value = false
  known.value = 0
  unknown.value = 0
}

function onKeydown(event: KeyboardEvent) {
  // Buttons handle the space key natively, so only react when nothing else is focused
  if (finished.value || event.target instanceof HTMLButtonElement) return
  if (event.code === 'Space') {
    event.preventDefault()
    flip()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="session">
    <button type="button" class="link-btn back" @click="emit('back')">← Niveaus</button>

    <div class="progress">
      <div class="progress-label">
        <span v-if="!finished">Karte {{ cardNumber }} von {{ total }}</span>
        <span v-else>Runde abgeschlossen</span>
        <span>{{ progress }} %</span>
      </div>
      <div
        class="progress-track"
        role="progressbar"
        aria-label="Fortschritt dieser Runde"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
      </div>
    </div>

    <template v-if="!finished && current">
      <Flashcard :key="current.id" :card="current" :flipped="flipped" @flip="flip" />

      <div class="actions">
        <template v-if="flipped">
          <button type="button" class="btn btn-outline" @click="answer(false)">Nicht gewusst</button>
          <button type="button" class="btn" @click="answer(true)">Gewusst</button>
        </template>
        <button v-else type="button" class="btn" @click="flip">Umdrehen</button>
      </div>
    </template>

    <section v-else class="result">
      <h2>Runde geschafft!</h2>
      <p>Du hast alle {{ total }} Karten dieser Runde gelernt, davon {{ unknown }}-mal nicht gewusst.</p>
      <p>
        Niveau {{ level.id }}: {{ knownCount(level.id) }} von {{ level.words.length }} Wörtern gewusst.
      </p>
      <div class="actions">
        <button type="button" class="btn btn-ghost" @click="emit('back')">Zur Niveau-Auswahl</button>
        <button type="button" class="btn" @click="nextRound">Nächste Runde</button>
      </div>
    </section>

    <footer class="stats">
      <span class="stat-known">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
        Gewusst: {{ known }}
      </span>
      <span class="stat-unknown">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        Nicht gewusst: {{ unknown }}
      </span>
    </footer>
  </div>
</template>

<style scoped>
.session {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  width: 100%;
}

.back {
  align-self: flex-start;
}

.progress {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 712px;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--muted);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  min-height: 3rem;
}

.result h2 {
  margin: 0 0 0.5rem;
  font-family: var(--font-display);
  font-size: 1.75rem;
}

.result p {
  margin: 0 0 0.5rem;
  color: var(--muted);
}

.result .actions {
  margin-top: 1.25rem;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.75rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.stats span {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.stat-known {
  color: var(--accent);
}

.stat-unknown {
  color: var(--danger-text);
}
</style>
