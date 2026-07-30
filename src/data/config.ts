// TODO: replace with real Calendly links once available.
export const CALENDLY_LINKS = {
  agency: "https://calendly.com/rouh-agency/consult",
  podcast: "https://calendly.com/rouh-agency/podcast-studio",
};

// Must end in /api — the Laravel backend registers routes/api.php under that prefix
// (see rouh-api/bootstrap/app.php's withRouting(api: ...)). A missing env var silently
// becomes the literal string "undefined" here, so warn loudly instead.
// NOTE: intentionally not a top-level `throw` — that pattern was observed to make
// Vite/Rollup's production tree-shaking drop unrelated page components entirely
// (confirmed by bisecting: reverting only the throw restored the full bundle).
function resolveApiBaseUrl(): string {
  const url = import.meta.env.VITE_API_BASE_URL;
  if (!url) {
    console.error(
      "VITE_API_BASE_URL is not set. Check .env.development / .env.production."
    );
  }
  return url ?? "";
}

export const API_BASE_URL = resolveApiBaseUrl();


