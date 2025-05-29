const storeServices = require("../services/storeServices") 

const storeController = {

    register: async (req,res) =>{
        try {
            const {username,password,email,phone,store_name,description} = req.body;

            if (!username || !password || !email || !phone || !store_name || !description) {
                return res.status(400).json({ error: "All fields are required" });
            }
            
            const newStore = await storeServices.registerService(username,password,email,phone,store_name,description);
            res.status(201).json({newStore, message:"store created :) , Waiting for Approval"})
            
        } 
        catch (error) {
            res.status(500).json({ message: error.message });
        }

    },
    addBranch: async (req,res) =>{
        try {
            storeId = req.user.userID;
            const {address,govID,districtID} = req.body;

            if (!address || !govID || !districtID) {
                return res.status(400).json({ error: "All fields are required" });
            }
            
            const newBranch = await storeServices.addBranch(storeId ,address,govID,districtID);
            res.status(201).json({newBranch, message:"Branch created :)"})
            
        } 
        catch (error) {
            res.status(500).json({ message: error.message });
        }

    },
}


module.exports = storeController