const { DataTypes } = require("sequelize");

const DistrictModel = (sequelize) => {
  const District = sequelize.define(
    "District",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      govID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "govs",
          key: "id",
        },
        onDelete: "CASCADE",
        field: "govid",

      },
    },
    {
      tableName: "districts",
      timestamps: false,
    }
  );

  return District;
};

module.exports = DistrictModel;
