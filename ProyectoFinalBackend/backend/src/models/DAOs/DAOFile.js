// Importando módulos necesarios
const fs = require("fs");
const crypto = require("crypto");
const convertToDTO = require("../DTOs/DTO.js");

class DAOFile {
  // Constructor de la clase DAOFile
  constructor(dataCollection, schemaDef) {
    this.dataCollection = dataCollection;
    this.filePath = `./src/data/${dataCollection}.json`;
  }

  // Método para crear un ID único
  async createUniqueId() {
    try {
      const uniqueId = encryption.randomUUID();
      return uniqueId;
    } catch (errorInstance) {
      throw new Error(errorInstance);
    }
  }

  // Método para verificar si un elemento ya existe en el archivo
  async doesItemExist(dataItem) {
    const allDataItems = await this.getAllItems();
    if (allDataItems && allDataItems.length) {
      return allDataItems.some((item) =>
        Object.entries(dataItem).find(([key, value]) => item[key] === value)
      );
    }
    return false;
  }

  // Método para obtener todos los elementos del archivo
  async getAllItems() {
    const rawData = await fileSystem.promises.readFile(this.filePath, "utf-8");
    const parsedData = JSON.parse(rawData);
    return transformToDTO(parsedData, this.dataCollection);
  }

  // Método para obtener un elemento por su ID
  async getItemById(itemId) {
    const items = await this.getAllItems();
    const foundItem = items.find((item) => item._id === itemId);
    if (!foundItem) return {};
    return transformToDTO(foundItem, this.dataCollection);
  }

  // Método para almacenar un nuevo elemento en el archivo
  async storeItem(dataItem) {
    if (dataItem) {
      const uniqueId = await this.createUniqueId();
      const itemToStore = {
        ...dataItem,
        _id: dataItem._id || uniqueId,
        timestamp: Date.now(),
      };
      const existingItems = await this.getAllItems();
      const updatedItems = [...existingItems, itemToStore];
      await fileSystem.promises
        .writeFile(this.filePath, JSON.stringify(updatedItems))
        .then(() => transformToDTO(itemToStore, this.dataCollection))
        .catch((error) => {
          return new Error(`Unable to save, ${error.message}`);
        });
    }
  }

  // Método para actualizar un elemento existente en el archivo
  async updateStoredItem(itemId, dataItem) {
    const items = await this.getAllItems();
    const itemToUpdate = items.find((item) => item._id === itemId);
    if (itemToUpdate) {
      const remainingItems = items.filter((item) => item._id !== itemId);
      const newItemsList = [...remainingItems, { ...itemToUpdate, ...dataItem }];
      await fileSystem.promises
        .writeFile(this.filePath, JSON.stringify(newItemsList))
        .then((response) => {
          return transformToDTO({ ...itemToUpdate, ...dataItem }, this.dataCollection);
        })
        .catch((error) => console.log("Update failed", error));
    }
  }

  // Método para eliminar un elemento del archivo
  async deleteStoredItem(itemId) {
    const items = await this.getAllItems();
    const itemToRemove = items.find((item) => item._id === itemId);
    if (itemToRemove) {
      const updatedItems = items.filter((item) => item._id !== itemId);
      await fileSystem.promises
        .writeFile(this.filePath, JSON.stringify(updatedItems))
        .then((response) => {
          return transformToDTO(itemToRemove, this.dataCollection);
        })
        .catch((error) => {
          console.log(`Deletion failed, ${error}`);
        });
    }
  }
}

// Exportando la clase DAOFile para ser utilizada en otros módulos
module.exports = DAOFile;

