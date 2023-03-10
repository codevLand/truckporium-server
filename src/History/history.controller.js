
module.exports = { 
  getAll, getById, create,
}

const historyService = require('./history.service')


async function getAll(req, res) {
  const history = await historyService.getAll(req.query)
  return res.json(history)
}

async function getById(req, res) {
  const history = await historyService.getById(req.params.id)
  return res.json(history)
}

async function find() {
  return // TODO: add req.query to filter search
}

async function create(req, res) {
  const history = await historyService.create(req.body)
  return res.json(resCreate(history))
}
