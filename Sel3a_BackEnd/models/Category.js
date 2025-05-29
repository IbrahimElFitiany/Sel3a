const { DataTypes } = require("sequelize");

const CategoryModel = (sequelize) => {
  const Category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "category",
      timestamps: false,
    }
  );

  return Category;
};

module.exports = CategoryModel;
