import { getUserById, updateUser, verifyDocumentsForPremium } from "../services/userServices";

class UsersController {
  // Método para cargar documentos del usuario
  async uploadDocuments(req, res) {
    try {
      const { files } = req; // Los archivos cargados
      const userId = req.params.uid; // ID del usuario que carga los documentos

      if (!files || files.length === 0) {
        return res.status(400).json({ message: 'No se cargaron documentos.' });
      }

      const user = await getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      const documents = files.map(file => ({
        name: file.originalname,
        reference: `/uploads/${file.filename}`
      }));

      user.documents = user.documents ? [...user.documents, ...documents] : documents;
      await updateUser(userId, user);

      res.status(200).json({ message: 'Documentos cargados con éxito', documents: documents });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Método para actualizar a usuario premium
  async upgradeToPremium(req, res) {
    try {
      const userId = req.params.uid;
      const user = await getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      const canUpgrade = verifyDocumentsForPremium(user.documents);
      if (!canUpgrade) {
        return res.status(400).json({ message: 'Documentación insuficiente para ser premium.' });
      }

      user.premiumStatus = true;
      await updateUser(userId, user);

      res.status(200).json({ message: 'Usuario actualizado a premium con éxito.' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

   // Método para obtener todos los usuarios
   async getAllUsers(req, res) {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Método para eliminar usuarios inactivos
  async deleteInactiveUsers(req, res) {
    try {
      const inactiveUsers = await findInactiveUsers();
      const inactiveUserIds = inactiveUsers.map(user => user.id);
      await deleteUsersByIds(inactiveUserIds);
      res.json({ message: `Usuarios inactivos eliminados: ${inactiveUserIds.length}` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default UsersController;