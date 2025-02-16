const express = require('express');
const { handleViewUsers, handleCreateUser, handleGetUser, handleDeleteUser, handleUpdateUser} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get("/", handleViewUsers);

userRouter.get("/create", handleCreateUser)

userRouter.route("/:id")
.get(handleGetUser)
.delete(handleDeleteUser)
.patch(handleUpdateUser)

module.exports = userRouter;