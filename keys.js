var dbIp = require('./public/js/setServerDb.js').dbServer; //importando modulo donde esta la ip del servidor de BD

module.exports = {
  host     : dbIp.host,
  user     : dbIp.user,
  password : dbIp.pass,
  insecureAuth: true, 
  database : dbIp.db,
  port: dbIp.port
};