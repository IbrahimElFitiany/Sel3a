const { DataTypes } = require("sequelize");

const StoreAddressModel = (sequelize) => {
  const StoreAddress = sequelize.define(
    "StoreAddress",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      storeid: {
        type: DataTypes.INTEGER,
        references: {
          model: "store",
          key: "id",
        },
        onDelete: "CASCADE",
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
      },
      districtid: {
        type: DataTypes.INTEGER,
        references: {
          model: "districts",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "store_address",
      timestamps: false,
    }
  );

  return StoreAddress;
};

module.exports = StoreAddressModel;
