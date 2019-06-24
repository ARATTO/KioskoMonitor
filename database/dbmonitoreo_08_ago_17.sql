-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 08, 2017 at 05:42 PM
-- Server version: 5.5.55-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `dbmonitoreo`
--
CREATE DATABASE IF NOT EXISTS `dbmonitoreo` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE `dbmonitoreo`;

-- --------------------------------------------------------

--
-- Table structure for table `tblalterta`
--

DROP TABLE IF EXISTS `tblalterta`;
CREATE TABLE IF NOT EXISTS `tblalterta` (
  `idalerta` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL DEFAULT '2017-07-07 00:00:00',
  `idequipo` int(11) NOT NULL,
  `detalle` varchar(300) COLLATE utf8_spanish_ci NOT NULL,
  `idseveridad` int(11) NOT NULL,
  `vista_por` int(11) NOT NULL DEFAULT '0' COMMENT '0 significa nadie',
  `fecha_vista` datetime NOT NULL DEFAULT '2000-01-01 00:00:00' COMMENT '2000-01-01 significa que aun no hay fecha registrada',
  PRIMARY KEY (`idalerta`),
  KEY `Fk_equipo` (`idequipo`),
  KEY `Fk_severidad` (`idseveridad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tblequipo`
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
  `fecha_creacion` datetime NOT NULL DEFAULT '2017-07-07 00:00:00',
  PRIMARY KEY (`idequipo`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=25 ;

--
-- Dumping data for table `tblequipo`
--

INSERT INTO `tblequipo` (`idequipo`, `nombre`, `serie`, `ip`, `ipID`, `ubicacion`, `contacto`, `telefono`, `email`, `fecha_creacion`) VALUES
(1, 'SV17541KV797K', '41AHM13', '10.23.135.136', '1023135136', 'Salvador del Mundo', 'Dinora Delao', '2261-9083', 'dinora.delao@scotiabank.com.sv', '2017-07-13 11:51:20'),
(2, 'SV00241AHL83K', '41AHL83', '10.23.111.133', '1023111133', 'Plaza Merliot', 'Wendy Hernandez', '2204-5506', 'wendy.hernandez@scotiabank.com.sv', '2017-07-13 11:54:04'),
(3, 'Santa Elena', 'No definido', '10.23.101.133', '1023101133', 'Agencia Santa Elena', 'Ileana Montes', '2204-5167', 'ileana.montes@scotiabank.com.sv', '2017-08-08 00:00:00'),
(4, 'SV02541AHL83K', '41AHM04', '10.23.103.136', '1023103136', 'Agencia Roosevelt San Miguel', 'Juana Garay', '2204-5901', 'juana.garay@scotiabank.com.sv', '2017-08-08 00:00:00'),
(5, 'SV00741AHM67K', '41AHL83', '10.23.115.136', '1023115136', 'Agencia Sonsonate', 'Carmen Paredes', '2204-5641', 'carmen.paredes@scotiabank.com.sv', '2017-08-08 00:00:00'),
(6, 'SV02141AHL42K', '41AHL42', '10.23.121.136', '1023121136', '25 Av. Sur San Salvador', 'Sonia Perdomo', '2204-5581', 'sonia.perdomo@scotiabank.com.sv', '2017-08-08 00:00:00'),
(7, 'SV03841AHL61K', '41AHL61', '10.23.127.136', '1023127136', 'Agencia Usulután', 'Iveth Rodriguez', '2204-5817', 'iveth.rodriguez@scotiabank.com.sv', '2017-08-08 00:00:00'),
(8, 'SV01941MK604K', '41MK604', '10.23.131.137', '1023131137', 'Metrosur San Salvador', 'Santiago Deras', '2204-5416', 'santiago.deras@scotiabank.com.sv', '2017-08-08 00:00:00'),
(9, 'SV18441LG624K', '41LG624', '10.23.145.137', '1023145137', 'Metrocentro Santa Ana', 'Claudia Caishpal', '2204-5681', 'claudia.caishpal@scotiabank.com.sv', '2017-08-08 00:00:00'),
(10, 'Santa Ana', '41AHM76', '10.23.157.138', '1023157138', 'Agencia Santa Ana', 'Marco Morales', '2204-5656', 'marco.morales@scotiabank.com.sv', '2017-08-08 00:00:00'),
(11, 'Metro San Salvador', '41MK660', '10.23.179.133', '1023179133', 'Metrocentro San Salvador', 'Ana Arevalo', '2204-5481', 'ana.arevalo@scotiabank.com.sv', '2017-08-08 00:00:00'),
(12, 'Kiosco Cojutepeque', '41AHM67', '10.23.181.136', '1023181136', 'Agencia Cojutepeque', 'Lidia Rosa', '2204-5541', 'lidia.rosa@scotiabank.com.sv', '2017-08-08 00:00:00'),
(13, 'San Miguelito', '41AHL50', '10.23.183.136', '1023183136', 'San Miguelito San Salvador', 'Francisco Lainez', '2204-5584', 'francisco.lainez@scotiabank.com.sv', '2017-08-08 00:00:00'),
(14, 'Kiosco Torre', '41MK528', '10.23.185.133', '1023185133', 'Torre ScotiaBank San Salvador', 'Elba Hernandez', '2204-5474', 'elba.hernandez@scotiabank.com.sv', '2017-08-08 00:00:00'),
(15, 'Plaza Mundo', '41AHM58', '10.23.189.136', '1023189136', 'Plaza Mundo Soyapango', 'Yolanda Marroquín', '2204-5541', 'yolanda.marroquin@scotiabank.com.sv', '2017-08-08 00:00:00'),
(16, 'Kiosco Azaleas', '41KV777', '10.23.197.137', '1023197137', 'Agencia Azaleas San Salvador', 'Wendy Duran', '2524-6714', 'wendy.duran@scotiabank.com.sv', '2017-08-08 00:00:00'),
(17, 'Metro San Miguel', '41KV933', '10.23.199.135', '1023199135', 'Metrocentro San Miguel', 'Idilia Lopez', '2204-5901', 'idialia.lopez@scotiabank.com.sv', '2017-08-08 00:00:00'),
(18, 'Kiosco CEFI', '41KV902', '10.23.227.254', '1023227254', 'Centro Financiero San Salvador', 'Mariaelena Ávalos', '2204-5371', 'mariaelena.avalos@scotiabank.com.sv', '2017-08-08 00:00:00'),
(19, 'Kiosco Constitución', '41MK654', '10.23.53.203', '102353203', 'Agencia Constitución', 'Rosa Franco', '2204-5531', 'rosa.franco@scotiabank.com.sv', '2017-08-08 00:00:00'),
(20, 'Kiosco Las Cascadas', '41LC120', '10.23.65.137', '102365137', 'Agecia Las Cascadas San Salvador', 'Yanira Emestica', '2204-5401', 'yanira.emestica@scotiabank.com.sv', '2017-08-08 00:00:00'),
(21, 'Kiosco La Joya', '41LC148', '10.23.67.137', '102367137', 'Agencia La Joya Carretera al Puerto', 'Sybelle Marroquin', '2204-5516', 'sybelle.marroquin@scotiabank.com.sv', '2017-08-08 00:00:00'),
(22, 'Kiosco Los Próceres', '41AHL62', '10.23.69.136', '102369136', 'Agencia Los Próceres San Salvador', 'Delma Moran', '2204-5167', 'delma.moran@scotiabank.com.sv', '2017-08-08 00:00:00'),
(23, 'Kiosco Masferrer', 'No definido', '10.23.73.137', '102373137', 'Agencia Masferrer', 'Victor Cuadra', '2204-5301', 'victor.cuadra@scotiabank.com.sv', '2017-08-08 00:00:00'),
(24, 'Kiosco San Luis', '41AHL93', '10.23.93.136', '102393136', 'Agencia San Luis', 'Mirna Manzanares', '2204-5581', 'mirna.manzanares@scotiabank.com.sv', '2017-08-08 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbllog`
--

DROP TABLE IF EXISTS `tbllog`;
CREATE TABLE IF NOT EXISTS `tbllog` (
  `idlog` int(11) NOT NULL AUTO_INCREMENT,
  `idequipo` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT '2017-07-07 00:00:00',
  `idseveridad` int(11) NOT NULL DEFAULT '1',
  `descripcion` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idlog`),
  KEY `Fk_idequipo` (`idequipo`),
  KEY `Fk_idseveridad` (`idseveridad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tblseveridad`
--

DROP TABLE IF EXISTS `tblseveridad`;
CREATE TABLE IF NOT EXISTS `tblseveridad` (
  `idseveridad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idseveridad`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=4 ;

--
-- Dumping data for table `tblseveridad`
--

INSERT INTO `tblseveridad` (`idseveridad`, `nombre`) VALUES
(1, 'Ok'),
(2, 'Warning'),
(3, 'Error');

-- --------------------------------------------------------

--
-- Table structure for table `tblusuario`
--

DROP TABLE IF EXISTS `tblusuario`;
CREATE TABLE IF NOT EXISTS `tblusuario` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(12) COLLATE utf8_spanish_ci NOT NULL,
  `nombre_usuario` varchar(160) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(160) COLLATE utf8_spanish_ci NOT NULL,
  `idPerfil` int(11) NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT '2017-07-07 00:00:00',
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbllog`
--
ALTER TABLE `tbllog`
  ADD CONSTRAINT `tbllog_ibfk_1` FOREIGN KEY (`idequipo`) REFERENCES `tblequipo` (`idequipo`),
  ADD CONSTRAINT `tbllog_ibfk_2` FOREIGN KEY (`idseveridad`) REFERENCES `tblseveridad` (`idseveridad`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
