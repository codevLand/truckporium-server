
module.exports = { 
  getAll, getById, create, update, _delete,
}

const userService = require('./user.service')
const historyService = require('../History/history.service')


async function getAll(req, res, next) {
  const user = await userService.getAll(req.query)
  return res.json(user)
}

async function getById(req, res, next) {
  const user = await userService.getById(req.params.id)
  return res.json(user)
}

async function find() {
  return // TODO: add req.query to filter search
}

async function create(req, res, next) {
  const user = await userService.create(req.body)
  await historyService.log(req.method, user)
  return res.json(user)
}

async function update(req, res, next) {
  const user = await userService.update(req.params.id,req.body)
  return res.json(resUpdate(user))
}

async function _delete(req, res, next) {
  await userService.delete(req.params.id)
  res.json(resDelete())
}

// return data response formatter

function resCreate(user) {
  return {
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
    email: user.email,
    phone_no: user.phone_no,
  }
}

function resUpdate(user) { return user.new }

function resDelete() { return { message: `User deleted` } }
