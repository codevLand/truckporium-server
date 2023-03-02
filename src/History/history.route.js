const express = require('express')
const router = express.Router()

const tryCatch = require('../_middlewares/errHandler').tryCatch
const controller = require('./history.controller')
// const auth = require('./../../_middlewares/auth')

router.get('/', tryCatch(controller.getAll))
router.get('/:id', tryCatch(controller.getById))

module.exports = router