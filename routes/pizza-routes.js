const express = require("express");
const router = express.Router();
const {
  getAllPizzas,
  getPizzaWithId,
  updatePizzaWithId,
  deletePizzaWithId,
  addPizza,
} = require("../controllers/pizza-controller");

router.get("/get", getAllPizzas);
router.get("/get/:pizzaId", getPizzaWithId);
router.post("/add", addPizza);
router.delete("/delete/:pizzaId", deletePizzaWithId);
router.put("/update/:pizzaId", updatePizzaWithId);

module.exports = router;
