const express = require('express')
const router = express.Router()

const tryCatch = require('../_middlewares/errHandler').tryCatch
const controller = require('./user.controller')
// const auth = require('./../../_middlewares/auth')

router.get('/', tryCatch(controller.getAll))
router.get('/:id', tryCatch(controller.getById))
router.post('/', createSchema, tryCatch(controller.create))
router.put('/:id', updateSchema, tryCatch(controller.update))
router.delete('/:id', tryCatch(controller._delete))

module.exports = router


// API payload data validator/checker
const { validateReq } = require('../_middlewares/errHandler')
const Joi = require('joi')

function createSchema(req, res, next) {
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    role: Joi.string().required(),
    email: Joi.string().email().required(),
    phone_no: Joi.string().length(10).required(),
    password: Joi.string().required(),
  });
  validateReq(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({ 
    firstname: Joi.string().empty(''),
    lastname: Joi.string().empty(''),
    role: Joi.string().empty(''),
    email: Joi.string().email().empty(''),
    phone_no: Joi.string().length(10).empty(''),
    password: Joi.string().empty(''),
    isActive: Joi.boolean().empty(''),
  });
  validateReq(req, next, schema);
}