export const localSteps = [
  {
    title: "Install dependencies",
    body: "Clone the repo and install once from the monorepo root.",
    code: "git clone https://github.com/MaxiGarcia13/mockingbird.git\ncd mockingbird\nnpm install",
  },
  {
    title: "Start the API",
    body: "The Fastify server stores mocks and serves them on localhost (default port 3000).",
    code: "npm run dev",
  },
  {
    title: "Open the web app",
    body: "In a second terminal, start the React UI to create and manage mocks.",
    code: "npm run dev:app",
  },
  {
    title: "Create a mock and enable it",
    body: "Set method, URL, status, headers, and body in the app, then turn the mock on.",
  },
  {
    title: "Point your frontend at the API",
    body: "Send requests to http://127.0.0.1:3000/... — only the pathname is matched against your saved URL.",
    code: "# Example: saved URL http://example.com/api/users\n# matches GET http://127.0.0.1:3000/api/users",
    codeLabel: "Example",
  },
];
