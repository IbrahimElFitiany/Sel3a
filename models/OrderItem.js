const { DataTypes } = require("sequelize");

const OrderItemModel = (sequelize) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      orderID: {
        type: DataTypes.INTEGER,
        references: {
          model: "orders",
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
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
    },
    {
      tableName: "order_item",
      timestamps: false,
    }
  );

  return OrderItem;
};

module.exports = OrderItemModel;
