import { Router } from 'express';
import UsersController from '../controllers/users.js';
import multerMiddleware from '../middlewares/multerMiddleware.js';
import nodemailer from '../utils/nodemailer.js';

const router = Router();
const usersController = new UsersController();

// Ruta para subir documentos de usuario
router.post('/:uid/documents', multerMiddleware, usersController.uploadDocuments);

// Ruta para actualizar a usuario premium
router.put('/premium/:uid', usersController.upgradeToPremium);

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await usersController.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Eliminar usuarios inactivos
router.delete('/', async (req, res) => {
    try {
        const inactiveUsers = await usersController.findInactiveUsers();
        
        // Enviar correo a usuarios inactivos antes de eliminarlos
        inactiveUsers.forEach(user => {
            nodemailer.sendMail({
                from: 'your-email@example.com',
                to: user.email,
                subject: 'Cuenta eliminada por inactividad',
                text: 'Tu cuenta ha sido eliminada debido a inactividad.',
            });
        });

        // Eliminar usuarios inactivos
        const result = await usersController.deleteInactiveUsers();
        res.send({ message: 'Usuarios inactivos eliminados', details: result });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;
