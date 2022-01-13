const router = require("express").Router();

const auth = require("../middleware/auth");
const User = require("../model/user");

//create a user
router.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// logout
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();

    res.json();
  } catch (error) {
    res.status(500).json();
  }
});

// read all user
router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// read a user
router.get("/users/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ error: "Item not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a user
router.patch("/users/:id", auth, async (req, res) => {
  const allowedUpdates = ["name", "phone", "email", "password"];
  const updates = Object.keys(req.body);

  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) return res.status(400).json({ error: "Invalid update" });

  try {
    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));

    await user.save();

    if (!user) return res.status(404).json({ error: "Item not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a user
router.delete("/users/:id", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ error: "Item not found" });

    res.send(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
