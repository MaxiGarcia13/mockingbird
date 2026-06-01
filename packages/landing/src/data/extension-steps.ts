export const extensionSteps = [
  {
    title: "Install dependencies",
    body: "Same as the local workflow — one npm install at the repo root.",
    code: "git clone https://github.com/MaxiGarcia13/mockingbird.git\ncd mockingbird\nnpm install",
  },
  {
    title: "Build the extension",
    body: "Build once, or watch for changes while developing.",
    code: "npm run build",
  },
  {
    title: "Load it in Chrome",
    body: "Open chrome://extensions, enable Developer mode, click Load unpacked, and select packages/chromium-extension/dist.",
  },
  {
    title: "Add a mock on any site",
    body: "Open an http or https page, click the Mockingbird icon, define a mock (method, URL pattern, response), and turn interception on.",
  },
  {
    title: "Trigger a matching fetch",
    body: "When your page calls fetch with a matching method and URL pattern, the extension returns your mock response. Reload the extension in Chrome after code changes.",
    code: "# Wildcard example\n# Pattern: http://localhost*/api/*\n# Matches: http://localhost:5173/api/users",
    codeLabel: "Example",
  },
];
