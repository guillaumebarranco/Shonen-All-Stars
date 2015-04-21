-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mar 21 Avril 2015 à 10:49
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
  `anim` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=78 ;

--
-- Contenu de la table `attacks`
--

INSERT INTO `attacks` (`id`, `name`, `power`, `requis`, `type`, `anim`) VALUES
(1, 'Kamehameha', 30, 10, 'special', 'kamehameha'),
(2, 'Poing du Dragon', 40, 20, 'physic', 'physic'),
(3, 'Super Saiyen', 50, 35, 'special', 'saiyan'),
(4, 'Genkidama', 85, 60, 'special', 'genkidama'),
(5, 'Gomu Gomu No Pistol', 20, 5, 'physic', 'physic'),
(6, 'Gomu Gomu no Bazooka', 40, 15, 'physic', 'physic2'),
(7, 'Gomu Gomu no Jet Gatling', 45, 25, 'physic', 'gatling'),
(8, 'Gomu Gomu no Grizzly Magnum', 70, 45, 'physic', 'magnum'),
(46, 'Coup d''épée', 10, 1, 'physic', 'cut'),
(47, 'Flèche du Dragon', 25, 10, 'physic', 'cut'),
(48, 'Le Dragon Ascendant', 40, 15, 'physic', 'cut'),
(49, 'Le Dragon Divin', 75, 55, 'physic', 'ultimate'),
(54, 'Rasengan', 25, 20, 'special', 'rasengan'),
(55, 'Rasenshuriken', 45, 40, 'special', 'rasengan'),
(56, 'Kyubi fusion', 65, 90, 'special', 'ultimate'),
(57, 'Coup de poing', 10, 1, 'physic', 'physic'),
(58, 'Cours Forest !', 10, 1, 'physic', 'physic'),
(59, 'Devil Bat Ghost', 25, 10, 'physic', 'physic'),
(60, '4s 20', 40, 50, 'special', 'physic'),
(61, 'Devil 4D', 65, 70, 'special', 'ultimate'),
(62, 'Money And Intelligence', 20, 30, 'special', 'physic'),
(63, 'Trap', 35, 40, 'special', 'physic'),
(64, 'PCP', 50, 60, 'special', 'physic'),
(65, 'Reversi', 80, 95, 'special', 'ultimate'),
(66, 'Pêche', 10, 1, 'physic', 'cut'),
(67, 'Janken, Papier', 30, 20, 'physic', 'cut'),
(68, 'Janken, Pierre', 50, 65, 'physic', 'physic'),
(69, 'Transformation cheloue', 70, 95, 'special', 'ultimate'),
(70, 'Fourchette', 15, 5, 'physic', 'cut'),
(71, 'Jambe Couteau', 30, 20, 'physic', 'cut'),
(72, 'Poingpilon', 55, 60, 'physic', 'gatling'),
(73, 'Itada Kimasu', 75, 90, 'special', 'ultimate'),
(74, 'Ugo', 25, 20, 'physic', 'physic'),
(75, 'Boule de feu', 35, 25, 'special', 'fireball'),
(76, 'Water magic', 50, 55, 'special', 'bubble'),
(77, 'Volonté de Salomon', 70, 70, 'special', 'ultimate');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=80 ;

--
-- Contenu de la table `fights`
--

