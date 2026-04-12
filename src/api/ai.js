// Client-side AI call stub.
// IMPORTANT: Do NOT call OpenAI (or other LLM APIs) directly from frontend in production.
// Instead create a secure server endpoint (Cloud Function, Cloud Run, Vercel/Netlify function)
// that stores the API key and proxies requests.

export async function getCareerSuggestion(query) {
  // Example: POST to your backend serverless function which calls OpenAI/Gemini
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error("AI backend error");
  return res.json();
}


