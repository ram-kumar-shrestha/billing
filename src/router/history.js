const router = require("express").Router();
const History = require("../model/history");
const auth = require("../middleware/auth");

// create history
router.post("/history", auth, async (req, res) => {
  const history = new History(req.body);
  try {
    await history.save();
    res.status(201).json(history);
  } catch (error) {
    res.status(500).json(error);
  }
});

// read all histories
router.get("/history", auth, async (req, res) => {
  try {
    const histories = await History.find({});

    res.json(histories);
  } catch (error) {
    res.status(500).json(error);
  }
});

// read a history
router.get("/history/:id", auth, async (req, res) => {
  try {
    const history = await History.findById(req.params.id);

    if (!history) return res.status(404).send({ error: "Item not found" });
    res.json(history);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a history
router.delete("/history/:id", auth, async (req, res) => {
  try {
    const history = await History.findByIdAndDelete(req.params.id);

    if (!history) return res.status(404).send({ error: "Item not found" });
    res.json(history);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
