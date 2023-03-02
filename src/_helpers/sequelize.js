const { Sequelize } = require('sequelize')
const settings = require('../../settings')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PSWD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_TYPE,
    logging: false,
    define:
    {
      underscored: false,
      paranoid: settings.system.useSoftDelete,
      freezeTableName: false,
      charset: settings.system.charset,
      timestamps: false,
    },
    pool: settings.db.pool,
    retry: { max: 2 }
  }
)

module.exports = sequelize

const log = require('./winston')
sequelize.authenticate()
  .then(() => { log.info('DB Connected') })
  .then( async(sync) => { return await sequelize.sync(settings.db.dbSync) })
  .then(() => { log.info('Models synced') })
  .catch((err) => { log.error('DB error: ', err) })