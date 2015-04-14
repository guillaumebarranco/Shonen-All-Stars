-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mar 14 Avril 2015 à 18:47
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `shonen_all_stars`
--

-- --------------------------------------------------------

--
-- Structure de la table `attacks`
--

CREATE TABLE IF NOT EXISTS `attacks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `power` int(11) NOT NULL,
  `requis` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=58 ;

--
-- Contenu de la table `attacks`
--

INSERT INTO `attacks` (`id`, `name`, `power`, `requis`) VALUES
(1, 'Kamehameha', 30, 10),
(2, 'Poing du Dragon', 40, 20),
(3, 'Super Saiyen', 50, 35),
(4, 'Genkidama', 85, 60),
(5, 'Gomu Gomu No Pistol', 20, 5),
(6, 'Gomu Gomu no Bazooka', 40, 15),
(7, 'Gomu Gomu no Jet Gatling', 45, 25),
(8, 'Gomu Gomu no Grizzly Magnum', 70, 45),
(46, 'Coup d''épée', 10, 1),
(47, 'Flèche du Dragon', 25, 10),
(48, 'Le Dragon Ascendant', 40, 15),
(49, 'Le Dragon Divin', 75, 55),
(54, 'Rasengan', 25, 20),
(55, 'Rasenshuriken', 45, 40),
(56, 'Kyubi fusion', 65, 90),
(57, 'Coup de poing', 10, 1);

-- --------------------------------------------------------

--
-- Structure de la table `persos`
--

CREATE TABLE IF NOT EXISTS `persos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `manga_name` varchar(255) DEFAULT NULL,
  `attack_1` varchar(255) DEFAULT NULL,
  `attack_2` varchar(255) DEFAULT NULL,
  `attack_3` varchar(255) DEFAULT NULL,
  `attack_4` varchar(255) DEFAULT NULL,
  `vit` int(11) DEFAULT NULL,
  `atk` int(11) DEFAULT NULL,
  `def` int(11) DEFAULT NULL,
  `atk_spe` int(11) DEFAULT NULL,
  `def_spe` int(11) DEFAULT NULL,
  `img_front` varchar(255) DEFAULT NULL,
  `img_back` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Contenu de la table `persos`
--

INSERT INTO `persos` (`id`, `name`, `manga_name`, `attack_1`, `attack_2`, `attack_3`, `attack_4`, `vit`, `atk`, `def`, `atk_spe`, `def_spe`, `img_front`, `img_back`) VALUES
(1, 'Sangoku', 'Dragon Ball', '1', '2', '3', '4', 70, 70, 60, 85, 65, 'goku_front.png', 'goku_back.png'),
(4, 'Luffy', 'One Piece', '5', '6', '7', '8', 180, 150, 130, 110, 140, 'luffy_front.png', 'luffy_back.png'),
(12, 'Kenshin', 'Kenshin Le Vagabond', '46', '47', '48', '49', 85, 75, 70, 55, 45, 'kenshin_front.png', 'kenshin_back.png'),
(15, 'Naruto', 'Naruto', '54', '55', '56', '57', 55, 55, 50, 70, 65, 'naruto_front.png', 'naruto_back.png');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
