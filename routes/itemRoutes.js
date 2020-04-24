const express = require("express");
const router = new express.Router();
let items = require("../fakeDb");

router.get("/", (req, res) => {
  res.json(items);
});

router.get("/:name", (req, res) => {
  const item = items.find((item) => item.name === req.params.name);
  return res.json(item);
});

router.post("/", (req, res) => {
  const { name, price } = req.body;
  const item = { name, price };

  items.push(item);

  return res.json({ added: item });
});

router.patch("/:name", (req, res) => {
  const { name, price } = req.body;

  // get matching item from db
  const item = items.find((item) => item.name === req.params.name);
  // update item's contents
  item.name = name;
  item.price = price;

  res.json({ updated: item });
});

router.delete("/:name", (req, res) => {
  // get matching item from db
  items = items.filter((item) => item.name !== req.params.name);

  return res.json({ message: "deleted" });
});

module.exports = router;
