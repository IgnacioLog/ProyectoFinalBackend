// Importando módulos necesarios
import crypto from "crypto";
import bcrypt from "bcrypt";
import UserDAOFactory from "../models/DAOs/DAOFactory.js";
import userSchema from "../models/schemas/users.js";
import User from "../models/model/User.js";

// Importa la función nombrada dispatchVerificationEmail
import { dispatchVerificationEmail } from "../utils/sendgrid.js";

// Creando una instancia del servicio de usuario
const userService = UserDAOFactory.get("users", userSchema);

// Clase AuthService para manejar la autenticación y autorización
class AuthService {
  // Método para obtener un usuario por su correo electrónico
  static async getUserByEmail(email) {
    try {
      return await userService.getItem({ email });
    } catch (error) {
      throw new Error("Error fetching user by email");
    }
  }

  // Método para obtener todos los usuarios
  static async getAllUsers() {
    try {
      return await userService.getItems();
    } catch (error) {
      throw new Error("Error fetching all users");
    }
  }

  // Método para registrar un nuevo usuario
  static async registerUser(userData) {
    const { email, password } = userData;

    // Generando un salt y hasheando la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creando el objeto del nuevo usuario
    const newUser = {
      ...userData,
      password: hashedPassword,
      timestamp: new Date(),
      token: this.generateToken(),
      confirmed: false,
    };

    // Intentando guardar el nuevo usuario y enviar un correo de verificación
    try {
      const savedUser = await userService.saveItem(newUser);
      dispatchVerificationEmail(savedUser.email, savedUser.username, savedUser.token);
      return savedUser;
    } catch (error) {
      throw new Error("Error registering user");
    }
  }

  // Método para generar un token aleatorio
  static generateToken() {
    return crypto.randomBytes(16).toString("hex");
  }

  // Método para verificar un token y confirmar un usuario
  static async verifyToken(token) {
    const user = await userService.getItem({ token });
    if (user) {
      user.confirmed = true;
      user.token = null;
      return await userService.updateItem(user._id, user);
    } else {
      throw new Error("Invalid token");
    }
  }

    // Método para verificar un token y confirmar un usuario
    static async checkUserAccountToken(token) {
      const user = await userService.getItem({ token });
      if (user) {
        user.confirmed = true;
        user.token = null;
        return await userService.updateItem(user._id, user);
      } else {
        throw new Error("Invalid token");
      }
    }

  // Método para eliminar un usuario por su ID
  static async deleteUserById(userId) {
    try {
      return await userService.deleteItem(userId);
    } catch (error) {
      throw new Error("Error deleting user");
    }
  }
}

// Exportando la clase AuthService
export default AuthService;

// Exportando la función checkUserAccountToken
export { checkUserAccountToken };