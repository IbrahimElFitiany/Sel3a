const db = require('../configs/db.config')

const Customer = require('./Customer.js')(db);
const CustomerAddress = require('./CustomerAddress.js')(db);
const Employee = require('./Employee.js')(db);
const Gov = require('./Gov.js')(db);
const District = require('./District.js')(db);
const Brand = require('./Brand.js')(db);
const Product = require('./Product.js')(db);
const Category = require('./Category.js')(db);
const SubCategory = require('./SubCategory.js')(db);
const Review = require('./Review.js')(db);
const Store = require('./Store.js')(db);
const StoreAddress = require('./StoreAddress.js')(db);
const Cart = require('./Cart.js')(db)
const Order = require('./Order.js')(db)
const OrderItem = require('./OrderItem.js')(db)

const allModels = {
    Customer,
    CustomerAddress,
    Employee,
    Gov,
    District,
    Brand,
    Product,
    SubCategory,
    Review,
    Category,
    Cart,
    Store,
    StoreAddress,
    Order,
    OrderItem,
};

module.exports = allModels;
