import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { getCategories } from './src/models/categories.js';
import { getOrganizations } from './src/models/organizations.js';
import { getProjects } from './src/models/projects.js';
import pool from './src/database.js';

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to log all incoming requests
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next(); // Pass control to the next middleware or route
});

// Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});

// Static middleware to serve the public folder (css, images, client js)
app.use(express.static(path.join(__dirname, 'public')));

// Home page route
app.get('/', asyncHandler(async (req, res) => {
  const title = 'Home';
  res.render('home', { title });
}));

// Organizations page route
app.get('/organizations', asyncHandler(async (req, res) => {
  const title = 'Organizations';
  const organizations = await getOrganizations();
  res.render('organizations', { title, organizations });
}));

// Service Projects page route
app.get('/projects', asyncHandler(async (req, res) => {
  const title = 'Service Projects';
  const projects = await getProjects();
  res.render('projects', { title, projects });
}));

// Service Project Categories page route
app.get('/categories', asyncHandler(async (req, res) => {
  const title = 'Categories';
  const categories = await getCategories();
  res.render('categories', { title, categories });
}));

app.get('/health/db', asyncHandler(async (req, res) => {
  const result = await pool.query('SELECT NOW() AS database_time');
  res.json({
    status: 'ok',
    databaseTime: result.rows[0].database_time
  });
}));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong while loading this page.');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
