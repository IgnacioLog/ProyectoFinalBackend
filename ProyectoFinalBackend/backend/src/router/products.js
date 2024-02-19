// Importa módulos necesarios
import { Router } from "express";
import faker from 'faker';
import controller from "../controllers/products.js";
import { verifyAuth } from "../middlewares/auth.js";

// Crea una nueva instancia de Router
const router = Router();


// Ruta para manejar mocking
router.get('/mockingproducts', (req, res) => {
    const products = Array.from({ length: 100 }).map(() => ({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
    }));
  
    res.json(products);
  });

// Ruta para obtener todos los productos
router.get("/", controller.getProducts);

// Ruta para obtener un producto específico por su ID
router.get("/:id", controller.getProductById);

// Ruta para guardar un nuevo producto. Se requiere autenticación previa (middleware 'auth')
router.post("/", verifyAuth, controller.saveProduct);

// Ruta para actualizar un producto existente por su ID. Se requiere autenticación previa
router.put("/:id", verifyAuth, controller.updateProduct);

// Ruta para eliminar un producto por su ID. Se requiere autenticación previa
router.delete("/:id", verifyAuth, controller.deleteProduct);

// Exporta el router para ser utilizado en otros módulos
export default router;
