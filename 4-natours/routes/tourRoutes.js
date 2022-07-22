const express = require('express');

const tourController = require('../controllers/tourController');

// here tourRouter is the middleware
const tourRouter = express.Router();

/// PARAM MIDDLEWARE
// tourRouter.param('id', tourController.checkId);

tourRouter
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

tourRouter.route('/tour-stats').get(tourController.getTourStats);
tourRouter.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

/// FOR TOURS
tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

// url is already in the parent route
tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
