// Importa la biblioteca jwt, que se utiliza para trabajar con JSON Web Tokens
const jwt = require("jsonwebtoken");
// Importa el archivo de configuración
const config = require("../../config.js");

// Función para crear un token de autenticación
const createAuthToken = (payload) => {
  // Devuelve un token firmado con la clave privada y con un tiempo de expiración
  return jwt.sign({ payload }, config.JWT_PRIVATE_KEY, {
    expiresIn: config.JWT_EXPIRATION_TIME,
  });
};

// Middleware para verificar la autenticación
const verifyAuth = (req, resp, proceed) => {
  // Obtiene el encabezado de autorización de la solicitud
  const authHeader = req.headers.authorization;

  // Si no hay encabezado de autorización, devuelve un error
  if (!authHeader) {
    const errorMsg = new Error("Invalid token");
    return resp.status(401).json({ message: errorMsg.message });
  }

  // Extrae el token JWT del encabezado de autorización
  const jwtToken = authHeader.split(" ")[1];

  // Verifica el token JWT
  jwt.verify(jwtToken, config.JWT_PRIVATE_KEY, (error, decodedToken) => {
    // Si hay un error en la verificación, devuelve un error
    if (error) {
      return resp.status(403).json({ message: "Unauthorized access" });
    }
    // Si la verificación es exitosa, guarda el payload decodificado en req.currentUser
    req.currentUser = decodedToken.payload;
    // Continúa con el siguiente middleware o ruta
    proceed();
  });
};


// Middleware para verificar roles
const verifyRoles = (roles) => (req, res, next) => {
  if (!req.currentUser || !roles.includes(req.currentUser.role)) {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
};

// Exporta las funciones para que puedan ser utilizadas en otros módulos
module.exports = { createAuthToken, verifyAuth, verifyRoles };

