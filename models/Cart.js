const { DataTypes } = require("sequelize");

const CartModel = (sequelize) => {
  const Cart = sequelize.define(
    "Cart",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userID: {
        type: DataTypes.INTEGER,
        references: {
          model: "Customer",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      productID: {
        type: DataTypes.INTEGER,
        references: {
          model: "product",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      addedDate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "cart",
      timestamps: false,
    }
  );

  return Cart;
};

module.exports = CartModel;
