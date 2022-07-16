const express = require('express');
const fs = require('fs');
const app = express();
const tourController = require('./../controllers/tourController');

// here tourRouter is the middleware
const tourRouter = express.Router();

/// PARAM MIDDLEWARE
tourRouter.param('id', tourController.checkId);

/// FOR TOURS
tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

// url is already in the parent route
tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
