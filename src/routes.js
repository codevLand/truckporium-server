const express = require('express')
const router = express.Router()

// base path
router.all('/', (req, res) => { res.json({ app: `running` }); })

// users
router.use('/user', require('./User/user.route'))


module.exports = router