# Mockingbird

HTTP mocking tool for development. Define mock responses (status, headers, body) and test frontend behavior without real backends.

Two workflows:

- **Local server + web app** — Fastify API stores mocks and serves them on localhost. React app manages saved requests.
- **Chromium extension** — Mocks live in the browser and patch `window.fetch` on any `http://` or `https://` tab. No API server required.

## Setup

```bash
npm install
```

## Local server + web app

1. Start the API (default `http://127.0.0.1:3000`):

   ```bash
   npm run dev
   ```

2. Open the app, create a mock (method, URL, status, headers, body), and enable it.

3. Point your frontend at the API base URL (e.g. `http://127.0.0.1:3000`). Enabled mocks are served for matching routes.

Mocks are persisted in `packages/api/.mockingbird/requests.json`. Use port `3000` or set `PORT` in `.env`.

### URL examples (local API)

Use full `http://127.0.0.1:<port>/...` URLs. Only the **pathname** is matched — no wildcards.

| Saved URL                        | Matches                                                 |
| -------------------------------- | ------------------------------------------------------- |
| `http://example.com/api/users`   | `GET http://127.0.0.1:3000/api/users`                   |
| `http://example.com/api/users/1` | `GET http://127.0.0.1:3000/api/users/1`                 |
| `http://example.com/api/users`   | `GET http://127.0.0.1:3000/api/users/` (trailing slash) |

See [`packages/api/README.md`](packages/api/README.md) and [`packages/app/README.md`](packages/app/README.md) for details.

## Chromium extension

1. Build and watch the extension:

   ```bash
   npm run dev:chromium-extension
   ```

2. In Chrome, open `chrome://extensions`, enable **Developer mode**, choose **Load unpacked**, and select `packages/chromium-extension/dist`.

3. Open any `http://` or `https://` page, click the Mockingbird icon, add a mock, and turn interception **on**.

4. Trigger a matching `fetch` from the page — the extension returns your configured response.

After code changes, reload the extension in Chrome. Mocks are stored in `chrome.storage.local` for your browser profile.

### URL examples (extension)

Patterns support `*` wildcards. A trailing `/*` also matches the base URL without a path segment.

| Pattern                             | Example request                       | Matches                         |
| ----------------------------------- | ------------------------------------- | ------------------------------- |
| `https://api.example.com/users`     | `https://api.example.com/users`       | Exact URL                       |
| `https://api.example.com/users`     | `https://api.example.com/users/1`     | No — path must match            |
| `http://localhost*/api/*`           | `http://localhost:5173/api/users`     | Any localhost port              |
| `http://localhost:5173/api`         | `http://localhost:3000/api`           | No — port is fixed              |
| `https://example.*.com/*`           | `https://example.test.com/foo`        | Wildcard subdomain              |
| `https://example.com/*`             | `https://example.com`                 | Trailing `/*` includes base URL |
| `https://example.com?q=*&test=hola` | `https://example.com?q=foo&test=hola` | Query param wildcards           |

See [`packages/chromium-extension/README.md`](packages/chromium-extension/README.md) for architecture, URL matching, and limitations.

## Monorepo structure

| Package                                                       | Description                                                         |
| ------------------------------------------------------------- | ------------------------------------------------------------------- |
| [`packages/app`](packages/app/)                               | React UI to create and manage mocked requests (uses the local API). |
| [`packages/api`](packages/api/)                               | Fastify server that stores mocks and serves intercepted responses.  |
| [`packages/chromium-extension`](packages/chromium-extension/) | Chrome/Chromium extension that mocks `fetch` in the page.           |
| [`packages/shared`](packages/shared/)                         | Shared React components and utilities.                              |
| [`packages/types`](packages/types/)                           | Shared TypeScript types.                                            |

## Scripts

| Script                           | Description                                |
| -------------------------------- | ------------------------------------------ |
| `npm run dev`                    | Start the local API in dev mode            |
| `npm run dev:app`                | Start the web UI in dev mode               |
| `npm run dev:chromium-extension` | Watch-build the Chromium extension         |
| `npm run build`                  | Build all packages                         |
| `npm run start`                  | Build, then run the API in production mode |
| `npm run test:unit`              | Run unit tests across packages             |
| `npm run lint`                   | Lint the monorepo                          |
