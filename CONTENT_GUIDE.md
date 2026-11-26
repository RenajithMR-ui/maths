# Content Customization Guide (Base Model)

This project is structured so you can customize every module, topic, formula, flashcard, quiz, and PYQ without editing any React UI components.

## 1. Quick Start
```bash
npm install
npm run dev
```

## 2. Where to Edit Content (`src/data/`)

| File | What to Edit |
| :--- | :--- |
| `src/data/courseConfig.js` | Brand name, course code (`GAMAT101`), credits, exam pattern marks, Course Outcomes, textbooks, and reference links. |
| `src/data/modules.js` | The 4 modules (`id: 1..4`), titles, hours, summaries, SAC playlist/PDF links, and `topicIds` list. |
| `src/data/topics.js` | Topic notes keyed by `topicId`: `keyTakeaways`, numbered `sections`, `formula`, `keyIdea`, `table`, and `workedExample`. |
| `src/data/formulas.js` | Formula & Theorem Cheat Sheet cards. |
| `src/data/flashcards.js` | Interactive flip flashcards per module & topic. |
| `src/data/quizzes.js` | Practice quiz MCQs with `correctIndex` and explanations. |
| `src/data/pyq.js` | PYQ topic weightage heatmap and sample exam questions + hints. |

## 3. Writing Math Equations (LaTeX / KaTeX)
All text fields in `topics.js`, `formulas.js`, `flashcards.js`, `quizzes.js`, and `pyq.js` automatically render LaTeX:
- Inline math: `'$f(x) = x^2$'`
- Display block math: `'$$\\\\nabla f = \\\\lambda \\\\nabla g$$'`
- Note: Inside JavaScript string quotes (`'...'`), escape backslashes as `\\\\` (e.g. `'\\\\frac{dy}{dx}'`).
