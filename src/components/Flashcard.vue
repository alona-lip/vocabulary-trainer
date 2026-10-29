<script setup lang="ts">
import type { Vocabulary } from '../types'

defineProps<{
  card: Vocabulary
  flipped: boolean
}>()

const emit = defineEmits<{
  flip: []
}>()
</script>

<template>
  <button
    type="button"
    class="flashcard"
    :class="{ flipped }"
    :aria-label="flipped ? `Englisch: ${card.en}` : `Deutsch: ${card.de} – klicken zum Umdrehen`"
    @click="emit('flip')"
  >
    <span class="flashcard-inner">
      <span class="face front">
        <span class="lang">Deutsch</span>
        <span class="word" :class="{ long: card.de.length > 14 }" lang="de">{{ card.de }}</span>
        <span class="hint">Klicken oder Leertaste zum Umdrehen</span>
      </span>
      <span class="face back">
        <span class="lang">Englisch</span>
        <span class="word" :class="{ long: card.en.length > 14 }" lang="en">{{ card.en }}</span>
      </span>
    </span>
  </button>
</template>

<style scoped>
.flashcard {
  width: 100%;
  max-width: 420px;
  aspect-ratio: 3 / 2;
  padding: 0;
  border: none;
  border-radius: 18px;
  background: none;
  color: inherit;
  font: inherit;
  perspective: 1000px;
  cursor: pointer;
}

.flashcard-inner {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
  transform-style: preserve-3d;
}

.flipped .flashcard-inner {
  transform: rotateY(180deg);
}

.face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 1.5rem;
  border: 2px dashed;
  border-radius: 18px;
  color: var(--text);
  backface-visibility: hidden;
}

.front {
  background: var(--card-front);
  border-color: var(--card-front-border);
}

.back {
  background: var(--card-back);
  border-color: var(--card-back-border);
  transform: rotateY(180deg);
}

.lang {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.front .lang {
  color: var(--accent);
}

.back .lang {
  color: var(--card-back-label);
}

.word {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.2;
  overflow-wrap: break-word;
  hyphens: auto;
  max-width: 100%;
}

.word.long {
  font-size: 1.875rem;
}

.hint {
  font-size: 0.8125rem;
  color: var(--muted);
}
</style>
