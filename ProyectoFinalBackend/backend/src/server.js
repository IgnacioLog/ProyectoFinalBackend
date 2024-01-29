// Importando módulos necesarios
import path from 'path';
import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargando variables de entorno desde la ubicación correcta
dotenv.config({ path: path.join(__dirname, '../env') });

import settings from '../config.js';

// Importando rutas
import authRoutes from './router/auth.js';
import blogRoutes from './router/blog.js';
import cartRoutes from './router/carts.js';
import productRoutes from './router/products.js';

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

// Conexión a MongoDB y arranque del servidor
mongoose.connect(process.env.MONGO_DATA_BASE_URL)
  .then(() => {
    console.log("Succesfully connected to database");

    // Iniciando el servidor en el puerto 8080
    server.listen(8080, () => {
      console.log('Server active at http://localhost:8080');
    });
  })
  .catch((err) => {
    console.error(`Connection to database failed, ERROR: ${err.message}`);
    process.exit(1); // Detiene la ejecución del servidor en caso de error
  });

// Exportando la aplicación Express
export default app;
