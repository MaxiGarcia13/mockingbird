# App

This package is the Mockingbird frontend application.
It provides the interface to create, edit, enable/disable, and delete mocked HTTP requests for local development workflows.

## Purpose

- Lets you define mock endpoints (method, URL, status, headers, and body).
- Persists and manages saved mocks through the local API package.
- Helps test frontend behavior without relying on real external services.

## How it works

- Runs as a Vite + React app.
- Sends request-management actions to the local API (`/requests` endpoints).
- Is intended to be used together with `@packages/api` running locally.

## Local usage

- Start this app with `npm run dev` in `packages/app`.
- Ensure `@packages/api` is running locally so saved requests can be managed.
