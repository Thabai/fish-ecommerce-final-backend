require("./db/connection");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const userRouter = require("./users/users.routes");
const fishRouter = require("./fish/fish.routes");

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(fishRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
