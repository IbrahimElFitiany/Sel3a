const { Op } = require("sequelize");
const {Product, StoreAddress,BranchStock} = require('../models/index');

productServices = {

    addProduct: async (name,image,description,price,stockQty,subCategoryID,store,brand_id) => {
        try {
            
            if (store.role !== "store" ) {
                throw new Error("You are not authorized to add a product");
            }
            storeID = store.userID

            const productExists  = await Product.findOne({ where: { name, storeID } });

            if (productExists) {
                return null;
            }

            const newProduct = await Product.create({name,image,description,price,stockQty,subCategoryID,storeID,brand_id}); 
            return newProduct;
        } 
        catch (error) {
            throw error;
        }
    },
    deleteProduct: async (productID,store) => {
        try {
            if (store.role !== "seller") {
                throw new Error("You are not authorized to delete a product");
            }
            const storeID = store.userID;
            const product = await Product.findOne({ where: { id: productID, storeID } });

            if (!product) {
                return null;
            }

            await Product.destroy({ where: { id: productID } });
            return true;
        } 
        catch (error) {
            throw error;
        }
    },
    getProductById: async (productID) => {
        try {
            const product = await Product.findOne({
                where: { id: productID },
                include: [
                  {
                    model: BranchStock,
                    as: 'branchStocks',
                    include: [
                      {
                        model: StoreAddress,
                        as: 'branch',
                        attributes: ['address', 'govid', 'districtid'],  // Branch details
                      }
                    ],
                    attributes: ['branch_id', 'quantity'],  // Stock information
                  }
                ]
              });
          
              if (!product) {
                throw new Error('Product not found');
              }
              return product;
        }
        catch (error) {
            throw error;
        }

    },
    getAllProducts: async (user, optionalStoreID = null) => {
        const whereCondition = {};
      
        if (user.role === 'store') {
          whereCondition.storeID = user.userID;
        } 
        else if (user.role === 'admin') {
          if (optionalStoreID) {
            whereCondition.storeID = optionalStoreID;
          }
        } else {
          throw new Error('Unauthorized role');
        }
      
        return await Product.findAll({ where: whereCondition,
            include: [
                {
                  model: BranchStock,
                  as: 'branchStocks',
                  include: [
                    {
                      model: StoreAddress,
                      as: 'branch',
                      attributes: ['address', 'govid', 'districtid']
                    }
                  ],
                  attributes: ['branch_id', 'quantity']
                }
              ]
         });
      },
    addBranchStock: async (branchID, productId, quantity, store) => {
        try {
            if (store.role !== "store") {
                throw new Error("You are not authorized to add stock to a branch");
            }
            const storeID = store.userID;
            const product = await Product.findOne({ where: { id: productId , storeid: storeID } });
            const branch = await StoreAddress.findOne({ where: { id: branchID , storeid: storeID} });

            if (!product) {
                throw new Error("Product not found");
            }

            if (!branch) {
                throw new Error("Branch not found");
            }

            const branchstock = await BranchStock.create({ 
                branch_id: branchID, 
                product_id: productId, 
                quantity 
              });

            return branchstock;
        } 
        catch (error) {
            throw error;
        }
    }
}

module.exports = productServices;