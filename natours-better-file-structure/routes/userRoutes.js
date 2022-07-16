const express = require('express');
const fs = require('fs');
const app = express();
const userController = require('./../controllers/userController');

// 3. ROUTES
// called as mounting of the router
const userRouter = express.Router();

/// FOR USERS
userRouter
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
userRouter
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
