// Importando módulos necesarios
const { Router } = require("express");
const controller = require("../controllers/cart.js");
const { auth } = require("../middlewares/auth.js");
const Ticket = require('../models/model/Tickets.js');


// Creando una nueva instancia de Router
const router = Router();

// Ruta para crear un carrito para un usuario específico. Se requiere autenticación previa (middleware 'auth')
router.get("/create/:userId", auth, controller.createUserCart);

// Ruta para obtener el carrito de un usuario específico. Se requiere autenticación previa
router.get("/:userId", auth, controller.getByUserId);

// Ruta para remover todos los productos del carrito de un usuario específico. Se requiere autenticación previa
router.put("/remove/:userId", auth, controller.removeAllProducts);

// Ruta para guardar un producto en el carrito de un usuario específico. Se requiere autenticación previa
router.put("/:userId", auth, controller.saveProduct);

// Ruta para actualizar o remover un producto específico del carrito de un usuario. Se requiere autenticación previa
router.put("/:userId/:productId", auth, controller.updateProductOnCart);

// Ruta para eliminar el carrito de un usuario específico. Se requiere autenticación previa
router.delete("/:userId", auth, controller.deleteCart);

// Ruta para finalizar la compra
router.post('/:cid/purchase', auth, async (req, res) => {
    // Lógica para procesar la compra
    // Generar un nuevo ticket y guardarlo en la base de datos
    // Actualizar el stock de los productos
    // ...
  });

// Exportando el router para ser utilizado en otros módulos
module.exports = router;
