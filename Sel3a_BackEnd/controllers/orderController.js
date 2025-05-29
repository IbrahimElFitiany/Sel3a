const { Product } = require("../models");
const orderServices = require("../services/orderServices");

orderController = {

    placeOrder: async(req,res)=>{

        const customer = req.user;

        try {
            const createOrder = await orderServices.placeOrder(customer);
            if(!createOrder){
                return res.status(409).json({ error: "product already in cart" });
            }
            res.status(200).json({createOrder});
        } 
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    placePickUpOrder: async(req,res)=>{
      const customer = req.user;
      const {productid} = req.params;
      const {branchId,qty} = req.body;

      try {
          const createOrder = await orderServices.placePickUpOrder(customer,productid , branchId ,qty);
          if(!createOrder){
              return res.status(409).json({ error: "error 7sl haga idk fl order controller" });
          }
          res.status(200).json({createOrder});
      } 
      catch (error) {
          res.status(500).json({ message: error.message });
      }
    },
    cancelOrder: async(req,res)=>{
        const customer = req.user;
        const {orderId} = req.params;

        try {
            const cancelOrder = await orderServices.cancelOrder(customer,orderId);
            if(!cancelOrder){
                return res.status(409).json({ error: "error 7sl haga idk fl order controller" });
            }
            res.status(200).json({cancelOrder});
        } 
        catch (error) {
            res.status(500).json({ message: error.message });
        }
      
    }
}


module.exports = orderController