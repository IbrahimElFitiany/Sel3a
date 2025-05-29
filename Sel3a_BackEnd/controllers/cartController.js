const { Product } = require("../models");
const cartServices = require("../services/cartServices");

cartController = {

    addCartItem: async(req,res)=>{

        const customer = req.user;
        const {productId,qty} = req.body;

        if (!productId || !qty) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {

            const addCartItem = await cartServices.addCartItem(customer,productId,qty);
            if(!addCartItem){
                return res.status(409).json({ error: "product already in cart" });
            }
            res.status(200).json({addCartItem, message:"product added to cart :)"});
        } 
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getCartItems: async(req,res) =>{
        const customer = req.user;

        try {
            const cartItems = await cartServices.getCartItems(customer);

            res.status(200).json({cartItems});
        } 
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getCartCount: async (req, res) => {
        const customer = req.user;

        try {
            const cartItemsCount = await cartServices.getCartCount(customer);
            res.status(200).json({ cartItemsCount });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteCartItem: async (req, res) => {
        const customer  = req.user;
        const { carItemId } = req.params;
      
        try {
          const result = await cartServices.deleteCartItem(customer, carItemId);

          if (result) {
            return res.status(200).json({
              message: 'Product removed from cart successfully!',
            });
          } else {
            return res.status(404).json({
              message: 'Cart item not found!',
            });
          }
        } catch (error) {

          return res.status(500).json({
            message: 'An error occurred while removing the item from the cart.',
          });
        }
    }
}


module.exports = cartController