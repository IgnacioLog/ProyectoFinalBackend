// Importando módulos necesarios
const debug = require('debug')('myapp');
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require('mongoose');
const settings = require("../config.js");
const { WEB_APP_URL } = require("../config.js"); // Modificamos esta línea

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

// Conexión a MongoDB
mongoose.connect(settings.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));

// Iniciando el servidor en el puerto 8080
server.listen(8080, () => {
  console.log('Server active at http://localhost:8080');
});

// Exportando la aplicación Express
module.exports = app;

