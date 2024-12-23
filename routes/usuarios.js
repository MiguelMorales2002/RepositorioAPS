const { Router } = require("express");
const {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/usuariosS");

const router = Router();
router.post("/", crearUsuario);
router.get("/", obtenerUsuarios);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

module.exports = router;
