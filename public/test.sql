-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 06, 2018 at 02:42 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`` PROCEDURE `AddGeometryColumn` (`catalog` VARCHAR(64), `t_schema` VARCHAR(64), `t_name` VARCHAR(64), `geometry_column` VARCHAR(64), `t_srid` INT)  begin
  set @qwe= concat('ALTER TABLE ', t_schema, '.', t_name, ' ADD ', geometry_column,' GEOMETRY REF_SYSTEM_ID=', t_srid); PREPARE ls from @qwe; execute ls; deallocate prepare ls; end$$

CREATE DEFINER=`` PROCEDURE `DropGeometryColumn` (`catalog` VARCHAR(64), `t_schema` VARCHAR(64), `t_name` VARCHAR(64), `geometry_column` VARCHAR(64))  begin
  set @qwe= concat('ALTER TABLE ', t_schema, '.', t_name, ' DROP ', geometry_column); PREPARE ls from @qwe; execute ls; deallocate prepare ls; end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `category` varchar(256) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `name`, `category`, `description`) VALUES
(1, 'PHP', 'IT', 'Book description'),
(2, 'C#', 'IT', 'Book desc');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `status` tinyint(5) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`, `status`) VALUES
(1, 'HR', 1),
(2, 'IT-ENGG', 1),
(3, 'IT-Support', 1),
(4, 'MIS', 1),
(5, 'DB', 1);

-- --------------------------------------------------------

--
-- Table structure for table `gender`
--

CREATE TABLE `gender` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `gender` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gender`
--

INSERT INTO `gender` (`id`, `name`, `gender`) VALUES
(5, 'C', 'M'),
(6, 'D', 'M'),
(7, 'A', 'M'),
(8, 'B', 'M');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `offices`
--

