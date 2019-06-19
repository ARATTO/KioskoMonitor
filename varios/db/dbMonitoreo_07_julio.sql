-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-07-2017 a las 19:00:47
-- Versión del servidor: 5.7.9
-- Versión de PHP: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbmonitoreo`
--
DROP DATABASE `dbmonitoreo`;
CREATE DATABASE IF NOT EXISTS `dbmonitoreo` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE `dbmonitoreo`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblalterta`
--

DROP TABLE IF EXISTS `tblalterta`;
CREATE TABLE IF NOT EXISTS `tblalterta` (
  `idalerta` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idequipo` int(11) NOT NULL,
  `detalle` varchar(300) COLLATE utf8_spanish_ci NOT NULL,
  `idseveridad` int(11) NOT NULL,
  `vista_por` int(11) NOT NULL DEFAULT '0' COMMENT '0 significa nadie',
  `fecha_vista` datetime NOT NULL DEFAULT '2000-01-01 00:00:00' COMMENT '2000-01-01 significa que aun no hay fecha registrada',
  PRIMARY KEY (`idalerta`),
  KEY `Fk_equipo` (`idequipo`),
  KEY `Fk_severidad` (`idseveridad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblequipo`
--

DROP TABLE IF EXISTS `tblequipo`;
CREATE TABLE IF NOT EXISTS `tblequipo` (
  `idequipo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `serie` varchar(25) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'No definido',
  `ip` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `ipID` varchar(20) COLLATE utf8_spanish_ci NOT NULL DEFAULT '1234' COMMENT 'IP sin puntos',
  `ubicacion` varchar(120) COLLATE utf8_spanish_ci NOT NULL,
  `contacto` varchar(160) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'No definido',
  `telefono` varchar(15) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'No definido',
  `email` varchar(160) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'No definido',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idequipo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tblequipo`
--

INSERT INTO `tblequipo` (`idequipo`, `nombre`, `serie`, `ip`, `ipID`, `ubicacion`, `contacto`, `telefono`, `email`, `fecha_creacion`) VALUES
(1, 'kiosko1', 'MJ45XT', '192.168.8.100', '1921688100', 'Agencia 1', 'Carlos Flores', '2667-1452', 'carlos@yahoo.com', '2017-06-26 18:26:20'),
(2, 'kiosko2', '33D23TL', '192.168.12.214', '19216812214', 'Agencia 2', 'Flor Contreras', '2245-7845', 'lopez@loquesea.com', '2017-06-26 18:28:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbllog`
--

DROP TABLE IF EXISTS `tbllog`;
CREATE TABLE IF NOT EXISTS `tbllog` (
  `idlog` int(11) NOT NULL AUTO_INCREMENT,
  `idequipo` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idseveridad` int(11) NOT NULL DEFAULT '1',
  `descripcion` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idlog`),
  KEY `Fk_idequipo` (`idequipo`),
  KEY `Fk_idseveridad` (`idseveridad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblseveridad`
--

DROP TABLE IF EXISTS `tblseveridad`;
CREATE TABLE IF NOT EXISTS `tblseveridad` (
  `idseveridad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idseveridad`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tblseveridad`
--

INSERT INTO `tblseveridad` (`idseveridad`, `nombre`) VALUES
(1, 'Ok'),
(2, 'Warning'),
(3, 'Error');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblusuario`
--

DROP TABLE IF EXISTS `tblusuario`;
CREATE TABLE IF NOT EXISTS `tblusuario` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(12) COLLATE utf8_spanish_ci NOT NULL,
  `nombre_usuario` varchar(160) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(160) COLLATE utf8_spanish_ci NOT NULL,
  `idPerfil` int(11) NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbllog`
--
ALTER TABLE `tbllog`
  ADD CONSTRAINT `tbllog_ibfk_1` FOREIGN KEY (`idequipo`) REFERENCES `tblequipo` (`idequipo`),
  ADD CONSTRAINT `tbllog_ibfk_2` FOREIGN KEY (`idseveridad`) REFERENCES `tblseveridad` (`idseveridad`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
