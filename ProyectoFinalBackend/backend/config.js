// Importando módulos necesarios
require("dotenv").config();
const pathModule = require("path");
const argumentParser = require("minimist");

// Configuración de opciones para el parser de argumentos
const configOptions = {
  alias: { env: "envSetting" }, // Alias para el argumento 'env'
  default: { envSetting: "dev" }, // Valor por defecto para 'envSetting'
};

// Parseando argumentos de la línea de comandos y extrayendo 'envSetting'
const { envSetting } = argumentParser(process.argv.slice(2), configOptions);

// Construyendo el nombre del archivo .env basado en el entorno
const envFile = `${envSetting}.env`;

// configuramos 'dotenv' para usar ese archivo
if (envFile === "dev.env") {
  require("dotenv").config({
    path: pathModule.resolve(process.cwd(), envFile),
  });
}

// Exportando variables de entorno y valores por defecto
module.exports = {
  NODE_ENV: process.env.NODE_ENV || "dev",
  PORT: process.env.PORT || 8080,
  MONGO_DATA_BASE_URL: process.env.MONGO_DATA_BASE_URL,
  PERSISTENCE: process.env.PERSISTENCE || "file",
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || "3600s",
  CLOUDINARY_BASE_URL: process.env.CLOUDINARY_BASE_URL,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  MAIL_ADDRESS: process.env.MAIL_ADDRESS,
  MAIL_PASS: process.env.MAIL_PASS,
  FRONTEND_URL: process.env.FRONTEND_URL,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_USER: process.env.SENDGRID_USER,
};
