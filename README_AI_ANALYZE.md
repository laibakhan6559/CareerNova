Smart Analysis (Advisor) - Setup & Notes

What I added

- Frontend component: `src/components/SmartAnalysisForm.jsx`

  - Presents a form for student name, chosen field, total marks, obtained marks, area of interest, province and preferred city.
  - Posts the data to a backend endpoint and displays AI results.

- Wire-up: `src/components/Advisor.jsx` now renders the SmartAnalysisForm below the advisors list.

- Backend (Firebase Functions): `functions/index.js`

  - Adds an `analyzeStudent` HTTP function which forwards the supplied form data to an OpenAI-compatible API endpoint.
  - IMPORTANT: The function uses environment variables. Do NOT commit your API keys.

- `functions/package.json` with minimal dependencies.

How to configure and deploy (Firebase)

1. Install deps for functions

   cd functions
   npm install

2. Set environment variables (do NOT put your key in source control). Two options:

   - Use Firebase environment config:

     firebase functions:config:set openai.key="<YOUR_API_KEY>" openai.url="<OPTIONAL_API_URL>" openai.model="gpt-4o-mini"

     Then in `functions/index.js` you can read `functions.config().openai.key` (if you prefer). The current function expects process.env.OPENAI_API_KEY and OPENAI_API_URL.

   - Or when deploying, set runtime env variables:

     firebase functions:deploy analyzeStudent --region=us-central1 --set-env-vars OPENAI_API_KEY="<YOUR_KEY>",OPENAI_API_URL="https://api.openrouter.ai/v1/chat/completions"

3. Recommended: rotate the key you pasted into the chat. Do NOT keep it in code or README. The key you pasted appears to be an OpenRouter key; use that value as `OPENAI_API_KEY` and set `OPENAI_API_URL` to `https://api.openrouter.ai/v1/chat/completions`.

4. Deploy functions

   firebase deploy --only functions

5. Configure the frontend to call the function URL

   - If you use Firebase Hosting rewrites, you can forward `/api/analyzeStudent` to the function.
   - Or set Vite env var `VITE_ANALYZE_URL` to the full function URL. Create a `.env.local` with:

     VITE_ANALYZE_URL="https://us-central1-<PROJECT>.cloudfunctions.net/analyzeStudent"

Security note

- You pasted an API key into chat. That key should be considered compromised and rotated immediately. Do not store keys in repository files.

- The function code intentionally reads keys from environment variables. Never hardcode secrets.

Client usage

- The frontend form posts JSON to the endpoint and expects JSON back. The function tries to parse the model response as JSON and returns both `text` and `parsed` fields.

If you want, I can:

- Update the function to use Firebase functions config (`functions.config()`) instead of process.env.
- Replace the prompt or tune the model/temperature for different recommendation styles.
- Add a simple unit test for the function mocking the OpenAI response.


