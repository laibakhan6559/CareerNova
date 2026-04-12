# AI Career Advisor — Frontend

This repository contains a React frontend scaffold for the AI Career Advisor project. It includes:

- React + Vite app
- Firebase (Auth + Firestore) wiring
- A login and signup flow
- Dashboard with real-time Firestore data
- Interactive chart (Chart.js)
- 3D scene using Three.js
- Framer Motion animations

Quick start (Windows PowerShell):

1. Clone repository and open a terminal in the project folder.

2. Install dependencies:

```powershell
npm install
```

3. Add Firebase config:

Open `src/firebase.js` and replace the placeholder config with values from your Firebase project.

4. Prepare Firestore sample doc:

Create a document at `stats/main` with fields: `activeUsers` (number), `siteRating` (number), `engagement` (number).

5. Run the dev server:

```powershell
npm run dev
```

Notes & next steps:

- AI integration: `src/api/ai.js` is a client stub. For production, create a server endpoint to store API keys and call OpenAI/Gemini securely.
- The Three.js scene is lightweight and intended as a starting point; replace or extend meshes and materials as needed.
- Consider adding environment variable handling for Firebase and API endpoints (e.g., `.env` files, secure server).


