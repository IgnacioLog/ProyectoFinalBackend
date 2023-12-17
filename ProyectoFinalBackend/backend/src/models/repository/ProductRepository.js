class ProductRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    async getAllProducts() {
      return await this.dao.getAllItems();
    }
  
    async getProductById(id) {
      return await this.dao.getItemById(id);
    }
  
    async addProduct(productData) {
      return await this.dao.storeItem(productData);
    }
  
    async updateProduct(id, productData) {
      return await this.dao.updateStoredItem(id, productData);
    }
  
    async deleteProduct(id) {
      return await this.dao.deleteStoredItem(id);
    }
  
  
  }
  
  module.exports = ProductRepository;
  