const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  addOrder,
} = require("../controllers/order-controller");

router.get("/get", getAllOrders);
router.get("/get/:orderId", getOrderById);
router.post("/add", addOrder);
router.delete("/delete/:orderId", deleteOrderById);
router.put("/update/:orderId", updateOrderById);

module.exports = router;
