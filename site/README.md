# Service Connect — CSE 340 W01 Site

Node.js + Express + EJS site with Home, Organizations, Service Projects, and
Categories pages.

## Run locally

```bash
npm install
npm start
```

Then open http://localhost:3000

## Project structure

```
server.js               Express app and routes
views/
  home.ejs
  organizations.ejs
  projects.ejs
  categories.ejs
  partials/
    header.ejs           nav bar, opens <html>/<body>, uses title variable
    footer.ejs            copyright, closes </body>/</html>
public/
  css/style.css          site stylesheet
  images/                organization images (SVG placeholders)
.env                     PORT=3000 (not committed to GitHub)
.env.example             template for required env vars
```

## Deploying to GitHub

1. `git init` (if not already a repo)
2. `git add .`
3. Confirm `.env` is NOT staged — it's excluded by `.gitignore`.
4. `git commit -m "Initial site with home, organizations, projects, categories"`
5. Create a new repo on GitHub, then:
   ```bash
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

## Deploying to Render.com

1. Log in to Render, click **New +** → **Web Service**.
2. Connect your GitHub repository.
3. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add an environment variable `PORT` is provided automatically by Render,
   so no extra env vars are required for this project.
5. Deploy, then visit the generated `onrender.com` URL to confirm all four
   pages (`/`, `/organizations`, `/projects`, `/categories`) load correctly.

## Submission checklist

- [ ] GitHub repo URL
- [ ] Render deployed site URL
- [ ] `.env` confirmed absent from GitHub repo
- [ ] All four pages + nav links working locally and on Render
