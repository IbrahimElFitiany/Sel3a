const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const StoreModel = (sequelize) => {
    const Store = sequelize.define("Store", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        store_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
        },
        rating: {
            type: DataTypes.DECIMAL(2, 1),
            defaultValue: 0,
            validate: {
                min: 0,
                max: 5,
            },
        },
        registrationDate: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            field: "registrationdate",
        },
        approved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        tableName: "store",
        timestamps: false, // No createdAt or updatedAt fields
    });

    Store.beforeSave(async (Store) => {
        if (Store.changed("password")) {
            const saltRounds = 10;
            Store.password = await bcrypt.hash(Store.password, saltRounds);
        }
    });


    return Store;
};

module.exports = StoreModel;
