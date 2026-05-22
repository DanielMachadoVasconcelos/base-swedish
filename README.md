# Base Swedish

Personal Swedish learning feed for one adult Brazilian software engineer living in Sweden.

The product opens directly into a calm, mobile-first stream of useful Swedish moments. It is intentionally separate from `base-payments` and avoids enterprise architecture gravity.

## Structure

```plaintext
frontend/
backend/
```

## Starting The App

The current MVP is frontend-first. It runs entirely from local seed content, so the backend is not required to start the learning feed.

### Prerequisites

- Node.js 20 or newer
- npm

### Run The Frontend

From the project root:

```bash
cd frontend
npm install
npm run dev
```

Then open:

```plaintext
http://localhost:3000
```

The app should open directly into the Swedish learning feed. There is no dashboard, login, or lesson picker.

### Useful Frontend Commands

```bash
npm run typecheck
npm run build
npm run start
```

`npm run start` serves the production build, so run `npm run build` first.

## Backend Status

`backend/` is reserved for the later minimal Spring Boot API. It is intentionally not needed for the current MVP feed experience.

## Principles

- Feed first, no dashboard first.
- Mobile-native feeling, even on the web.
- One card, one idea, one primary action.
- Gentle feedback, never shame.
- Real Swedish life over textbook Swedish.
- Simple backend, frontend-led product experience.
