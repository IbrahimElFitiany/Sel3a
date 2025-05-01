const { Op } = require("sequelize");
const {Customer,CustomerAddress,Category,Product,SubCategory,WishList ,Brand} = require('../models/index');


customerServices = {
    register: async(fname,lname,password,email,phone,gender,birthday)=>{
        try {
            const newCustomer = await Customer.create({fname,lname,password,email,phone,gender,birthday})
            return newCustomer; 
        } catch (error) {
            throw new Error("Error while registering customer: " + error.message);
        }
    },
    addAddressService: async (customerid,addresslabel,address,govid,districtid) =>{
        try {

            const addressExists = await CustomerAddress.findOne({
                where: { customerid , addresslabel }
            });

            if (addressExists){
                return null
            }

            const newAddress = await CustomerAddress.create({customerid,addresslabel,address,govid,districtid})
            return newAddress; 
        } 
        catch (error) {
            throw new Error("Error while registering customer: " + error.message);
        }
    },
    deleteAddressService: async(customerid,addresslabel) =>{
        try {     
            const addressExists = await CustomerAddress.findOne({
                where: {customerid, addresslabel}
            });

            if (!addressExists){
                return null
            }

            await addressExists.destroy();
            return true; 
        } 
        catch (error) {
            throw new Error("Error while deleting customer address: " + error.message);
        }
    },
    getCategoryService: async (categoryName) => {
        try {

            const category = await Category.findOne({
                where: {name: categoryName}
            });

            if (!category) {
                return null; 
            }

            const subCategories = await SubCategory.findAll({where:{catID:category.id}})
            const subCategoryIds = subCategories.map(sub => sub.id);

            const productsInCat = await Product.findAll({
                where: {
                    subcategoryid: {
                        [Op.in]: subCategoryIds
                    }
                }
            });

            return {
                products: productsInCat
            };
        } 
        catch (error) {
            throw new Error("Error while registering customer: " + error.message);
        }     
    },
    addToWishListService: async (customer_id , product_id ) => {
        try {
            const productInWishList = await WishList.findOne({
                where: { customer_id , product_id }
            });

            if (productInWishList){
                return null
            }

            const addProduct = await WishList.create({customer_id,product_id})
            return addProduct; 
            }               
        catch (error) {
            throw new Error("Error while registering customer: " + error.message);
        }
    },
    getWishListService: async (customer_id) => {
        try {
            const wishList = await WishList.findAll({where: {customer_id}});

            if (!wishList){
                return null
            }

            return wishList; 
            }               
        catch (error) {
            throw new Error("Error while registering customer: " + error.message);
        }

    },
    removeFromWishListService: async (customer_id,product_id) => {
        try {     
            const productExists = await WishList.findOne({
                where: {customer_id, product_id}
            });

            if (!productExists){
                return null
            }

            await productExists.destroy();
            return true; 
        } 
        catch (error) {
            throw new Error("Error while deleting customer address: " + error.message);
        }

    }
}


module.exports = customerServices
