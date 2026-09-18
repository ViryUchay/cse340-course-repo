# Service Connect - CSE 340 W01 Site

Node.js + Express + EJS site with Home, Organizations, Service Projects, and
Categories pages backed by a PostgreSQL database.

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local `.env` file from `.env.example` and update `DATABASE_URL`:

   ```bash
   PORT=3000
   DATABASE_URL=postgres://username:password@localhost:5432/service_connect
   DATABASE_SSL=false
   ```

3. Create and seed the database using `src/setup.sql`.

4. Start the app:

   ```bash
   npm start
   ```

Then open http://localhost:3000.

## Project structure

```text
server.js               Express app and routes
src/
  database.js           PostgreSQL connection pool
  setup.sql             Database schema and seed data
  models/
    categories.js
    organizations.js
    projects.js
views/
  home.ejs
  organizations.ejs
  projects.ejs
  categories.ejs
  partials/
    header.ejs          Navigation and opening HTML
    footer.ejs          Footer and closing HTML
public/
  css/style.css         Site stylesheet
.env.example            Template for required environment variables
```

## Deploying to Render.com

1. Log in to Render and create a PostgreSQL database.
2. Create a new Web Service connected to your GitHub repository.
3. Settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add the database connection string as `DATABASE_URL`.
5. Leave `DATABASE_SSL` unset for Render PostgreSQL so SSL is enabled.
6. Deploy, then visit the generated `onrender.com` URL to confirm all four
   pages (`/`, `/organizations`, `/projects`, `/categories`) load correctly.

## Submission checklist

- [ ] GitHub repo URL
- [ ] Render deployed site URL
- [ ] `.env` confirmed absent from GitHub repo
- [ ] `DATABASE_URL` configured locally and on Render
- [ ] `DATABASE_SSL=false` used only for non-SSL local databases
- [ ] All four pages and nav links working locally and on Render
