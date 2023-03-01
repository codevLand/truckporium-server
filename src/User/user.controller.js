
module.exports = { 
  getAll, getById, create, update, _delete,
}

const userService = require('./user.service')


async function getAll(req, res, next) {
  try {
    const user = await userService.getAll(req.query)
    return res.json(user)
  } catch (err) { next(err) }
}

async function getById(req, res, next) {
  try {
    const user = await userService.getById(req.params.id)
    return res.json(user)
  } catch (err) { next(err) }
}

async function find() {
  return // TODO: add req.query to filter search
}

async function create(req, res, next) {
  try {
    const user = await userService.create(req.body)
    return res.json( resCreate(user) )
  } catch(err) { next(err) }
}

async function update(req, res, next) {
  try {
    const user = await userService.update(req.params.id,req.body)
    return res.json( resUpdate(user) )
  } 
  catch(err) { next(err) }
}

async function _delete(req, res, next) {
  try {
    await userService.delete(req.params.id)
    res.json( resDelete() )
  } catch(err) { next(err) }
}

// return data response formatter
function resCreate(params) {
  return {
    firstname: params.firstname,
    lastname: params.lastname,
    role: params.role,
    email: params.email,
    phone_no: params.phone_no,
  }
}

function resUpdate(params) {
  return { update: user.new }
}

function resDelete() {
  return { message: `User deleted` }
}
