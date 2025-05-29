const { Op } = require("sequelize");
const {Product,Store , StoreAddress} = require('../models/index');

storeServices = {
    registerService: async (username,password,email,phone,store_name,description) =>{
        try {
            const store = await Store.findOne({ 
                where: { 
                    [Op.or]: [
                        { username },
                        { email },
                        { store_name }
                    ] 
                } 
            });
            
            if (store) {
                if (store.username === username) throw new Error(`Username "${username}" is already taken.`);
                if (store.email === email) throw new Error(`Email "${email}" is already registered.`);
                if (store.store_name === store_name) throw new Error(`Store name "${store_name}" is already in use.`);
            }

            const newStore = await Store.create({username,password,email,phone,store_name,description});
            return newStore;  
        } 
        catch (error) {
            throw error;
        }

    },
    addBranch: async (storeid,address,govID,districtID) =>{
        try {
            const branch = await StoreAddress.findOne({storeid , address});
            
            if (branch) {
                if (branch.address === address) throw new Error(`this branch already exists.`);
            }

            const newBranch = await StoreAddress.create({storeid,address,govid:govID,districtid:districtID});
            return newBranch;  
        } 
        catch (error) {
            throw error;
        }

    }

}

module.exports = storeServices;