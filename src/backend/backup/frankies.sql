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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;


INSERT INTO administracion VALUES
("1","3e","BMW","red","232735.jpg","31","2017-12-06 23:27:35","1","4","2017-12-07 06:26:29","60","6"),
("2","3e","BMW","red","54158.jpg","31","2017-12-07 05:41:58","1","4","2017-12-07 06:26:29","60","6"),
("3","4w","Fiat","red","54212.jpg","31","2017-12-07 05:42:12","2","4","2017-12-07 06:42:56","10","1"),
("4","5t","ford","red","54224.jpg","31","2017-12-07 05:42:24","3","4","2017-12-07 06:44:04","10","1"),
("5","6y","BMW","red","71018.jpeg","4","2017-12-07 07:10:18","1","0","","0","0");




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
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;


INSERT INTO empleados VALUES
("4","Lareu","Fernando","12345","fernando@hotmail.com","m","M","122646.jpg","1","administrador"),
("30","mendez","juanito","12345","juanito@hotmail.com","t","M","71457.jpg","2","empleado"),
("31","Sanchez","Miguel","12345","miguel@hotmail.com","t","M","221702.jpg","1","empleado"),
("49","Sanchez","Leandro","12345","leandro@hotmail.com","M","M","52858.jpg","1","empleado"),
("50","rodriguez","Pedro","12345","pedro@hotmail.com","M","M","81134.jpg","1","empleado");




/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;