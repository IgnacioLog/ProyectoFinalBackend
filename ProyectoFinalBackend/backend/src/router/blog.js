// Importa los módulos necesarios
import { Router } from "express";
import { getPosts, getPostById, savePost, updatePost, deletePost } from "../controllers/blog.js";

// Crea una nueva instancia de Router
const router = Router();

// Ruta para obtener todos los posts del blog
router.get("/", getPosts);

// Ruta para obtener un post específico del blog por su ID
router.get("/:id", getPostById);

// Ruta para guardar un nuevo post en el blog
router.post("/", savePost);

// Ruta para actualizar un post existente en el blog por su ID
router.put("/:id", updatePost);

// Ruta para eliminar un post del blog por su ID
router.delete("/:id", deletePost);

// Exporta el router para ser utilizado en otros módulos
export default router;
