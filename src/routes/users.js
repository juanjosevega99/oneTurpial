module.exports = app => {
  const users = require("");

  // Create a new User
  app.post("/users", users.create);

  // Retrieve all users
  app.get("/users", users.findAll);

  // Retrieve a single User with userId
  app.get("/users/:customerId", users.findOne);

  // Update a User with userId
  app.put("/users/:customerId", users.update);

  // Delete a User with userId
  app.delete("/users/:customerId", users.delete);
};