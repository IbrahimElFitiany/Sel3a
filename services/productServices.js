const { Op } = require("sequelize");
const {Store ,Product, StoreAddress,BranchStock,SubCategory, Brand , Category , Gov , District} = require('../models/index');
const Fuse = require('fuse.js');


productServices = {

    addProduct: async (name,image,description,price,stockQty,subCategoryID,store,brand_id) => {
        try {
            
            if (store.role !== "store" ) {
                throw new Error("You are not authorized to add a product");
            }
            const storeID = store.userID

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
    addProductsExcel: async (products,store) => {
    },
    deleteProduct: async (productID,store) => {
        try {
            if (store.role !== "store") {
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
        const rawProduct  = await Product.findOne({
          where: { id: productID },
          include: [
            {
              model: Store,
              attributes: ['store_name']
            },
            {
              model: Brand,
              attributes: ['name']
            },
            {
              model: BranchStock,
              attributes: ['quantity'],
              include: [
                {
                  model: StoreAddress,
                  attributes: ["id",'address'],
                  include: [
                    {
                      model: Gov,
                      attributes: ['name'],
                    },
                    {
                      model: District,
                      attributes: ['name'],
                    }
                  ]
                }
              ]
            }
          ]
        });
    
        if (!rawProduct ) {
          throw new Error('Product not found');
        }

        const product = {
          id: rawProduct.id,
          storeID: rawProduct.storeID,
          storeName: rawProduct.Store.store_name,
          name: rawProduct.name,
          image: rawProduct.image,
          description: rawProduct.description,
          price: rawProduct.price,
          onlineStockQty: rawProduct.stockQty,
          subCategoryID: rawProduct.subCategoryID,
          brand_id: rawProduct.brand_id,
          BrandName: rawProduct.Brand?.name || null,
          rating: rawProduct.rating,
          BranchStocks: rawProduct.BranchStocks.map(branch => ({
            StoreAddress: {
              branchId:branch.StoreAddress.id ,
              address: branch.StoreAddress?.address || null,
              Gov: branch.StoreAddress?.Gov?.name || null,
              District: branch.StoreAddress?.District?.name || null
            },
            branchStockQty: branch.quantity,

          }))
        };
    
        return product;
      } 
      catch (error) {
        throw error;
      }
    },
    getRelatedProducts: async (productID) => {
      try {
          const product = await Product.findOne({
              where: { id: productID },
              include: {
                  model: SubCategory,
                  include: {
                      model: Category
                  }
              }
          });
  
          if (!product) throw new Error('Product not found');
  
          const price = parseFloat(product.price);
          const parentCategoryID = product.SubCategory.catID;

          console.log(parentCategoryID);
  
          const relatedProducts = await Product.findAll({
              where: {
                  id: { [Op.ne]: productID },
                  price: {
                      [Op.between]: [price - price * 0.2, price + price * 0.2],
                  }
              },
              include: [
                  {
                      model: SubCategory,
                      where: {
                        catID: parentCategoryID
                      },
                      include: {
                          model: Category,
                          attributes: ['name']
                      }
                  },
                  {
                      model: Brand,
                      attributes: ['name'],
                      required: false
                  }
              ],
              limit: 7
          });
  
          return relatedProducts;
      } 
      catch (error) {
          throw error;
      }
    },
    getProductBySubCategory: async (subCategoryID) => {
        try {
            const products = await Product.findAll({
                where: { subCategoryID },
                include: [
                    {
                        model: SubCategory,
                        include: {
                            model: Category,
                            attributes: ['name']
                        }
                    },
                    {
                        model: Brand,
                        attributes: ['name']
                    }
                ]
            });
  
            return products;
        } catch (error) {
            throw error;
        }
    },
    searchProducts: async (query) => {
      const products = await Product.findAll({
          include: [
            {
              model: SubCategory,
              include: [
                {
                  model: Category,
                  attributes: ['name']
                }
              ],
              attributes: ['name']
            },
            {
              model: Brand,
              attributes: ['name']
            }
          ]
        });
  
        const options = {
          keys: [
            'name',
            'Brand.name',
            'SubCategory.name',
            'SubCategory.Category.name'
          ],
          threshold: 0.3, 
          ignoreLocation: true,
          minMatchCharLength: 2,
          distance: 100,
        };
        
        const fuse = new Fuse(products, options);
        const result = fuse.search(query);

      return result.map(r => r.item);
    },
    getAllProducts: async (user, optionalStoreID = null) => {
        const whereCondition = {};
      
        if (user?.role === 'store') {
          whereCondition.storeID = user.userID;
        } 
        else if (user?.role === 'admin') {
          if (optionalStoreID) {
            whereCondition.storeID = optionalStoreID;
          }
          else throw new Error("problem in service layer, specify el id")
        } 
        else {
          if (optionalStoreID) {
            whereCondition.storeID = optionalStoreID;
          }
          else throw new Error("problem in service layer , specify el id")
        }
      
        return await Product.findAll({ where: whereCondition,
            include: [
                {
                  model: BranchStock,
                
                  include: [
                    {
                      model: StoreAddress,
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