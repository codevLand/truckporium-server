const express = require('express')
const router = express.Router()

const tryCatch = require('./_middlewares/errHandler').tryCatch

// base path
router.all('/', (req, res) => { res.json({ app: `running` }); })

// users
router.use('/user', tryCatch( require('./User/user.route') ))


module.exports = router