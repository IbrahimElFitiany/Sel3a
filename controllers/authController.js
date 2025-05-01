const authService = require("../services/authServices")



const authController = {
    login: async (req, res) => {
        const { identifier , password } = req.body;
        const reqRole = req.originalUrl.split("/")[2]    
        console.log(reqRole)    
        try {
            const {token , fname} = await authService.Login(identifier, password ,reqRole);
            return res.status(200).json({ message: "Login successful", token,fname});
        } catch (error) {
            if (error.message == "Store not approved"){
                return res.status(403).json({ error: error.message });
            }
            return res.status(400).json({ error: error.message });
        }

    },
};

module.exports = authController;
