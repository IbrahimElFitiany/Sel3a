const { Op } = require("sequelize");
const {Product,Store} = require('../models/index');

sellerServices = {
    registerService: async (username,password,email,phone,store_name,description) =>{
        try {
            const store = await Store.findOne({ 
                where: { 
                    [Op.or]: [
                        { username },
                        { email },
                        { store_name }
                    ] 
                } 
            });
            
            if (store) {
                if (store.username === username) throw new Error(`Username "${username}" is already taken.`);
                if (store.email === email) throw new Error(`Email "${email}" is already registered.`);
                if (store.store_name === store_name) throw new Error(`Store name "${store_name}" is already in use.`);
            }

            const newStore = await Store.create({username,password,email,phone,store_name,description});
            return newStore;  
        } 
        catch (error) {
            throw error;
        }

    },
    addProductService: async (name,image,description,price,stockQty,subCategoryID,storeID,brand_id) => {
        try {
            const productExists  = await Product.findOne({ where: { name, storeID }});

            if (productExists) {
                return null;
            }
            console.log(brand_id)

            const newProduct = await Product.create({name,image,description,price,stockQty,subCategoryID,storeID,brand_id}); 
            return newProduct;
        } 
        catch (error) {
            throw error;
        }
    },

}

module.exports = sellerServices;