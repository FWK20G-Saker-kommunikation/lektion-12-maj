const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('users.json');
const database = lowdb(adapter);

function getUserById(cookieId) {
  return database.get('accounts').find({ id: cookieId }).value();
}

function checkPassword(credentials) {
  return database.get('accounts')
          .find({ username: credentials.username, password: credentials.password })
          .value();
}

function getUserByRole(role) {
  return database.get('accounts').filter({ role: role }).value();
}

function addCookieId(credentials, cookieId) {
  return database.get('accounts')
          .find({ username: credentials.username })
          .assign({ 'id': cookieId })
          .write();
}

function changePassword(cookieId, pass) {
  return database.get('accounts')
          .find({ id: cookieId })
          .assign({ password: pass })
          .write();
}

function removeUser(cookieId) {
  return database.get('accounts').remove({ id: cookieId }).write();
}

exports.getUserById = getUserById;
exports.checkPassword = checkPassword;
exports.getUserByRole = getUserByRole;
exports.addCookieId = addCookieId;
exports.changePassword = changePassword;
exports.removeUser = removeUser;