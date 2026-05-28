# Mockingbird

Mockingbird is a local API mocking tool for development.
It lets you define mock HTTP responses and test frontend behavior without depending on external services.

## Purpose

- Speed up local development and debugging.
- Simulate backend endpoints with custom status codes, headers, and bodies.
- Keep testing deterministic by running everything locally.

## Monorepo structure

- `packages/app`: React UI to create and manage mocked requests.
- `packages/api`: Fastify server that stores mocks and serves intercepted responses.
- `packages/types`: Shared TypeScript types used across app and API.

## Local setup

1. Install dependencies:
   - `npm install`
2. Start the API:
   - `npm run dev`
3. (Optional) Start the app in development mode:
   - `npm run dev:app`

## Local-only note

Mockingbird is intended for local testing.
Use localhost/loopback addresses for API access (for example `127.0.0.1` with the configured port, default `3000`).
