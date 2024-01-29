// Importa la biblioteca mongoose, que se utiliza para trabajar con MongoDB
import mongoose from "mongoose";

// Define la estructura del esquema de la persona (person)
const personSchemaStructure = {
  // El nombre de la persona (personName) que es de tipo String
  personName: String,
  // El código secreto de la persona (secretCode) que es de tipo String
  secretCode: String,
  // El número de contacto de la persona (contactNumber) que es de tipo Number
  contactNumber: Number,
  // La dirección de correo electrónico de la persona (emailAddress) que es de tipo String
  emailAddress: String,
  // La clave de acceso de la persona (accessKey) que es de tipo String
  accessKey: String,
  // Un valor booleano que indica si la persona ha sido verificada (isVerified)
  isVerified: Boolean,
  // La hora de registro de la persona (registrationTime) que es de tipo String
  registrationTime: String,
};

// Crea un nuevo esquema de mongoose utilizando la estructura definida anteriormente
const personSchema = new mongoose.Schema({ ...personSchemaStructure });

// Exporta el esquema de la persona como exportación por defecto
export default mongoose.model("Person", personSchema);
