const Fish = require("./fish.model");

exports.addFish = async (req, res) => {
  try {
    const fish = new Fish(req.body);
    const addedFish = await fish.save();
    res
      .status(200)
      .send({ fish: addedFish, message: "Fish added successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

