const { DataTypes } = require("sequelize");

const OrderModel = (sequelize) => {
  const Order = sequelize.define(
    "Order",
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
      orderDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      totalAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "pending",
        validate: {
          isIn: [["pending", "shipped", "delivered", "canceled"]],
        },
      },
    },
    {
      tableName: "orders",
      timestamps: false,
    }
  );

  return Order;
};

module.exports = OrderModel;
