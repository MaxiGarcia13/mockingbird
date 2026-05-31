## 0.9.1 (2026-05-31)

### 🧱 Updated Dependencies

- Updated @maxigarcia/mockingbird-app to 0.9.1

## 0.9.0 (2026-05-31)

### 🧱 Updated Dependencies

- Updated @maxigarcia/mockingbird-types to 0.5.0
- Updated @maxigarcia/mockingbird-app to 0.9.0

## 0.8.0 (2026-05-31)

### 🧱 Updated Dependencies

- Updated @maxigarcia/mockingbird-types to 0.4.0
- Updated @maxigarcia/mockingbird-app to 0.8.0

## 0.7.0 (2026-05-31)

### 🔄 Refactors

- Update timestamp handling in request management ([99c307d](https://github.com/MaxiGarcia13/mockingbird/commit/99c307d))

### 🧱 Updated Dependencies

- Updated @maxigarcia/mockingbird-types to 0.3.1
- Updated @maxigarcia/mockingbird-app to 0.7.0

### ❤️ Thank You

- Maximiliano Garcia Mortigliengo

## 0.6.0 (2026-05-31)

### 🧱 Updated Dependencies

- Updated @maxigarcia/mockingbird-app to 0.6.0

## 0.5.0 (2026-05-31)

### 🧱 Updated Dependencies

- Updated @maxigarcia/mockingbird-types to 0.3.0
- Updated @maxigarcia/mockingbird-app to 0.5.0

## 0.4.0 (2026-05-29)

### 🧹 Chores

- Update TypeScript configuration and dependencies ([c534611](https://github.com/MaxiGarcia13/mockingbird/commit/c534611))

### 🧱 Updated Dependencies

- Updated @maxigarcia/mockingbird-types to 0.2.2
- Updated @maxigarcia/mockingbird-app to 0.4.0

### ❤️ Thank You

- Maximiliano Garcia Mortigliengo

## 0.3.0 (2026-05-29)

### 🧱 Updated Dependencies

- Updated @maxigarcia/mockingbird-types to 0.2.1
- Updated @maxigarcia/mockingbird-app to 0.3.0

## 0.2.0 (2026-05-29)

### 🧱 Updated Dependencies

- Updated @maxigarcia/mockingbird-types to 0.2.0
- Updated @maxigarcia/mockingbird-app to 0.2.0

## 0.1.2 (2026-05-28)

### 🧱 Updated Dependencies

- Updated @maxigarcia/mockingbird-types to 0.1.2
- Updated @maxigarcia/mockingbird-app to 0.1.2

## 0.1.1 (2026-05-28)

### 🧱 Updated Dependencies

- Updated @maxigarcia/mockingbird-types to 0.1.1
- Updated @maxigarcia/mockingbird-app to 0.1.1

## 0.1.0 (2026-05-28)

### 🚀 Features

- Implement request interceptor to handle enabled mocks and integrate with Fastify server ([5fb44cb](https://github.com/MaxiGarcia13/mockingbird/commit/5fb44cb))
- Enhance getRequests function to support filtering by enabled status through options parameter ([0ed5959](https://github.com/MaxiGarcia13/mockingbird/commit/0ed5959))
- Implement request management API with CRUD operations for saving, updating, deleting, and retrieving requests ([4cd5ad3](https://github.com/MaxiGarcia13/mockingbird/commit/4cd5ad3))
- Add storage routes to API for handling storage requests ([d753984](https://github.com/MaxiGarcia13/mockingbird/commit/d753984))
- Initialize Fastify server and routing structure with TypeScript support in the API package ([71ace9c](https://github.com/MaxiGarcia13/mockingbird/commit/71ace9c))

### 🐞 Fixes

- Sort requests by updated date in getRequests function for improved data retrieval ([3871257](https://github.com/MaxiGarcia13/mockingbird/commit/3871257))

### 📚 Documentation

- Add README.md for local mock API server, detailing purpose, usage, and examples ([f26274f](https://github.com/MaxiGarcia13/mockingbird/commit/f26274f))

### 🧹 Chores

- Remove unused @fastify/http-proxy and @fastify/reply-from dependencies from package.json and package-lock.json, and update @nx packages to version 22.7.5 ([474a07b](https://github.com/MaxiGarcia13/mockingbird/commit/474a07b))
- Add @fastify/http-proxy and related dependencies to package.json and package-lock.json for enhanced HTTP proxy support ([9ef7822](https://github.com/MaxiGarcia13/mockingbird/commit/9ef7822))
- Update type import in requests.ts to maintain consistency with @maxigarcia/mockingbird-types ([a536c61](https://github.com/MaxiGarcia13/mockingbird/commit/a536c61))
- Update type import in requests.ts to use @maxigarcia/mockingbird-types for consistency across the project ([c11b27f](https://github.com/MaxiGarcia13/mockingbird/commit/c11b27f))
- Update tsconfig.json to adjust module paths and include root directory for better project structure ([c737813](https://github.com/MaxiGarcia13/mockingbird/commit/c737813))
- Add @maxigarcia/mockingbird-types dependency to package.json files and update package-lock.json for version consistency ([e98e643](https://github.com/MaxiGarcia13/mockingbird/commit/e98e643))
- Update package dependencies in package-lock.json and package.json for improved functionality ([13158bf](https://github.com/MaxiGarcia13/mockingbird/commit/13158bf))
- Update tsconfig.json to exclude .mockingbird directory for improved type checking ([76dbb9e](https://github.com/MaxiGarcia13/mockingbird/commit/76dbb9e))
- Refactor routes to remove storage and integrate CORS support ([e3c9389](https://github.com/MaxiGarcia13/mockingbird/commit/e3c9389))
- Update import path for initRoutes to use alias for improved readability ([c993367](https://github.com/MaxiGarcia13/mockingbird/commit/c993367))
- Add @fastify/cors dependency to package.json and package-lock.json for CORS support ([90572ac](https://github.com/MaxiGarcia13/mockingbird/commit/90572ac))
- Update tsconfig.json to include path mappings and extend type definitions inclusion ([9721c6f](https://github.com/MaxiGarcia13/mockingbird/commit/9721c6f))
- Refactor app route to use createRequire for module resolution and update appDist path ([c437b5f](https://github.com/MaxiGarcia13/mockingbird/commit/c437b5f))
- Update package-lock.json and package.json to link new scoped packages, add clean scripts, and enhance development commands ([54110d0](https://github.com/MaxiGarcia13/mockingbird/commit/54110d0))
- Rename API and app packages to include scope, update scripts for development, and remove obsolete README file ([772480c](https://github.com/MaxiGarcia13/mockingbird/commit/772480c))
- Update package.json scripts to reflect API package renaming and adjust development commands ([805f795](https://github.com/MaxiGarcia13/mockingbird/commit/805f795))

### 🧱 Updated Dependencies

- Updated @maxigarcia/mockingbird-types to 0.1.0
- Updated @maxigarcia/mockingbird-app to 0.1.0

### ❤️ Thank You

- Maximiliano Garcia Mortigliengo