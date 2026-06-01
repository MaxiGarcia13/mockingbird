export const workflows = [
  {
    id: "extension",
    badge: "Browser",
    title: "Chromium extension",
    summary:
      "Install the extension and patch fetch on any http/https tab. No API server — mocks live in the browser and work on real sites you already have open.",
    bestFor: [
      "No backend setup",
      "Wildcard URL patterns",
      "Quick per-page testing",
    ],
    storage: "chrome.storage.local",
  },
  {
    id: "local-app",
    badge: "Local server",
    title: "Web app + API",
    summary:
      "Run a Fastify API on localhost and manage mocks from a React app. Point your frontend at the API — matching routes return your configured responses.",
    bestFor: [
      "Team-shared mock files",
      "Pathname-based matching",
      "Persistent mocks on disk",
    ],
    storage: "packages/api/.mockingbird/requests.json",
  },
];
