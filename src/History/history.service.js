const History = require('./history.model');
const { getPagination, getPagingData } = require('../_helpers/pagination');

module.exports = { 
  getAll, getById, create, log
}

async function getById(id) { return await getHistory(id) }

async function getAll(params) {
  let { page, result, condition } = params
  const { limit, offset } = await getPagination(page, result)
  const data = await History.findAndCountAll({
    where: condition,
    limit: limit,
    offset: offset })
  return await getPagingData(data, page, limit)
}

async function create(params) {
  return await History.create(params)
}

// helper functions
async function getHistory(id) {
  const history = await History.findByPk(id)
  if (!history) throw 'History not found'
  return history;
}


// helper functions

async function log(method, data, table) {
  const params = {
    actor: 1,
    action: method,
    table: data.table,
    field: data.old ? data.old.field : "id",
    oldValue: data.old ? data.old.value : null,
    newValue: data.old ? data.new.value : data.id,
  }
  create(params)
}
