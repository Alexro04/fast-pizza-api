const Pizza = require("../models/pizza");

async function getAllPizzas(req, res) {
  try {
    const allPizzas = await Pizza.find();
    if (allPizzas.length > 0) {
      res.status(200).json({
        success: true,
        message: "All pizzas fetched successfully",
        data: allPizzas,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "No pizza stored in the database",
      });
    }
  } catch (error) {
    console.log("There was an error getting pizzas from the database");
    res.status(500).json({
      success: false,
      message: "There was an error getting pizzas from the database",
    });
  }
}
async function addPizza(req, res) {
  try {
    const newPizza = await Pizza.create(req.body);

    if (newPizza) {
      res.status(201).json({
        success: true,
        message: "New pizza added successfully",
        data: newPizza,
      });
    }
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({
      success: false,
      message: "An error occured while adding new pizza",
    });
  }
}
async function getPizzaWithId(req, res) {
  const pizzaId = req.params.pizzaId;
  try {
    const pizza = await Pizza.findById(pizzaId);

    if (pizza) {
      res.status(200).json({
        success: true,
        message: "Pizza fetched from database successfully",
        data: pizza,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "Pizza with this id not found on the database",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
async function updatePizzaWithId(req, res) {
  const pizzaId = req.params.pizzaId;
  try {
    const pizza = await Pizza.findByIdAndUpdate(pizzaId, req.body, {
      new: true,
    });

    if (pizza) {
      res.status(200).json({
        success: true,
        message: "Pizza updated successfully",
        data: pizza,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "Pizza with specified id not found in database",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
async function deletePizzaWithId(req, res) {
  const pizzaId = req.params.pizzaId;
  try {
    const pizza = await Pizza.findByIdAndDelete(pizzaId);

    if (pizza) {
      res.status(200).json({
        success: true,
        message: "Pizza deleted from database successfully",
        data: pizza,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "No pizza with the specified id was found in the database",
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
  getAllPizzas,
  addPizza,
  getPizzaWithId,
  updatePizzaWithId,
  deletePizzaWithId,
};
