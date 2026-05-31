# Mockingbird

Mockingbird is an HTTP mocking tool for development. Define mock responses (status, headers, body) and test frontend behavior without relying on real backends.

You can use it in two ways:

- **Local server + web app** — A Fastify API stores mocks and intercepts traffic pointed at localhost. The React app manages saved requests.
- **Chromium extension** — Mocks live in the browser and patch `window.fetch` on any `http://` or `https://` tab. No API server required.

## Purpose

- Speed up local development and debugging.
- Simulate endpoints with custom status codes, headers, and bodies.
- Keep tests deterministic with predictable responses.

## Monorepo structure

| Package | Description |
| --- | --- |
| [`packages/app`](packages/app/) | React UI to create and manage mocked requests (uses the local API). |
| [`packages/api`](packages/api/) | Fastify server that stores mocks and serves intercepted responses. |
| [`packages/chromium-extension`](packages/chromium-extension/) | Chrome/Chromium extension that mocks `fetch` in the page. |
| [`packages/shared`](packages/shared/) | Shared React components and utilities. |
| [`packages/types`](packages/types/) | Shared TypeScript types. |

## Local setup

1. Install dependencies:
   - `npm install`
2. Choose a workflow:

### API + web app

1. Start the API:
   - `npm run dev`
2. (Optional) Start the app:
   - `npm run dev:app`

See [`packages/api/README.md`](packages/api/README.md) and [`packages/app/README.md`](packages/app/README.md) for details.

### Chromium extension

1. Build and watch the extension:
   - `npm run dev:chromium-extension`
2. Load `packages/chromium-extension/dist` as an unpacked extension in Chrome (`chrome://extensions` → Developer mode → Load unpacked).

See [`packages/chromium-extension/README.md`](packages/chromium-extension/README.md) for architecture, URL matching, and limitations.

## Other scripts

| Script | Description |
| --- | --- |
| `npm run build` | Build all packages |
| `npm run start` | Build, then run the API in production mode |
| `npm run test:unit` | Run unit tests across packages |
| `npm run lint` | Lint the monorepo |

## Local-only note

The **API + web app** workflow is for local testing. Point traffic at loopback (for example `127.0.0.1` on port `3000`, or the port in `.env`). The extension runs entirely in the browser; mocks are stored in `chrome.storage.local` for your profile.
