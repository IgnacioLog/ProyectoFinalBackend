// Importando módulos necesarios
const { Router } = require("express");
const controller = require("../controllers/products.js");
const { auth } = require("../middlewares/auth.js");

// Creando una nueva instancia de Router
const router = Router();

// Ruta para obtener todos los productos
router.get("/", controller.getProducts);

// Ruta para obtener un producto específico por su ID
router.get("/:id", controller.getProductById);

// Ruta para guardar un nuevo producto. Se requiere autenticación previa (middleware 'auth')
router.post("/", auth, controller.saveProduct);

// Ruta para actualizar un producto existente por su ID. Se requiere autenticación previa
router.put("/:id", auth, controller.updateProduct);

// Ruta para eliminar un producto por su ID. Se requiere autenticación previa
router.delete("/:id", auth, controller.deleteProduct);

// Exportando el router para ser utilizado en otros módulos
module.exports = router;
