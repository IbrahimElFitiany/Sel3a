const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const EmployeeModel = (sequelize) => {
  const Employee = sequelize.define(
    "Employee",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Ensures a valid email format
        },
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isIn: [["admin", "worker"]], // Only allows 'admin' or 'worker'
        },
      },
      fname: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      lname: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      gender: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        validate: {
          isIn: [["m", "f"]], // Restricts values to 'm' or 'f'
        },
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hire_date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW, // Defaults to the current date
      },
      salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
          min: 0, // Ensures salary is non-negative
        },
      },
    },
    {
      tableName: "employee", // Explicit table name to match your schema
      timestamps: false, // No createdAt/updatedAt fields
    }
  );

  Employee.beforeSave(async (employee) => {
    if (employee.changed("password")) {
      const saltRounds = 10;
      employee.password = await bcrypt.hash(employee.password, saltRounds);
    }
  });

  return Employee;
};

module.exports = EmployeeModel;
