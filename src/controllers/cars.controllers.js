const sql = require("./db.js");

// constructor
const Cars = function (car) {
  this.user_id = car.user_id;
  this.placa = car.placa;
  this.marca = car.marca;
  this.modelo = car.modelo;
};

Cars.create = (newCar, result) => {
  sql.query("INSERT INTO cars SET ?", newCar, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created car: ", { id: res.insertId, ...newCar });
    result(null, { id: res.insertId, ...newCar });
  });
};

Cars.findById = (carId, result) => {
  sql.query(`SELECT * FROM cars WHERE id = ${carId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found car: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Cars with the id
    result({ kind: "not_found" }, null);
  });
};

Cars.getAll = result => {
  sql.query("SELECT * FROM cars", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("cars: ", res);
    result(null, res);
  });
};

Cars.updateById = (id, car, result) => {
  sql.query(
    "UPDATE cars SET email = ?, name = ?, active = ? WHERE id = ?",
    [car.email, car.name, car.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Cars with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated car: ", { id: id, ...car });
      result(null, { id: id, ...car });
    }
  );
};

Cars.remove = (id, result) => {
  sql.query("DELETE FROM cars WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Cars with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted car with id: ", id);
    result(null, res);
  });
};

module.exports = Cars;
