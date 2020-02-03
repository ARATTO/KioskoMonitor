/*
	LIbreria para definir la IP Estatica y puerto del servidor de monitoreo
	Codificado  e implementado por Jose Luis Olivares, email: joseluiss_503@hotmail.com
	Version 1.0,    Junio 2017
	Actualización: Septiembre 2019
*/



const dbServer={
		host: '127.0.0.1', 
		user:'admin',
		pass:'admin',
		db:'dbmonitoreo',
		port:'3306'
}
//ip del servidor de base de datos, database server IP
module.exports.dbServer=dbServer; 
