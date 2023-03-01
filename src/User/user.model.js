const { DataTypes } = require('sequelize')
const sequelize = require('../_helpers/sequelize')

module.exports = model(sequelize)

function model(sequelize) {

  const name = 'User';

  const attributes = {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true, },
    role: { type: DataTypes.CHAR(24) },
    email: { type: DataTypes.STRING(46), },
    password: { type: DataTypes.STRING(100) },
    firstname: { type: DataTypes.CHAR(36) },
    middlename: { type: DataTypes.CHAR(36) },
    lastname: { type: DataTypes.CHAR(36) },
    phone_no: { type: DataTypes.CHAR(10) },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: false },
  };

  const options = {
    tableName: 'users',
  };

  return sequelize.define(name, attributes, options);
}
