const { DataTypes, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

const CustomerModel = (sequelize) => {
    const Customer = sequelize.define("Customer", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        fname: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        lname: {
          type: DataTypes.STRING(255),
          allowNull: false,
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
            isEmail: true, // Ensures valid email format
          },
        },
        phone: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: true,
        },
        gender: {
          type: DataTypes.CHAR(1),
          allowNull: false,
          validate: {
            isIn: [["m", "f"]],
          },
        },
        birthday: {
          type: DataTypes.DATEONLY,
        },
        registrationDate: {
          type: DataTypes.DATEONLY,
          defaultValue: DataTypes.NOW,
          field: "registrationdate",
        },
      }, {
        tableName: "customer",
        timestamps: false,
      });

    Customer.beforeSave(async (customer) => {
        if (customer.changed("password")) {
            const saltRounds = 10;
            customer.password = await bcrypt.hash(customer.password, saltRounds);
        }
    });

    return Customer;
};

module.exports = CustomerModel;
