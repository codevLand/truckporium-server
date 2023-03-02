const express = require('express')
const router = express.Router()

const controller = require('./history.controller')
// const auth = require('./../../_middlewares/auth')

router.get('/', controller.getAll)
router.get('/:id', controller.getById)

module.exports = router