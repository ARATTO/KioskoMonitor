var dbIp = require('./public/js/setServerIp.js'); //importando modulo donde esta la ip del servidor de BD

/*
  host     : dbIp.dbServer,
  user     : dbIp.user,
  password : dbIp.pass,
  insecureAuth: true, 
  database : dbIp.db,
  port: dbIp.port
*/

module.exports = {
  host     : dbIp.dbServer,
  user     : dbIp.user,
  password : dbIp.pass,
  insecureAuth: true, 
  database : dbIp.db,
  port: dbIp.port
};