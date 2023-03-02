const express = require('express')
const router = express.Router()

// base path
router.all('/', (req, res) => { res.json({ app: `running` }); })

// users
router.use('/user', require('./User/user.route'))

// users
router.use('/history', require('./History/history.route'))


module.exports = router