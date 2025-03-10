const sellerServices = require("../services/sellerServices") 

const sellerController = {

    register: async (req,res) =>{
        try {
            const {username,password,email,phone,store_name,description} = req.body;

            if (!username || !password || !email || !phone || !store_name || !description) {
                return res.status(400).json({ error: "All fields are required" });
            }
            
            const newStore = await sellerServices.registerService(username,password,email,phone,store_name,description);
            res.status(201).json({newStore, message:"store created :) , Waiting for Approval"})
            
        } 
        catch (error) {
            res.status(500).json({ message: error.message });
        }

    },
    addProduct: async (req, res) => {
        try {
            const store = req.user;

            if (store.role !== "seller") {
                return res.status(403).json({ error: "Must be a store owner to perform this action" });
            }

            const {name, image, description, price, stockQty, subCategory , brandID } = req.body;

            if (!name || !image || !description || !price || !stockQty || !subCategory || !brandID) {
                return res.status(400).json({ error: "All fields are required" });
            }
            
            const newProduct = await sellerServices.addProductService(name, image, description, price, stockQty, subCategory , store.userID , brandID );

            if (!newProduct){
                return res.status(409).json({ error: "Product with this name already exists in your store" });
            }

            return res.status(201).json({newProduct,message:"product created :)"});
        } 
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
}


module.exports = sellerController