const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://fastpizzaapi:fastpizzaapi12@cluster0.iuhwo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to database successfully...");
  } catch (error) {
    console.error(error);
  }
}

module.exports = connectToDB;
