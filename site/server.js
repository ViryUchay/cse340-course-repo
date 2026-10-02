import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import categoryRoutes from './src/routes/categoryRoutes.js';
import organizationRoutes from './src/routes/organizationRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';

const app = express();
const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data
app.use(express.json());

// Middleware to log all incoming requests
app.use((req, res, next) => {
  if (NODE_ENV === 'development') {
    console.log(`${req.method} ${req.url}`);
  }
  next();
});

// Make NODE_ENV available to all templates
app.use((req, res, next) => {
  res.locals.NODE_ENV = NODE_ENV;
  next();
});

// Static middleware to serve CSS, images, and client-side JavaScript
app.use(express.static(path.join(__dirname, 'public')));

// Home page route
app.get('/', asyncHandler(async (req, res) => {
  const title = 'Home';
  res.render('home', { title });
}));

// Application routes
app.use('/', organizationRoutes);
app.use('/', projectRoutes);
app.use('/', categoryRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;

  res.status(status).render(status === 404 ? '404' : '500', {
    title: status === 404 ? 'Page Not Found' : 'Server Error'
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});