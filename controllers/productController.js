const { get } = require("../routes/adminRoutes");
const productServices = require("../services/productServices"); 

const productController = {

    addProduct: async (req, res) => {
        try {
            const store = req.user;

            const {name, image, description, price, stockQty, subCategory , brandID } = req.body;

            if (!name || !image || !description || !price || !stockQty || !subCategory || !brandID) {
                return res.status(400).json({ error: "All fields are required" });
            }
            
            const newProduct = await productServices.addProduct(name, image, description, price, stockQty, subCategory ,store, brandID );

            if (!newProduct){
                return res.status(409).json({ error: "Product with this name already exists in your store" });
            }

            return res.status(201).json({newProduct,message:"product created :)"});
        } 
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const store = req.user;
            const { productID } = req.params;

            if (!productID) {
                return res.status(400).json({ error: "Product ID is required" });
            }

            const deletedProduct = await productServices.deleteProduct(productID, store);

            if (!deletedProduct) {
                return res.status(404).json({ error: "Product not found" });
            }

            return res.status(200).json({ message: "Product deleted successfully" });
        } 
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getProductById: async (req, res) => {
        try {

            const productID = req.params.productID;
            const product = await productServices.getProductById(productID);

            return res.status(200).json(product);
        } 
        catch (error) {
            return res.status(500).json({ message: error.message });
        }

    },
    getAllProcucts:async(req,res) => {
        try {
            const storeID = req.query.storeID || null;

            const user = req.user;

            const products = await productServices.getAllProducts(user, storeID);

            if (!products) {
                return res.status(404).json({ error: "No products found" });
            }
            return res.status(200).json(products);
        } 
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    addBranchStock: async (req, res) => {
        try {
            const store = req.user;
            const { branchID,productId,quantity} = req.body;

            if (!branchID || !productId || !quantity) {
                return res.status(400).json({ error: "Branch ID, Product ID and quantity are required" });
            }

            const addStockToBranch = await productServices.addBranchStock(branchID, productId,quantity, store);

            if (!addStockToBranch) {
                return res.status(404).json({ error: "Product not found" });
            }

            return res.status(200).json({ message: "Stock updated successfully" });
        } 
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}


module.exports = productController