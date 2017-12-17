SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
--
-- Database: `frankies`
--
CREATE DATABASE IF NOT EXISTS `frankies` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
            USE `frankies`;



CREATE TABLE `administracion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `patente` varchar(10) DEFAULT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `foto` varchar(50) DEFAULT NULL,
  `id_empleado_entrada` int(10) unsigned NOT NULL,
  `fecha_ingreso` datetime DEFAULT NULL,
  `id_cochera` int(10) unsigned NOT NULL,
  `id_empleado_salida` int(10) unsigned NOT NULL,
  `fecha_salida` datetime DEFAULT NULL,
  `importe` float unsigned NOT NULL,
  `tiempo` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;


INSERT INTO administracion VALUES
("14","3e","fiat","red","103547.jpg","4","2017-12-14 10:35:47","1","4","2017-12-14 10:54:26","3","0"),
("15","4w","fiat","red","","4","2017-12-14 10:43:26","2","4","2017-12-14 10:55:52","2","0"),
("16","3e","fgdfd","red","111013.jpg","4","2017-12-14 11:10:13","1","4","2017-12-14 11:13:32","0.5","0"),
("17","5tre","chevrolet","orange","112519.jpg","4","2017-12-14 11:25:19","1","0","","0","0");




CREATE TABLE `cocheras` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `piso` int(11) NOT NULL,
  `numero` int(10) unsigned NOT NULL,
  `ocupada` tinyint(3) unsigned NOT NULL,
  `especial` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;


INSERT INTO cocheras VALUES
("1","1","43","1","1"),
("2","2","74","0","0"),
("3","3","89","0","0"),
("4","2","35","0","1"),
("5","3","97","0","1");




CREATE TABLE `empleados` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `apellido` varchar(30) DEFAULT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `clave` varchar(12) DEFAULT NULL,
  `mail` varchar(25) DEFAULT NULL,
  `turno` char(1) DEFAULT NULL,
  `sexo` char(1) DEFAULT NULL,
  `foto` varchar(50) DEFAULT NULL,
  `estado` int(10) unsigned NOT NULL,
  `perfil` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;


INSERT INTO empleados VALUES
("4","Lareu","Fernando","12345","fernando@hotmail.com","M","M","","1","administrador"),
("7","Mendez","Carla","12345","maria@hotmail.com","T","F","104228.jpg","1","empleado"),
("8","Jefferson","Thomas","12345","tomas@hotmail.com","T","M","102915.jpg","0","empleado"),
("9","dsds","dsdsd","12345","julian@hotmail.com","M","M","","1","empleado"),
("10","Lareu","Maria","12345","javvv@hotmail.com","M","M","","1","empleado");




/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;