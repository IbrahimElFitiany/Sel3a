const { Product } = require("../models");
const customerServices = require("../services/customerServices");

customerController = {

    register: async (req, res) => {
        const {fname,lname,password,email,phone,gender,birthday} = req.body;

        if (!fname || !lname || !password || !email || !phone || gender == null || !birthday) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            const register = await customerServices.register(fname,lname,password,email,phone,gender,birthday);
            return res.status(201).json(register);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }

    },
    addAddress: async(req,res)=>{

        const user = req.user;

        if (user.role !== "customer") {
            return res.status(403).json({ error: "You need to be a customer" });
        }

        const {addressLabel,address,govID,districtID} = req.body;

        if (!addressLabel || !address || !govID || !districtID) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {

            const createAddress = await customerServices.addAddressService(
                user.userID,
                addressLabel.toLowerCase(),
                address,
                govID,
                districtID
            );

            if(!createAddress){
                return res.status(409).json({ error: "address already exists" });
            }
            res.status(201).json(createAddress);
        } 
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteAddress: async(req,res) =>{
        const user = req.user;
    
        if (user.role !== "customer") {
            return res.status(403).json({ error: "You need to be a customer" });
        }

        const {addressLabel} = req.body;
        if (!addressLabel) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            const deleteAddress = await customerServices.deleteAddressService(
                user.userID,
                addressLabel.toLowerCase()
            );

            if(!deleteAddress){
                return res.status(409).json({ error: "address doesn't exist" });
            }
            res.status(200).json({deleteAddress, message:"address deleted :)"});
        } 
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    searchProducts: async (req, res) => {
        try {
            const { q } = req.query;
    
            if (!q || q.trim() === '') {
                return res.status(400).json({ error: 'Missing search query' });
            }
    
            const result = await customerServices.searchProducts(q.trim());
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message || 'Server Error' });
        }
    },
    getCategory: async (req, res) => {

        const user = req.user;

        if (user.role !== "customer") {
            return res.status(403).json({ error: "You need to be a customer" });
        }

        try {
            const {categoryName} = req.params
            const result = await customerServices.getCategoryService(categoryName.toLowerCase().trim());
            if (!result){
                return res.status(404).json({message:"no category with this  name"})
            }
            return res.status(200).json(result);
        } 
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    addToWishList: async(req,res) => {

        const user = req.user;

        if (user.role !== "customer") {
            return res.status(403).json({ error: "You need to be a customer" });
        }
        try {
            const{product_id} = req.body

            if (!product_id) {
                return res.status(400).json({ error: "All fields are required" });
            }

            const addToWishList = await customerServices.addToWishListService(user.userID, product_id);

            if (!addToWishList){
                return res.status(409).json({message:"product already exists"})
            }

            return res.status(200).json(addToWishList);
        } 
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    getWishList: async (req,res) => {
        const user = req.user;

        if (user.role !== "customer") {
            return res.status(403).json({ error: "You need to be a customer" });
        }
        
        try {
            const wishList = await customerServices.getWishListService(user.userID);
            if (!wishList){
                return res.status(404).json({error:"no products in wishList"})
            } 
            return res.status(200).json(wishList);
        } 
        catch (error) {
            res.status(500).json({ message: error.message });
        }

    },
    removeFromWishList: async(req,res) =>{

        const user = req.user;
    
        if (user.role !== "customer") {
            return res.status(403).json({ error: "You need to be a customer" });
        }

        const {product_id} = req.body;
        if (!product_id) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            const removeFromWishList = await customerServices.removeFromWishListService(user.userID,product_id);

            if(!removeFromWishList){
                return res.status(409).json({ error: "product doesn't exist" });
            }
            res.status(200).json({removeFromWishList, message:"product deleted :)"});
        } 
        catch (error) {
            res.status(500).json({ message: error.message });
        }

    }
}


module.exports = customerController