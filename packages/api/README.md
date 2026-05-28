# API (Local Testing Only)

This package is a local mock API server used by Mockingbird during development.
Its goal is to help you test frontend flows without depending on real external APIs.

## Purpose

- Stores mock request definitions locally in `.mockingbird/requests.json`.
- Exposes routes to manage those mock definitions.
- Intercepts enabled mocks and serves configured responses (status, headers, body).

In short, this API acts as a local fake backend so you can prototype and validate behavior quickly.

## Host and Port

- This server is for local testing only.
- Always point requests to `127.0.0.1` (never remote hosts).
- Use port `3000` by default, or the port defined in `.env` (`PORT`).
- Expected base URL format: `http://127.0.0.1:<port>`.

## Examples

- Default: `http://127.0.0.1:3000`
- Custom port from `.env`: `http://127.0.0.1:<YOUR_DEFINED_PORT>`
