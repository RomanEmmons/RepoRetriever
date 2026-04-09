# RepoRetriever

A full-stack tool that fetches a GitHub user's top 25 repositories ranked by star count, then persists the results to MongoDB so repeat lookups don't require another API call.

## How it works

Enter a GitHub username and RepoRetriever hits the GitHub API, retrieves the user's public repositories, sorts them by star count, and returns the top 25. Results are saved to MongoDB — if the same username is looked up again, the cached records are returned directly without re-fetching from GitHub.

## Tech stack

- **Backend:** Node.js, Express
- **Database:** MongoDB via Mongoose
- **Frontend:** React, Webpack, Babel
- **HTTP:** Request, jQuery
- **Other:** Nodemon, Moment.js

## Project structure

```
RepoRetriever/
├── client/       # React frontend
├── server/       # Express server and API routes
├── database/     # MongoDB connection and models
├── helpers/      # Utility functions (API calls, data transformation)
├── data.json     # Local data reference
└── webpack.config.js
```

## Architecture notes

The separation between `server/`, `database/`, and `helpers/` was intentional — route handling, data persistence, and business logic each live in their own layer. The helpers directory handles GitHub API interaction and response normalization, keeping that complexity out of the route definitions. MongoDB serves as a simple cache: the database is checked before making any outbound API call, which keeps the app fast on repeat lookups and avoids GitHub's rate limits.

## Getting started

**Prerequisites:** Node.js, MongoDB

**Install dependencies:**
```bash
npm install
```

**Start MongoDB** — make sure a MongoDB instance is running locally on the default port.

**Run in development:**
```bash
# In one terminal — start the React dev build watcher
npm run react:dev

# In another terminal — start the Express server
npm run server:dev
```

The app will be available at `http://localhost:3000`.

## Key dependencies

| Package | Purpose |
|---|---|
| `express` | Web server and API routing |
| `mongoose` | MongoDB ODM for caching repo results |
| `request` | GitHub API HTTP requests |
| `react` / `react-dom` | Frontend UI |
| `moment` | Date formatting for repo metadata |
| `webpack` | Frontend bundling |

## Author

[Roman Emmons](https://github.com/RomanEmmons)
