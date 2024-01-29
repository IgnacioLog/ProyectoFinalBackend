import { compareSync } from "bcrypt";
import {
  getAllUsers,
  existUser,
  registerUser,
  loginUser,
  checkUserAccountToken,
  deleteUser,
} from "../services/auth.js";
import { createAuthToken } from "../middlewares/auth.js";

class AuthController {
  // Método para obtener todos los usuarios
  async getAll(req, res) {
    try {
      const users = await getAllUsers();
      res.status(201).json(users);
    } catch (error) {
      res.json({ msg: error.message });
    }
  }


    // Método para cargar documentos de usuario
  async uploadDocuments(req, res) {
    try {
      const { files } = req; // Los archivos cargados
      const userId = req.params.uid; // ID del usuario que carga los documentos

      if (!files || files.length === 0) {
        return res.status(400).json({ message: 'No se cargaron documentos.' });
      }

      // Obtener el usuario de la base de datos
      const user = await getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      // Procesar los archivos y guardar las referencias en el usuario
      const documents = files.map(file => ({
        name: file.originalname,
        reference: `/uploads/${file.filename}`
      }));

      // Agregar los documentos al usuario y actualizarlo en la base de datos
      user.documents = user.documents ? [...user.documents, ...documents] : documents;
      await updateUser(userId, user);

      res.status(200).json({ message: 'Documentos cargados con éxito', documents: documents });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Método para registrar un nuevo usuario
  async registerUser(req, res) {
    try {
      const { email } = req.body;
      const isRegisteredUser = await existUser({ email });

      if (isRegisteredUser) {
        return res.status(400).json({ msg: "Usuario ya registrado" });
      }

      await registerUser(req.body);
      res.status(201).json({
        msg: "Registro con éxito. Revisa tu bandeja de entrada para confirmar tu cuenta",
      });
    } catch (error) {
      res.json({ msg: error.message });
    }
  }

  // Método para iniciar sesión
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await loginUser({ email, password });

      if (!userData) {
        return res.status(404).json({ msg: "El usuario no existe" });
      }

      if (!userData.confirmed) {
        return res.status(403).json({ msg: "Tu cuenta no ha sido confirmada" });
      }

      const isCheckedPassword = compareSync(password, userData.password);

      if (!isCheckedPassword) {
        return res.status(403).json({ msg: "El password es incorrecto" });
      }

      const user = {
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        token: createAuthToken({ _id: userData._id }),
      };

      res.json({ ...user });
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  }

  // Método para autenticar al usuario
  async authenticateUser(req, res) {
    const { user } = req;
    const allUsers = await getAllUsers();
    const authorizedUser = allUsers.find(
      (authUser) => authUser._id === user._id
    );
    res.json(authorizedUser);
  }

  // Método para verificar el token de la cuenta
  async checkAccountVerificationToken(req, res) {
    const { token } = req.params;
    const confirmedUser = await checkUserAccountToken(token);

    if (!confirmedUser?._id) {
      return res.status(403).json({ msg: "Token no válido" });
    }

    res.json({ msg: "Usuario confirmado correctamente" });
  }

  // Método para eliminar un usuario
  async delete(req, res) {
    try {
      const { userId } = req.params;

      await deleteUser(userId);
      res.json({ msg: "Usuario eliminado correctamente" });
    } catch (error) {
      res.json({ msg: error.message });
    }
  }
}

export default AuthController;
