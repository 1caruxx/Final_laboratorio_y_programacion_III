-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-12-2017 a las 14:08:25
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
(1, '3e', 'BMW', 'red', '232735.jpg', 31, '2017-12-06 23:27:35', 1, 4, '2017-12-07 06:26:29', 60, 6),
(2, '3e', 'BMW', 'red', '54158.jpg', 31, '2017-12-07 05:41:58', 1, 4, '2017-12-07 06:26:29', 60, 6),
(3, '4w', 'Fiat', 'red', '54212.jpg', 31, '2017-12-07 05:42:12', 2, 4, '2017-12-07 06:42:56', 10, 1),
(4, '5t', 'ford', 'red', '54224.jpg', 31, '2017-12-07 05:42:24', 3, 4, '2017-12-07 06:44:04', 10, 1),
(5, '6y', 'BMW', 'red', '71018.jpeg', 4, '2017-12-07 07:10:18', 1, 0, NULL, 0, 0),
(6, '5n', 'lamboghini', 'blue', '82912.jpg', 4, '2017-12-07 08:29:12', 2, 4, '2017-12-07 08:30:15', 0, 0);

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
(1, 1, 43, 1, 1),
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
(4, 'Lareu', 'Fernando', '12345', 'fernando@hotmail.com', 'm', 'M', '122646.jpg', 1, 'administrador'),
(30, 'mendez', 'juanito', '12345', 'juanito@hotmail.com', 't', 'M', '71457.jpg', 2, 'empleado'),
(31, 'Sanchez', 'Miguel', '12345', 'miguel@hotmail.com', 't', 'M', '221702.jpg', 1, 'empleado'),
(49, 'Sanchez', 'Leandro', '12345', 'leandro@hotmail.com', 'M', 'M', '52858.jpg', 1, 'empleado'),
(50, 'rodriguez', 'Pedro', '12345', 'pedro@hotmail.com', 'M', 'M', '81134.jpg', 1, 'empleado');

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `cocheras`
--
ALTER TABLE `cocheras`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
