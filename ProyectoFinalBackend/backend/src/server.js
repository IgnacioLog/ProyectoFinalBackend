// Importando módulos necesarios
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require('mongoose');
const settings = require("../config.js");

// Importando rutas
const authRoutes = require("./router/auth");
const blogRoutes = require("./router/blog");
const cartRoutes = require("./router/carts");
const productRoutes = require("./router/products");

// Creando una instancia de Express y un servidor HTTP
const app = express();
const server = http.createServer(app);

// Configuración de CORS
const allowedOrigins = ["http://localhost:3001", "http://127.0.0.1:5184", settings.WEB_APP_URL];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS Issue Detected"));
    }
  }
}));

// Middlewares para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/products", productRoutes);

// Middleware para manejar errores
app.use((error, req, res, next) => {
  if (error) {
    res.status(500).send(`Encountered an issue: ${error.message}`);
  } else {
    next();
  }
});

// Depuración para verificar la URL de MongoDB
console.log('MongoDB URL:', settings.MONGO_DATA_BASE_URL);

// Conexión a MongoDB
mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.qgm1sdk.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Iniciando el servidor en el puerto 8080
server.listen(8080, () => {
  console.log('Server active at http://localhost:8080');
});

// Exportando la aplicación Express
module.exports = app;

