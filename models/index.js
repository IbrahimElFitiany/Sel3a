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
const WishList = require('./WishList.js')(db)
const BranchStock = require('./branchStock.js')(db)

Product.hasMany(BranchStock, { foreignKey: 'product_id'});
BranchStock.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

BranchStock.belongsTo(StoreAddress, { foreignKey: 'branch_id'});
StoreAddress.hasMany(BranchStock, { foreignKey: 'branch_id'});


Cart.belongsTo(Product, { foreignKey: 'productid' });
Product.hasMany(Cart, { foreignKey: 'productid' });



Product.belongsTo(SubCategory, { foreignKey: 'subcategoryid'});
SubCategory.hasMany(Product, { foreignKey: 'subcategoryid'});

SubCategory.belongsTo(Category, { foreignKey: 'catid'});
Category.hasMany(SubCategory, { foreignKey: 'catid'});

Product.belongsTo(Brand, { foreignKey: 'brand_id'});
Brand.hasMany(Product, { foreignKey: 'brand_id'});


StoreAddress.belongsTo(Gov, { foreignKey: 'govid' })
StoreAddress.belongsTo(District, { foreignKey: 'districtid' })

Store.hasMany(Product, { foreignKey: 'storeid' });
Product.belongsTo(Store, { foreignKey: 'storeid' });


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
    WishList,
    BranchStock
};


module.exports = allModels;
