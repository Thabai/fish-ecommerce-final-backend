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
            res.status(500).send(error);
        }
    }
};

exports.findFish = async (req, res) => {
  try {
    const fish = req.params.name;
    const targetFish = await Fish.findOne({ name: fish });
    if (targetFish !== null) {
      res.status(200).send({ fish: targetFish, message: "Fish name found" });
    } else {
          res.status(500).send({ message: "Fish not found" });
    }
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
    const targetFish = await Fish.findOneAndUpdate({ name: name }, {scientific:req.body.scientific, img: req.body.img, habitat: req.body.habitat, description: req.body.description, compatibility: req.body.compatibility, quantity: req.body.quantity, price: req.body.price}
      );
    res.status(200).send({ name: targetFish, message: "Fish Info Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Unsuccessful" });
  }
};

// exports.updateFish = async (req, res) => {
//   try {
//     const name = req.body.name;
//     const targetFish = await Fish.findOne({ name: name });
//     if (req.body.img) {
//     await Fish.findOneAndUpdate(
//       { name: name },
//       { $set: { img: req.body.img } },
//       { upsert: true, new: true }
//     );
//     } else if (req.body.habitat){
//     await Fish.findOneAndUpdate(
//       { name: name},
//       { $set: { habitat: req.body.habitat } },
//       { upsert: true, new: true }
//     );
//     }else if (req.body.desc) {
//     await Fish.findOneAndUpdate({ name: name},
//       { $set: { description: req.body.desc } },
//       { upsert: true, new: true }
//     ); 
//     } else if (req.body.compat) {
//     await Fish.findOneAndUpdate({ name: name},
//       { $set: { compatibility: req.body.compat } },
//       { upsert: true, new: true }
//     );
//     } else if (req.body.price) {
//     await Fish.findOneAndUpdate(
//       { name: name },
//       { $set: { price: req.body.price } },
//       { upsert: true, new: true }
//     );
//     }
//     res.status(200).send({ name : targetFish, message: "Fish Info Updated" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: "Unsuccessful" });
//   }
// };

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