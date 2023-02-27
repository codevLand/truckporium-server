require('dotenv').config()

// const { readFileSync } = require('fs')
const env = process.env

const server = {
  env: env.APP_ENV || 'development',
  host: env.APP_HOST || 'localhost',
  port: parseInt(env.NODE_PORT) || 3000,
  root: {
    // join: path.join(__dirname, some, dir),
    // resolve: path.resolve(__dirname, some, dir),
  },
  // no functionality now
  ssl: {
    key: env.SSL_KEY ? readFileSync(env.SSL_KEY) : null,
    cert: env.SSL_CERT ? readFileSync(env.SSL_CERT) : null,
    allowHTTP: true,
  }
}

const db = {
  dialect: 'mysql',
  useSoftDelete: false,
  charset: 'utf8',
  defaultLimit: 10,
  // dbSync options:
  // alter tables to match models {alter: true}
  // drop tables to match models: {force: true}
  // create table if not exists: null
  dbSync: env.APP_ENV === 'development' ? {force: true} : {alter: true},
  pool: {
    max: 10,
    min: 2,
    idle: 180000,
    acquire: 180000
  }
}

// no functionality now
const system = {
  name: env.APP_NAME || env.npm_package_name,
  ver: env.APP_VER || env.npm_package_version,
  decimal: [10,2],
  logHistory: true,
}

const user = {
  session: {
    // days * hr * min * sec
    ttl: 4 * 24 * 60 * 60, // session time to live (ttl) until expiration in 4 days
  },
  email: {
    isUniqueIdentifier: true,
  },
  phone_no: {
    isUniqueIdentifier: true, 
  },
  password: {
    secure: true, // no functionality now
    min: 4,
  },
  // no functionality now
  allowLogin: {
    onUnverified: false,
    onDifferentSessionDevice: false
  },
  // no functionality now
  // 2factor authentication
  use2FA: false
}

// no functionality now
const booking = {
  code: {
    type: "date-series",
    min: 6,
    max: null,
    isRandomized: false,
    resetOn: "every new year"
  }
}

module.exports = {
  server,
  db,
  system,
  user,
  booking
}
