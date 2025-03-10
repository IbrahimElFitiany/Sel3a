const { DataTypes } = require("sequelize");

const GovModel = (sequelize) => {
  const Gov = sequelize.define(
    "Gov",
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
      tableName: "govs",
      timestamps: false,
    }
  );

  return Gov;
};

module.exports = GovModel;
