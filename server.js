require('dotenv').config();
const express = require('express');
const adminRoutes = require('./routes/adminRoutes');
const customerRoutes = require('./routes/customerRoutes');
const storeRoutes =  require('./routes/storeRoutes');
const productRoutes =  require('./routes/productRoutes');
const orderRoutes =  require('./routes/orderRoutes');
const cartRoutes =  require('./routes/cartRoutes');

PORT = process.env.PORT
const app = express();

app.use(express.json());


app.use("/api/admin",adminRoutes)
app.use("/api/store/",storeRoutes)
app.use("/api/customer/",customerRoutes)
app.use("/api/product/",productRoutes)
//app.use("/api/order/",orderRoutes)
app.use("/api/cart/",cartRoutes)



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});