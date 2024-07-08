// userController.js

const connection = require("../config/db");
const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.createUser = (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send(err);
    }

    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    connection.query(query, [username, hashedPassword], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.status(201).send({
        id: results.insertId,
        username,
        password,
      });
    });
  });
};


exports.getAllUsers = (req, res) => {
  const query = "SELECT * FROM users";
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
    }
  });
};

exports.getSingleUser = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM users WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send(results[0]);
    }
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send('Error hashing password');
    }
    const query = "UPDATE users SET username = ?, password = ? WHERE id = ?";
    connection.query(query, [username, hashedPassword, id], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else if (results.affectedRows === 0) {
        res.status(404).send("User not found");
      } else {
        res.status(200).send({ id, username });
      }
    });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.affectedRows === 0) {
      res.status(404).send("User have not found");
    } else {
      res.status(200).send("User have been deleted");
    }
  });
};
