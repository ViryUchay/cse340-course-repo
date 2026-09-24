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

app.use('/', organizationRoutes);
app.use('/', projectRoutes);
app.use('/', categoryRoutes);


app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).render(status === 404 ? '404' : '500', {
    title: status === 404 ? 'Page Not Found' : 'Server Error'
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
