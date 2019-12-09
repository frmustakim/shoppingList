const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Item Model
const Item = require("../../models/Item");

//@route  GET api/items
//@desc   GET all items
//@access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 }) //-1 for descending order by date
    .then(items => res.json(items));
});

//@route  POST api/items
//@desc   Create an item
//@access Private
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  //  console.log("this is req.body....", req.body);
  newItem
    .save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

//@route  DELETE api/items/:id
//@desc   Delete an item
//@access Private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
