// Importando módulos necesarios
const expressLib = require("express");
const { Server: HttpsServer } = require("http");
const crossOrigin = require("cors");
const {
  userAuthRoutes,
  productRoutes,
  cartRoutes,
  blogRoutes,
} = require("./router/index.js");
const settings = require("../config.js");
const mongoDB = require('mongoose');

// Creando una instancia de Express y un servidor HTTP
const serverApp = expressLib();
const httpsAppServer = new HttpsServer(serverApp);

// Definiendo los orígenes permitidos para CORS
const allowedOrigins = [
  "http://localhost:3001",
  "http://127.0.0.1:5184",
  settings.WEB_APP_URL,
];

// Configuración de CORS
const corsSettings = {
  origin: function (source, cb) {
    if (allowedOrigins.includes(source)) {
      cb(null, true);
    } else {
      cb(new Error("CORS Issue Detected"));
    }
  },
};

// Middleware para CORS (descomentar si se hacen solicitudes a través de POSTMAN)
serverApp.use(crossOrigin(corsSettings));

// Middlewares para parsear el cuerpo de las solicitudes
serverApp.use(expressLib.json());
serverApp.use(expressLib.urlencoded({ extended: true }));

// Rutas de la API
serverApp.use("/api/user-auth", userAuthRoutes);
serverApp.use("/api/items", productRoutes);
serverApp.use("/api/shopping-cart", cartRoutes);
serverApp.use("/api/article", blogRoutes);

// Middleware para manejar errores
serverApp.use((error, req, res, next) => {
  if (error) {
    res.status(500).send(`Encountered an issue: ${error.message}`);
  }
});

// Conexión a MongoDB
mongoDB.connect('mongodb+srv://coderhouse:coderhouse@cluster0.qgm1sdk.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));

// Iniciando el servidor en el puerto 8080
httpsAppServer.listen(8080, () => {
  console.log('Server active at http://localhost:8080');
});

// Exportando la aplicación Express
module.exports = serverApp;
