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
            const { q, test } = req.query;
            console.log(test)
            const result = await customerServices.searchProducts(q, test);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error});
        }
   },    
    getCategory: async (req, res) => {
        try {
            const {categoryName} = req.params
            const result = await customerServices.getCategory(categoryName);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error});
        }
    }
}


module.exports = customerController