-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2022 at 01:40 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodelogin`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `username` text DEFAULT NULL,
  `password` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `password`) VALUES
(10, 'admin', '$2b$10$8o0h1X7Pp9pCf2neBeX6werkg1rg5MJ1LNB4YTneUyHdU2IiDpnmC');

-- --------------------------------------------------------

--
-- Table structure for table `kalendarz`
--

CREATE TABLE `kalendarz` (
  `id` int(10) NOT NULL,
  `title` text COLLATE utf8_polish_ci DEFAULT NULL,
  `details` text COLLATE utf8_polish_ci DEFAULT NULL,
  `deadlineDate` date DEFAULT NULL,
  `hours` text COLLATE utf8_polish_ci DEFAULT NULL,
  `addDate` date DEFAULT NULL,
  `worker` text COLLATE utf8_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `kalendarz`
--

INSERT INTO `kalendarz` (`id`, `title`, `details`, `deadlineDate`, `hours`, `addDate`, `worker`) VALUES
(1, 'Zadzwoń do Saula', 'Omówić projekty', '2022-01-14', NULL, '2022-01-14', 'admin'),
(2, 'Zadzwonić do saula', 'Przejrzeć regulamin', '2022-01-14', '14:30 - 15:50', '2022-01-14', 'admin'),
(3, '', '', '2022-01-14', '', '2022-01-14', 'admin'),
(4, '', '', '2022-01-26', '', '2022-01-14', 'admin'),
(5, '', '', '2022-01-27', '', '2022-01-15', 'admin'),
(6, '', '', '2022-01-15', '', '2022-01-15', 'admin'),
(7, '', '', '2022-01-24', '', '2022-01-15', 'admin'),
(8, '', '', '2022-01-21', '', '2022-01-15', 'admin'),
(9, '', '', '2022-01-16', '', '2022-01-15', 'admin'),
(10, '', '', '2022-01-21', '', '2022-01-15', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `klienci`
--

CREATE TABLE `klienci` (
  `id_klienta` int(15) NOT NULL,
  `klient` text COLLATE utf8_polish_ci DEFAULT NULL,
  `szczegolyKlienta` text COLLATE utf8_polish_ci DEFAULT NULL,
  `telefon` text COLLATE utf8_polish_ci DEFAULT NULL,
  `kraj` text COLLATE utf8_polish_ci DEFAULT NULL,
  `ulica` text COLLATE utf8_polish_ci DEFAULT NULL,
  `miasto` text COLLATE utf8_polish_ci DEFAULT NULL,
  `kodpocztowy` text COLLATE utf8_polish_ci DEFAULT NULL,
  `dataklienta` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `klienci`
--

INSERT INTO `klienci` (`id_klienta`, `klient`, `szczegolyKlienta`, `telefon`, `kraj`, `ulica`, `miasto`, `kodpocztowy`, `dataklienta`) VALUES
(4, 'Krzysiaczek USB', 'Brak', '505 100 100', 'Polska', 'Szkolniak 11', 'Łapy', '16-123', NULL),
(5, 'Baka', 'Gomenosai', '420', 'Polska', 'Arigato 12', 'Japan', '19-100', NULL),
(6, 'Ice Cube', 'Good day', '420 420 420', 'Polska', 'West', 'Compton', '19-200', NULL),
(7, 'Szafirek', 'Obsesja Kingi', '100 200 300', 'Polska', 'Szafirkowa', 'Pałacyk', '420-22', NULL),
(8, 'Kanye West', 'Kanye???', '900 900 900', 'Polska', 'Colorado', 'California', '89-203', NULL),
(9, 'Samir', 'Bad driver', '26 45 213 456', 'Polska', 'Hindi?', 'Uhowo', '11-111', NULL),
(10, 'Levi Ackerman', 'Kennny!', '123123123', 'Polska', 'Shingashini', 'Paradis', '123-12', NULL),
(11, 'Kenny Ackerman', 'Levi !!!!', '123123123', 'Polska', 'Shinashnin', 'Paradis', '12-123', NULL),
(12, 'Leo Bonhart', 'Treasure hunter', '500 300 200', 'Polska', 'Ebbing 12', 'Cintra', '24-123', '2021-12-27');

-- --------------------------------------------------------

--
-- Table structure for table `produkty`
--

CREATE TABLE `produkty` (
  `id` int(15) NOT NULL,
  `id_zamowienia` int(15) DEFAULT NULL,
  `nazwaProduktu` text COLLATE utf8_polish_ci DEFAULT NULL,
  `ilosc` int(5) DEFAULT NULL,
  `cenaSzt` float DEFAULT NULL,
  `cenaCalkowita` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `produkty`
--

INSERT INTO `produkty` (`id`, `id_zamowienia`, `nazwaProduktu`, `ilosc`, `cenaSzt`, `cenaCalkowita`) VALUES
(30, 1, 'Nuptse', 2, 197, 394),
(31, 2, 'Black mask', 57, 0.69, 39.33),
(32, 2, 'Kyoto', 23, 12, 276),
(33, 3, 'Glock', 1, 405, 405),
(34, 3, 'Green bandana', 2, 20, 40),
(35, 3, 'Cadillac', 1, 16000, 16000),
(36, 4, 'Łapki', 4, 10, 40),
(37, 4, 'Ogon', 1, 67.53, 67.53),
(38, 5, 'Klapki kubota', 2, 10, 20),
(39, 5, 'Sandały', 60, 20, 1200),
(40, 6, 'Opony', 3, 200, 600),
(41, 6, 'Kierownica', 1, 14, 14),
(42, 7, 'Opona', 1, 200, 200),
(43, 8, 'Tea Earl Grey', 26, 3, 78),
(44, 8, 'Sword replica', 1, 540, 540),
(45, 9, 'Hat', 2, 299.25, 598.5),
(46, 9, 'Shoes', 1, 499.25, 499.25),
(47, 10, 'Fancy boots', 3, 45.532, 136.596),
(48, 11, 'Potion', 56, 20, 1120),
(49, 12, 'Siodło do konia', 1, 399, 399),
(50, 12, 'Miecz przeznaczenia', 1, 1299, 1299),
(51, 13, 'season 6 hoodie', 2, 672.99, 1345.98);

-- --------------------------------------------------------

--
-- Table structure for table `zamowienia`
--

CREATE TABLE `zamowienia` (
  `id` int(15) NOT NULL,
  `id_klienta` int(15) NOT NULL,
  `data` date DEFAULT NULL,
  `cena` float DEFAULT NULL,
  `status` text COLLATE utf8_polish_ci DEFAULT NULL,
  `nazwaPracownika` text COLLATE utf8_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `zamowienia`
--

INSERT INTO `zamowienia` (`id`, `id_klienta`, `data`, `cena`, `status`, `nazwaPracownika`) VALUES
(1, 4, '2021-11-23', 394, 'Zamknięte', 'admin'),
(2, 5, '2021-11-23', 315.33, 'Zamknięte', 'admin'),
(3, 6, '2021-11-23', 16445, '', 'admin'),
(4, 7, '2021-11-23', 107.53, 'Wysłane', 'admin'),
(5, 8, '2021-11-23', 1220, 'Wysłane', 'admin'),
(6, 9, '2021-11-23', 614, 'Wysłane', 'admin'),
(7, 9, '2021-11-23', 200, 'Wysłane', 'admin'),
(8, 10, '2021-12-22', 618, '', 'admin'),
(9, 11, '2021-12-22', 1097.75, 'Zamknięte', 'admin'),
(10, 11, '2021-12-22', 136.596, '', 'admin'),
(11, 10, '2021-12-22', 1120, 'Zamknięte', 'admin'),
(12, 12, '2021-12-27', 1698, 'Zamknięte', 'admin'),
(13, 8, '2022-01-04', 1345.98, '', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kalendarz`
--
ALTER TABLE `kalendarz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `klienci`
--
ALTER TABLE `klienci`
  ADD PRIMARY KEY (`id_klienta`);

--
-- Indexes for table `produkty`
--
ALTER TABLE `produkty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zamowienia`
--
ALTER TABLE `zamowienia`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `kalendarz`
--
ALTER TABLE `kalendarz`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `klienci`
--
ALTER TABLE `klienci`
  MODIFY `id_klienta` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `produkty`
--
ALTER TABLE `produkty`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `zamowienia`
--
ALTER TABLE `zamowienia`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
