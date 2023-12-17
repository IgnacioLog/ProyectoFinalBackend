// Importando módulos necesarios
const { Router } = require("express");
const controller = require("../controllers/blog.js");

// Creando una nueva instancia de Router
const router = Router();

// Ruta para obtener todos los posts del blog
router.get("/", controller.getPosts);

// Ruta para obtener un post específico del blog por su ID
router.get("/:id", controller.getPostById);

// Ruta para guardar un nuevo post en el blog
router.post("/", controller.savePost);

// Ruta para actualizar un post existente en el blog por su ID
router.put("/:id", controller.updatePost);

// Ruta para eliminar un post del blog por su ID
router.delete("/:id", controller.deletePost);

// Exportando el router para ser utilizado en otros módulos
module.exports = router;
