const { Op } = require("sequelize");
const {Category} = require('../models/index');

const categoryServices = {
  addCategory: async (user , name) => {
    try {
        if (user.role !== "admin") {
        throw new Error("You need to be an Admin") }


        const categoryExists = await Category.findOne({ where: { name: name } });
        if (categoryExists) {
          throw new Error("Category already exists");
        }
  
        const newCategory = await Category.create({ name: name });
        return newCategory;  // Return the newly created category
        
    } 
    catch (error) {
      throw error;
    }
  },
  removeCategory: async (user, catId) => {
    try {
      if (user.role !== 'admin') {
        throw new Error("Only admins can delete categories");
      }
  
      const category = await Category.findByPk(catId);
      if (!category) return false;
  
      await category.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = categoryServices;
