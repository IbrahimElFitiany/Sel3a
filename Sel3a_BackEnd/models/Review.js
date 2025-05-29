const { DataTypes } = require("sequelize");

const ReviewModel = (sequelize) => {
  const Review = sequelize.define(
    "Review",
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
      rating: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      review: {
        type: DataTypes.TEXT,
      },
      review_date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "reviews",
      timestamps: false,
      uniqueKeys: {
        unique_review: {
          fields: ["userID", "productID"],
        },
      },
    }
  );

  return Review;
};

module.exports = ReviewModel;
