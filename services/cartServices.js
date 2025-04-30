const { Op } = require("sequelize");
const {Cart,Product} = require('../models/index');

cartServices = {

    addCartItem: async (customer,productId, qty) => {
        try {

            if (customer.role !== "customer") {
                return res.status(403).json({ error: "You need to be a customer" });
            }

            const productExistsInCart  = await Cart.findOne({ where: { userid:customer.userID, productid:productId } });

            if (productExistsInCart) {
                productExistsInCart.quantity += qty;
                await productExistsInCart.save();
                return productExistsInCart;
            }
            else {
                const cartItem = await Cart.create({
                    userid: customer.userID,
                    productid: productId,
                    quantity: qty
                });
                return cartItem;
            }
        } 
        catch (error) {
            throw error;
        }
    },
    getCartItems: async (customer) => {
        try {
            if (customer.role !== "customer") {
                return res.status(403).json({ error: "You need to be a customer" });
            }
            const cartItems = await Cart.findAll({
                where: {
                    userid: customer.userID
                },
                include: {
                    model: Product,
                    attributes: ['id', 'name', 'price', 'image']
                }
            });
            return cartItems;
            
        } catch (error) {
            throw error;
        }

    },
    deleteCartItem: async (customer, carItemId) => {

        if (customer.role !== "customer") {
            return res.status(403).json({ error: "You need to be a customer" });
        }

        try {
          const cartItem = await Cart.findOne({
            where: {
              userid: customer.userID,
              id: carItemId,
            },
          });
      
          if (!cartItem) {
            return false;
          }
      
          await cartItem.destroy();
          return true;
        }
         catch (error) {
          console.error(error);
          throw new Error('Error while removing cart item');
        }
    }
}

module.exports = cartServices;