# vocabulary-trainer

German–English vocabulary trainer: a small demo app built with **Vue 3**, **TypeScript** and **Vite**.

The app's user interface is in German; this README explains it in English.

## Features

- **Language levels A1–C2:** On the start page you pick a CEFR level. The level names are in German: A1 *Anfänger* (beginner), A2 *Grundlegende Kenntnisse* (elementary), B1 *Fortgeschritten* (intermediate), B2 *Selbständig* (upper intermediate), C1 *Fachkundig* (advanced) and C2 *Annähernd muttersprachlich* (near-native). Each level contains **100 words**.
- **Rounds of 25 cards:** Each round draws 25 words from the selected level, starting with words you have not marked as known yet.
- **Flashcard mode:** The front of the card shows the German word. Click the card or press the space bar to flip it and see the English translation.
- **Self-assessment:** After flipping, click „Gewusst“ (*knew it*) or „Nicht gewusst“ (*didn't know it*).
  - *Gewusst:* The card is done for this round and the word is saved as known.
  - *Nicht gewusst:* The card moves to the back of the deck and comes up again later.
- **Saved progress:** For each level you can see how many of its 100 words you already know (e.g. „63 / 100 gewusst“). Progress is stored in the browser (localStorage) and can be reset per level.
- **„Dämmerung“ (dusk) color scheme:** Each level has its own color, which gets darker from A1 to C2 and shifts from mint through turquoise, petrol, blue and indigo to night violet. On the start page each tile shows its level color; during a round the whole page takes on the color of the level. Fonts: Lexend and Nunito, bundled locally.

## Requirements

- [Node.js](https://nodejs.org/) version **20.19+** or **22.12+**
- npm (installed together with Node.js)

Check your installed versions with:

```bash
node -v
npm -v
```

## Running the app

1. Clone the repository and change into the folder:

   ```bash
   git clone <repository-url>
   cd vocabulary-trainer
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open **http://localhost:5173** in your browser. The app reloads automatically whenever you change the code.

Press `Ctrl + C` in the terminal to stop the server.

## Other commands

| Command              | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| `npm run dev`        | Starts the development server with hot reload              |
| `npm run build`      | Type-checks the code and creates a production build in `dist/` |
| `npm run preview`    | Serves the production build from `dist/` locally           |
| `npm run type-check` | Runs only the TypeScript check (`vue-tsc`)                 |

## Project structure

```
vocabulary-trainer/
├── index.html                  # HTML entry page
├── src/
│   ├── main.ts                 # Starts the Vue app
│   ├── App.vue                 # Switches between level selection and training round
│   ├── components/
│   │   ├── LevelSelect.vue     # Start page with the levels A1–C2
│   │   ├── TrainingSession.vue # Training round: deck, self-assessment, statistics
│   │   └── Flashcard.vue       # Flashcard with flip animation
│   ├── composables/
│   │   └── useProgress.ts      # Learning progress per level (localStorage)
│   ├── data/
│   │   ├── a1.ts … c2.ts       # 100 words per level
│   │   └── vocabulary.ts       # List of levels including their colors
│   ├── theme.ts                # Derives the CSS variables from the level colors
│   ├── types.ts                # TypeScript types (Vocabulary, Level, LevelInfo)
│   └── style.css               # Global styles and page colors
├── vite.config.ts
└── tsconfig*.json
```

## Adding your own words

Each level has its own file in [`src/data/`](src/data/): `a1.ts`, `a2.ts`, `b1.ts`, `b2.ts`, `c1.ts`, `c2.ts`. Add new entries there:

```ts
// in src/data/a1.ts
{ id: 1101, de: 'der Baum', en: 'the tree' },
```

The `id` must be unique across all levels. The bundled words use 101–200 (A1), 201–300 (A2), 301–400 (B1), 401–500 (B2), 501–600 (C1) and 601–700 (C2). For your own words, the easiest option is to number them consecutively starting at 1101 (A1), 1201 (A2), 1301 (B1), 1401 (B2), 1501 (C1) or 1601 (C2).

Don't change the IDs of existing words, otherwise the saved progress no longer matches them.

If the development server is running, new words show up in the app immediately.
