const {Gov,District,Store} = require('../models/index');

adminServices = {
    addGovService: async (GovName) => {
        try {
            const existingGov = await Gov.findOne({ where: { name: GovName } });

            if (existingGov) return null;

            return await Gov.create({ name: GovName });
        } 
        catch (error) {
            throw error;
        }
    },
    getAllGovs: async (user) => {
        if (user.role !== "admin") {
            throw new Error("Unauthorized access");
        }
    
        const govs = await Gov.findAll(); // Assuming Gov is your model
        return govs;
    },
    removeGovService: async (govID) => {
        try {
            const gov = await Gov.findOne({ where: {id: govID} });

            if (!gov) {
                return false;
            }

            await gov.destroy();
            return true;
        } 
        catch (error) {
            throw error;
        }
    },
    addDistrictService: async (DistrictName , GovID) => {
        try {
            const district = await District.findOne({ where: { name: DistrictName } });

            if (!district) {
                const newDistrict = await District.create({ name: DistrictName , govID: GovID }); 
                return newDistrict;
            }
        } 
        catch (error) {
            throw error;
        } 
    },
    getPendingStoresService: async () => {
        try {
            const pendingStores = await Store.findAll({where: { approved: false }});
            return pendingStores            
        } 
        catch (error) {
            throw error;
        }
    },
    approveStoreService: async (storeId) =>{

        try {
            const store = await Store.findByPk(storeId);

            if (!store) {
                return false
            }
    
            store.approved = true;
            await store.save();
            
            return true
        } 
        catch (error) {
            throw error;  
        }
    }

}

module.exports = adminServices;