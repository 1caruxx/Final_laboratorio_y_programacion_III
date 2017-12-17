-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-12-2017 a las 00:10:24
-- Versión del servidor: 10.1.25-MariaDB
-- Versión de PHP: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `frankies`
--
CREATE DATABASE IF NOT EXISTS `frankies` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `frankies`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administracion`
--

CREATE TABLE `administracion` (
  `id` int(10) UNSIGNED NOT NULL,
  `patente` varchar(10) DEFAULT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `foto` varchar(50) DEFAULT NULL,
  `id_empleado_entrada` int(10) UNSIGNED NOT NULL,
  `fecha_ingreso` datetime DEFAULT NULL,
  `id_cochera` int(10) UNSIGNED NOT NULL,
  `id_empleado_salida` int(10) UNSIGNED NOT NULL,
  `fecha_salida` datetime DEFAULT NULL,
  `importe` float UNSIGNED NOT NULL,
  `tiempo` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `administracion`
--

INSERT INTO `administracion` (`id`, `patente`, `marca`, `color`, `foto`, `id_empleado_entrada`, `fecha_ingreso`, `id_cochera`, `id_empleado_salida`, `fecha_salida`, `importe`, `tiempo`) VALUES
(14, '3e', 'fiat', 'red', '103547.jpg', 4, '2017-12-14 10:35:47', 1, 4, '2017-12-14 10:54:26', 3, 0),
(15, '4w', 'fiat', 'red', NULL, 4, '2017-12-14 10:43:26', 2, 4, '2017-12-14 10:55:52', 2, 0),
(16, '3e', 'fgdfd', 'red', '111013.jpg', 4, '2017-12-14 11:10:13', 1, 4, '2017-12-14 11:13:32', 0.5, 0),
(17, '5tre', 'chevrolet', 'orange', '112519.jpg', 4, '2017-12-14 11:25:19', 1, 4, '2017-12-14 20:26:33', 90.17, 9),
(18, 'wedf', 'chevrolet', 'purple', NULL, 4, '2017-12-14 22:40:03', 1, 4, '2017-12-16 11:08:38', 94.67, 12),
(19, 're3w', 'mercedes', 'green', NULL, 4, '2017-12-14 22:41:26', 2, 4, '2017-12-16 11:08:41', 94.5, 12),
(20, '67ygh', 'ford', 'yellow', NULL, 4, '2017-12-14 22:43:09', 3, 4, '2017-12-16 11:08:43', 94.17, 12),
(21, '57yf5r', 'renault', 'beige', NULL, 4, '2017-12-14 23:02:02', 4, 4, '2017-12-16 11:08:45', 91, 12),
(22, '7yt54r', 'mercedes', 'yellow', NULL, 4, '2017-12-14 23:02:57', 5, 4, '2017-12-16 11:08:47', 90.83, 12),
(23, '3e', 'renault', 'orange', NULL, 10, '2017-12-17 10:29:47', 1, 9, '2017-12-17 13:37:35', 31.17, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cocheras`
--

CREATE TABLE `cocheras` (
  `id` int(10) UNSIGNED NOT NULL,
  `piso` int(11) NOT NULL,
  `numero` int(10) UNSIGNED NOT NULL,
  `ocupada` tinyint(3) UNSIGNED NOT NULL,
  `especial` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cocheras`
--

INSERT INTO `cocheras` (`id`, `piso`, `numero`, `ocupada`, `especial`) VALUES
(1, 1, 43, 0, 1),
(2, 2, 74, 0, 0),
(3, 3, 89, 0, 0),
(4, 2, 35, 0, 1),
(5, 3, 97, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(10) UNSIGNED NOT NULL,
  `apellido` varchar(30) DEFAULT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `clave` varchar(12) DEFAULT NULL,
  `mail` varchar(25) DEFAULT NULL,
  `turno` char(1) DEFAULT NULL,
  `sexo` char(1) DEFAULT NULL,
  `foto` varchar(50) DEFAULT NULL,
  `estado` int(10) UNSIGNED NOT NULL,
  `perfil` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `apellido`, `nombre`, `clave`, `mail`, `turno`, `sexo`, `foto`, `estado`, `perfil`) VALUES
(4, 'Lareu', 'Fernando', '12345', 'fernando@hotmail.com', 'M', 'M', NULL, 1, 'administrador'),
(7, 'Mendez', 'Carla', '12345', 'maria@hotmail.com', 'T', 'F', '104228.jpg', 1, 'empleado'),
(8, 'Jefferson', 'Thomas', '12345', 'tomas@hotmail.com', 'T', 'M', '102915.jpg', 0, 'empleado'),
(9, 'dsds', 'dsdsd', '12345', 'julian@hotmail.com', 'M', 'M', NULL, 1, 'empleado'),
(10, 'Lareu', 'Maria', '12345', 'javvv@hotmail.com', 'M', 'M', NULL, 1, 'empleado');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administracion`
--
ALTER TABLE `administracion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cocheras`
--
ALTER TABLE `cocheras`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administracion`
--
ALTER TABLE `administracion`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT de la tabla `cocheras`
--
ALTER TABLE `cocheras`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
