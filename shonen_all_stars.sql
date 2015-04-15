-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mer 15 Avril 2015 à 16:52
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
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=78 ;

--
-- Contenu de la table `attacks`
--

INSERT INTO `attacks` (`id`, `name`, `power`, `requis`, `type`) VALUES
(1, 'Kamehameha', 30, 10, 'special'),
(2, 'Poing du Dragon', 40, 20, 'physic'),
(3, 'Super Saiyen', 50, 35, 'special'),
(4, 'Genkidama', 85, 60, 'special'),
(5, 'Gomu Gomu No Pistol', 20, 5, 'physic'),
(6, 'Gomu Gomu no Bazooka', 40, 15, 'physic'),
(7, 'Gomu Gomu no Jet Gatling', 45, 25, 'physic'),
(8, 'Gomu Gomu no Grizzly Magnum', 70, 45, 'physic'),
(46, 'Coup d''épée', 10, 1, 'physic'),
(47, 'Flèche du Dragon', 25, 10, 'physic'),
(48, 'Le Dragon Ascendant', 40, 15, 'physic'),
(49, 'Le Dragon Divin', 75, 55, 'physic'),
(54, 'Rasengan', 25, 20, 'special'),
(55, 'Rasenshuriken', 45, 40, 'special'),
(56, 'Kyubi fusion', 65, 90, 'special'),
(57, 'Coup de poing', 10, 1, 'physic'),
(58, 'Cours Forest !', 10, 1, 'physic'),
(59, 'Devil Bat Ghost', 25, 10, 'physic'),
(60, '4s 20', 40, 50, 'special'),
(61, 'Devil 4D', 65, 70, 'special'),
(62, 'Money And Intelligence', 20, 30, 'special'),
(63, 'Trap', 35, 40, 'special'),
(64, 'PCP', 50, 60, 'special'),
(65, 'Reversi', 80, 95, 'special'),
(66, 'Pêche', 10, 1, 'physic'),
(67, 'Janken, Papier', 30, 20, 'physic'),
(68, 'Janken, Pierre', 50, 65, 'physic'),
(69, 'Transformation cheloue', 70, 95, 'special'),
(70, 'Fourchette', 15, 5, 'physic'),
(71, 'Jambe Couteau', 30, 20, 'physic'),
(72, 'Poingpilon', 55, 60, 'physic'),
(73, 'Itada Kimasu', 75, 90, 'special'),
(74, 'Ugo', 25, 20, 'physic'),
(75, 'Boule de feu', 35, 25, 'special'),
(76, 'Ramz Foudre', 50, 55, 'special'),
(77, 'Volonté de Salomon', 70, 70, 'special');

-- --------------------------------------------------------

--
-- Structure de la table `fights`
--

CREATE TABLE IF NOT EXISTS `fights` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) NOT NULL,
  `ally` varchar(255) NOT NULL,
  `ennemy` varchar(255) NOT NULL,
  `result` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `fights`
--

INSERT INTO `fights` (`id`, `user`, `ally`, `ennemy`, `result`, `created`) VALUES
(1, 'Gear', 'Luffy', 'Kenshin', 'lost', '2015-04-15 14:06:42'),
(2, 'Gear', 'Sangoku', 'Ashirogi', 'win', '2015-04-15 14:07:08'),
(3, 'Gear', 'Sangoku', 'Eyeshield', 'win', '2015-04-15 14:07:22');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=27 ;

--
-- Contenu de la table `persos`
--

INSERT INTO `persos` (`id`, `name`, `manga_name`, `attack_1`, `attack_2`, `attack_3`, `attack_4`, `vit`, `atk`, `def`, `atk_spe`, `def_spe`, `img_front`, `img_back`) VALUES
(1, 'Sangoku', 'Dragon Ball', '1', '2', '3', '4', 70, 70, 60, 85, 65, 'goku_front.png', 'goku_back.png'),
(4, 'Luffy', 'One Piece', '5', '6', '7', '8', 75, 75, 65, 45, 50, 'luffy_front.png', 'luffy_back.png'),
(12, 'Kenshin', 'Kenshin Le Vagabond', '46', '47', '48', '49', 85, 75, 70, 55, 45, 'kenshin_front.png', 'kenshin_back.png'),
(15, 'Naruto', 'Naruto', '54', '55', '56', '57', 55, 55, 50, 70, 65, 'naruto_front.png', 'naruto_back.png'),
(16, 'Eyeshield', 'Eyeshield 21', '58', '59', '60', '61', 95, 55, 40, 40, 40, 'eyeshield_front.png', 'eyeshield_back.png'),
(19, 'Ashirogi', 'Bakuman', '62', '63', '64', '65', 60, 50, 50, 65, 65, 'ashirogi_front.png', 'ashirogi_back.png'),
(22, 'Gon', 'Hunter X Hunter', '66', '67', '68', '69', 50, 70, 60, 55, 50, 'gon_front.png', 'gon_back.png'),
(25, 'Toriko', 'Toriko', '70', '71', '72', '73', 35, 90, 80, 55, 50, 'toriko_front.png', 'toriko_back.png'),
(26, 'Aladdin', 'Magi', '74', '75', '76', '77', 70, 50, 40, 80, 80, 'aladdin_front.png', 'aladdin_back.png');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  `win` int(11) DEFAULT '0',
  `lost` int(11) DEFAULT '0',
  `arcades` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `created`, `win`, `lost`, `arcades`) VALUES
(4, 'Gear', '2015-04-15 10:09:47', 10, 4, 0),
(8, 'playapp', '2015-04-15 10:26:36', 0, 0, 0),
(13, 'koko', '2015-04-15 13:10:17', 0, 0, 0),
(14, 'kiki', '2015-04-15 14:45:32', 0, 0, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
