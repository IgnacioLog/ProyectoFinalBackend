// Importando módulos necesarios
const mailer = require("@sendgrid/mail");
const settings = require("../../config.js");

// Función para enviar un correo electrónico de verificación
const dispatchVerificationEmail = async (recipientEmail, userAlias, verificationToken) => {
    // Configurando la API key de SendGrid
    mailer.setApiKey(settings.SENDGRID_API_KEY);

    // Detalles del correo electrónico
    const emailDetails = {
        from: settings.SENDGRID_USER, // Remitente del correo
        to: `<${recipientEmail}>`, // Destinatario del correo
        subject: "Cel - Account Verification", // Asunto del correo
        text: "Verify your Cel account", // Texto plano del correo
        // Contenido HTML del correo
        html: `
        <p>Dear ${userAlias}, thank you for registering at Cel.</p>
        <p>Your account is almost set up, just click the link below to verify: </p>
        <a href="${settings.FRONTEND_URL}/verify/${verificationToken}">Verify Now</a>
        <p>If you didn't create this account, please disregard this email.</p>
      `,
    };

    // Intentando enviar el correo
    try {
        mailer
            .send(emailDetails)
            .then(() => {
                console.log("Verification email dispatched."); // Mensaje de éxito
            })
            .catch((error) => console.error(error)); // Manejo de errores en el envío
    } catch (err) {
        return {
            message: `Error sending verification email: ${err}`, // Mensaje de error general
        };
    }
};

// Exportando la función para ser utilizada en otros módulos
module.exports = dispatchVerificationEmail;

