import express from 'express';
import dotenv from 'dotenv';
import { getCategories } from './src/models/categories.js';
import { getOrganizations } from './src/models/organizations.js';
import { getProjects } from './src/models/projects.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Static middleware to serve the public folder (css, images, client js)
app.use(express.static('public'));

// Home page route
app.get('/', async (req, res) => {
  const title = 'Home';
  res.render('home', { title });
});

// Organizations page route
app.get('/organizations', async (req, res) => {
  const title = 'Organizations';
  const organizations = await getOrganizations();
  res.render('organizations', { title, organizations });
});

// Service Projects page route
app.get('/projects', async (req, res) => {
  const title = 'Service Projects';
  const projects = await getProjects();
  res.render('projects', { title, projects });
});
// Service Project Categories page route
app.get('/categories', async (req, res) => {
  const title = 'Categories';
  const categories = await getCategories();
  res.render('categories', { title, categories });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
