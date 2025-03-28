require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const pizzaRoutes = require("./routes/pizza-routes");
const orderRoutes = require("./routes/order-routes");
const authRoutes = require("./routes/auth-routes");

const app = express();
const PORT = process.env.PORT;

// connect to database
connectToDB();

// use middleware to parse json from req.body
app.use(express.json());

// app routes
app.use("/api/pizza", pizzaRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
