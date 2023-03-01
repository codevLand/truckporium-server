const argon2 = require('argon2');

const User = require('./user.model');
const settings = require('../../settings').user;
const { getPagination, getPagingData } = require('../_helpers/pagination');

module.exports = { 
  getAll, getById, create, update, delete: _delete, 
  userExist, getByEmail, getByRole
}

async function getById(id) { return await getUser(id) }

async function getAll(params) {
  let { page, result, condition } = params
  const { limit, offset } = await getPagination(page, result)
  const data = await User.findAndCountAll({
    where: condition,
    limit: limit,
    offset: offset })
  return await getPagingData(data, page, limit)
}

async function create(params) {
  if (settings.email.isUniqueIdentifier) {
    const emailExist = userExist({ email: params.email })
    if (await emailExist) throw 'Email already registered'
  }
  if (settings.phone_no.isUniqueIdentifier) {
    const phoneExist = userExist({ phone_no: params.phone_no })
    if (await phoneExist) throw 'Phone number already registered'
  }
  params.password = await argon2.hash(params.password)
  return await User.create(params)
}

async function update(id, tempValue) {
  const oldValue = await getUser(id)

  if (settings.email.isUniqueIdentifier && tempValue.email) {
    const emailChanged = tempValue.email && oldValue.email !== tempValue.email
    const emailExist = await userExist({ email: tempValue.email })
    if (emailChanged && emailExist) throw `Email already registered`
  }

  if (settings.phone_no.isUniqueIdentifier && tempValue.phone_no) {
    const phoneChanged = tempValue.phone_no && oldValue.phone_no !== tempValue.phone_no
    const phoneExist = await userExist({ phone_no: tempValue.phone_no })
    if (phoneChanged && phoneExist) throw `Phone no. already registered`
  }

  if (tempValue.password) await argon2.hash(tempValue.password)
  await User.update( {...tempValue}, { where: { id } } )

  return {old: oldValue, new: tempValue}
}

async function _delete(id) {
  const user = await getUser(id)
  return await user.destroy()
}

// helper functions
async function getUser(id) {
  const user = await User.findByPk(id)
  if (!user) throw 'User not found'
  return user;
}

async function userExist(exists) {
  const user = await User.findOne({ where: exists })
  if (!user | user in ['null','undefined',{},[]]) return false
  return true
}

async function getByEmail(email) {
  const user = await User.findOne({ where: {email:email} })
  if (!user | user in ['null','undefined',{},[]])
    throw 'Wrong email input or email not found'
  return user
}

async function getByRole(role) {
  const user = await User.findOne({ where: {role:role} })
  if (!user | user in ['null','undefined',{},[]])
    throw 'Wrong role or role does not found'
  return user
}