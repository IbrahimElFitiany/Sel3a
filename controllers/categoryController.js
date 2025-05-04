const categoryServices = require("../services/categoryServices");

const categoryController = {
  addCategory: async (req, res) => {
    const user = req.user;
    const {name} = req.body;

    if (!name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const addcategory = await categoryServices.addCategory(user, name);
      if (!addcategory) {
        return res.status(409).json({ error: "Category already exists" });
      }

      res.status(200).json({ message: "category added" });
    } 
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  removeCategory: async (req, res) => {
    const user = req.user
    const { catId } = req.params;
  
    try {
      const removeCat = await categoryServices.removeCategory(user,catId);
  
      if (removeCat) {
        return res.status(200).json({ message: "Category removed successfully" });
      }

    } 
    catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

};

module.exports = categoryController;
