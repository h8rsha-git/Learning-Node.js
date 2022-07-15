const express = require('express');
const fs = require('fs');
const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  //console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;

  if (id < 0 || id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      messsage: 'Invalid ID',
    });
  }

  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour Here>',
    },
  });
};

const deleteTour = (req, res) => {
  return res.status(204).json({
    status: 'success',
    data: null,
  });
};

// here tourRouter is the middleware
const tourRouter = express.Router();

/// FOR TOURS
tourRouter.route('/').get(getAllTours).post(createTour);
// url is already in the parent route
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = tourRouter;
