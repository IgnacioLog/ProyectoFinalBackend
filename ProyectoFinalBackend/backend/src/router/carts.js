// Importando módulos necesarios
const { Router } = require("express");
const controller = require("../controllers/cart.js");
const { verifyAuth } = require("../middlewares/auth.js"); // Modificado aquí
const Ticket = require('../models/model/Tickets.js');

// Creando una nueva instancia de Router
const router = Router();

// Ruta para crear un carrito para un usuario específico. Se requiere autenticación previa (middleware 'verifyAuth')
router.get("/create/:userId", verifyAuth, controller.createUserCart);

// Ruta para obtener el carrito de un usuario específico. Se requiere autenticación previa
router.get("/:userId", verifyAuth, controller.getByUserId);

// Ruta para remover todos los productos del carrito de un usuario específico. Se requiere autenticación previa
router.put("/remove/:userId", verifyAuth, controller.removeAllProducts);

// Ruta para guardar un producto en el carrito de un usuario específico. Se requiere autenticación previa
router.put("/:userId", verifyAuth, controller.saveProduct);

// Ruta para actualizar o remover un producto específico del carrito de un usuario. Se requiere autenticación previa
router.put("/:userId/:productId", verifyAuth, controller.updateProductOnCart);

// Ruta para eliminar el carrito de un usuario específico. Se requiere autenticación previa
router.delete("/:userId", verifyAuth, controller.deleteCart);

// Ruta para finalizar la compra
router.post('/:cid/purchase', verifyAuth, async (req, res) => {
    // Lógica para procesar la compra
    // Generar un nuevo ticket y guardarlo en la base de datos
    // Actualizar el stock de los productos
    // ...
});

// Exportando el router para ser utilizado en otros módulos
module.exports = router;
