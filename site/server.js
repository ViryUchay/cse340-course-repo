import express from 'express';
import dotenv from 'dotenv';

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
  res.render('organizations', { title });
});

// Service Projects page route
app.get('/projects', async (req, res) => {
  const title = 'Service Projects';
  res.render('projects', { title });
});

// Service Project Categories page route
app.get('/categories', async (req, res) => {
  const title = 'Categories';
  const categories = [
    'Environmental',
    'Educational',
    'Community Service',
    'Health and Wellness',
  ];
  res.render('categories', { title, categories });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
