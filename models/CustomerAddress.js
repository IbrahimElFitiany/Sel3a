const { DataTypes } = require("sequelize");

const CustomerAddressModel = (sequelize) => {
  const CustomerAddress = sequelize.define(
    "CustomerAddress",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      customerid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Customer",
          key: "id",
        },
        onDelete: "CASCADE",
        field: "customerid",
      },
      addresslabel: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "addresslabel",
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      govid: {
        type: DataTypes.INTEGER,
        references: {
          model: "govs",
          key: "id",
        },
        onDelete: "CASCADE",
        field: "govid",
      },
      districtid: {
        type: DataTypes.INTEGER,
        references: {
          model: "districts",
          key: "id",
        },
        onDelete: "CASCADE",
        field: "districtid",
      },
    },
    {
      tableName: "customer_address",
      timestamps: false,
      uniqueKeys: {
        unique_customer_address: {
          fields: ["customerid", "addresslabel"],
        },
      },
      hooks: {
        beforeValidate: (address) => {
          if (address.addresslabel) {
            address.addresslabel = address.addresslabel.trim().toLowerCase();
          }
        },
      },
    }
  );

  return CustomerAddress;
};

module.exports = CustomerAddressModel;
