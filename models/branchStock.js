const { DataTypes } = require("sequelize");

const BranchStock = (sequelize) => {
  const BranchStock = sequelize.define(
    "BranchStock",
    {
      branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
        references: {
          model: "store_address", // assuming the table name is store_address
          key: "id",
        },
        onDelete: "CASCADE",
        field: "branch_id",
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Product", // assuming the table name is Product
          key: "id",
        },
        onDelete: "CASCADE",
        field: "product_id",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "quantity",
      },
    },
    {
      tableName: "branch_stock",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["branch_id", "product_id"],
        },
        
      ]

    }
    
  );


  return BranchStock;
};

module.exports = BranchStock;