INSERT INTO `fights` (`id`, `user`, `ally`, `ennemy`, `result`, `created`) VALUES
(1, 'Gear', 'Luffy', 'Kenshin', 'lost', '2015-04-15 14:06:42'),
(2, 'Gear', 'Sangoku', 'Ashirogi', 'win', '2015-04-15 14:07:08'),
(3, 'Gear', 'Sangoku', 'Eyeshield', 'win', '2015-04-15 14:07:22'),
(4, 'Gear', 'Sangoku', 'Gon', 'win', '2015-04-15 15:47:31'),
(5, 'Gear', 'Sangoku', 'Naruto', 'win', '2015-04-15 15:47:56'),
(6, 'Gear', 'Sangoku', 'Naruto', 'win', '2015-04-15 15:48:47'),
(7, 'Gear', 'Sangoku', 'Kenshin', 'win', '2015-04-15 15:49:38'),
(8, 'Gear', 'Sangoku', 'Kenshin', 'lost', '2015-04-15 15:49:49'),
(9, 'Gear', 'Luffy', 'Kenshin', 'win', '2015-04-15 15:50:07'),
(10, 'Gear', 'Luffy', 'Naruto', 'win', '2015-04-15 15:52:16'),
(11, 'Gear', 'Luffy', 'Luffy', 'lost', '2015-04-15 15:52:24'),
(12, 'Gear', 'Aladdin', 'Luffy', 'lost', '2015-04-15 15:52:43'),
(13, 'Gear', 'Toriko', 'Toriko', 'win', '2015-04-15 15:53:04'),
(14, 'Gear', 'Toriko', 'Ashirogi', 'win', '2015-04-15 15:53:20'),
(15, 'Gear', 'Toriko', 'Naruto', 'win', '2015-04-15 15:53:39'),
(16, 'Gear', 'Toriko', 'Naruto', 'win', '2015-04-15 15:53:55'),
(17, 'Gear', 'Sangoku', 'Eyeshield', 'win', '2015-04-15 15:54:45'),
(18, 'Gear', 'Sangoku', 'Luffy', 'lost', '2015-04-15 15:54:52'),
(19, 'Gear', 'Luffy', 'Ashirogi', 'win', '2015-04-20 08:54:04'),
(20, 'Gear', 'Luffy', 'Toriko', 'win', '2015-04-20 08:54:14'),
(21, 'kolk', 'Luffy', 'Luffy', 'win', '2015-04-20 08:54:50'),
(22, 'Gear', 'Kenshin', 'Ashirogi', 'win', '2015-04-20 10:24:43'),
(23, 'Gear', 'Naruto', 'Aladdin', 'lost', '2015-04-20 10:25:00'),
(24, 'Gear', 'Luffy', 'Toriko', 'win', '2015-04-20 10:25:15'),
(25, 'Gear', 'Naruto', 'Luffy', 'lost', '2015-04-20 10:48:26'),
(26, 'Gear', 'Naruto', 'Luffy', 'lost', '2015-04-20 11:09:21'),
(27, 'Gear', 'Naruto', 'Luffy', 'lost', '2015-04-20 11:10:54'),
(28, 'Gear', 'Naruto', 'Aladdin', 'lost', '2015-04-20 11:13:50'),
(29, 'Gear', 'Naruto', 'Naruto', 'lost', '2015-04-20 11:17:06'),
(30, 'Gear', 'Naruto', 'Luffy', 'lost', '2015-04-20 11:17:55'),
(31, 'Gear', 'Naruto', 'Naruto', 'lost', '2015-04-20 12:38:41'),
(32, 'Gear', 'Naruto', 'Aladdin', 'lost', '2015-04-20 12:39:11'),
(33, 'Gear', 'Naruto', 'Aladdin', 'lost', '2015-04-20 12:40:38'),
(34, 'Gear', 'Naruto', 'Naruto', 'lost', '2015-04-20 12:41:23'),
(35, 'Gear', 'Sangoku', 'Luffy', 'lost', '2015-04-20 12:47:04'),
(36, 'Gear', 'Sangoku', 'Luffy', 'lost', '2015-04-20 12:47:32'),
(37, 'Gear', 'Sangoku', 'Toriko', 'win', '2015-04-20 12:47:38'),
(38, 'Gear', 'Sangoku', 'Aladdin', 'lost', '2015-04-20 13:00:57'),
(39, 'Gear', 'Sangoku', 'Luffy', 'lost', '2015-04-20 13:05:26'),
(40, 'Gear', 'Sangoku', 'Luffy', 'lost', '2015-04-20 13:05:53'),
(41, 'Gear', 'Sangoku', 'Aladdin', 'lost', '2015-04-20 13:07:41'),
(42, 'Gear', 'Sangoku', 'Eyeshield', 'win', '2015-04-20 13:07:57'),
(43, 'Gear', 'Luffy', 'Luffy', 'lost', '2015-04-20 13:18:41'),
(44, 'Gear', 'Luffy', 'Ashirogi', 'win', '2015-04-20 13:29:39'),
(45, 'Gear', 'Luffy', 'Eyeshield', 'win', '2015-04-20 13:33:29'),
(46, 'Gear', 'Luffy', 'Aladdin', 'win', '2015-04-20 13:38:35'),
(47, 'Gear', 'Luffy', 'Aladdin', 'win', '2015-04-20 13:38:45'),
(48, 'Gear', 'Aladdin', 'Luffy', 'lost', '2015-04-20 13:50:28'),
(49, 'Gear', 'Kenshin', 'Naruto', 'win', '2015-04-20 14:34:06'),
(50, 'Gear', 'Kenshin', 'Ashirogi', 'win', '2015-04-20 14:34:56'),
(51, 'Gear', 'Kenshin', 'Luffy', 'win', '2015-04-20 14:37:29'),
(52, 'Gear', 'Kenshin', 'Ashirogi', 'win', '2015-04-20 15:24:55'),
(53, 'Gear', 'Sangoku', 'Ashirogi', 'win', '2015-04-20 15:31:08'),
(54, 'Gear', 'Sangoku', 'Eyeshield', 'win', '2015-04-20 15:31:39'),
(55, 'Gear', 'Sangoku', 'Ashirogi', 'win', '2015-04-20 15:32:25'),
(56, 'Gear', 'Sangoku', 'Toriko', 'win', '2015-04-20 15:32:38'),
(57, 'Gear', 'Sangoku', 'Kenshin', 'win', '2015-04-20 15:32:54'),
(58, 'Gear', 'Luffy', 'Naruto', 'win', '2015-04-20 15:41:47'),
(59, 'Gear', 'Eyeshield', 'Ashirogi', 'win', '2015-04-20 15:47:40'),
(60, 'Gear', 'Eyeshield', 'Luffy', 'lost', '2015-04-20 15:48:06'),
(61, 'Gear', 'Kenshin', 'Eyeshield', 'win', '2015-04-20 15:54:35'),
(62, 'Gear', 'Eyeshield', 'Naruto', 'win', '2015-04-20 15:56:13'),
(63, 'Gear', 'Eyeshield', 'Naruto', 'win', '2015-04-20 15:56:41'),
(64, 'Gear', 'Aladdin', 'Eyeshield', 'win', '2015-04-20 15:58:11'),
(65, 'Gear', 'Aladdin', 'Ashirogi', 'win', '2015-04-20 15:59:19'),
(66, 'Gear', 'Aladdin', 'Aladdin', 'win', '2015-04-20 16:08:14'),
(67, 'Gear', 'Aladdin', 'Kenshin', 'lost', '2015-04-20 16:11:05'),
(68, 'Gear', 'Eyeshield', 'Naruto', 'win', '2015-04-20 16:11:48'),
(69, 'Gear', 'Sangoku', 'Luffy', 'win', '2015-04-20 16:12:08'),
(70, 'Gear', 'Sangoku', 'Kenshin', 'win', '2015-04-20 16:12:27'),
(71, 'Gear', 'Naruto', 'Gon', 'win', '2015-04-20 16:12:53'),
(72, 'Gear', 'Aladdin', 'Eyeshield', 'win', '2015-04-20 16:17:06'),
(73, 'Gear', 'Aladdin', 'Naruto', 'win', '2015-04-20 16:18:16'),
(74, 'Gear', 'Aladdin', 'Naruto', 'win', '2015-04-20 16:18:45'),
(75, 'Gear', 'Aladdin', 'Naruto', 'win', '2015-04-20 16:19:01'),
(76, 'Gear', 'Aladdin', 'Gon', 'win', '2015-04-20 16:27:07'),
(77, 'Gear', 'Sangoku', 'Aladdin', 'lost', '2015-04-21 08:20:06'),
(78, 'Gear', 'Sangoku', 'Aladdin', 'lost', '2015-04-21 08:26:15'),
(79, 'Gear', 'Luffy', 'Kenshin', 'win', '2015-04-21 08:43:43');

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
(26, 'Aladdin', 'Magi', '74', '75', '76', '77', 65, 50, 40, 80, 80, 'aladdin_front.png', 'aladdin_back.png');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  `win` int(11) DEFAULT '0',
  `lost` int(11) DEFAULT '0',
  `arcades` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `password`, `created`, `win`, `lost`, `arcades`) VALUES
(4, 'Gear', '7df4459c049c3ef550317f4bd737df5f', '2015-04-15 10:09:47', 58, 31, 2),
(20, 'test', '05a671c66aefea124cc08b76ea6d30bb', '2015-04-20 10:03:33', 0, 0, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
