// Iteration #1
const drones = [
    { name: "Google Dron", propellers: 6, maxSpeed: 22 },
    { name: "Dron Express", propellers: 3, maxSpeed: 10 },
    { name: "Amazonier 2022", propellers: 4, maxSpeed: 16 }
  ];

  const Dron = require("../models/Drone.model");

  const mongoose = require("mongoose");

  const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

  mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    return Dron.insertMany(drones);

  })
  .then((response) => {
   
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });


  
