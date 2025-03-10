const adminServices = require("../services/adminServices");

const adminController = {

    addGov: async (req, res) => {
        if (req.user.role !== "admin") {
           return res.status(403).json({ error: "You don't have access" });
        }

        try {
            const {GovName} = req.body;

            if (!GovName) {return res.status(400).json({ error: "All fields are required" });}

            const newGov = await adminServices.addGovService(GovName.trim().replace(/\s+/g, " ").toLowerCase());

            if(newGov){
                return res.status(201).json({newGov,message:"gov created :)"});
            }

            return res.status(409).json({ error: "Government already exists" });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    removeGov:  async (req, res) => {

        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "You don't have access" });
         }
 
         try {
            const {govID} = req.body;

            if (!govID) {return res.status(400).json({ error: "All fields are required" });}

            const govDeleted = await adminServices.removeGovService(govID);

            if (govDeleted){
                return res.status(200).json({govDeleted,message:"gov deleted with it's districts :)"});
            }

            return res.status(404).json({ error: "Government not found" });
            
         } catch (error) {
             return res.status(500).json({ message: error.message });
         }
    },
    addDistrict:  async (req, res) => {

        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "You don't have access" });
        }
 
        try {
            const {DistrictName,GovID} = req.body;

            if (!DistrictName || !GovID) {return res.status(400).json({ error: "All fields are required" });}

            const newDistrict = await adminServices.addDistrictService(DistrictName.trim().replace(/\s+/g, " ").toLowerCase() ,GovID);
            return res.status(201).json({newDistrict,message:"district created :)"});
        } 
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    removeDistrict:  async (req, res) => {
        
    },
    updateDistrict:  async (req, res) => {
        
    },
    getPendingStores: async(req,res) =>{
        try {
            if (req.user.role == "admin") {
                const storeList = await adminServices.getPendingStoresService();
                res.status(200).json({storeList})
            }
            else{
                res.status(403).json({error:"admin privileges required"})
            }

        } 
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    approveStore: async(req,res) => {
        const{storeId} = req.params

        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Admin privileges required" });
        }
        try {
            const approvedStore = await adminServices.approveStoreService(storeId);

            if (!approvedStore) {
                return res.status(404).json({ error: "No store found" });
            }

            return res.status(200).json({ message: "Store approved successfully", approvedStore });
        } 
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    
}


module.exports = adminController