CREATE TABLE `offices` (
  `officeCode` varchar(10) NOT NULL,
  `city` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `addressLine1` varchar(50) NOT NULL,
  `addressLine2` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `postalCode` varchar(15) NOT NULL,
  `territory` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `offices`
--

INSERT INTO `offices` (`officeCode`, `city`, `phone`, `addressLine1`, `addressLine2`, `state`, `country`, `postalCode`, `territory`) VALUES
('1', 'San Francisco', '+1 650 219 4782', '100 Market Street', 'Suite 300', 'CA', 'USA', '94080', 'NA'),
('2', 'Boston', '+1 215 837 0825', '1550 Court Place', 'Suite 102', 'MA', 'USA', '02107', 'NA'),
('3', 'NYC', '+1 212 555 3000', '523 East 53rd Street', 'apt. 5A', 'NY', 'USA', '10022', 'NA'),
('4', 'Paris', '+33 14 723 4404', '43 Rue Jouffroy D\'abbans', NULL, NULL, 'France', '75017', 'EMEA'),
('5', 'Tokyo', '+81 33 224 5000', '4-1 Kioicho', NULL, 'Chiyoda-Ku', 'Japan', '102-8578', 'Japan'),
('6', 'Sydney', '+61 2 9264 2451', '5-11 Wentworth Avenue', 'Floor #2', NULL, 'Australia', 'NSW 2010', 'APAC'),
('7', 'London', '+44 20 7877 2041', '25 Old Broad Street', 'Level 7', NULL, 'UK', 'EC2N 1HN', 'EMEA');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `customerNumber` int(11) NOT NULL,
  `checkNumber` varchar(50) NOT NULL,
  `paymentDate` date NOT NULL,
  `amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`customerNumber`, `checkNumber`, `paymentDate`, `amount`) VALUES
(103, 'HQ336336', '2004-10-19', '6066.78'),
(103, 'JM555205', '2003-06-05', '14571.44'),
(103, 'OM314933', '2004-12-18', '1676.14'),
(112, 'BO864823', '2004-12-17', '14191.12'),
(112, 'HQ55022', '2003-06-06', '32641.98'),
(112, 'ND748579', '2004-08-20', '33347.88'),
(114, 'GG31455', '2003-05-20', '45864.03'),
(114, 'MA765515', '2004-12-15', '82261.22'),
(114, 'NP603840', '2003-05-31', '7565.08'),
(114, 'NR27552', '2004-03-10', '44894.74'),
(119, 'DB933704', '2004-11-14', '19501.82'),
(119, 'LN373447', '2004-08-08', '47924.19'),
(119, 'NG94694', '2005-02-22', '49523.67'),
(121, 'DB889831', '2003-02-16', '50218.95'),
(121, 'FD317790', '2003-10-28', '1491.38'),
(121, 'KI831359', '2004-11-04', '17876.32'),
(121, 'MA302151', '2004-11-28', '34638.14'),
(124, 'AE215433', '2005-03-05', '101244.59'),
(124, 'BG255406', '2004-08-28', '85410.87'),
(124, 'CQ287967', '2003-04-11', '11044.30'),
(124, 'ET64396', '2005-04-16', '83598.04'),
(124, 'HI366474', '2004-12-27', '47142.70'),
(124, 'HR86578', '2004-11-02', '55639.66'),
(124, 'KI131716', '2003-08-15', '111654.40'),
(124, 'LF217299', '2004-03-26', '43369.30'),
(124, 'NT141748', '2003-11-25', '45084.38'),
(128, 'DI925118', '2003-01-28', '10549.01'),
(128, 'FA465482', '2003-10-18', '24101.81'),
(128, 'FH668230', '2004-03-24', '33820.62'),
(128, 'IP383901', '2004-11-18', '7466.32'),
(129, 'DM826140', '2004-12-08', '26248.78'),
(129, 'ID449593', '2003-12-11', '23923.93'),
(129, 'PI42991', '2003-04-09', '16537.85'),
(131, 'CL442705', '2003-03-12', '22292.62'),
(131, 'MA724562', '2004-12-02', '50025.35'),
(131, 'NB445135', '2004-09-11', '35321.97'),
(141, 'AU364101', '2003-07-19', '36251.03'),
(141, 'DB583216', '2004-11-01', '36140.38'),
(141, 'DL460618', '2005-05-19', '46895.48'),
(141, 'HJ32686', '2004-01-30', '59830.55'),
(141, 'ID10962', '2004-12-31', '116208.40'),
(141, 'IN446258', '2005-03-25', '65071.26'),
(141, 'JE105477', '2005-03-18', '120166.58'),
(141, 'JN355280', '2003-10-26', '49539.37'),
(141, 'JN722010', '2003-02-25', '40206.20'),
(141, 'KT52578', '2003-12-09', '63843.55'),
(141, 'MC46946', '2004-07-09', '35420.74'),
(141, 'MF629602', '2004-08-16', '20009.53'),
(141, 'NU627706', '2004-05-17', '26155.91'),
(144, 'IR846303', '2004-12-12', '36005.71'),
(144, 'LA685678', '2003-04-09', '7674.94'),
(145, 'CN328545', '2004-07-03', '4710.73'),
(145, 'ED39322', '2004-04-26', '28211.70'),
(145, 'HR182688', '2004-12-01', '20564.86'),
(145, 'JJ246391', '2003-02-20', '53959.21'),
(146, 'FP549817', '2004-03-18', '40978.53'),
(146, 'FU793410', '2004-01-16', '49614.72'),
(146, 'LJ160635', '2003-12-10', '39712.10'),
(148, 'BI507030', '2003-04-22', '44380.15'),
(148, 'DD635282', '2004-08-11', '2611.84'),
(148, 'KM172879', '2003-12-26', '105743.00'),
(148, 'ME497970', '2005-03-27', '3516.04'),
(151, 'BF686658', '2003-12-22', '58793.53'),
(151, 'GB852215', '2004-07-26', '20314.44'),
(151, 'IP568906', '2003-06-18', '58841.35'),
(151, 'KI884577', '2004-12-14', '39964.63'),
(157, 'HI618861', '2004-11-19', '35152.12'),
(157, 'NN711988', '2004-09-07', '63357.13'),
(161, 'BR352384', '2004-11-14', '2434.25'),
(161, 'BR478494', '2003-11-18', '50743.65'),
(161, 'KG644125', '2005-02-02', '12692.19'),
(161, 'NI908214', '2003-08-05', '38675.13'),
(166, 'BQ327613', '2004-09-16', '38785.48'),
(166, 'DC979307', '2004-07-07', '44160.92'),
(166, 'LA318629', '2004-02-28', '22474.17'),
(167, 'ED743615', '2004-09-19', '12538.01'),
(167, 'GN228846', '2003-12-03', '85024.46'),
(171, 'GB878038', '2004-03-15', '18997.89'),
(171, 'IL104425', '2003-11-22', '42783.81'),
(172, 'AD832091', '2004-09-09', '1960.80'),
(172, 'CE51751', '2004-12-04', '51209.58'),
(172, 'EH208589', '2003-04-20', '33383.14'),
(173, 'GP545698', '2004-05-13', '11843.45'),
(173, 'IG462397', '2004-03-29', '20355.24'),
(175, 'CITI3434344', '2005-05-19', '28500.78'),
(175, 'IO448913', '2003-11-19', '24879.08'),
(175, 'PI15215', '2004-07-10', '42044.77'),
(177, 'AU750837', '2004-04-17', '15183.63'),
(177, 'CI381435', '2004-01-19', '47177.59'),
(181, 'CM564612', '2004-04-25', '22602.36'),
(181, 'GQ132144', '2003-01-30', '5494.78'),
(181, 'OH367219', '2004-11-16', '44400.50'),
(186, 'AE192287', '2005-03-10', '23602.90'),
(186, 'AK412714', '2003-10-27', '37602.48'),
(186, 'KA602407', '2004-10-21', '34341.08'),
(187, 'AM968797', '2004-11-03', '52825.29'),
(187, 'BQ39062', '2004-12-08', '47159.11'),
(187, 'KL124726', '2003-03-27', '48425.69'),
(189, 'BO711618', '2004-10-03', '17359.53'),
(189, 'NM916675', '2004-03-01', '32538.74'),
(198, 'FI192930', '2004-12-06', '9658.74'),
(198, 'HQ920205', '2003-07-06', '6036.96'),
(198, 'IS946883', '2004-09-21', '5858.56'),
(201, 'DP677013', '2003-10-20', '23908.24'),
(201, 'OO846801', '2004-06-15', '37258.94'),
(202, 'HI358554', '2003-12-18', '36527.61'),
(202, 'IQ627690', '2004-11-08', '33594.58'),
(204, 'GC697638', '2004-08-13', '51152.86'),
(204, 'IS150005', '2004-09-24', '4424.40'),
(205, 'GL756480', '2003-12-04', '3879.96'),
(205, 'LL562733', '2003-09-05', '50342.74'),
(205, 'NM739638', '2005-02-06', '39580.60'),
(209, 'BOAF82044', '2005-05-03', '35157.75'),
(209, 'ED520529', '2004-06-21', '4632.31'),
(209, 'PH785937', '2004-05-04', '36069.26'),
(211, 'BJ535230', '2003-12-09', '45480.79'),
(216, 'BG407567', '2003-05-09', '3101.40'),
(216, 'ML780814', '2004-12-06', '24945.21'),
(216, 'MM342086', '2003-12-14', '40473.86'),
(219, 'BN17870', '2005-03-02', '3452.75'),
(219, 'BR941480', '2003-10-18', '4465.85'),
(227, 'MQ413968', '2003-10-31', '36164.46'),
(227, 'NU21326', '2004-11-02', '53745.34'),
(233, 'BOFA23232', '2005-05-20', '29070.38'),
(233, 'II180006', '2004-07-01', '22997.45'),
(233, 'JG981190', '2003-11-18', '16909.84'),
(239, 'NQ865547', '2004-03-15', '80375.24'),
(240, 'IF245157', '2004-11-16', '46788.14'),
(240, 'JO719695', '2004-03-28', '24995.61'),
(242, 'AF40894', '2003-11-22', '33818.34'),
(242, 'HR224331', '2005-06-03', '12432.32'),
(242, 'KI744716', '2003-07-21', '14232.70'),
(249, 'IJ399820', '2004-09-19', '33924.24'),
(249, 'NE404084', '2004-09-04', '48298.99'),
(250, 'EQ12267', '2005-05-17', '17928.09'),
(250, 'HD284647', '2004-12-30', '26311.63'),
(250, 'HN114306', '2003-07-18', '23419.47'),
(256, 'EP227123', '2004-02-10', '5759.42'),
(256, 'HE84936', '2004-10-22', '53116.99'),
(259, 'EU280955', '2004-11-06', '61234.67'),
(259, 'GB361972', '2003-12-07', '27988.47'),
(260, 'IO164641', '2004-08-30', '37527.58'),
(260, 'NH776924', '2004-04-24', '29284.42'),
(276, 'EM979878', '2005-02-09', '27083.78'),
(276, 'KM841847', '2003-11-13', '38547.19'),
(276, 'LE432182', '2003-09-28', '41554.73'),
(276, 'OJ819725', '2005-04-30', '29848.52'),
(278, 'BJ483870', '2004-12-05', '37654.09'),
(278, 'GP636783', '2003-03-02', '52151.81'),
(278, 'NI983021', '2003-11-24', '37723.79'),
(282, 'IA793562', '2003-08-03', '24013.52'),
(282, 'JT819493', '2004-08-02', '35806.73'),
(282, 'OD327378', '2005-01-03', '31835.36'),
(286, 'DR578578', '2004-10-28', '47411.33'),
(286, 'KH910279', '2004-09-05', '43134.04'),
(298, 'AJ574927', '2004-03-13', '47375.92'),
(298, 'LF501133', '2004-09-18', '61402.00'),
(299, 'AD304085', '2003-10-24', '36798.88'),
(299, 'NR157385', '2004-09-05', '32260.16'),
(311, 'DG336041', '2005-02-15', '46770.52'),
(311, 'FA728475', '2003-10-06', '32723.04'),
(311, 'NQ966143', '2004-04-25', '16212.59'),
(314, 'LQ244073', '2004-08-09', '45352.47'),
(314, 'MD809704', '2004-03-03', '16901.38'),
(319, 'HL685576', '2004-11-06', '42339.76'),
(319, 'OM548174', '2003-12-07', '36092.40'),
(320, 'GJ597719', '2005-01-18', '8307.28'),
(320, 'HO576374', '2003-08-20', '41016.75'),
(320, 'MU817160', '2003-11-24', '52548.49'),
(321, 'DJ15149', '2003-11-03', '85559.12'),
(321, 'LA556321', '2005-03-15', '46781.66'),
(323, 'AL493079', '2005-05-23', '75020.13'),
(323, 'ES347491', '2004-06-24', '37281.36'),
(323, 'HG738664', '2003-07-05', '2880.00'),
(323, 'PQ803830', '2004-12-24', '39440.59'),
(324, 'DQ409197', '2004-12-13', '13671.82'),
(324, 'FP443161', '2003-07-07', '29429.14'),
(324, 'HB150714', '2003-11-23', '37455.77'),
(328, 'EN930356', '2004-04-16', '7178.66'),
(328, 'NR631421', '2004-05-30', '31102.85'),
(333, 'HL209210', '2003-11-15', '23936.53');

-- --------------------------------------------------------

--
-- Table structure for table `productlines`
--

CREATE TABLE `productlines` (
  `productLine` varchar(50) NOT NULL,
  `textDescription` varchar(4000) DEFAULT NULL,
  `htmlDescription` mediumtext,
  `image` mediumblob
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `productlines`
--

INSERT INTO `productlines` (`productLine`, `textDescription`, `htmlDescription`, `image`) VALUES
('Classic Cars', 'Attention car enthusiasts: Make your wildest car ownership dreams come true. Whether you are looking for classic muscle cars, dream sports cars or movie-inspired miniatures, you will find great choices in this category. These replicas feature superb attention to detail and craftsmanship and offer features such as working steering system, opening forward compartment, opening rear trunk with removable spare wheel, 4-wheel independent spring suspension, and so on. The models range in size from 1:10 to 1:24 scale and include numerous limited edition and several out-of-production vehicles. All models include a certificate of authenticity from their manufacturers and come fully assembled and ready for display in the home or office.', NULL, NULL),
('Motorcycles', 'Our motorcycles are state of the art replicas of classic as well as contemporary motorcycle legends such as Harley Davidson, Ducati and Vespa. Models contain stunning details such as official logos, rotating wheels, working kickstand, front suspension, gear-shift lever, footbrake lever, and drive chain. Materials used include diecast and plastic. The models range in size from 1:10 to 1:50 scale and include numerous limited edition and several out-of-production vehicles. All models come fully assembled and ready for display in the home or office. Most include a certificate of authenticity.', NULL, NULL),
('Planes', 'Unique, diecast airplane and helicopter replicas suitable for collections, as well as home, office or classroom decorations. Models contain stunning details such as official logos and insignias, rotating jet engines and propellers, retractable wheels, and so on. Most come fully assembled and with a certificate of authenticity from their manufacturers.', NULL, NULL),
('Ships', 'The perfect holiday or anniversary gift for executives, clients, friends, and family. These handcrafted model ships are unique, stunning works of art that will be treasured for generations! They come fully assembled and ready for display in the home or office. We guarantee the highest quality, and best value.', NULL, NULL),
('Trains', 'Model trains are a rewarding hobby for enthusiasts of all ages. Whether you\'re looking for collectible wooden trains, electric streetcars or locomotives, you\'ll find a number of great choices for any budget within this category. The interactive aspect of trains makes toy trains perfect for young children. The wooden train sets are ideal for children under the age of 5.', NULL, NULL),
('Trucks and Buses', 'The Truck and Bus models are realistic replicas of buses and specialized trucks produced from the early 1920s to present. The models range in size from 1:12 to 1:50 scale and include numerous limited edition and several out-of-production vehicles. Materials used include tin, diecast and plastic. All models include a certificate of authenticity from their manufacturers and are a perfect ornament for the home and office.', NULL, NULL),
('Vintage Cars', 'Our Vintage Car models realistically portray automobiles produced from the early 1900s through the 1940s. Materials used include Bakelite, diecast, plastic and wood. Most of the replicas are in the 1:18 and 1:24 scale sizes, which provide the optimum in detail and accuracy. Prices range from $30.00 up to $180.00 for some special limited edition replicas. All models include a certificate of authenticity from their manufacturers and come fully assembled and ready for display in the home or office.', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productCode` varchar(15) NOT NULL,
  `productName` varchar(70) NOT NULL,
  `productLine` varchar(50) NOT NULL,
  `productScale` varchar(10) NOT NULL,
  `productVendor` varchar(50) NOT NULL,
  `productDescription` text NOT NULL,
  `quantityInStock` smallint(6) NOT NULL,
  `buyPrice` decimal(10,2) NOT NULL,
  `MSRP` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productCode`, `productName`, `productLine`, `productScale`, `productVendor`, `productDescription`, `quantityInStock`, `buyPrice`, `MSRP`) VALUES
('S10_1678', '1969 Harley Davidson Ultimate Chopper', 'Motorcycles', '1:10', 'Min Lin Diecast', 'This replica features working kickstand, front suspension, gear-shift lever, footbrake lever, drive chain, wheels and steering. All parts are particularly delicate due to their precise scale and require special care and attention.', 7933, '48.81', '95.70'),
('S10_1949', '1952 Alpine Renault 1300', 'Classic Cars', '1:10', 'Classic Metal Creations', 'Turnable front wheels; steering function; detailed interior; detailed engine; opening hood; opening trunk; opening doors; and detailed chassis.', 7305, '98.58', '214.30'),
('S10_2016', '1996 Moto Guzzi 1100i', 'Motorcycles', '1:10', 'Highway 66 Mini Classics', 'Official Moto Guzzi logos and insignias, saddle bags located on side of motorcycle, detailed engine, working steering, working suspension, two leather seats, luggage rack, dual exhaust pipes, small saddle bag located on handle bars, two-tone paint with chrome accents, superior die-cast detail , rotating wheels , working kick stand, diecast metal with plastic parts and baked enamel finish.', 6625, '68.99', '118.94'),
('S10_4698', '2003 Harley-Davidson Eagle Drag Bike', 'Motorcycles', '1:10', 'Red Start Diecast', 'Model features, official Harley Davidson logos and insignias, detachable rear wheelie bar, heavy diecast metal with resin parts, authentic multi-color tampo-printed graphics, separate engine drive belts, free-turning front fork, rotating tires and rear racing slick, certificate of authenticity, detailed engine, display stand\r\n, precision diecast replica, baked enamel finish, 1:10 scale model, removable fender, seat and tank cover piece for displaying the superior detail of the v-twin engine', 5582, '91.02', '193.66'),
('S10_4757', '1972 Alfa Romeo GTA', 'Classic Cars', '1:10', 'Motor City Art Classics', 'Features include: Turnable front wheels; steering function; detailed interior; detailed engine; opening hood; opening trunk; opening doors; and detailed chassis.', 3252, '85.68', '136.00'),
('S10_4962', '1962 LanciaA Delta 16V', 'Classic Cars', '1:10', 'Second Gear Diecast', 'Features include: Turnable front wheels; steering function; detailed interior; detailed engine; opening hood; opening trunk; opening doors; and detailed chassis.', 6791, '103.42', '147.74'),
('S12_1099', '1968 Ford Mustang', 'Classic Cars', '1:12', 'Autoart Studio Design', 'Hood, doors and trunk all open to reveal highly detailed interior features. Steering wheel actually turns the front wheels. Color dark green.', 68, '95.34', '194.57'),
('S12_1108', '2001 Ferrari Enzo', 'Classic Cars', '1:12', 'Second Gear Diecast', 'Turnable front wheels; steering function; detailed interior; detailed engine; opening hood; opening trunk; opening doors; and detailed chassis.', 3619, '95.59', '207.80'),
('S12_1666', '1958 Setra Bus', 'Trucks and Buses', '1:12', 'Welly Diecast Productions', 'Model features 30 windows, skylights & glare resistant glass, working steering system, original logos', 1579, '77.90', '136.67'),
('S12_2823', '2002 Suzuki XREO', 'Motorcycles', '1:12', 'Unimax Art Galleries', 'Official logos and insignias, saddle bags located on side of motorcycle, detailed engine, working steering, working suspension, two leather seats, luggage rack, dual exhaust pipes, small saddle bag located on handle bars, two-tone paint with chrome accents, superior die-cast detail , rotating wheels , working kick stand, diecast metal with plastic parts and baked enamel finish.', 9997, '66.27', '150.62'),
('S12_3148', '1969 Corvair Monza', 'Classic Cars', '1:18', 'Welly Diecast Productions', '1:18 scale die-cast about 10\" long doors open, hood opens, trunk opens and wheels roll', 6906, '89.14', '151.08'),
('S12_3380', '1968 Dodge Charger', 'Classic Cars', '1:12', 'Welly Diecast Productions', '1:12 scale model of a 1968 Dodge Charger. Hood, doors and trunk all open to reveal highly detailed interior features. Steering wheel actually turns the front wheels. Color black', 9123, '75.16', '117.44'),
('S12_3891', '1969 Ford Falcon', 'Classic Cars', '1:12', 'Second Gear Diecast', 'Turnable front wheels; steering function; detailed interior; detailed engine; opening hood; opening trunk; opening doors; and detailed chassis.', 1049, '83.05', '173.02'),
('S12_3990', '1970 Plymouth Hemi Cuda', 'Classic Cars', '1:12', 'Studio M Art Models', 'Very detailed 1970 Plymouth Cuda model in 1:12 scale. The Cuda is generally accepted as one of the fastest original muscle cars from the 1970s. This model is a reproduction of one of the orginal 652 cars built in 1970. Red color.', 5663, '31.92', '79.80'),
('S12_4473', '1957 Chevy Pickup', 'Trucks and Buses', '1:12', 'Exoto Designs', '1:12 scale die-cast about 20\" long Hood opens, Rubber wheels', 6125, '55.70', '118.50'),
('S12_4675', '1969 Dodge Charger', 'Classic Cars', '1:12', 'Welly Diecast Productions', 'Detailed model of the 1969 Dodge Charger. This model includes finely detailed interior and exterior features. Painted in red and white.', 7323, '58.73', '115.16'),
('S18_1097', '1940 Ford Pickup Truck', 'Trucks and Buses', '1:18', 'Studio M Art Models', 'This model features soft rubber tires, working steering, rubber mud guards, authentic Ford logos, detailed undercarriage, opening doors and hood,  removable split rear gate, full size spare mounted in bed, detailed interior with opening glove box', 2613, '58.33', '116.67'),
('S18_1129', '1993 Mazda RX-7', 'Classic Cars', '1:18', 'Highway 66 Mini Classics', 'This model features, opening hood, opening doors, detailed engine, rear spoiler, opening trunk, working steering, tinted windows, baked enamel finish. Color red.', 3975, '83.51', '141.54'),
('S18_1342', '1937 Lincoln Berline', 'Vintage Cars', '1:18', 'Motor City Art Classics', 'Features opening engine cover, doors, trunk, and fuel filler cap. Color black', 8693, '60.62', '102.74'),
('S18_1367', '1936 Mercedes-Benz 500K Special Roadster', 'Vintage Cars', '1:18', 'Studio M Art Models', 'This 1:18 scale replica is constructed of heavy die-cast metal and has all the features of the original: working doors and rumble seat, independent spring suspension, detailed interior, working steering system, and a bifold hood that reveals an engine so accurate that it even includes the wiring. All this is topped off with a baked enamel finish. Color white.', 8635, '24.26', '53.91'),
('S18_1589', '1965 Aston Martin DB5', 'Classic Cars', '1:18', 'Classic Metal Creations', 'Die-cast model of the silver 1965 Aston Martin DB5 in silver. This model includes full wire wheels and doors that open with fully detailed passenger compartment. In 1:18 scale, this model measures approximately 10 inches/20 cm long.', 9042, '65.96', '124.44'),
('S18_1662', '1980s Black Hawk Helicopter', 'Planes', '1:18', 'Red Start Diecast', '1:18 scale replica of actual Army\'s UH-60L BLACK HAWK Helicopter. 100% hand-assembled. Features rotating rotor blades, propeller blades and rubber wheels.', 5330, '77.27', '157.69'),
('S18_1749', '1917 Grand Touring Sedan', 'Vintage Cars', '1:18', 'Welly Diecast Productions', 'This 1:18 scale replica of the 1917 Grand Touring car has all the features you would expect from museum quality reproductions: all four doors and bi-fold hood opening, detailed engine and instrument panel, chrome-look trim, and tufted upholstery, all topped off with a factory baked-enamel finish.', 2724, '86.70', '170.00'),
('S18_1889', '1948 Porsche 356-A Roadster', 'Classic Cars', '1:18', 'Gearbox Collectibles', 'This precision die-cast replica features opening doors, superb detail and craftsmanship, working steering system, opening forward compartment, opening rear trunk with removable spare, 4 wheel independent spring suspension as well as factory baked enamel finish.', 8826, '53.90', '77.00'),
('S18_1984', '1995 Honda Civic', 'Classic Cars', '1:18', 'Min Lin Diecast', 'This model features, opening hood, opening doors, detailed engine, rear spoiler, opening trunk, working steering, tinted windows, baked enamel finish. Color yellow.', 9772, '93.89', '142.25'),
('S18_2238', '1998 Chrysler Plymouth Prowler', 'Classic Cars', '1:18', 'Gearbox Collectibles', 'Turnable front wheels; steering function; detailed interior; detailed engine; opening hood; opening trunk; opening doors; and detailed chassis.', 4724, '101.51', '163.73'),
('S18_2248', '1911 Ford Town Car', 'Vintage Cars', '1:18', 'Motor City Art Classics', 'Features opening hood, opening doors, opening trunk, wide white wall tires, front door arm rests, working steering system.', 540, '33.30', '60.54'),
('S18_2319', '1964 Mercedes Tour Bus', 'Trucks and Buses', '1:18', 'Unimax Art Galleries', 'Exact replica. 100+ parts. working steering system, original logos', 8258, '74.86', '122.73'),
('S18_2325', '1932 Model A Ford J-Coupe', 'Vintage Cars', '1:18', 'Autoart Studio Design', 'This model features grille-mounted chrome horn, lift-up louvered hood, fold-down rumble seat, working steering system, chrome-covered spare, opening doors, detailed and wired engine', 9354, '58.48', '127.13'),
('S18_2432', '1926 Ford Fire Engine', 'Trucks and Buses', '1:18', 'Carousel DieCast Legends', 'Gleaming red handsome appearance. Everything is here the fire hoses, ladder, axes, bells, lanterns, ready to fight any inferno.', 2018, '24.92', '60.77'),
('S18_2581', 'P-51-D Mustang', 'Planes', '1:72', 'Gearbox Collectibles', 'Has retractable wheels and comes with a stand', 992, '49.00', '84.48'),
('S18_2625', '1936 Harley Davidson El Knucklehead', 'Motorcycles', '1:18', 'Welly Diecast Productions', 'Intricately detailed with chrome accents and trim, official die-struck logos and baked enamel finish.', 4357, '24.23', '60.57'),
('S18_2795', '1928 Mercedes-Benz SSK', 'Vintage Cars', '1:18', 'Gearbox Collectibles', 'This 1:18 replica features grille-mounted chrome horn, lift-up louvered hood, fold-down rumble seat, working steering system, chrome-covered spare, opening doors, detailed and wired engine. Color black.', 548, '72.56', '168.75'),
('S18_2870', '1999 Indy 500 Monte Carlo SS', 'Classic Cars', '1:18', 'Red Start Diecast', 'Features include opening and closing doors. Color: Red', 8164, '56.76', '132.00'),
('S18_2949', '1913 Ford Model T Speedster', 'Vintage Cars', '1:18', 'Carousel DieCast Legends', 'This 250 part reproduction includes moving handbrakes, clutch, throttle and foot pedals, squeezable horn, detailed wired engine, removable water, gas, and oil cans, pivoting monocle windshield, all topped with a baked enamel red finish. Each replica comes with an Owners Title and Certificate of Authenticity. Color red.', 4189, '60.78', '101.31'),
('S18_2957', '1934 Ford V8 Coupe', 'Vintage Cars', '1:18', 'Min Lin Diecast', 'Chrome Trim, Chrome Grille, Opening Hood, Opening Doors, Opening Trunk, Detailed Engine, Working Steering System', 5649, '34.35', '62.46'),
('S18_3029', '1999 Yamaha Speed Boat', 'Ships', '1:18', 'Min Lin Diecast', 'Exact replica. Wood and Metal. Many extras including rigging, long boats, pilot house, anchors, etc. Comes with three masts, all square-rigged.', 4259, '51.61', '86.02'),
('S18_3136', '18th Century Vintage Horse Carriage', 'Vintage Cars', '1:18', 'Red Start Diecast', 'Hand crafted diecast-like metal horse carriage is re-created in about 1:18 scale of antique horse carriage. This antique style metal Stagecoach is all hand-assembled with many different parts.\r\n\r\nThis collectible metal horse carriage is painted in classic Red, and features turning steering wheel and is entirely hand-finished.', 5992, '60.74', '104.72'),
('S18_3140', '1903 Ford Model A', 'Vintage Cars', '1:18', 'Unimax Art Galleries', 'Features opening trunk,  working steering system', 3913, '68.30', '136.59'),
('S18_3232', '1992 Ferrari 360 Spider red', 'Classic Cars', '1:18', 'Unimax Art Galleries', 'his replica features opening doors, superb detail and craftsmanship, working steering system, opening forward compartment, opening rear trunk with removable spare, 4 wheel independent spring suspension as well as factory baked enamel finish.', 8347, '77.90', '169.34'),
('S18_3233', '1985 Toyota Supra', 'Classic Cars', '1:18', 'Highway 66 Mini Classics', 'This model features soft rubber tires, working steering, rubber mud guards, authentic Ford logos, detailed undercarriage, opening doors and hood, removable split rear gate, full size spare mounted in bed, detailed interior with opening glove box', 7733, '57.01', '107.57'),
('S18_3259', 'Collectable Wooden Train', 'Trains', '1:18', 'Carousel DieCast Legends', 'Hand crafted wooden toy train set is in about 1:18 scale, 25 inches in total length including 2 additional carts, of actual vintage train. This antique style wooden toy train model set is all hand-assembled with 100% wood.', 6450, '67.56', '100.84'),
('S18_3278', '1969 Dodge Super Bee', 'Classic Cars', '1:18', 'Min Lin Diecast', 'This replica features opening doors, superb detail and craftsmanship, working steering system, opening forward compartment, opening rear trunk with removable spare, 4 wheel independent spring suspension as well as factory baked enamel finish.', 1917, '49.05', '80.41'),
('S18_3320', '1917 Maxwell Touring Car', 'Vintage Cars', '1:18', 'Exoto Designs', 'Features Gold Trim, Full Size Spare Tire, Chrome Trim, Chrome Grille, Opening Hood, Opening Doors, Opening Trunk, Detailed Engine, Working Steering System', 7913, '57.54', '99.21'),
('S18_3482', '1976 Ford Gran Torino', 'Classic Cars', '1:18', 'Gearbox Collectibles', 'Highly detailed 1976 Ford Gran Torino \"Starsky and Hutch\" diecast model. Very well constructed and painted in red and white patterns.', 9127, '73.49', '146.99'),
('S18_3685', '1948 Porsche Type 356 Roadster', 'Classic Cars', '1:18', 'Gearbox Collectibles', 'This model features working front and rear suspension on accurately replicated and actuating shock absorbers as well as opening engine cover, rear stabilizer flap,  and 4 opening doors.', 8990, '62.16', '141.28'),
('S18_3782', '1957 Vespa GS150', 'Motorcycles', '1:18', 'Studio M Art Models', 'Features rotating wheels , working kick stand. Comes with stand.', 7689, '32.95', '62.17'),
('S18_3856', '1941 Chevrolet Special Deluxe Cabriolet', 'Vintage Cars', '1:18', 'Exoto Designs', 'Features opening hood, opening doors, opening trunk, wide white wall tires, front door arm rests, working steering system, leather upholstery. Color black.', 2378, '64.58', '105.87'),
('S18_4027', '1970 Triumph Spitfire', 'Classic Cars', '1:18', 'Min Lin Diecast', 'Features include opening and closing doors. Color: White.', 5545, '91.92', '143.62'),
('S18_4409', '1932 Alfa Romeo 8C2300 Spider Sport', 'Vintage Cars', '1:18', 'Exoto Designs', 'This 1:18 scale precision die cast replica features the 6 front headlights of the original, plus a detailed version of the 142 horsepower straight 8 engine, dual spares and their famous comprehensive dashboard. Color black.', 6553, '43.26', '92.03'),
('S18_4522', '1904 Buick Runabout', 'Vintage Cars', '1:18', 'Exoto Designs', 'Features opening trunk,  working steering system', 8290, '52.66', '87.77'),
('S18_4600', '1940s Ford truck', 'Trucks and Buses', '1:18', 'Motor City Art Classics', 'This 1940s Ford Pick-Up truck is re-created in 1:18 scale of original 1940s Ford truck. This antique style metal 1940s Ford Flatbed truck is all hand-assembled. This collectible 1940\'s Pick-Up truck is painted in classic dark green color, and features rotating wheels.', 3128, '84.76', '121.08'),
('S18_4668', '1939 Cadillac Limousine', 'Vintage Cars', '1:18', 'Studio M Art Models', 'Features completely detailed interior including Velvet flocked drapes,deluxe wood grain floor, and a wood grain casket with seperate chrome handles', 6645, '23.14', '50.31'),
('S18_4721', '1957 Corvette Convertible', 'Classic Cars', '1:18', 'Classic Metal Creations', '1957 die cast Corvette Convertible in Roman Red with white sides and whitewall tires. 1:18 scale quality die-cast with detailed engine and underbvody. Now you can own The Classic Corvette.', 1249, '69.93', '148.80'),
('S18_4933', '1957 Ford Thunderbird', 'Classic Cars', '1:18', 'Studio M Art Models', 'This 1:18 scale precision die-cast replica, with its optional porthole hardtop and factory baked-enamel Thunderbird Bronze finish, is a 100% accurate rendition of this American classic.', 3209, '34.21', '71.27'),
('S24_1046', '1970 Chevy Chevelle SS 454', 'Classic Cars', '1:24', 'Unimax Art Galleries', 'This model features rotating wheels, working streering system and opening doors. All parts are particularly delicate due to their precise scale and require special care and attention. It should not be picked up by the doors, roof, hood or trunk.', 1005, '49.24', '73.49'),
('S24_1444', '1970 Dodge Coronet', 'Classic Cars', '1:24', 'Highway 66 Mini Classics', '1:24 scale die-cast about 18\" long doors open, hood opens and rubber wheels', 4074, '32.37', '57.80'),
('S24_1578', '1997 BMW R 1100 S', 'Motorcycles', '1:24', 'Autoart Studio Design', 'Detailed scale replica with working suspension and constructed from over 70 parts', 7003, '60.86', '112.70'),
('S24_1628', '1966 Shelby Cobra 427 S/C', 'Classic Cars', '1:24', 'Carousel DieCast Legends', 'This diecast model of the 1966 Shelby Cobra 427 S/C includes many authentic details and operating parts. The 1:24 scale model of this iconic lighweight sports car from the 1960s comes in silver and it\'s own display case.', 8197, '29.18', '50.31'),
('S24_1785', '1928 British Royal Navy Airplane', 'Planes', '1:24', 'Classic Metal Creations', 'Official logos and insignias', 3627, '66.74', '109.42'),
('S24_1937', '1939 Chevrolet Deluxe Coupe', 'Vintage Cars', '1:24', 'Motor City Art Classics', 'This 1:24 scale die-cast replica of the 1939 Chevrolet Deluxe Coupe has the same classy look as the original. Features opening trunk, hood and doors and a showroom quality baked enamel finish.', 7332, '22.57', '33.19'),
('S24_2000', '1960 BSA Gold Star DBD34', 'Motorcycles', '1:24', 'Highway 66 Mini Classics', 'Detailed scale replica with working suspension and constructed from over 70 parts', 15, '37.32', '76.17'),
('S24_2011', '18th century schooner', 'Ships', '1:24', 'Carousel DieCast Legends', 'All wood with canvas sails. Many extras including rigging, long boats, pilot house, anchors, etc. Comes with 4 masts, all square-rigged.', 1898, '82.34', '122.89'),
('S24_2022', '1938 Cadillac V-16 Presidential Limousine', 'Vintage Cars', '1:24', 'Classic Metal Creations', 'This 1:24 scale precision die cast replica of the 1938 Cadillac V-16 Presidential Limousine has all the details of the original, from the flags on the front to an opening back seat compartment complete with telephone and rifle. Features factory baked-enamel black finish, hood goddess ornament, working jump seats.', 2847, '20.61', '44.80'),
('S24_2300', '1962 Volkswagen Microbus', 'Trucks and Buses', '1:24', 'Autoart Studio Design', 'This 1:18 scale die cast replica of the 1962 Microbus is loaded with features: A working steering system, opening front doors and tailgate, and famous two-tone factory baked enamel finish, are all topped of by the sliding, real fabric, sunroof.', 2327, '61.34', '127.79'),
('S24_2360', '1982 Ducati 900 Monster', 'Motorcycles', '1:24', 'Highway 66 Mini Classics', 'Features two-tone paint with chrome accents, superior die-cast detail , rotating wheels , working kick stand', 6840, '47.10', '69.26'),
('S24_2766', '1949 Jaguar XK 120', 'Classic Cars', '1:24', 'Classic Metal Creations', 'Precision-engineered from original Jaguar specification in perfect scale ratio. Features opening doors, superb detail and craftsmanship, working steering system, opening forward compartment, opening rear trunk with removable spare, 4 wheel independent spring suspension as well as factory baked enamel finish.', 2350, '47.25', '90.87'),
('S24_2840', '1958 Chevy Corvette Limited Edition', 'Classic Cars', '1:24', 'Carousel DieCast Legends', 'The operating parts of this 1958 Chevy Corvette Limited Edition are particularly delicate due to their precise scale and require special care and attention. Features rotating wheels, working streering, opening doors and trunk. Color dark green.', 2542, '15.91', '35.36'),
('S24_2841', '1900s Vintage Bi-Plane', 'Planes', '1:24', 'Autoart Studio Design', 'Hand crafted diecast-like metal bi-plane is re-created in about 1:24 scale of antique pioneer airplane. All hand-assembled with many different parts. Hand-painted in classic yellow and features correct markings of original airplane.', 5942, '34.25', '68.51'),
('S24_2887', '1952 Citroen-15CV', 'Classic Cars', '1:24', 'Exoto Designs', 'Precision crafted hand-assembled 1:18 scale reproduction of the 1952 15CV, with its independent spring suspension, working steering system, opening doors and hood, detailed engine and instrument panel, all topped of with a factory fresh baked enamel finish.', 1452, '72.82', '117.44'),
('S24_2972', '1982 Lamborghini Diablo', 'Classic Cars', '1:24', 'Second Gear Diecast', 'This replica features opening doors, superb detail and craftsmanship, working steering system, opening forward compartment, opening rear trunk with removable spare, 4 wheel independent spring suspension as well as factory baked enamel finish.', 7723, '16.24', '37.76'),
('S24_3151', '1912 Ford Model T Delivery Wagon', 'Vintage Cars', '1:24', 'Min Lin Diecast', 'This model features chrome trim and grille, opening hood, opening doors, opening trunk, detailed engine, working steering system. Color white.', 9173, '46.91', '88.51'),
('S24_3191', '1969 Chevrolet Camaro Z28', 'Classic Cars', '1:24', 'Exoto Designs', '1969 Z/28 Chevy Camaro 1:24 scale replica. The operating parts of this limited edition 1:24 scale diecast model car 1969 Chevy Camaro Z28- hood, trunk, wheels, streering, suspension and doors- are particularly delicate due to their precise scale and require special care and attention.', 4695, '50.51', '85.61'),
('S24_3371', '1971 Alpine Renault 1600s', 'Classic Cars', '1:24', 'Welly Diecast Productions', 'This 1971 Alpine Renault 1600s replica Features opening doors, superb detail and craftsmanship, working steering system, opening forward compartment, opening rear trunk with removable spare, 4 wheel independent spring suspension as well as factory baked enamel finish.', 7995, '38.58', '61.23'),
('S24_3420', '1937 Horch 930V Limousine', 'Vintage Cars', '1:24', 'Autoart Studio Design', 'Features opening hood, opening doors, opening trunk, wide white wall tires, front door arm rests, working steering system', 2902, '26.30', '65.75'),
('S24_3432', '2002 Chevy Corvette', 'Classic Cars', '1:24', 'Gearbox Collectibles', 'The operating parts of this limited edition Diecast 2002 Chevy Corvette 50th Anniversary Pace car Limited Edition are particularly delicate due to their precise scale and require special care and attention. Features rotating wheels, poseable streering, opening doors and trunk.', 9446, '62.11', '107.08'),
('S24_3816', '1940 Ford Delivery Sedan', 'Vintage Cars', '1:24', 'Carousel DieCast Legends', 'Chrome Trim, Chrome Grille, Opening Hood, Opening Doors, Opening Trunk, Detailed Engine, Working Steering System. Color black.', 6621, '48.64', '83.86'),
('S24_3856', '1956 Porsche 356A Coupe', 'Classic Cars', '1:18', 'Classic Metal Creations', 'Features include: Turnable front wheels; steering function; detailed interior; detailed engine; opening hood; opening trunk; opening doors; and detailed chassis.', 6600, '98.30', '140.43'),
('S24_3949', 'Corsair F4U ( Bird Cage)', 'Planes', '1:24', 'Second Gear Diecast', 'Has retractable wheels and comes with a stand. Official logos and insignias.', 6812, '29.34', '68.24'),
('S24_3969', '1936 Mercedes Benz 500k Roadster', 'Vintage Cars', '1:24', 'Red Start Diecast', 'This model features grille-mounted chrome horn, lift-up louvered hood, fold-down rumble seat, working steering system and rubber wheels. Color black.', 2081, '21.75', '41.03'),
('S24_4048', '1992 Porsche Cayenne Turbo Silver', 'Classic Cars', '1:24', 'Exoto Designs', 'This replica features opening doors, superb detail and craftsmanship, working steering system, opening forward compartment, opening rear trunk with removable spare, 4 wheel independent spring suspension as well as factory baked enamel finish.', 6582, '69.78', '118.28'),
('S24_4258', '1936 Chrysler Airflow', 'Vintage Cars', '1:24', 'Second Gear Diecast', 'Features opening trunk,  working steering system. Color dark green.', 4710, '57.46', '97.39'),
('S24_4278', '1900s Vintage Tri-Plane', 'Planes', '1:24', 'Unimax Art Galleries', 'Hand crafted diecast-like metal Triplane is Re-created in about 1:24 scale of antique pioneer airplane. This antique style metal triplane is all hand-assembled with many different parts.', 2756, '36.23', '72.45'),
('S24_4620', '1961 Chevrolet Impala', 'Classic Cars', '1:18', 'Classic Metal Creations', 'This 1:18 scale precision die-cast reproduction of the 1961 Chevrolet Impala has all the features-doors, hood and trunk that open; detailed 409 cubic-inch engine; chrome dashboard and stick shift, two-tone interior; working steering system; all topped of with a factory baked-enamel finish.', 7869, '32.33', '80.84'),
('S32_1268', '1980’s GM Manhattan Express', 'Trucks and Buses', '1:32', 'Motor City Art Classics', 'This 1980’s era new look Manhattan express is still active, running from the Bronx to mid-town Manhattan. Has 35 opeining windows and working lights. Needs a battery.', 5099, '53.93', '96.31'),
('S32_1374', '1997 BMW F650 ST', 'Motorcycles', '1:32', 'Exoto Designs', 'Features official die-struck logos and baked enamel finish. Comes with stand.', 178, '66.92', '99.89'),
('S32_2206', '1982 Ducati 996 R', 'Motorcycles', '1:32', 'Gearbox Collectibles', 'Features rotating wheels , working kick stand. Comes with stand.', 9241, '24.14', '40.23'),
('S32_2509', '1954 Greyhound Scenicruiser', 'Trucks and Buses', '1:32', 'Classic Metal Creations', 'Model features bi-level seating, 50 windows, skylights & glare resistant glass, working steering system, original logos', 2874, '25.98', '54.11'),
('S32_3207', '1950\'s Chicago Surface Lines Streetcar', 'Trains', '1:32', 'Gearbox Collectibles', 'This streetcar is a joy to see. It has 80 separate windows, electric wire guides, detailed interiors with seats, poles and drivers controls, rolling and turning wheel assemblies, plus authentic factory baked-enamel finishes (Green Hornet for Chicago and Cream and Crimson for Boston).', 8601, '26.72', '62.14'),
('S32_3522', '1996 Peterbilt 379 Stake Bed with Outrigger', 'Trucks and Buses', '1:32', 'Red Start Diecast', 'This model features, opening doors, detailed engine, working steering, tinted windows, detailed interior, die-struck logos, removable stakes operating outriggers, detachable second trailer, functioning 360-degree self loader, precision molded resin trailer and trim, baked enamel finish on cab', 814, '33.61', '64.64'),
('S32_4289', '1928 Ford Phaeton Deluxe', 'Vintage Cars', '1:32', 'Highway 66 Mini Classics', 'This model features grille-mounted chrome horn, lift-up louvered hood, fold-down rumble seat, working steering system', 136, '33.02', '68.79'),
('S32_4485', '1974 Ducati 350 Mk3 Desmo', 'Motorcycles', '1:32', 'Second Gear Diecast', 'This model features two-tone paint with chrome accents, superior die-cast detail , rotating wheels , working kick stand', 3341, '56.13', '102.05'),
('S50_1341', '1930 Buick Marquette Phaeton', 'Vintage Cars', '1:50', 'Studio M Art Models', 'Features opening trunk,  working steering system', 7062, '27.06', '43.64'),
('S50_1392', 'Diamond T620 Semi-Skirted Tanker', 'Trucks and Buses', '1:50', 'Highway 66 Mini Classics', 'This limited edition model is licensed and perfectly scaled for Lionel Trains. The Diamond T620 has been produced in solid precision diecast and painted with a fire baked enamel finish. It comes with a removable tanker and is a perfect model to add authenticity to your static train or car layout or to just have on display.', 1016, '68.29', '115.75'),
('S50_1514', '1962 City of Detroit Streetcar', 'Trains', '1:50', 'Classic Metal Creations', 'This streetcar is a joy to see. It has 99 separate windows, electric wire guides, detailed interiors with seats, poles and drivers controls, rolling and turning wheel assemblies, plus authentic factory baked-enamel finishes (Green Hornet for Chicago and Cream and Crimson for Boston).', 1645, '37.49', '58.58'),
('S50_4713', '2002 Yamaha YZR M1', 'Motorcycles', '1:50', 'Autoart Studio Design', 'Features rotating wheels , working kick stand. Comes with stand.', 600, '34.17', '81.36'),
('S700_1138', 'The Schooner Bluenose', 'Ships', '1:700', 'Autoart Studio Design', 'All wood with canvas sails. Measures 31 1/2 inches in Length, 22 inches High and 4 3/4 inches Wide. Many extras.\r\nThe schooner Bluenose was built in Nova Scotia in 1921 to fish the rough waters off the coast of Newfoundland. Because of the Bluenose racing prowess she became the pride of all Canadians. Still featured on stamps and the Canadian dime, the Bluenose was lost off Haiti in 1946.', 1897, '34.00', '66.67'),
('S700_1691', 'American Airlines: B767-300', 'Planes', '1:700', 'Min Lin Diecast', 'Exact replia with official logos and insignias and retractable wheels', 5841, '51.15', '91.34'),
('S700_1938', 'The Mayflower', 'Ships', '1:700', 'Studio M Art Models', 'Measures 31 1/2 inches Long x 25 1/2 inches High x 10 5/8 inches Wide\r\nAll wood with canvas sail. Extras include long boats, rigging, ladders, railing, anchors, side cannons, hand painted, etc.', 737, '43.30', '86.61'),
('S700_2047', 'HMS Bounty', 'Ships', '1:700', 'Unimax Art Galleries', 'Measures 30 inches Long x 27 1/2 inches High x 4 3/4 inches Wide. \r\nMany extras including rigging, long boats, pilot house, anchors, etc. Comes with three masts, all square-rigged.', 3501, '39.83', '90.52'),
('S700_2466', 'America West Airlines B757-200', 'Planes', '1:700', 'Motor City Art Classics', 'Official logos and insignias. Working steering system. Rotating jet engines', 9653, '68.80', '99.72'),
('S700_2610', 'The USS Constitution Ship', 'Ships', '1:700', 'Red Start Diecast', 'All wood with canvas sails. Measures 31 1/2\" Length x 22 3/8\" High x 8 1/4\" Width. Extras include 4 boats on deck, sea sprite on bow, anchors, copper railing, pilot houses, etc.', 7083, '33.97', '72.28'),
('S700_2824', '1982 Camaro Z28', 'Classic Cars', '1:18', 'Carousel DieCast Legends', 'Features include opening and closing doors. Color: White. \r\nMeasures approximately 9 1/2\" Long.', 6934, '46.53', '101.15'),
('S700_2834', 'ATA: B757-300', 'Planes', '1:700', 'Highway 66 Mini Classics', 'Exact replia with official logos and insignias and retractable wheels', 7106, '59.33', '118.65'),
('S700_3167', 'F/A 18 Hornet 1/72', 'Planes', '1:72', 'Motor City Art Classics', '10\" Wingspan with retractable landing gears.Comes with pilot', 551, '54.40', '80.00'),
('S700_3505', 'The Titanic', 'Ships', '1:700', 'Carousel DieCast Legends', 'Completed model measures 19 1/2 inches long, 9 inches high, 3inches wide and is in barn red/black. All wood and metal.', 1956, '51.09', '100.17'),
('S700_3962', 'The Queen Mary', 'Ships', '1:700', 'Welly Diecast Productions', 'Exact replica. Wood and Metal. Many extras including rigging, long boats, pilot house, anchors, etc. Comes with three masts, all square-rigged.', 5088, '53.63', '99.31'),
('S700_4002', 'American Airlines: MD-11S', 'Planes', '1:700', 'Second Gear Diecast', 'Polished finish. Exact replia with official logos and insignias and retractable wheels', 8820, '36.27', '74.03'),
('S72_1253', 'Boeing X-32A JSF', 'Planes', '1:72', 'Motor City Art Classics', '10\" Wingspan with retractable landing gears.Comes with pilot', 4857, '32.77', '49.66'),
('S72_3212', 'Pont Yacht', 'Ships', '1:72', 'Unimax Art Galleries', 'Measures 38 inches Long x 33 3/4 inches High. Includes a stand.\r\nMany extras including rigging, long boats, pilot house, anchors, etc. Comes with 2 masts, all square-rigged', 414, '33.30', '54.60');

-- --------------------------------------------------------

--
-- Table structure for table `t1`
--

CREATE TABLE `t1` (
  `id` int(11) NOT NULL,
  `pattern` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t1`
--

INSERT INTO `t1` (`id`, `pattern`) VALUES
(1, 'Divot'),
(2, 'Brick'),
(3, 'Grid');

-- --------------------------------------------------------

--
-- Table structure for table `t2`
--

CREATE TABLE `t2` (
  `id` varchar(50) NOT NULL,
  `pattern` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t2`
--

INSERT INTO `t2` (`id`, `pattern`) VALUES
('A', 'Brick'),
('B', 'Grid'),
('C', 'Diamond');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` set('M','F','T') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `gender`, `email`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Sunil', NULL, 'sunil.kumar@authbridge.com', '$2y$10$bCM6TTljDtKH2uR0wHP0heCtIpZaoAm.n81Wys.kRPk6kFTReBLIq', 'Vu4A1y0nixuZ8N4wm5iyYcqJEI24VluYNd9T32tHFzVQSxYbiez2j0XggLAx', '2018-08-07 02:58:53', '2018-08-07 02:58:53');

-- --------------------------------------------------------

--
-- Table structure for table `user_department`
--

CREATE TABLE `user_department` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gender`
--
ALTER TABLE `gender`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offices`
--
ALTER TABLE `offices`
  ADD PRIMARY KEY (`officeCode`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`customerNumber`,`checkNumber`);

--
-- Indexes for table `productlines`
--
ALTER TABLE `productlines`
  ADD PRIMARY KEY (`productLine`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productCode`),
  ADD KEY `productLine` (`productLine`);

--
-- Indexes for table `t1`
--
ALTER TABLE `t1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t2`
--
ALTER TABLE `t2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_department`
--
ALTER TABLE `user_department`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `gender`
--
ALTER TABLE `gender`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `user_department`
--
ALTER TABLE `user_department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`productLine`) REFERENCES `productlines` (`productLine`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
