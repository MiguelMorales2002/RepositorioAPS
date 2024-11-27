const connection = require("../models/database");

const usuariosGet = (req, res) => {
  const query = "SELECT * FROM usuarios";
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
};

const usuarioCreate = (req, res) => {
  const { nombre, email, pass } = req.body;
  const query = "INSERT INTO usuarios (nombre, email, pass) VALUES (?, ?, ?)";
  connection.query(query, [nombre, email, pass], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res
        .status(201)
        .json({ message: "Usuario creado", usuarioId: results.insertId });
    }
  });
};

const usuarioGetById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM usuarios WHERE id = ?";
  connection.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (results.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      res.json(results[0]);
    }
  });
};

const usuarioUpdate = (req, res) => {
  const { id } = req.params;
  const { nombre, email, pass } = req.body;
  const query =
    "UPDATE usuarios SET nombre = ?, email = ?, pass = ? WHERE id = ?";
  connection.query(query, [nombre, email, pass, id], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      res.json({ message: "Usuario actualizado" });
    }
  });
};

const usuarioDelete = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM usuarios WHERE id = ?";
  connection.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      res.json({ message: "Usuario eliminado" });
    }
  });
};

module.exports = {
  usuariosGet,
  usuarioCreate,
  usuarioGetById,
  usuarioUpdate,
  usuarioDelete,
};
