const mongoose = require('mongoose');
const ProductSchema = require('../schemas/ProductSchema');

class ProductDAO {
  constructor() {
    this.model = mongoose.model('Product', ProductSchema);
  }

  async getAllItems() {
    return await this.model.find({});
  }

  async getItemById(id) {
    return await this.model.findById(id);
  }

  async storeItem(productData) {
    const product = new this.model(productData);
    return await product.save();
  }

  async updateStoredItem(id, productData) {
    return await this.model.findByIdAndUpdate(id, productData, { new: true });
  }

  async deleteStoredItem(id) {
    return await this.model.findByIdAndDelete(id);
  }

}

module.exports = ProductDAO;
