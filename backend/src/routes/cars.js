module.exports = app => {
  const cars = require("../controllers/cars.controllers");

  // Create a new Car
  app.post("/cars", cars.create);

  // Retrieve all cars
  app.get("/cars", cars.findAll);

  // Retrieve a single Car with carId
  app.get("/cars/:customerId", cars.findOne);

  // Update a Car with carId
  app.put("/cars/:customerId", cars.update);

  // Delete a Car with carId
  app.delete("/cars/:customerId", cars.delete);
};