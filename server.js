require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const pizzaRoutes = require("./routes/pizza-routes");
const orderRoutes = require("./routes/order-routes");

const app = express();
const PORT = process.env.PORT || 3000;

// connect to database
connectToDB();

// use middleware
app.use(express.json());

// app routes
app.use("/api/pizza", pizzaRoutes);
app.use("/api/order", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
