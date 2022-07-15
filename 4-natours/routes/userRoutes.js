const express = require('express');
const fs = require('fs');
const app = express();

const getAllUsers = (req, res) => {
  // Internal Server Error
  return res.status(500).json({
    status: 'error',
    messsage: 'This route is not yet defined',
  });
};

const getUser = (req, res) => {
  // Internal Server Error
  return res.status(500).json({
    status: 'error',
    messsage: 'This route is not yet defined',
  });
};

const createUser = (req, res) => {
  // Internal Server Error
  return res.status(500).json({
    status: 'error',
    messsage: 'This route is not yet defined',
  });
};

const updateUser = (req, res) => {
  // Internal Server Error
  return res.status(500).json({
    status: 'error',
    messsage: 'This route is not yet defined',
  });
};

const deleteUser = (req, res) => {
  // Internal Server Error
  return res.status(500).json({
    status: 'error',
    messsage: 'This route is not yet defined',
  });
};

// 3. ROUTES
// called as mounting of the router
const userRouter = express.Router();

/// FOR USERS
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;
