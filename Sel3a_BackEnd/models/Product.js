const { DataTypes } = require("sequelize");

const ProductModel = (sequelize) => {
    const Product = sequelize.define("Product", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        storeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "store",
                key: "id",
            },
            field: "storeid",
            onDelete: "CASCADE",
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT,
        },
        description: {
            type: DataTypes.TEXT,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0,
            },
        },
        stockQty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
            },
            field: "stockqty"
        },
        subCategoryID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "sub_category",
                key: "id",
            },
            onDelete: "CASCADE",
            field: "subcategoryid"
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "brand",
                key: "id",
            },
            onDelete: "CASCADE",
            field: "brand_id",
        },
        rating: {
            type: DataTypes.DECIMAL(2, 1),
            defaultValue: 0,
            validate: {
                min: 0,
                max: 5,
            },
        },
    }, {
        tableName: "product",
        timestamps: false,
    });
    return Product;
};

module.exports = ProductModel;
