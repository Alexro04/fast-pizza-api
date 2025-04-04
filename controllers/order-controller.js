const Order = require("../models/order");

async function getAllOrders(req, res) {
  try {
    const allOrders = await Order.find();
    if (allOrders.length > 0) {
      res.status(200).json({
        success: true,
        message: "All Orders fetched successfully",
        data: allOrders,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No Order stored in the database",
      });
    }
  } catch (error) {
    console.log("There was an error getting Orders from the database");
    res.status(500).json({
      success: false,
      message: "There was an error getting Orders from the database",
    });
  }
}

async function addOrder(req, res) {
  try {
    const deliveryDate = new Date();
    const delay = req.body.priority ? 20 : 30;
    deliveryDate.setMinutes(deliveryDate.getMinutes() + delay);
    const orderToBeCreated = {
      ...req.body,
      priorityPrice: req.body.orderPrice * 0.2,
      status: "preparing",
      estimatedDelivery: deliveryDate,
    };
    const newOrder = await Order.create(orderToBeCreated);

    if (newOrder) {
      res.status(201).json({
        success: true,
        message: "New Order added successfully",
        data: newOrder,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getOrderById(req, res) {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findById(orderId);

    if (order) {
      res.status(200).json({
        success: true,
        message: "Order fetched from database successfully",
        data: order,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "Order with this id not found on the database",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateOrderById(req, res) {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
    });

    if (order) {
      res.status(200).json({
        success: true,
        message: "Order updated successfully",
        data: order,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "Order with specified id not found in database",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteOrderById(req, res) {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findByIdAndDelete(orderId);

    if (order) {
      res.status(200).json({
        success: true,
        message: "Order deleted from database successfully",
        data: order,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "No Order with the specified id was found in the database",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getAllOrders,
  addOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};
