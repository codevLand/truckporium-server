const express = require('express')
const router = express.Router()

// users
router.all('/', (req, res) => { res.json({ app: `running` }); })


// router.use('/user', require('./User/user.route'))


module.exports = router