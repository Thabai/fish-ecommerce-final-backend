const { Router } = require("express");
const userRouter = Router();
const {
  createUser,
  findUser,
  deleteUser,
  updateUser,
  authUser,
} = require("./users.controllers");
const { auth } = require("../middleware");

userRouter.post("/users", createUser);
userRouter.get("/users", auth, authUser);
userRouter.post("/users/:username", findUser);
userRouter.delete("/users/:username", deleteUser);
userRouter.put("/users", updateUser);

module.exports = userRouter;
