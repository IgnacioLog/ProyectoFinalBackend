// Importando módulos necesarios
const DAOFile = require("./DAOFile.js");       // DAO para persistencia en archivos
const DAOMongo = require("./DAOMongo.js");     // DAO para persistencia en MongoDB
const config = require("../../../config.js");  // Configuraciones generales

class DAOFactory {
  // Método estático para obtener una instancia de DAO basada en la configuración de persistencia
  static get(collection, schema) {
    // Objeto que mapea los tipos de persistencia con sus respectivas clases DAO
    const DAOpersistence = {
      mongodb: DAOMongo,  // Si la persistencia es 'mongodb', se usa DAOMongo
      file: DAOFile,      // Si la persistencia es 'file', se usa DAOFile
    };

    // Retorna una nueva instancia del DAO correspondiente basado en la configuración de persistencia
    return new DAOpersistence[config.PERSISTENCE](collection, schema);
  }
}

// Exportando la fábrica DAO para ser utilizada en otros módulos
module.exports = DAOFactory;
