const Car = require("../models/car.model");

// Create and Save a new Car
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Car
  const car = new Car({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Save Car in the database
  Car.create(car, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Car."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Car.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Find a single Car with a customerId
exports.findOne = (req, res) => {
  Car.findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Car with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Car with id " + req.params.customerId
        });
      }
    } else res.send(data);
  });
};

// Update a Car identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Car.updateById(
    req.params.customerId,
    new Car(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Car with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Car with id " + req.params.customerId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Car with the specified customerId in the request
exports.delete = (req, res) => {
  Car.remove(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Car with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Car with id " + req.params.customerId
        });
      }
    } else res.send({ message: `Car was deleted successfully!` });
  });
};
