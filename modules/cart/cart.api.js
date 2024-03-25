const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ msg: "cart is working" });
});

module.exports = router;
