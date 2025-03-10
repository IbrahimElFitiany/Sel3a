const { DataTypes } = require("sequelize");

const BrandModel = (sequelize) => {
  const Brand = sequelize.define(
    "Brand",
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
      logo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "brand",
      timestamps: false,
    }
  );

  return Brand;
};

module.exports = BrandModel;
