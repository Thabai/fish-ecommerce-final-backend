const { Router } = require("express");
const fishRouter = Router();
const {
  addFish,
  findFish,
  findAllFish,
  deleteFish,
  updateFish,
  updateFishStock
} = require("./fish.controllers");

fishRouter.post("/fish", addFish);
fishRouter.get("/fish/:name", findFish);
fishRouter.get("/fishAll", findAllFish);
fishRouter.delete("/fish/:name", deleteFish);
fishRouter.put("/fish", updateFish);
fishRouter.put("/fishStock", updateFishStock);

module.exports = fishRouter;
