// Importando módulos necesarios
const { Router } = require("express");
const AuthController = require("../controllers/auth.js");
const { auth } = require("../middlewares/auth.js");

// Creando una nueva instancia de Router
const router = Router();

// Creando una nueva instancia del controlador de autenticación
const authController = new AuthController();

// Ruta para autenticar al usuario. Se requiere autenticación previa (middleware 'auth')
router.get("/", auth, authController.authenticateUser);

// Ruta para obtener todos los usuarios. No se requiere autenticación previa
router.get("/all", authController.getAll);

// Ruta para registrar un nuevo usuario
router.post("/register", authController.registerUser);

// Ruta para iniciar sesión
router.post("/login", authController.login);

// Ruta para obtener información del usuario actual
router.get('/current', auth, (req, res) => {
    // Devuelve un DTO del usuario con la información necesaria
    // ...
  });


// Ruta para verificar la cuenta del usuario a través de un token
router.get("/confirm/:token", authController.checkAccountVerificationToken);

// Ruta para eliminar un usuario por su ID
router.delete("/:userId", authController.delete);

// Exportando el router para ser utilizado en otros módulos
module.exports = router;
