const Fish = require("./fish.model");

exports.addFish = async (req, res) => {
  try {
    const fish = new Fish(req.body);
    const addedFish = await fish.save();
    res
      .status(200)
      .send({ fish: addedFish, message: "Fish added successfully" });
  } catch (error) {
    if(error.code === 11000) {
            res.status(500).send({message: "Species already in database"});
        } else {
            console.log(error)
            res.status(500).send({message: "Unsuccessful"});
        }
    }
};

exports.findFish = async (req, res) => {
  try {
    const fish = req.params.name;
    const targetFish = await Fish.findOne({ name: fish });
    
    res.status(200).send({ fish: targetFish, message: "Fish name found" });
  } catch (error) {
    res.status(500).send({ message: "Fish not found" });
  }
};

exports.findAllFish = async (req, res) => {
  try {
    const list = await Fish.find({});
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send({ message: "Loading all fish unsuccessful" });
  }
};

exports.deleteFish = async (req, res) => {
  try {
    const fish = req.params.name;
    const removeFish = await Fish.findOneAndDelete({ name: fish });
    if(removeFish !== null) {
            res.status(200).send({ fish: removeFish, message: "Fish species successfully deleted" });
        } else {
            res.status(500).send({message: "Species not found"});
        }
  } catch (error) {
    res.status(500).send({ message: "Unsuccessful" });
  }
};

exports.updateFish = async (req, res) => {
  try {
    const name = req.body.name;
    const img = req.body.img;
    const habitat = req.body.habitat;
    const desc = req.body.desc;
    const compat = req.body.compat;
    const price = req.body.price;
    const modifyFish= await Fish.findOneAndReplace(
      { name: name },
      { img: img, habitat: habitat, description: desc, compatibility: compat, price: price }
      
    );
    res.status(200).send({ name : modifyFish, message: "Fish Info Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Unsuccessful" });
  }
};

exports.updateFishStock = async (req, res) => {
  try {
    const name = req.body.name;
    const quantity = req.body.quantity;
    const modifyFish = await Fish.updateOne(
      { name: name },
      { quantity: quantity}
    );
    res.status(200).send({ movie: modifyFish, message: "Fish Stock Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Unsuccessful" });
  }
};