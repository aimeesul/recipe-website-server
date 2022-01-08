const { DataTypes } = require("sequelize")
const measurementUnit = (sequelize) => sequelize.define(
  'measurementUnit',
  {
    unitName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    tableName: 'MeasurementUnits',
  }
);

module.exports.measurementUnit = measurementUnit;
