const {Customer ,Store ,Employee} = require('../models/index');
const {generateToken} = require("../middleware/authMiddleware")
const bcrypt = require("bcrypt");


authService = {
        Login: async (identifier, password , role) => {
            try {
                    let user
                    if (role == "customer"){
                         
                        if (/\S+@\S+\.\S+/.test(identifier)) {
                            user = await Customer.findOne({ where: { email: identifier } });
                        } 
                        else{
                            user = await Customer.findOne({ where: { phone: identifier } });
                        }
                        if (!user) {
                            throw new Error("User not found");
                        }
                    }
                    if (role == "admin" || role == "employee"){

                        if (/\S+@\S+\.\S+/.test(identifier)) {
                            user = await Employee.findOne({ where: { email: identifier } });
                        } 
                        else if (/^\d+$/.test(identifier)) {
                            user = await Employee.findOne({ where: { phone: identifier } });
                        } 
                        else {
                            user = await Employee.findOne({ where: { username: identifier } });
                        }

                        if (!user) {
                            throw new Error("User not found");
                        }
                    }
                    if (role == "store"){
                        user = await Store.findOne({ where: { username: identifier } });

                        if (!user) {
                            throw new Error("Store not found");
                        }
                        if(!user.approved){
                            throw new Error("Store not approved");
                        }
                    }
                
    
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    throw new Error("Invalid credentials");
                }
    
                const token = generateToken({
                    userID: user.id,
                    name: user.fname,
                    role
                });
                
                fname = user.fname;
    
                return {token , fname};
            } catch (error) {
                throw new Error(error);
            }
        },

}

module.exports = authService;