// Importando módulos necesarios
const CartDAOFactory = require("../models/DAOs/DAOFactory.js");
const cartSchema = require("../models/schemas/carts.js");
const Cart = require("../models/model/Cart.js");

// Creando una instancia del servicio de carrito
const cartService = CartDAOFactory.get("carts", cartSchema);

// Clase CartService para manejar las operaciones relacionadas con los carritos de compra
class CartService {
  // Método para obtener un carrito por su ID
  static async getCartById(cartId) {
    try {
      return await cartService.getItem(cartId);
    } catch (error) {
      throw new Error("Error fetching cart by ID");
    }
  }

  // Método para obtener todos los carritos
  static async getAllCarts() {
    try {
      return await cartService.getItems();
    } catch (error) {
      throw new Error("Error fetching all carts");
    }
  }

  // Método para crear un nuevo carrito
  static async createCart(cartData) {
    const newCart = new Cart(cartData);
    try {
      return await cartService.saveItem(newCart);
    } catch (error) {
      throw new Error("Error creating cart");
    }
  }

  // Método para actualizar un carrito existente
  static async updateCart(cartId, updatedData) {
    try {
      return await cartService.updateItem(cartId, updatedData);
    } catch (error) {
      throw new Error("Error updating cart");
    }
  }

  // Método para eliminar un carrito por su ID
  static async deleteCart(cartId) {
    try {
      return await cartService.deleteItem(cartId);
    } catch (error) {
      throw new Error("Error deleting cart");
    }
  }
}

// Exportando la clase CartService para ser utilizada en otros módulos
module.exports = CartService;

