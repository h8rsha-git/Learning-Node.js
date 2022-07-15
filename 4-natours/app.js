const express = require('express');
const app = express();
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

/// 1. MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

// custom middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware👋');
  // else request-response cycle is stuck
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/// 2. START SERVER

// specifying the route, for which to use
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
