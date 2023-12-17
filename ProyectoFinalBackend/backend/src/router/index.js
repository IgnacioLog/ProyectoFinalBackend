// Importando los routers de cada módulo
const productsRouter = require("./products.js"); // Router para gestionar productos
const cartsRouter = require("./carts.js");       // Router para gestionar carritos
const authRouter = require("./auth.js");         // Router para gestionar autenticación
const blogRouter = require("./blog.js");         // Router para gestionar el blog

// Exportando los routers para ser utilizados en otros módulos
module.exports = { productsRouter, cartsRouter, authRouter, blogRouter };
