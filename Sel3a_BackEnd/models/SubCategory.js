const { DataTypes } = require("sequelize");

const SubCategoryModel = (sequelize) => {
  const SubCategory = sequelize.define(
    "SubCategory",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      catID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "category",
          key: "id",
        },
        onDelete: "CASCADE",
        field: "catid"
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "sub_category",
      timestamps: false,
    }
  );

  return SubCategory;
};

module.exports = SubCategoryModel;
