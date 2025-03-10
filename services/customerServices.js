const {Customer,CustomerAddress} = require('../models/index');


customerServices = {
    register: async(fname,lname,password,email,phone,gender,birthday)=>{
        try {
            const newCustomer = await Customer.create({fname,lname,password,email,phone,gender,birthday})
            return newCustomer; 
        } catch (error) {
            throw new Error("Error while registering customer: " + error.message);
        }
    },
    addAddressService: async (customerid,addresslabel,address,govid,districtid) =>{
        try {

            const addressExists = await CustomerAddress.findOne({
                where: { customerid , addresslabel }
            });

            if (addressExists){
                return null
            }

            const newAddress = await CustomerAddress.create({customerid,addresslabel,address,govid,districtid})
            return newAddress; 
        } 
        catch (error) {
            throw new Error("Error while registering customer: " + error.message);
        }
    },
    deleteAddressService: async(customerid,addresslabel) =>{
        try {
            
            const addressExists = await CustomerAddress.findOne({
                where: {customerid, addresslabel}
            });

            if (!addressExists){
                return null
            }

            await addressExists.destroy();
            return true; 
        } 
        catch (error) {
            throw new Error("Error while deleting customer address: " + error.message);
        }
    },
    searchProducts: async (query, test) => {
    },
    getCategory: async (categoryName) => {

        
    }
}


module.exports = customerServices
