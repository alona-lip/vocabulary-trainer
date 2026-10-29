<script setup lang="ts">
import { computed, ref } from 'vue'
import LevelSelect from './components/LevelSelect.vue'
import TrainingSession from './components/TrainingSession.vue'
import { levels } from './data/vocabulary'
import { themeVars } from './theme'
import type { Level } from './types'

const selectedLevelId = ref<Level | null>(null)
const selectedLevel = computed(() => levels.find((level) => level.id === selectedLevelId.value))
const pageStyle = computed(() => (selectedLevel.value ? themeVars(selectedLevel.value.theme) : {}))
</script>

<template>
  <div class="page" :style="pageStyle">
    <main class="app">
      <header class="header">
        <h1>Vokabeltrainer</h1>
        <p class="subtitle">
          Deutsch → Englisch ·
          <template v-if="selectedLevel">Niveau {{ selectedLevel.id }} · {{ selectedLevel.title }}</template>
          <template v-else>Wähle dein Niveau</template>
        </p>
      </header>

      <TrainingSession
        v-if="selectedLevel"
        :key="selectedLevel.id"
        :level="selectedLevel"
        @back="selectedLevelId = null"
      />
      <LevelSelect v-else :levels="levels" @select="selectedLevelId = $event" />
    </main>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: var(--bg);
  transition: background-color 0.4s;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
  text-align: center;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 2.375rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.subtitle {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--muted);
}
</style>
