-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 27, 2019 at 08:27 PM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbmonitoreo`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblalterta`
--

CREATE TABLE `tblalterta` (
  `idalerta` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT '2017-07-07 00:00:00',
  `idequipo` int(11) NOT NULL,
  `detalle` varchar(300) COLLATE utf8_spanish_ci NOT NULL,
  `idseveridad` int(11) NOT NULL,
  `vista_por` int(11) NOT NULL DEFAULT 0 COMMENT '0 significa nadie',
  `fecha_vista` datetime NOT NULL DEFAULT '2000-01-01 00:00:00' COMMENT '2000-01-01 significa que aun no hay fecha registrada'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tblequipo`
--

CREATE TABLE `tblequipo` (
  `idequipo` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `serie` varchar(25) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'No definido',
  `ip` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `ipID` varchar(20) COLLATE utf8_spanish_ci NOT NULL DEFAULT '1234' COMMENT 'IP sin puntos',
  `ubicacion` varchar(120) COLLATE utf8_spanish_ci NOT NULL,
  `contacto` varchar(160) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'No definido',
  `telefono` varchar(15) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'No definido',
  `email` varchar(160) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'No definido',
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbllog`
--

CREATE TABLE `tbllog` (
  `idlog` int(11) NOT NULL,
  `idequipo` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT '2017-07-07 00:00:00',
  `idseveridad` int(11) NOT NULL DEFAULT 1,
  `descripcion` varchar(200) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tblseveridad`
--

CREATE TABLE `tblseveridad` (
  `idseveridad` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

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

CREATE TABLE `tblusuario` (
  `idusuario` int(11) NOT NULL,
  `password` varchar(12) COLLATE utf8_spanish_ci NOT NULL,
  `nombre_usuario` varchar(160) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(160) COLLATE utf8_spanish_ci NOT NULL,
  `idPerfil` int(11) NOT NULL DEFAULT 1,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `tblusuario`
--

INSERT INTO `tblusuario` (`idusuario`, `password`, `nombre_usuario`, `email`, `idPerfil`, `fecha_creacion`) VALUES
(1, 'admin', 'GBM SV', 'admin@gbm.net', 1, '2019-06-27 06:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblalterta`
--
ALTER TABLE `tblalterta`
  ADD PRIMARY KEY (`idalerta`),
  ADD KEY `Fk_equipo` (`idequipo`),
  ADD KEY `Fk_severidad` (`idseveridad`);

--
-- Indexes for table `tblequipo`
--
ALTER TABLE `tblequipo`
  ADD PRIMARY KEY (`idequipo`);

--
-- Indexes for table `tbllog`
--
ALTER TABLE `tbllog`
  ADD PRIMARY KEY (`idlog`),
  ADD KEY `Fk_idequipo` (`idequipo`),
  ADD KEY `Fk_idseveridad` (`idseveridad`);

--
-- Indexes for table `tblseveridad`
--
ALTER TABLE `tblseveridad`
  ADD PRIMARY KEY (`idseveridad`);

--
-- Indexes for table `tblusuario`
--
ALTER TABLE `tblusuario`
  ADD PRIMARY KEY (`idusuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblalterta`
--
ALTER TABLE `tblalterta`
  MODIFY `idalerta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblequipo`
--
ALTER TABLE `tblequipo`
  MODIFY `idequipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `tbllog`
--
ALTER TABLE `tbllog`
  MODIFY `idlog` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblseveridad`
--
ALTER TABLE `tblseveridad`
  MODIFY `idseveridad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tblusuario`
--
ALTER TABLE `tblusuario`
  MODIFY `idusuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbllog`
--
ALTER TABLE `tbllog`
  ADD CONSTRAINT `tbllog_ibfk_1` FOREIGN KEY (`idequipo`) REFERENCES `tblequipo` (`idequipo`),
  ADD CONSTRAINT `tbllog_ibfk_2` FOREIGN KEY (`idseveridad`) REFERENCES `tblseveridad` (`idseveridad`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
