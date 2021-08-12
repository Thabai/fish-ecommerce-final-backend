const User = require("./users.model");

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    const token = await user.generateAuthToken(user._id);
    res.status(200).send({
      user: savedUser,
      token: token,
      message: "User created in database",
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(500).send({ message: "Username and/or email already in use" });
    } else {
      console.log(error);
      res.status(500).send({ message: "Unsuccessful" });
    }
  }
};

exports.findUser = async (req, res) => {
  try {
    const user = req.params.username;
    const pass = req.body.password;
    const targetUser = await User.findOne({ username: user, password: pass });
    const token = await targetUser.generateAuthToken(targetUser._id);
    res
      .status(200)
      .send({ user: targetUser, token: token, message: "User found" });
  } catch (error) {
    res.status(500).send({message: "User not found"});
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = req.params.username;
    const filter = req.params.username;
    const removeUser = await User.findOneAndDelete(
      { username: filter },
      { username: user }
    );
    res.status(200).send({ user: removeUser, message: "User deleted" });
  } catch (error) {
    res.status(500).send({ message: "Unsuccessful" });
  }
};

exports.updateUser = async (req, res) => {
  try {
     const filter = req.body.currentUser;
     if (req.body.email) {
      await User.findOneAndUpdate(
        { username: filter },
        { $set: { email: req.body.email } },
        { upsert: true, new: true }
      );
    } else if (req.body.pass) {
      await User.findOneAndUpdate(
        { username: filter },
        { $set: { password: req.body.pass } },
        { upsert: true, new: true }
      );
    } else if (req.body.name) {
      await User.findOneAndUpdate(
        { username: filter },
        { $set: { name: req.body.name } },
        { upsert: true, new: true }
      );
    } else if (req.body.surname) {
      await User.findOneAndUpdate(
        { username: filter },
        { $set: { surname: req.body.surname } },
        { upsert: true, new: true }
      );
    } else if (req.body.street) {
      await User.findOneAndUpdate(
        { username: filter },
        { $set: { street: req.body.street } },
        { upsert: true, new: true }
      );
    } else if (req.body.city) {
      await User.findOneAndUpdate(
        { username: filter },
        { $set: { city: req.body.city } },
        { upsert: true, new: true }
      );
    } else if (req.body.postcode) {
      await User.findOneAndUpdate(
        { username: filter },
        { $set: { postcode: req.body.postcode } },
        { upsert: true, new: true }
      );
    }
    res.status(200).send({ username: filter, message: "User modified" });
  } catch (error) {
    res.status(500).send({ message: "Unsuccessful" });
  }
};


exports.authUser = async (req, res) => {
  res.status(200).send(req.user);
};
