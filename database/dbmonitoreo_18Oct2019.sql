-- --------------------------------------------------------
-- Host:                         192.168.9.149
-- Versión del servidor:         10.4.6-MariaDB - Source distribution
-- SO del servidor:              Linux
-- HeidiSQL Versión:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para dbmonitoreo
DROP DATABASE IF EXISTS `dbmonitoreo`;
CREATE DATABASE IF NOT EXISTS `dbmonitoreo` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `dbmonitoreo`;

-- Volcando estructura para tabla dbmonitoreo.tblalertas_log
DROP TABLE IF EXISTS `tblalertas_log`;
CREATE TABLE IF NOT EXISTS `tblalertas_log` (
  `idalerta_log` int(11) NOT NULL AUTO_INCREMENT,
  `idequipo` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `descripcion` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idalerta_log`),
  KEY `idequipo` (`idequipo`),
  CONSTRAINT `FK_idequipo` FOREIGN KEY (`idequipo`) REFERENCES `tblequipo` (`idequipo`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla dbmonitoreo.tblalertas_log: ~67 rows (aproximadamente)
DELETE FROM `tblalertas_log`;
/*!40000 ALTER TABLE `tblalertas_log` DISABLE KEYS */;
INSERT INTO `tblalertas_log` (`idalerta_log`, `idequipo`, `fecha`, `descripcion`) VALUES
	(1, 27, '2019-10-07 16:03:37', 'Se perdió conexión con cliente de monitoreo'),
	(2, 27, '2019-10-08 14:06:59', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(3, 27, '2019-10-08 16:27:06', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(4, 27, '2019-10-08 16:56:54', 'Se perdió conexión con cliente de monitoreo'),
	(5, 27, '2019-10-08 17:05:09', 'Se perdió conexión con cliente de monitoreo'),
	(6, 27, '2019-10-08 17:05:40', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(7, 27, '2019-10-08 17:10:01', 'Se perdió conexión con cliente de monitoreo'),
	(8, 27, '2019-10-09 10:07:38', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(9, 27, '2019-10-09 15:48:56', 'Se perdió conexión con cliente de monitoreo'),
	(10, 27, '2019-10-10 09:41:42', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(11, 27, '2019-10-10 10:52:52', 'Se perdió conexión con cliente de monitoreo'),
	(12, 27, '2019-10-10 10:54:25', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(13, 27, '2019-10-11 09:44:59', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(14, 27, '2019-10-11 10:23:18', 'Se perdió conexión con cliente de monitoreo'),
	(15, 27, '2019-10-11 10:24:39', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(17, 27, '2019-10-11 20:40:37', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(18, 27, '2019-10-11 20:46:26', 'Se perdió conexión con cliente de monitoreo'),
	(19, 27, '2019-10-11 20:46:56', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(20, 27, '2019-10-11 20:47:22', 'Se perdió conexión con cliente de monitoreo'),
	(21, 27, '2019-10-11 21:51:47', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(22, 27, '2019-10-11 21:55:18', 'Se perdió conexión con cliente de monitoreo'),
	(23, 27, '2019-10-11 21:56:51', 'Se perdió conexión con cliente de monitoreo'),
	(24, 27, '2019-10-11 22:12:42', 'Se perdió conexión con cliente de monitoreo'),
	(25, 27, '2019-10-11 22:14:34', 'Se perdió conexión con cliente de monitoreo'),
	(26, 27, '2019-10-11 22:14:45', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(27, 27, '2019-10-11 22:15:21', 'Se perdió conexión con cliente de monitoreo'),
	(28, 27, '2019-10-11 22:15:38', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(29, 27, '2019-10-11 22:23:47', 'Se perdió conexión con cliente de monitoreo'),
	(30, 27, '2019-10-11 22:24:29', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(31, 27, '2019-10-11 22:37:37', 'Se perdió conexión con cliente de monitoreo'),
	(32, 27, '2019-10-11 22:44:47', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(33, 27, '2019-10-11 22:46:58', 'Se perdió conexión con cliente de monitoreo'),
	(34, 27, '2019-10-11 22:48:13', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(35, 27, '2019-10-11 22:48:52', 'Se perdió conexión con cliente de monitoreo'),
	(36, 27, '2019-10-11 23:04:01', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(37, 27, '2019-10-11 23:05:06', 'Se perdió conexión con cliente de monitoreo'),
	(38, 27, '2019-10-11 23:05:43', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(39, 27, '2019-10-11 23:05:55', 'Se perdió conexión con cliente de monitoreo'),
	(40, 27, '2019-10-12 09:54:28', 'Se perdió conexión con cliente de monitoreo'),
	(41, 27, '2019-10-12 10:09:00', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(42, 27, '2019-10-12 10:37:32', 'Se perdió conexión con cliente de monitoreo'),
	(43, 27, '2019-10-12 10:38:02', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(44, 27, '2019-10-12 11:10:40', 'Se perdió conexión con cliente de monitoreo'),
	(45, 27, '2019-10-12 11:10:57', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(46, 27, '2019-10-12 11:11:11', 'Se perdió conexión con cliente de monitoreo'),
	(47, 27, '2019-10-12 11:11:29', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(48, 27, '2019-10-12 11:14:49', 'Se perdió conexión con cliente de monitoreo'),
	(49, 27, '2019-10-12 11:15:12', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(50, 27, '2019-10-12 14:26:52', 'Se perdió conexión con cliente de monitoreo'),
	(51, 27, '2019-10-12 14:27:06', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(52, 27, '2019-10-12 15:45:11', 'Se perdió conexión con cliente de monitoreo'),
	(53, 27, '2019-10-12 15:45:43', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(54, 27, '2019-10-14 09:21:13', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(55, 27, '2019-10-14 09:21:53', 'Se perdió conexión con cliente de monitoreo'),
	(56, 27, '2019-10-14 09:28:40', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(57, 32, '2019-10-14 09:44:13', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(58, 32, '2019-10-14 10:07:53', 'Se perdió conexión con cliente de monitoreo'),
	(59, 27, '2019-10-14 10:08:06', 'Se perdió conexión con cliente de monitoreo'),
	(60, 27, '2019-10-14 10:09:40', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(61, 32, '2019-10-14 10:10:05', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(62, 27, '2019-10-14 10:11:56', 'Se perdió conexión con cliente de monitoreo'),
	(63, 27, '2019-10-14 10:12:46', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(64, 32, '2019-10-14 10:12:53', 'Se perdió conexión con cliente de monitoreo'),
	(65, 32, '2019-10-14 10:15:38', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(66, 32, '2019-10-14 11:15:31', 'Se perdió conexión con cliente de monitoreo'),
	(67, 32, '2019-10-14 11:30:18', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(68, 32, '2019-10-14 11:30:26', 'Se perdió conexión con cliente de monitoreo'),
	(69, 32, '2019-10-14 11:30:44', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(70, 32, '2019-10-14 13:54:08', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(71, 27, '2019-10-14 14:31:11', 'Se perdió conexión con cliente de monitoreo'),
	(72, 27, '2019-10-14 15:10:05', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(73, 27, '2019-10-15 14:12:15', 'Printer=Zebra KR203 - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(74, 27, '2019-10-15 17:05:36', 'Printer=Zebra KR203 (Copiar 1) - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Other (Otro) - detectedError=NoPaper (Sin Papel) \n					- extendedDetectedError=undefined'),
	(75, 27, '2019-10-15 17:06:16', 'Printer=Zebra KR203 (Copiar 1) - generalState=Listo - printerStatus=Idle (Sin Utilizar) \n					- extendedPrinterStatus=Unknown (Desconocido) - detectedError=Unknown (Desconocido) \n					- extendedDetectedError=undefined'),
	(76, 27, '2019-10-15 17:06:16', 'Printer=Zebra KR203 (Copiar 1) - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Other (Otro) - detectedError=NoPaper (Sin Papel) \n					- extendedDetectedError=undefined'),
	(77, 27, '2019-10-15 17:06:50', 'Printer=Zebra KR203 (Copiar 1) - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(78, 27, '2019-10-16 10:35:33', 'Printer=Zebra KR203 (Copiar 1) - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(79, 27, '2019-10-16 10:36:03', 'Se perdió conexión con cliente de monitoreo'),
	(80, 27, '2019-10-16 10:37:05', 'Printer=Zebra KR203 (Copiar 1) - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined'),
	(81, 27, '2019-10-16 10:37:14', 'Se perdió conexión con cliente de monitoreo'),
	(82, 27, '2019-10-17 10:59:44', 'Printer=Zebra KR203 (Copiar 1) - generalState=Error - printerStatus=Other (Otro) \n					- extendedPrinterStatus=Offline (Fuera de Linea) - detectedError=Offline (Fuera de Linea) \n					- extendedDetectedError=undefined');
/*!40000 ALTER TABLE `tblalertas_log` ENABLE KEYS */;

-- Volcando estructura para tabla dbmonitoreo.tblequipo
DROP TABLE IF EXISTS `tblequipo`;
CREATE TABLE IF NOT EXISTS `tblequipo` (
  `idequipo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `serie` varchar(25) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'No definido',
  `ip` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `ipID` varchar(20) COLLATE utf8_spanish_ci NOT NULL DEFAULT '19216801' COMMENT 'IP sin puntos',
  `ubicacion` varchar(120) COLLATE utf8_spanish_ci NOT NULL,
  `contacto` varchar(160) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'No definido',
  `telefono` varchar(15) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'No definido',
  `email` varchar(160) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'No definido',
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`idequipo`),
  UNIQUE KEY `ip` (`ip`),
  UNIQUE KEY `ipID` (`ipID`)
) ENGINE=InnoDB AUTO_INCREMENT=289 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla dbmonitoreo.tblequipo: ~11 rows (aproximadamente)
DELETE FROM `tblequipo`;
/*!40000 ALTER TABLE `tblequipo` DISABLE KEYS */;
INSERT INTO `tblequipo` (`idequipo`, `nombre`, `serie`, `ip`, `ipID`, `ubicacion`, `contacto`, `telefono`, `email`, `fecha_creacion`, `estado`) VALUES
	(27, 'Kiosko Zona Franca', '123ABCDEFG', '192.168.9.30', '192168930', 'zona franca', 'Juan Pedro Alvarez', '2222-2222', 'jpedro@alva.com', '2019-08-14 15:59:43', 1),
	(31, 'Kiosco Metrosur', '35KM120', '192.168.9.230', '1921689230', 'Agencia Metrosur, San Salvador', 'Maria Flores', '2240-1289', 'maria@banco.com', '2019-09-18 14:21:18', 1),
	(32, 'Kiosco Agencia Galerias', '45KM290', '192.168.9.190', '1921689190', 'Agencia Galerias San Salvador', 'Karla Quinteros', '2250-1256', 'karla@banco.com', '2019-10-07 15:53:28', 1),
	(33, 'Kiosko San Miguel 1', '1WKM23', '192.168.9.2', '19216892', 'Agencia San Miguel Metro', 'Carlos Robles', '2267-3421', 'user@mail.com', '2019-10-14 14:59:40', 1),
	(34, 'Kiosko Agenica Test 1', '1WKM323', '192.168.9.3', '19216893', 'Agencia Test Center', 'Carlos Robles', '2267-3421', 'user@mail.com', '2019-10-14 15:00:38', 1),
	(35, 'Kiosko Agenica Test 2', '1WKM323', '192.168.9.4', '19216894', 'Agencia Test Center', 'Carlos Robles', '2267-3421', 'user@mail.com', '2019-10-14 15:00:50', 1),
	(36, 'Kiosko Agenica Test 3', '1WKM323', '192.168.9.5', '19216895', 'Agencia Test Center', 'Carlos Robles', '2267-3421', 'user@mail.com', '2019-10-14 15:01:02', 1),
	(280, 'Kiosco Agencia Colón', 'WS1256', '198.168.9.24', '198168924', 'Agencia Colón', 'Mario López', '2234-3211', 'mlopez@mal.com', '2019-10-14 20:05:20', 1),
	(281, 'Kiosco Santa Ana', 'WS1256', '198.168.9.72', '198168972', 'Agencia Santa Ana', 'Mario López', '2234-3211', 'mlopez@mal.com', '2019-10-14 20:05:41', 1),
	(283, 'Kiosko La Unión', 'TT234M01', '192.168.9.21', '192168921', 'Plaza La Unión', 'Thelma Morales', '2630-1256', 'tmorales@mail.com', '2019-10-14 20:13:12', 1);
