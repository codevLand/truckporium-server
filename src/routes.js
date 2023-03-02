const express = require('express')
const router = express.Router()

const tryCatch = require('./_middlewares/errHandler').tryCatch

// base path
router.all('/', (req, res) => { res.json({ app: `running` }); })

// users
router.use('/user', tryCatch( require('./User/user.route') ))

// users
router.use('/history', tryCatch( require('./History/history.route') ))


module.exports = router