const settings = require('../../settings')

const getPagination = async (page, size) => {
  if (page < 1) throw 'page out of bounds'
  const limit = size ? +size : settings.db.defaultLimit;
  const offset = page ? (page-1) * limit : 0;
  return { limit, offset };
};

const getPagingData = async (db, page, limit) => {
  const { count: count, rows: data } = db;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(count / limit);
  if (totalPages < currentPage) throw 'page out of bounds'
  return { totalPages, currentPage, count, data };
};

module.exports = { getPagination, getPagingData }