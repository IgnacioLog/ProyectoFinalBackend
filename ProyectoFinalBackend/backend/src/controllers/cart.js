const {
  createCart,
  getCartByUserId,
  saveProductOnCart,
  getCarts,
  updateProductOnCart,
  removeProductFromCart,
  removeAllProductsFromCart,
  deleteCart,
} = require("../services/carts.js");
const productsInstance = require("../services/products.js");
const { existUser } = require("../services/auth.js");

class CartsController {
  // Constructor de la clase CartsController
  constructor() {
    this.products = productsInstance; // Se inicializa con una instancia del servicio de productos
  }

  // Método para crear un carrito para un usuario específico
  async createUserCart(req, res) {
    try {
      const { userId } = req.params;
      const newCart = await createCart(userId);
      res.json(newCart);
    } catch (error) {
      res.json({ msg: error.message });
    }
  }

  // Método para obtener todos los carritos
  async getAllCarts(req, res) {
    try {
      const carts = await getCarts();
      res.status(200).json(carts);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  }

  // Método para obtener el carrito de un usuario específico por ID
  async getByUserId(req, res) {
    try {
      const { userId } = req.params;
      const isValidUser = await existUser({ _id: userId });

      if (!isValidUser) {
        const error = new Error("El usuario no existe");
        return res.status(400).json({ msg: error.message });
      }

      const cart = await getCartByUserId(userId);
      res.status(200).json(cart);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  }

  // Método para guardar un producto en el carrito de un usuario
  async saveProduct(req, res) {
    try {
      const product = req.body;
      const { userId } = req.params;

      const savedCart = await saveProductOnCart(product, userId);
      res.status(201).json(savedCart);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  }

  // Método para actualizar un producto en el carrito de un usuario por ID de producto
  async updateProductOnCart(req, res) {
    try {
      const { userId, productId } = req.params;
      const product = req.body;

      let updatedCart;
      if (!Object.keys(product).length)
        updatedCart = await removeProductFromCart(userId, productId);
      else updatedCart = await updateProductOnCart(userId, productId, product);
      res.status(200).json(updatedCart);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  }

  // Método para eliminar todos los productos del carrito de un usuario
  async removeAllProducts(req, res) {
    try {
      const { userId } = req.params;
      const updatedCart = await removeAllProductsFromCart(userId);
      res.status(200).json(updatedCart);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  }

  // Método para eliminar un carrito de usuario por ID de usuario
  async deleteCart(req, res) {
    try {
      const { userId } = req.params;
      const cart = await deleteCart(userId);
      res.status(200).json(cart);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  }
}

// Exporta una instancia de la clase CartsController
module.exports = new CartsController();