/*!40000 ALTER TABLE `tblequipo` ENABLE KEYS */;

-- Volcando estructura para tabla dbmonitoreo.tblperfil_usuario
DROP TABLE IF EXISTS `tblperfil_usuario`;
CREATE TABLE IF NOT EXISTS `tblperfil_usuario` (
  `idperfil` int(11) NOT NULL,
  `nombre` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idperfil`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla dbmonitoreo.tblperfil_usuario: ~3 rows (aproximadamente)
DELETE FROM `tblperfil_usuario`;
/*!40000 ALTER TABLE `tblperfil_usuario` DISABLE KEYS */;
INSERT INTO `tblperfil_usuario` (`idperfil`, `nombre`) VALUES
	(1, 'root'),
	(2, 'admin'),
	(3, 'monitoring');
/*!40000 ALTER TABLE `tblperfil_usuario` ENABLE KEYS */;

-- Volcando estructura para tabla dbmonitoreo.tbluser_log
DROP TABLE IF EXISTS `tbluser_log`;
CREATE TABLE IF NOT EXISTS `tbluser_log` (
  `iduser_log` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `descripcion` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`iduser_log`),
  KEY `idusuario` (`idusuario`),
  CONSTRAINT `FK_idusuario` FOREIGN KEY (`idusuario`) REFERENCES `tblusuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla dbmonitoreo.tbluser_log: ~0 rows (aproximadamente)
DELETE FROM `tbluser_log`;
/*!40000 ALTER TABLE `tbluser_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbluser_log` ENABLE KEYS */;

-- Volcando estructura para tabla dbmonitoreo.tblusuario
DROP TABLE IF EXISTS `tblusuario`;
CREATE TABLE IF NOT EXISTS `tblusuario` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(220) COLLATE utf8_spanish_ci NOT NULL,
  `nombre_usuario` varchar(160) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(160) COLLATE utf8_spanish_ci NOT NULL,
  `idPerfil` int(11) NOT NULL DEFAULT 3,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` int(11) NOT NULL DEFAULT 1 COMMENT '0 eliminado, 1 activo, 2 inactivo ',
  PRIMARY KEY (`idusuario`),
  KEY `FK_idPerfil` (`idPerfil`),
  CONSTRAINT `FK_idPerfil` FOREIGN KEY (`idPerfil`) REFERENCES `tblperfil_usuario` (`idperfil`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla dbmonitoreo.tblusuario: ~6 rows (aproximadamente)
DELETE FROM `tblusuario`;
/*!40000 ALTER TABLE `tblusuario` DISABLE KEYS */;
INSERT INTO `tblusuario` (`idusuario`, `password`, `nombre_usuario`, `email`, `idPerfil`, `fecha_creacion`, `estado`) VALUES
	(1, 'c9e41f206e0317a2bf2b8d57af64fb2a6ccdb4719562637f30b2e9ddb0e0155dffgXSNn3mhmaGRsevJuVLQ==', 'GBM SV', 'admin@gbm.net', 1, '2019-06-27 00:00:00', 1),
	(24, '8ee20c125e83903aad76833e5a020fa8d1f5a7c4a4aed59abf2a0ae53f62c6b5WamNJVg/YolGj0s6ThtTKQ==', 'José Luis Olivares', 'jolivares@gbm.net', 2, '2019-08-16 15:15:40', 1),
	(27, 'cf1403d061b8612243864aabbab74189339129f92f2fe2a03459805a6b37a7a8bRPY7tl1peca/d+m5J1ixw==', 'Usuario Test2', 'test2@mail.com', 2, '2019-09-17 18:34:33', 1),
	(28, '4e1015214c5dd4943531cc455e4492c5b5a928b56c3b3a76d2496c59d51add2dWVEQuafrAsVZxr9iyTorBQ==', 'Usuario Test3', 'test3@mail.com', 3, '2019-09-18 15:25:25', 1),
	(29, 'ac281fd7b2265a065c15c9e999a7bd144a54548d8f46f821b481aa0556f4f4f3q+eF9KClEb/wA+2s/DVUVA==', 'Usuario Test4', 'test4@mail.com', 3, '2019-09-19 17:13:47', 0),
	(30, 'a70ce649ce4149633ad7cafbacb71d0ac80973af6c04aff0beb2c5f737332e249GmgyZeY7uFYkYRlwyohgw==', 'Usuario Test5', 'test5@mail.com', 2, '2019-09-20 14:21:10', 2);
/*!40000 ALTER TABLE `tblusuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
