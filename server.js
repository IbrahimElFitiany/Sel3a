require('dotenv').config();
const express = require('express');
const adminRoutes = require('./routes/adminRoutes');
const customerRoutes = require('./routes/customerRoutes');
const sellerRoutes =  require('./routes/sellerRoutes');

PORT = process.env.PORT
const app = express();

app.use(express.json());


app.use("/api/admin",adminRoutes)
app.use("/api/seller/",sellerRoutes)
app.use("/api/customer/",customerRoutes)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});