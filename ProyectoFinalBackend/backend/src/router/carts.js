// Importa los módulos necesarios
import { Router } from "express";
import { createUserCart, getByUserId, removeAllProducts, saveProduct, updateProductOnCart, deleteCart } from "../controllers/cart.js";
import { verifyAuth } from "../middlewares/auth.js";
import Ticket from '../models/model/Tickets.js'; // Utilizando import para el modelo

// Crea una nueva instancia de Router
const router = Router();

// Ruta para crear un carrito para un usuario específico. Se requiere autenticación previa (middleware 'verifyAuth')
router.get("/create/:userId", verifyAuth, createUserCart);

// Ruta para obtener el carrito de un usuario específico. Se requiere autenticación previa
router.get("/:userId", verifyAuth, getByUserId);

// Ruta para remover todos los productos del carrito de un usuario específico. Se requiere autenticación previa
router.put("/remove/:userId", verifyAuth, removeAllProducts);

// Ruta para guardar un producto en el carrito de un usuario específico. Se requiere autenticación previa
router.put("/:userId", verifyAuth, saveProduct);

// Ruta para actualizar o remover un producto específico del carrito de un usuario. Se requiere autenticación previa
router.put("/:userId/:productId", verifyAuth, updateProductOnCart);

// Ruta para eliminar el carrito de un usuario específico. Se requiere autenticación previa
router.delete("/:userId", verifyAuth, deleteCart);

// Ruta para finalizar la compra
router.post('/:cid/purchase', verifyAuth, async (req, res) => {
    try {
        const { cid } = req.params; // ID del carrito
        const cart = await Cart.findById(cid);

        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        // Lógica para generar un nuevo ticket
        const newTicket = new Ticket({
            code: generateTicketCode(), // Generar un código de ticket
            purchase_datetime: new Date(),
            amount: calculateTotalAmount(cart.items), // Calcular el monto total
            purchaser: req.currentUser.username,
        });

        // Guardar el nuevo ticket en la base de datos
        await newTicket.save();

        // Lógica para actualizar el stock de productos (suponiendo que tienes un modelo de producto)
        for (const item of cart.items) {
            const product = await Product.findById(item.itemId);
            if (product) {
                product.stock -= item.itemQuantity; // Actualizar el stock del producto
                await product.save();
            }
        }

        // Lógica para eliminar el carrito después de la compra
        await Cart.findByIdAndDelete(cid);

        res.status(200).json({ message: "Compra realizada con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al procesar la compra" });
    }
});

// Exporta el router para ser utilizado en otros módulos
export default router;
