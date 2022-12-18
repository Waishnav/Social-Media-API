require('dotenv').config();
const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const helmet = require('helmet');
const routes = require('./server/routes');

const app = express();

// Enable CORS
// app.use(cors());

// Log requests to the console
// app.use(morgan('dev'));

// Set various HTTP headers to help secure the app
// app.use(helmet());

// Parse JSON bodies
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Namaste World!');
});
// Set up the API routes
app.use('/api', routes);

// Catch-all route for 404 responses
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: 'Something went wrong' });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
