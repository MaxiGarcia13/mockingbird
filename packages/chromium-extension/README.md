# Chromium Extension

Chrome/Chromium extension for [Mockingbird](https://github.com/MaxiGarcia13/mockingbird). It patches `window.fetch` on web pages and returns configured mock responses when a saved request matches.

Unlike the web app (`packages/app`), mocks are stored in the browser (`chrome.storage.local`) and work on any `http://` or `https://` tab—no local API server required.

## Purpose

- Define mock endpoints (method, URL pattern, status, headers, body) from the extension popup.
- Enable or disable interception globally with one toggle.
- Intercept matching `fetch` calls in the page and return the configured response.

## How it works

The extension uses three layers that stay in sync via `chrome.storage.local` and page `CustomEvent`s:

1. **Popup (React)** — UI to manage mocks and toggle interception. Built with Vite, React 19, Tailwind CSS v4, Zustand, and shared components from `@maxigarcia/mockingbird-shared`.
2. **Bridge content script** (`scripts/interceptor/bridge.js`) — Runs in the extension’s isolated world. Reads storage changes and dispatches `mockingbird:activation` and `mockingbird:saved-requests` on the page.
3. **Fetch interceptor** (`scripts/interceptor/fetch.js`) — Runs in the page **MAIN** world (`manifest.json` `world: "MAIN"`). Listens for those events, patches `window.fetch` when active, and returns mock `Response` objects for enabled rules that match method + URL pattern.

Interceptor scripts are bundled separately from the popup (esbuild IIFE via the `interceptor-scripts` Vite plugin) so they can run in content scripts without pulling in the React app.

### URL matching

Saved URL patterns support `*` wildcards, path-only patterns (e.g. `/api/*`), optional query matching, and trailing `/*` to include the base path. See `src/utils/url-match.ts` and its unit tests for behavior.

### Storage keys

| Key                            | Purpose                         |
| ------------------------------ | ------------------------------- |
| `mockingbird:intercept-active` | Global on/off for interception  |
| `mockingbird:saved-requests`   | Array of saved mock definitions |

Types live in `@maxigarcia/mockingbird-types`.

## Project layout

```
packages/chromium-extension/
├── public/              # manifest.json, icons (copied to dist/)
├── src/
│   ├── components/      # Popup UI
│   ├── scripts/interceptor/  # Content-script sources (fetch + bridge)
│   ├── services/        # chrome.storage helpers
│   └── utils/           # URL pattern matching
├── plugins/             # Vite plugin that bundles interceptor scripts
└── dist/                # Load this folder as an unpacked extension
```

## Local development

From the repo root:

```bash
npm run dev:chromium-extension
```

Or from this package:

```bash
npm run dev
```

`dev` runs `vite build --watch`. After each rebuild, reload the extension in Chrome.

### Load the extension in Chrome

1. Build at least once: `npm run build` (from this package or via `nx run mockingbird-chromium-extension:build` from the root).
2. Open `chrome://extensions`, enable **Developer mode**.
3. Choose **Load unpacked** and select `packages/chromium-extension/dist`.
4. Open a site over `http://` or `https://`, click the Mockingbird icon, add a mock, turn interception **on**, and trigger a matching `fetch` from the page.

## Scripts

| Script              | Description                            |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Watch build into `dist/`               |
| `npm run build`     | Typecheck (`tsc`) and production build |
| `npm run test:unit` | Vitest (e.g. URL matching)             |
| `npm run clean`     | Remove `dist/` and `node_modules/`     |

## Limitations

- Only **`fetch`** is intercepted (not `XMLHttpRequest` or other APIs).
- Content scripts run on `http://*/*` and `https://*/*` only.
- Requires the **storage** permission; mocks stay on the local browser profile.

## Related packages

- [`packages/app`](../app/) — Web UI backed by the local mock API.
- [`packages/api`](../api/) — Local mock server for app-based workflows.
- [`packages/shared`](../shared/) — Shared UI and utilities.
- [`packages/types`](../types/) — Shared TypeScript types.
