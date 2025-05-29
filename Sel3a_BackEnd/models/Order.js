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
      userid: {
        type: DataTypes.INTEGER,
        references: {
          model: "Customer",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      orderdate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      totalamount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "pending",
        validate: {
          isIn: [["pending", "shipped", "delivered", "canceled" , "pick-up"]],
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
