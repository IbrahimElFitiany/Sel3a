const { Op, where } = require("sequelize");
const db = require("../configs/db.config");
const {Cart,Product,OrderItem,Order, StoreAddress, BranchStock} = require('../models/index');

orderServices = {

    placeOrder: async (customer) => {
        const t = await db.transaction();
        try {
            if (customer.role !== "customer") {
                throw new Error("You need to be a customer");
            }
    
            const cartItems = await Cart.findAll({
                where: { userid: customer.userID },
                include: [{
                    model: Product,
                    attributes: ['price', 'stockqty']
                }],
                transaction: t
            });
    
            if (cartItems.length === 0) {
                throw new Error("No items in cart to place an order");
            }
    
            const order = await Order.create({
                userid: customer.userID,
                orderdate: new Date(),
                totalamount: 0
            }, { transaction: t });
    
            for (const item of cartItems) {
                await OrderItem.create({
                    orderid: order.id,
                    productid: item.productid,
                    quantity: item.quantity,
                    price: item.Product.price
                }, { transaction: t });
    
                await Product.decrement('stockqty', {
                    by: item.quantity,
                    where: { id: item.productid },
                    transaction: t
                });
            }
    
            const totalAmount = cartItems.reduce(
                (acc, item) => acc + (item.quantity * item.Product.price), 0
            );
    
            order.totalamount = totalAmount;
            await order.save({ transaction: t });
    
            await Cart.destroy({
                where: { userid: customer.userID },
                transaction: t
            });
    
            await t.commit();
            return cartItems;
    
        } catch (error) {
            await t.rollback();
            throw new Error(error.message);
        }
    },
    placePickUpOrder: async (customer , productid , branchid , qty) => {
        const t = await db.transaction();
        try {
            if (customer.role !== "customer") {
                throw new Error("You need to be a customer");
            }
    
            // ht create empty order 
            const order = await Order.create({
                userid: customer.userID,
                orderdate: new Date(),
                totalamount: 0,
            }, { transaction: t });

            // ht get el branch el feh el product dah w tgeb m3ah el product name and price
            const branchStock = await BranchStock.findOne({
                where: { branch_id: branchid, product_id: productid },
                include: [{
                  model: Product,
                  as: 'product',
                  attributes: ['name' , "price"] 
                }]
            });

            console.log(qty)

            if(branchStock.quantity < qty){
                throw new Error("Not enough stock available at this branch.")
            }
    
            // m-create order Item with order info 
            const orderItem = await OrderItem.create({
                orderid: order.id,
                productid: productid,
                quantity: qty,
                price: branchStock.product.price,
                branchid: branchStock.branch_id
            }, { transaction: t });
    
            await branchStock.decrement('quantity', { by: qty });

            const totalAmount = orderItem.price * orderItem.quantity
    
            order.totalamount = totalAmount;
            order.status= "pick-up"
            await order.save({ transaction: t });
                
            await t.commit();
            return order;
        }
        catch (error) {
            await t.rollback();
            throw new Error(error.message);
        }
    },
    cancelOrder: async (customer, orderId) => {
        const transaction = await db.transaction();
        try {
            if (customer.role !== "customer") {
                throw new Error("You have to login as a customer");
            }
    
            const validStatuses = ["pending", "pick-up"];
            const order = await Order.findOne({
                where: {
                    id: orderId,
                    userid: customer.userID,
                    status: {
                        [Op.in]: validStatuses,
                    },
                },
                include: [
                    {
                        model: OrderItem,
                    },
                ],
                transaction,
            });
    
            if (!order) {
                throw new Error("Sorry, this order has already been shipped or delivered. You can try the refund option.");
            }
    
            const items = Array.isArray(order.OrderItems) ? order.OrderItems : [order.OrderItems];
    
            for (let item of items) {
                if (order.status === "pick-up") {
                    const branchStock = await BranchStock.findOne({
                        where: { branch_id: item.branchid, product_id: item.productid },
                        transaction,
                    });
    
                    if (branchStock) {
                        branchStock.quantity += item.quantity;
                        await branchStock.save({ transaction });
                    }
                } 
                else if (order.status === "pending") {

                    const product = await Product.findOne({
                        where: { id: item.productid },
                        transaction,
                    });
    
                    if (product) {
                        product.stockQty += item.quantity;
                        await product.save({ transaction });
                    }

                    if(!product){
                        throw new Error("error no product with that ID")
                    }
                } 
                else {
                    throw new Error("Unexpected order status during cancel.");
                }
            }
    
            order.status = "canceled";
            await order.save({ transaction });
    
            await transaction.commit();
            return order;
        } catch (error) {
            await transaction.rollback();
            throw new Error(error.message);
        }
    } 

    
}

module.exports = orderServices;