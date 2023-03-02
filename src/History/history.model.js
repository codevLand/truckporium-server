const { DataTypes } = require('sequelize')
const sequelize = require('../_helpers/sequelize')

module.exports = model(sequelize)

function model(sequelize) {

  const name = 'History';

  const attributes = {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true, },
    actor: { type: DataTypes.INTEGER.UNSIGNED },
    action: { type: DataTypes.CHAR(8), },
    table: { type: DataTypes.STRING(46) },
    field: { type: DataTypes.STRING(36) },
    oldValue: { type: DataTypes.CHAR(36) },
    newValue: { type: DataTypes.CHAR(36) },
    loggedAt: { type: DataTypes.DATE, defaultValue: new Date},
  };

  const options = {
    tableName: 'history',
  };

  return sequelize.define(name, attributes, options);
}
