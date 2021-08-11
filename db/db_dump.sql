-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: rentall_v_2_6
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AdminPrivileges`
--

DROP TABLE IF EXISTS `AdminPrivileges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AdminPrivileges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` int(11) NOT NULL,
  `previlegeId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `AdminPrivileges_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `AdminRoles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminPrivileges`
--

LOCK TABLES `AdminPrivileges` WRITE;
/*!40000 ALTER TABLE `AdminPrivileges` DISABLE KEYS */;
/*!40000 ALTER TABLE `AdminPrivileges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AdminRoles`
--

DROP TABLE IF EXISTS `AdminRoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AdminRoles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminRoles`
--

LOCK TABLES `AdminRoles` WRITE;
/*!40000 ALTER TABLE `AdminRoles` DISABLE KEYS */;
/*!40000 ALTER TABLE `AdminRoles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AdminUser`
--

DROP TABLE IF EXISTS `AdminUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AdminUser` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailConfirmed` tinyint(1) DEFAULT '0',
  `isSuperAdmin` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminUser`
--

LOCK TABLES `AdminUser` WRITE;
/*!40000 ALTER TABLE `AdminUser` DISABLE KEYS */;
INSERT INTO `AdminUser` VALUES ('8b16c890-c205-11e6-a2c7-4195de507451','admin@radicalstart.com','$2a$08$SR.h58BFMCbcHbl3y9tvYe9UM.q1SMXh43M51po7FDXQrOcMpQxLy',1,1,'2016-12-14 13:59:34','2016-12-14 13:59:34',NULL);
/*!40000 ALTER TABLE `AdminUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Banner`
--

DROP TABLE IF EXISTS `Banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Banner`
--

LOCK TABLES `Banner` WRITE;
/*!40000 ALTER TABLE `Banner` DISABLE KEYS */;
INSERT INTO `Banner` VALUES (1,'Lorum Ipsum.','Lorem Ipsum is simply dummy text of the printing and typesetting industry.',1,'2019-03-27 11:53:46','2018-05-02 04:49:38');
/*!40000 ALTER TABLE `Banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BedTypes`
--

DROP TABLE IF EXISTS `BedTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BedTypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `bedCount` int(11) DEFAULT NULL,
  `bedType` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `bedType` (`bedType`),
  CONSTRAINT `BedTypes_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `BedTypes_ibfk_2` FOREIGN KEY (`bedType`) REFERENCES `ListSettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BedTypes`
--

LOCK TABLES `BedTypes` WRITE;
/*!40000 ALTER TABLE `BedTypes` DISABLE KEYS */;
INSERT INTO `BedTypes` VALUES (4,1,1,16,'2019-03-27 09:46:01','2019-03-27 09:46:01'),(5,1,2,17,'2019-03-27 09:46:01','2019-03-27 09:46:01'),(6,1,3,17,'2019-03-27 09:46:01','2019-03-27 09:46:01'),(41,7,1,16,'2019-03-27 10:09:36','2019-03-27 10:09:36'),(42,7,4,17,'2019-03-27 10:09:36','2019-03-27 10:09:36'),(43,7,2,16,'2019-03-27 10:09:36','2019-03-27 10:09:36'),(44,7,3,17,'2019-03-27 10:09:36','2019-03-27 10:09:36'),(45,7,5,18,'2019-03-27 10:09:36','2019-03-27 10:09:36'),(46,7,6,19,'2019-03-27 10:09:36','2019-03-27 10:09:36'),(49,6,1,16,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(50,6,2,16,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(51,5,1,16,'2019-07-04 10:57:10','2019-07-04 10:57:10'),(52,5,2,18,'2019-07-04 10:57:10','2019-07-04 10:57:10'),(53,5,3,18,'2019-07-04 10:57:10','2019-07-04 10:57:10'),(58,3,1,20,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(59,3,2,19,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(60,3,3,20,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(61,2,1,17,'2019-07-04 11:02:19','2019-07-04 11:02:19'),(62,2,2,16,'2019-07-04 11:02:19','2019-07-04 11:02:19'),(73,4,1,16,'2020-04-13 11:26:21','2020-04-13 11:26:21'),(74,8,1,16,'2020-04-13 13:10:34','2020-04-13 13:10:34'),(75,8,2,20,'2020-04-13 13:10:34','2020-04-13 13:10:34'),(76,8,3,19,'2020-04-13 13:10:34','2020-04-13 13:10:34'),(77,8,4,19,'2020-04-13 13:10:34','2020-04-13 13:10:34'),(78,8,5,20,'2020-04-13 13:10:34','2020-04-13 13:10:34');
/*!40000 ALTER TABLE `BedTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BlogDetails`
--

DROP TABLE IF EXISTS `BlogDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BlogDetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pageTitle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaTitle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaDescription` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `pageUrl` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `footerCategory` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isPrivate` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BlogDetails`
--

LOCK TABLES `BlogDetails` WRITE;
/*!40000 ALTER TABLE `BlogDetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `BlogDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cancellation`
--

DROP TABLE IF EXISTS `Cancellation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cancellation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `policyName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `policyContent` mediumtext COLLATE utf8mb4_unicode_ci,
  `priorDays` int(11) NOT NULL,
  `accommodationPriorCheckIn` float NOT NULL,
  `accommodationBeforeCheckIn` float NOT NULL,
  `accommodationDuringCheckIn` float NOT NULL,
  `guestFeePriorCheckIn` float NOT NULL,
  `guestFeeBeforeCheckIn` float NOT NULL,
  `guestFeeDuringCheckIn` float NOT NULL,
  `hostFeePriorCheckIn` float NOT NULL,
  `hostFeeBeforeCheckIn` float NOT NULL,
  `hostFeeDuringCheckIn` float NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cancellation`
--

LOCK TABLES `Cancellation` WRITE;
/*!40000 ALTER TABLE `Cancellation` DISABLE KEYS */;
INSERT INTO `Cancellation` VALUES (1,'Flexible','Cancel up to 24 hours before your trip and get a 100% refund plus service fees back.',1,100,100,100,100,100,0,100,100,100,1,'2017-06-09 22:43:35','2017-06-09 22:43:35'),(2,'Moderate','Cancel up to 5 days before your trip and get a full refund. Cancel within 5 days of the trip and get a 50% refund of the nightly rate, as well as a full refund of fees.',5,100,50,50,100,100,0,100,100,100,1,'2017-06-09 22:46:10','2017-06-09 22:46:10'),(3,'Strict','Cancel up to 7 days before your trip and get a 50% refund plus service fees back.',7,50,0,0,100,100,0,100,100,100,1,'2017-06-09 22:47:38','2017-06-09 22:47:38');
/*!40000 ALTER TABLE `Cancellation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CancellationDetails`
--

DROP TABLE IF EXISTS `CancellationDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CancellationDetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reservationId` int(11) NOT NULL,
  `cancellationPolicy` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refundToGuest` float NOT NULL,
  `payoutToHost` float NOT NULL,
  `guestServiceFee` float NOT NULL,
  `hostServiceFee` float NOT NULL,
  `total` float NOT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cancelledBy` enum('host','guest') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `CancellationDetails_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CancellationDetails`
--

LOCK TABLES `CancellationDetails` WRITE;
/*!40000 ALTER TABLE `CancellationDetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `CancellationDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Country`
--

DROP TABLE IF EXISTS `Country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `countryCode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `countryName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime DEFAULT '2018-09-29 11:22:19',
  `updatedAt` datetime DEFAULT '2018-09-29 11:22:19',
  `dialCode` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=242 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Country`
--

LOCK TABLES `Country` WRITE;
/*!40000 ALTER TABLE `Country` DISABLE KEYS */;
INSERT INTO `Country` VALUES (1,'DZ','Algeria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+213'),(2,'AF','Afghanistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+93'),(3,'AL','Albania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+355'),(4,'AS','AmericanSamoa',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 684'),(5,'AD','Andorra',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+376'),(6,'AO','Angola',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+244'),(7,'AI','Anguilla',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 264'),(8,'AQ','Antarctica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+672'),(9,'AG','Antigua and Barbuda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1268'),(10,'AR','Argentina',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+54'),(11,'AM','Armenia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+374'),(12,'AW','Aruba',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+297'),(13,'AU','Australia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+61'),(14,'AT','Austria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+43'),(15,'AZ','Azerbaijan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+994'),(16,'BS','Bahamas',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 242'),(17,'BH','Bahrain',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+973'),(18,'BD','Bangladesh',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+880'),(19,'BB','Barbados',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 246'),(20,'BY','Belarus',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+375'),(21,'BE','Belgium',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+32'),(22,'BZ','Belize',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+501'),(23,'BJ','Benin',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+229'),(24,'BM','Bermuda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 441'),(25,'BT','Bhutan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+975'),(26,'BO','Bolivia, Plurinational State of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+591'),(27,'BA','Bosnia and Herzegovina',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+387'),(28,'BW','Botswana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+267'),(29,'BR','Brazil',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+55'),(30,'IO','British Indian Ocean Territory',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+246'),(31,'BN','Brunei Darussalam',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+673'),(32,'BG','Bulgaria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+359'),(33,'BF','Burkina Faso',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+226'),(34,'BI','Burundi',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+257'),(35,'KH','Cambodia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+855'),(36,'CM','Cameroon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+237'),(37,'CA','Canada',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1'),(38,'CV','Cape Verde',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+238'),(39,'KY','Cayman Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+ 345'),(40,'CF','Central African Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+236'),(41,'TD','Chad',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+235'),(42,'CL','Chile',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+56'),(43,'CN','China',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+86'),(44,'CX','Christmas Island',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+61'),(45,'CC','Cocos (Keeling) Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+61'),(46,'CO','Colombia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+57'),(47,'KM','Comoros',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+269'),(48,'CG','Congo',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+242'),(49,'CD','Congo, The Democratic Republic of the',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+243'),(50,'CK','Cook Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+682'),(51,'CR','Costa Rica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+506'),(52,'CI','Cote d\'Ivoire',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+225'),(53,'HR','Croatia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+385'),(54,'CU','Cuba',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+53'),(55,'CY','Cyprus',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+537'),(56,'CZ','Czech Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+420'),(57,'DK','Denmark',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+45'),(58,'DJ','Djibouti',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+253'),(59,'DM','Dominica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 767'),(60,'DO','Dominican Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 849'),(61,'EC','Ecuador',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+593'),(62,'EG','Egypt',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+20'),(63,'SV','El Salvador',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+503'),(64,'GQ','Equatorial Guinea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+240'),(65,'ER','Eritrea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+291'),(66,'EE','Estonia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+372'),(67,'ET','Ethiopia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+251'),(68,'FK','Falkland Islands (Malvinas)',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+500'),(69,'FO','Faroe Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+298'),(70,'FJ','Fiji',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+679'),(71,'FI','Finland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+358'),(72,'FR','France',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+33'),(73,'GF','French Guiana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+594'),(74,'PF','French Polynesia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+689'),(75,'GA','Gabon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+241'),(76,'GM','Gambia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+220'),(77,'GE','Georgia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+995'),(78,'DE','Germany',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+49'),(79,'GH','Ghana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+233'),(80,'GI','Gibraltar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+350'),(81,'GR','Greece',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+30'),(82,'GL','Greenland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+299'),(83,'GD','Grenada',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 473'),(84,'GP','Guadeloupe',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+590'),(85,'GU','Guam',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 671'),(86,'GT','Guatemala',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+502'),(87,'GG','Guernsey',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(88,'GN','Guinea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+224'),(89,'GW','Guinea-Bissau',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+245'),(90,'GY','Guyana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+595'),(91,'HT','Haiti',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+509'),(92,'VA','Holy See (Vatican City State)',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+379'),(93,'HN','Honduras',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+504'),(94,'HK','Hong Kong',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+852'),(95,'HU','Hungary',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+36'),(96,'IS','Iceland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+354'),(97,'IN','India',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+91'),(98,'ID','Indonesia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+62'),(99,'IR','Iran, Islamic Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+98'),(100,'IQ','Iraq',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+964'),(101,'IE','Ireland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+353'),(102,'IM','Isle of Man',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(103,'IL','Israel',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+972'),(104,'IT','Italy',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+39'),(105,'JM','Jamaica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 876'),(106,'JP','Japan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+81'),(107,'JE','Jersey',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(108,'JO','Jordan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+962'),(109,'KZ','Kazakhstan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+7 7'),(110,'KE','Kenya',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+254'),(111,'KI','Kiribati',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+686'),(112,'KP','Korea, Democratic People\'s Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+850'),(113,'KR','Korea, Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+82'),(114,'KW','Kuwait',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+965'),(115,'KG','Kyrgyzstan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+996'),(116,'LA','Lao People\'s Democratic Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+856'),(117,'LV','Latvia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+371'),(118,'LB','Lebanon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+961'),(119,'LS','Lesotho',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+266'),(120,'LR','Liberia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+231'),(121,'LY','Libyan Arab Jamahiriya',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+218'),(122,'LI','Liechtenstein',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+423'),(123,'LT','Lithuania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+370'),(124,'LU','Luxembourg',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+352'),(125,'MO','Macao',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+853'),(126,'MK','Macedonia, The Former Yugoslav Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+389'),(127,'MG','Madagascar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+261'),(128,'MW','Malawi',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+265'),(129,'MY','Malaysia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+60'),(130,'MV','Maldives',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+960'),(131,'ML','Mali',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+223'),(132,'MT','Malta',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+356'),(133,'MH','Marshall Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+692'),(134,'MQ','Martinique',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+596'),(135,'MR','Mauritania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+222'),(136,'MU','Mauritius',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+230'),(137,'YT','Mayotte',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+262'),(138,'MX','Mexico',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+52'),(139,'FM','Micronesia, Federated States of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+691'),(140,'MD','Moldova, Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+373'),(141,'MC','Monaco',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+377'),(142,'MN','Mongolia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+976'),(143,'ME','Montenegro',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+382'),(144,'MS','Montserrat',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1664'),(145,'MA','Morocco',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+212'),(146,'MZ','Mozambique',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+258'),(147,'MM','Myanmar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+95'),(148,'NA','Namibia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+264'),(149,'NR','Nauru',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+674'),(150,'NP','Nepal',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+977'),(151,'NL','Netherlands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+31'),(152,'AN','Netherlands Antilles',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+599'),(153,'NC','New Caledonia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+687'),(154,'NZ','New Zealand',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+64'),(155,'NI','Nicaragua',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+505'),(156,'NE','Niger',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+227'),(157,'NG','Nigeria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+234'),(158,'NU','Niue',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+683'),(159,'NF','Norfolk Island',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+672'),(160,'MP','Northern Mariana Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 670'),(161,'NO','Norway',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+47'),(162,'OM','Oman',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+968'),(163,'PK','Pakistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+92'),(164,'PW','Palau',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+680'),(165,'PS','Palestinian Territory, Occupied',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+970'),(166,'PA','Panama',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+507'),(167,'PG','Papua New Guinea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+675'),(168,'PY','Paraguay',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+595'),(169,'PE','Peru',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+51'),(170,'PH','Philippines',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+63'),(171,'PN','Pitcairn',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+872'),(172,'PL','Poland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+48'),(173,'PT','Portugal',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+351'),(174,'PR','Puerto Rico',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 939'),(175,'QA','Qatar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+974'),(176,'RO','Romania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+40'),(177,'RU','Russia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+7'),(178,'RW','Rwanda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+250'),(179,'RE','Réunion',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+262'),(180,'BL','Saint Barthélemy',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+590'),(181,'SH','Saint Helena, Ascension and Tristan Da Cunha',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+290'),(182,'KN','Saint Kitts and Nevis',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 869'),(183,'LC','Saint Lucia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 758'),(184,'MF','Saint Martin',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+590'),(185,'PM','Saint Pierre and Miquelon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+508'),(186,'VC','Saint Vincent and the Grenadines',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 784'),(187,'WS','Samoa',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+685'),(188,'SM','San Marino',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+378'),(189,'ST','Sao Tome and Principe',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+239'),(190,'SA','Saudi Arabia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+966'),(191,'SN','Senegal',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+221'),(192,'RS','Serbia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+381'),(193,'SC','Seychelles',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+248'),(194,'SL','Sierra Leone',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+232'),(195,'SG','Singapore',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+65'),(196,'SK','Slovakia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+421'),(197,'SI','Slovenia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+386'),(198,'SB','Solomon Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+677'),(199,'SO','Somalia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+252'),(200,'ZA','South Africa',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+27'),(201,'GS','South Georgia and the South Sandwich Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+500'),(202,'ES','Spain',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+34'),(203,'LK','Sri Lanka',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+94'),(204,'SD','Sudan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+249'),(205,'SR','Suriname',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+597'),(206,'SJ','Svalbard and Jan Mayen',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+47'),(207,'SZ','Swaziland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+268'),(208,'SE','Sweden',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+46'),(209,'CH','Switzerland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+41'),(210,'SY','Syrian Arab Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+963'),(211,'TW','Taiwan, Province of China',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+886'),(212,'TJ','Tajikistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+992'),(213,'TZ','Tanzania, United Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+255'),(214,'TH','Thailand',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+66'),(215,'TL','Timor-Leste',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+670'),(216,'TG','Togo',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+228'),(217,'TK','Tokelau',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+690'),(218,'TO','Tonga',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+676'),(219,'TT','Trinidad and Tobago',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 868'),(220,'TN','Tunisia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+216'),(221,'TR','Turkey',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+90'),(222,'TM','Turkmenistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+993'),(223,'TC','Turks and Caicos Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 649'),(224,'TV','Tuvalu',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+688'),(225,'UG','Uganda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+256'),(226,'UA','Ukraine',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+380'),(227,'AE','United Arab Emirates',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+971'),(228,'GB','United Kingdom',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(229,'US','United States',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1'),(230,'UY','Uruguay',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+598'),(231,'UZ','Uzbekistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+998'),(232,'VU','Vanuatu',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+678'),(233,'VE','Venezuela, Bolivarian Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+58'),(234,'VN','Viet Nam',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+84'),(235,'VG','Virgin Islands, British',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 284'),(236,'VI','Virgin Islands, U.S.',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 340'),(237,'WF','Wallis and Futuna',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+681'),(238,'YE','Yemen',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+967'),(239,'ZM','Zambia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+260'),(240,'ZW','Zimbabwe',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+263'),(241,'AX','Åland Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+358');
/*!40000 ALTER TABLE `Country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Currencies`
--

DROP TABLE IF EXISTS `Currencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Currencies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `symbol` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `isBaseCurrency` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isPayment` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Currencies`
--

LOCK TABLES `Currencies` WRITE;
/*!40000 ALTER TABLE `Currencies` DISABLE KEYS */;
INSERT INTO `Currencies` VALUES (1,'AUD',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(2,'BGN',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(3,'BRL',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(4,'CAD',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(5,'CHF',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(6,'CNY',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(7,'CZK',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(8,'DKK',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(9,'EUR',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(10,'GBP',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(11,'HKD',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(12,'HRK',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(13,'HUF',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(14,'IDR',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(15,'ILS',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(16,'INR',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(17,'JPY',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(18,'KRW',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(19,'MXN',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(20,'MYR',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(21,'NOK',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(22,'NZD',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(23,'PHP',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(24,'PLN',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(25,'RON',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(26,'RUB',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(27,'SEK',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0),(28,'SGD',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(29,'THB',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(30,'TRY',1,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(31,'USD',1,1,'2019-03-27 11:53:47','2018-05-02 04:52:36',1),(32,'ZAR',0,0,'2019-03-27 11:53:47','2018-05-02 04:52:36',0);
/*!40000 ALTER TABLE `Currencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CurrencyRates`
--

DROP TABLE IF EXISTS `CurrencyRates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CurrencyRates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currencyCode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` float NOT NULL,
  `isBase` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=188 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CurrencyRates`
--

LOCK TABLES `CurrencyRates` WRITE;
/*!40000 ALTER TABLE `CurrencyRates` DISABLE KEYS */;
INSERT INTO `CurrencyRates` VALUES (1,'AED',3.67,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(2,'AFN',78.52,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(3,'ALL',108.2,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(4,'AMD',476.01,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(5,'ANG',1.79,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(6,'AOA',362.02,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(7,'ARS',55.98,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(8,'AUD',1.47,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(9,'AWG',1.8,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(10,'AZN',1.7,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(11,'BAM',1.74,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(12,'BAT',5.87206,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(13,'BBD',2,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(14,'BCH',0.00337092,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(15,'BDT',84.6,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(16,'BGN',1.75,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(17,'BHD',0.377,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(18,'BIF',1843,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(19,'BMD',1,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(20,'BND',1.35,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(21,'BOB',6.92,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(22,'BRL',3.95,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(23,'BSD',1,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(24,'BSV',0.00758929,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(25,'BTC',0.000093,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(26,'BTN',71.1,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(27,'BWP',11.06,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(28,'BYN',2.04,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(29,'BYR',21135,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(30,'BZD',2.02,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(31,'CAD',1.32,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(32,'CDF',1654.07,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(33,'CHF',0.97,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(34,'CLF',0.025,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(35,'CLP',707,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(36,'CNH',7.02,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(37,'CNY',7.04,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(38,'COP',3435.53,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(39,'CRC',572.65,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(40,'CUC',1,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(41,'CVE',98.31,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(42,'CZK',23.08,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(43,'DAI',0.986047,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(44,'DJF',178,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(45,'DKK',6.67,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(46,'DOP',50.95,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(47,'DZD',119.58,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(48,'EEK',14.61,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(49,'EGP',16.59,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(50,'EOS',0.3039,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(51,'ERN',15,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(52,'ETB',29.17,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(53,'ETC',0.143338,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(54,'ETH',0.00568489,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(55,'EUR',0.89,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(56,'FJD',2.18,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(57,'FKP',0.83,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(58,'GBP',0.83,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(59,'GEL',2.92,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(60,'GGP',0.83,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(61,'GHS',5.43,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(62,'GIP',0.83,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(63,'GMD',50.12,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(64,'GNF',9188,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(65,'GTQ',7.68,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(66,'GYD',208.95,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(67,'HKD',7.85,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(68,'HNL',24.49,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(69,'HRK',6.61,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(70,'HTG',94.89,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(71,'HUF',289,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(72,'IDR',14195.8,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(73,'ILS',3.48,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(74,'IMP',0.83,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(75,'INR',70.93,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(76,'IQD',1193.26,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(77,'ISK',124,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(78,'JEP',0.83,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(79,'JMD',134.38,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(80,'JOD',0.709,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(81,'JPY',107,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(82,'KES',103.41,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(83,'KGS',69.64,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(84,'KHR',4086.34,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(85,'KMF',440,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(86,'KRW',1210,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(87,'KWD',0.304,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(88,'KYD',0.83,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(89,'KZT',387.58,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(90,'LAK',8695.51,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(91,'LBP',1512.25,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(92,'LINK',0.556864,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(93,'LKR',176.96,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(94,'LRD',203,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(95,'LSL',15.3,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(96,'LTC',0.0149533,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(97,'LTL',3.22,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(98,'LVL',0.66,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(99,'LYD',1.403,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(100,'MAD',9.55,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(101,'MDL',17.42,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(102,'MGA',3685.6,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(103,'MKD',54.83,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(104,'MMK',1510.61,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(105,'MNT',2664.78,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(106,'MOP',8.08,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(107,'MRO',357,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(108,'MTL',0.68,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(109,'MUR',35.9,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(110,'MVR',15.5,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(111,'MWK',729.06,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(112,'MXN',19.47,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(113,'MYR',4.19,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(114,'MZN',60.44,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(115,'NAD',15.3,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(116,'NGN',363.76,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(117,'NIO',33.53,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(118,'NOK',8.91,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(119,'NPR',113.76,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(120,'NZD',1.55,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(121,'OMR',0.385,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(122,'PAB',1,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(123,'PEN',3.38,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(124,'PGK',3.4,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(125,'PHP',51.92,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(126,'PKR',160.25,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(127,'PLN',3.88,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(128,'PYG',6083,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(129,'QAR',3.64,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(130,'REP',0.10015,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(131,'RON',4.22,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(132,'RSD',105.19,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(133,'RUB',65.06,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(134,'RWF',918,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(135,'SAR',3.75,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(136,'SBD',8.22,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(137,'SCR',13.71,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(138,'SEK',9.55,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(139,'SGD',1.38,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(140,'SHP',0.83,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(141,'SLL',8406.47,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(142,'SOS',578.55,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(143,'SRD',7.46,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(144,'SSP',130.26,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(145,'STD',21560.8,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(146,'SVC',8.75,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(147,'SZL',15.3,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(148,'THB',30.85,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(149,'TJS',9.43,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(150,'TMT',3.5,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(151,'TND',2.843,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(152,'TOP',2.31,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(153,'TRY',5.59,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(154,'TTD',6.78,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(155,'TWD',31.15,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(156,'TZS',2302.2,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(157,'UAH',25.16,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(158,'UGX',3695,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(159,'USD',1,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(160,'USDC',1,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(161,'UYU',35.36,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(162,'UZS',8687.82,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(163,'VEF',248488,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(164,'VES',7163.69,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(165,'VND',23262,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(166,'VUV',116,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(167,'WST',2.64,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(168,'XAF',586,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(169,'XAG',0,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(170,'XAU',0,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(171,'XCD',2.7,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(172,'XDR',1,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(173,'XLM',16.5071,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(174,'XOF',586,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(175,'XPD',0,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(176,'XPF',107,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(177,'XPT',0,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(178,'XRP',3.87822,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(179,'XTZ',0.992408,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(180,'YER',250.35,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(181,'ZAR',15.16,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(182,'ZEC',0.0221239,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(183,'ZMK',5253.08,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(184,'ZMW',13.03,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(185,'ZRX',6.25917,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(186,'ZWL',322,0,'2019-09-06 07:00:01','2019-09-06 07:00:01'),(187,'USD',1,1,'2019-09-06 07:00:01','2019-09-06 07:00:01');
/*!40000 ALTER TABLE `CurrencyRates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DocumentVerification`
--

DROP TABLE IF EXISTS `DocumentVerification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DocumentVerification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `fileName` varchar(255) DEFAULT NULL,
  `fileType` varchar(255) DEFAULT NULL,
  `documentStatus` enum('pending','approved') DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocumentVerification`
--

LOCK TABLES `DocumentVerification` WRITE;
/*!40000 ALTER TABLE `DocumentVerification` DISABLE KEYS */;
/*!40000 ALTER TABLE `DocumentVerification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EmailToken`
--

DROP TABLE IF EXISTS `EmailToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EmailToken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `EmailToken_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EmailToken`
--

LOCK TABLES `EmailToken` WRITE;
/*!40000 ALTER TABLE `EmailToken` DISABLE KEYS */;
INSERT INTO `EmailToken` VALUES (1,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6','demo@radicalstart.com','1553672955896','2019-03-27 07:49:16','2019-03-27 07:49:16'),(2,'977bc550-5069-11e9-a14e-635e0fd3bfa6','qa@radicalstart.com','1553675005475','2019-03-27 08:23:25','2019-03-27 08:23:25');
/*!40000 ALTER TABLE `EmailToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FooterBlock`
--

DROP TABLE IF EXISTS `FooterBlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FooterBlock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title1` varchar(255) NOT NULL,
  `content1` text NOT NULL,
  `title2` varchar(255) NOT NULL,
  `content2` text NOT NULL,
  `title3` varchar(255) NOT NULL,
  `content3` text NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FooterBlock`
--

LOCK TABLES `FooterBlock` WRITE;
/*!40000 ALTER TABLE `FooterBlock` DISABLE KEYS */;
INSERT INTO `FooterBlock` VALUES (1,'24/7 customer support','If you need help while traveling or hosting, contact us at our toll free number: 000 000 0000 000','6,00,00,000 host guarantee','Hosts are protected against property damages for up to 6,00,00,000.','Verified ID','We aim to build a trusted community by giving you more info when youre deciding who to host or stay with.',1,'2018-05-22 11:12:19','2018-05-23 05:37:44'),(2,'one','hkh','one ','jkjh','one ','nknk',1,'2018-05-22 11:14:18','2018-05-22 11:14:18'),(3,'one','hkhih','one ','nhjlkhk','one ','klnklh',1,'2018-05-22 11:15:07','2018-05-22 11:15:07'),(4,'fdf','fdsfds','fdsfd','fdsfds','fdsff','fdssdfds',1,'2018-05-22 11:34:58','2018-05-22 11:34:58'),(5,'fdf','fdsfds','fdsfd','fdsfds','fdsff','fdss',1,'2018-05-22 11:35:14','2018-05-22 11:35:14'),(6,'fdf','fdsfds','fdsf','fdsfd','fds','fdss',1,'2018-05-22 11:39:06','2018-05-22 11:39:06');
/*!40000 ALTER TABLE `FooterBlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ForgotPassword`
--

DROP TABLE IF EXISTS `ForgotPassword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ForgotPassword` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `ForgotPassword_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ForgotPassword`
--

LOCK TABLES `ForgotPassword` WRITE;
/*!40000 ALTER TABLE `ForgotPassword` DISABLE KEYS */;
/*!40000 ALTER TABLE `ForgotPassword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HomeBanner`
--

DROP TABLE IF EXISTS `HomeBanner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `HomeBanner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `enable` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HomeBanner`
--

LOCK TABLES `HomeBanner` WRITE;
/*!40000 ALTER TABLE `HomeBanner` DISABLE KEYS */;
INSERT INTO `HomeBanner` VALUES (1,'818214bdca262e754911eb475382f629.jpeg',1,'2019-09-06 06:47:24','2019-09-06 06:47:24'),(2,'a6d84b2d66e7362ce92066073bd80b00.jpeg',1,'2019-09-06 06:47:24','2019-09-06 06:47:24'),(3,'368bae930482d951c44ff6585787944e.jpeg',1,'2019-09-06 06:47:24','2019-09-06 06:47:24'),(4,'610723903989676c52e84d33248546e1.jpeg',1,'2019-09-06 06:47:24','2019-09-06 06:47:24');
/*!40000 ALTER TABLE `HomeBanner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ImageBanner`
--

DROP TABLE IF EXISTS `ImageBanner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ImageBanner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `buttonLabel` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ImageBanner`
--

LOCK TABLES `ImageBanner` WRITE;
/*!40000 ALTER TABLE `ImageBanner` DISABLE KEYS */;
INSERT INTO `ImageBanner` VALUES (1,'Lorem Ipsum is simply dummy text','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','Lorem Ipsum','e2a09ac3819002edffd36a2d61e8c5c5.jpeg','2019-03-27 11:53:47','2019-07-04 11:11:08');
/*!40000 ALTER TABLE `ImageBanner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListBlockedDates`
--

DROP TABLE IF EXISTS `ListBlockedDates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ListBlockedDates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `reservationId` int(11) DEFAULT NULL,
  `blockedDates` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `calendarId` int(11) DEFAULT NULL,
  `calendarStatus` enum('available','blocked','reservation') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isSpecialPrice` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `ListBlockedDates_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ListBlockedDates_ibfk_2` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListBlockedDates`
--

LOCK TABLES `ListBlockedDates` WRITE;
/*!40000 ALTER TABLE `ListBlockedDates` DISABLE KEYS */;
INSERT INTO `ListBlockedDates` VALUES (1,7,NULL,'2019-07-04 06:30:00','2019-07-04 06:49:04','2019-07-04 06:56:10',NULL,'blocked',10),(2,7,NULL,'2019-07-05 06:30:00','2019-07-04 06:49:04','2019-07-04 06:56:10',NULL,'blocked',10);
/*!40000 ALTER TABLE `ListBlockedDates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListCalendar`
--

DROP TABLE IF EXISTS `ListCalendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ListCalendar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `ListCalendar_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListCalendar`
--

LOCK TABLES `ListCalendar` WRITE;
/*!40000 ALTER TABLE `ListCalendar` DISABLE KEYS */;
/*!40000 ALTER TABLE `ListCalendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListPhotos`
--

DROP TABLE IF EXISTS `ListPhotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ListPhotos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `isCover` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `ListPhotos_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListPhotos`
--

LOCK TABLES `ListPhotos` WRITE;
/*!40000 ALTER TABLE `ListPhotos` DISABLE KEYS */;
INSERT INTO `ListPhotos` VALUES (57,1,'dcda484c967e8df86e64f0f394498c6b.jpeg','image/jpeg',0,'2020-01-23 05:36:39','2020-01-23 05:36:39'),(58,1,'394d7c5d3da2621b559887435d8011d0.jpeg','image/jpeg',0,'2020-01-23 05:36:39','2020-01-23 05:36:39'),(60,1,'8698cc427d4e10b7eb6aaf5038db0040.jpeg','image/jpeg',0,'2020-01-23 05:36:39','2020-01-23 05:36:39'),(61,2,'77d1573a6965309f7a2c23ea11cef7e0.jpeg','image/jpeg',0,'2020-01-23 05:37:31','2020-01-23 05:37:31'),(62,2,'afd75f9701dbf592ce119162fc3e38b7.jpeg','image/jpeg',0,'2020-01-23 05:37:31','2020-01-23 05:37:31'),(63,2,'866f343a16430b0a9b97bfd3b1b6a587.jpeg','image/jpeg',0,'2020-01-23 05:37:31','2020-01-23 05:37:31'),(64,2,'b486b9fc9dde068102e964f37b5ff855.jpeg','image/jpeg',0,'2020-01-23 05:37:31','2020-01-23 05:37:31'),(65,3,'da06a23c01f8a092370cea8803249b4f.jpeg','image/jpeg',0,'2020-01-23 05:38:35','2020-01-23 05:38:35'),(67,3,'8e3a897a800f2c828a16032533a5f209.jpeg','image/jpeg',0,'2020-01-23 05:38:35','2020-01-23 05:38:35'),(68,3,'db757d32c2f546843c4ee734641c53c5.jpeg','image/jpeg',0,'2020-01-23 05:38:35','2020-01-23 05:38:35'),(69,3,'3628f4dc2294d66e680ccf7bb41682f9.jpeg','image/jpeg',0,'2020-01-23 05:38:35','2020-01-23 05:38:35'),(70,3,'27acc79bfce120f16cea205e51a3f324.jpeg','image/jpeg',0,'2020-01-23 05:39:29','2020-01-23 05:39:29'),(71,4,'42050893b5a4b64369f84033cf43987f.jpeg','image/jpeg',0,'2020-01-23 05:40:03','2020-01-23 05:40:03'),(72,4,'6b0622e937f88571711c52bbdf290bc8.jpeg','image/jpeg',0,'2020-01-23 05:40:03','2020-01-23 05:40:03'),(73,4,'3e135cfea39185357f38a98ba1f201b0.jpeg','image/jpeg',0,'2020-01-23 05:40:11','2020-01-23 05:40:11'),(74,4,'91cac4f4d0d3e9cc72ff6ad75c38e663.jpeg','image/jpeg',0,'2020-01-23 05:40:19','2020-01-23 05:40:19'),(75,5,'8ad7c57de58e95f65aae90ddd2360008.jpeg','image/jpeg',0,'2020-01-23 05:41:36','2020-01-23 05:41:36'),(76,5,'84958eea5f87554e55b6544659b5710a.jpeg','image/jpeg',0,'2020-01-23 05:41:42','2020-01-23 05:41:42'),(77,5,'5f15b1ad8688df1c85d321995a0c0737.jpeg','image/jpeg',0,'2020-01-23 05:41:49','2020-01-23 05:41:49'),(78,5,'14a9105e3a02bd3ee426fc872b3a7e74.jpeg','image/jpeg',0,'2020-01-23 05:41:54','2020-01-23 05:41:54'),(79,6,'9d956fb476a25976009d856703a59e84.jpeg','image/jpeg',0,'2020-01-23 05:42:24','2020-01-23 05:42:24'),(80,6,'42a7e827a18c9a51b7b8fedebac09349.jpeg','image/jpeg',0,'2020-01-23 05:42:32','2020-01-23 05:42:32'),(81,6,'8c649d8e694481e5bc77196a7634d397.jpeg','image/jpeg',0,'2020-01-23 05:42:37','2020-01-23 05:42:37'),(82,6,'9be399d3fd4c13f2b03c719728847b68.jpeg','image/jpeg',0,'2020-01-23 05:42:45','2020-01-23 05:42:45'),(83,6,'182abd0d95358fc8616e4461928d27ae.jpeg','image/jpeg',0,'2020-01-23 05:42:51','2020-01-23 05:42:51'),(84,7,'33aeec2a8924021116181daa8074a417.jpeg','image/jpeg',0,'2020-01-23 05:43:40','2020-01-23 05:43:40'),(85,7,'01608e58a5d1c6e843c479da5384e47e.jpeg','image/jpeg',0,'2020-01-23 05:43:57','2020-01-23 05:43:57'),(86,7,'1a32aaeec0eb1e2b51bb5f9143e63670.jpeg','image/jpeg',0,'2020-01-23 05:44:11','2020-01-23 05:44:11'),(87,7,'e981d7b0d542793aef6a917b4eedccb1.jpeg','image/jpeg',0,'2020-01-23 05:44:16','2020-01-23 05:44:16'),(88,1,'3ad006e157cd885569f68988c026bfc4.jpeg','image/jpeg',0,'2020-01-23 05:47:34','2020-01-23 05:47:34'),(89,8,'de5861a5c50f95fd36c2aaa705dad602.jpeg','image/jpeg',0,'2020-01-23 05:51:24','2020-01-23 05:51:24'),(90,8,'90f82aab773399b4b89575ba2d04f6f8.jpeg','image/jpeg',0,'2020-01-23 05:51:24','2020-01-23 05:51:24'),(91,8,'f28fc2ffae8165c6ad2cfc7222d20093.jpeg','image/jpeg',0,'2020-01-23 05:52:02','2020-01-23 05:52:02'),(92,8,'e814f3b9c0221b7a6b64dae48c1ad50b.jpeg','image/jpeg',0,'2020-01-23 05:52:10','2020-01-23 05:52:10');
/*!40000 ALTER TABLE `ListPhotos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListSettings`
--

DROP TABLE IF EXISTS `ListSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ListSettings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeId` int(11) NOT NULL,
  `itemName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `otherItemName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `minimum` int(11) DEFAULT NULL,
  `startValue` int(11) DEFAULT NULL,
  `endValue` int(11) DEFAULT NULL,
  `step` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isEnable` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `itemDescription` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `typeId` (`typeId`),
  CONSTRAINT `ListSettings_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `ListSettingsTypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListSettings`
--

LOCK TABLES `ListSettings` WRITE;
/*!40000 ALTER TABLE `ListSettings` DISABLE KEYS */;
INSERT INTO `ListSettings` VALUES (5,3,'House',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:46:35','2018-04-11 15:19:10',NULL),(6,3,'Apartment',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:46:42','2017-01-09 07:46:42',NULL),(7,3,'Bed & Breakfast',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:46:49','2017-01-09 07:46:49',NULL),(8,3,'Boutique hotel',NULL,NULL,NULL,NULL,NULL,NULL,'0','2017-01-09 07:46:57','2018-05-05 11:23:23',NULL),(10,4,'1-5 Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:49:23','2017-01-09 07:49:23',NULL),(11,4,'6-25 Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:49:35','2017-01-09 07:49:35',NULL),(14,5,'bedroom  ','bedrooms ',NULL,NULL,1,10,NULL,'1','2017-01-09 07:53:04','2018-05-02 04:54:59',NULL),(15,6,'bed','beds',NULL,NULL,1,16,NULL,'1','2017-01-09 07:53:48','2018-04-28 04:50:39',NULL),(16,7,'Single',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:59:47','2017-01-09 07:59:47',NULL),(17,7,'Double',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:59:57','2017-01-09 07:59:57',NULL),(18,7,'Queen',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:00:05','2017-01-09 08:00:05',NULL),(19,7,'King',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:00:13','2017-01-09 08:00:13',NULL),(20,7,'Bunk bed',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:00:20','2017-01-09 08:00:20',NULL),(21,8,'bathroom','bathrooms',NULL,NULL,1,8,NULL,'1','2017-01-09 08:12:24','2018-04-10 07:04:01',NULL),(22,9,'Private Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:31:16','2017-01-09 08:31:16',NULL),(23,9,'Shared Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:31:28','2017-01-09 08:31:28',NULL),(24,9,'Other',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:31:32','2017-01-09 08:31:32',NULL),(25,10,'Towels, bed sheets, soap, and toilet paper',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:43:32','2017-01-09 08:43:32',NULL),(26,10,'Wifi',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:43:42','2017-01-09 08:43:42',NULL),(27,10,'Shampoo ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:43:51','2017-01-09 08:43:51',NULL),(28,10,'Closet/drawers',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:00','2017-01-09 08:44:00',NULL),(29,11,'Smoke detector',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:17','2017-01-09 08:44:17',NULL),(30,11,'Carbon monoxide detector',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:25','2017-01-09 08:44:25',NULL),(31,11,'First aid kit ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:33','2017-01-09 08:44:33',NULL),(32,11,'Safety card',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:41','2017-01-09 08:44:41',NULL),(33,12,'Kitchen',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:19','2017-01-09 09:05:19',NULL),(34,12,'Laundry – washer ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:26','2017-01-09 09:05:26',NULL),(35,12,'Laundry – dryer',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:33','2017-01-09 09:05:33',NULL),(36,12,'Parking',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:40','2017-01-09 09:05:40',NULL),(39,2,'guest','guests',NULL,NULL,1,20,NULL,'1','2017-01-09 10:51:56','2018-05-22 08:47:42',NULL),(45,13,'Payment information',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 07:48:16','2017-01-18 07:48:16',NULL),(46,13,'Agree to your House Rules',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 08:02:20','2018-04-12 08:08:01',NULL),(47,13,'Tell you their trip purpose',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 08:02:29','2017-01-18 08:02:29',NULL),(48,14,'Suitable for children (2-14 years) ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:20','2018-03-15 18:16:04',NULL),(49,14,'Suitable for infants (Under 2 years)',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:28','2017-01-18 10:00:28',NULL),(50,14,'Suitable for pets',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:35','2017-01-18 10:00:35',NULL),(51,14,'Smoking Not allowed ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:41','2018-04-25 01:16:08',NULL),(52,14,'Events or parties allowed',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:56','2017-01-18 10:00:56',NULL),(53,15,'Meet RentAll’s guest requirements',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:01:08','2017-01-18 11:01:08',NULL),(54,15,'Agree to your house rules',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:01:16','2017-01-18 11:01:16',NULL),(55,15,'Tell you their trip purpose',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:01:25','2017-01-18 11:01:25',NULL),(56,15,'Let you know how many people are coming on the trip',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:03:00','2018-05-02 04:57:56',NULL),(58,16,'1 day',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:19:43','2017-01-18 15:19:43',NULL),(59,16,'2 days',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:19:48','2017-01-18 15:19:48',NULL),(60,16,'3 days',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:19:58','2017-01-18 15:19:58',NULL),(61,16,'7 days',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:20:03','2017-01-18 15:20:03',NULL),(62,17,'Dates unavailable by default',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:01','2017-01-18 18:01:01',NULL),(63,17,'Any time',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:16','2017-01-18 18:01:16',NULL),(64,17,'3 months',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:22','2017-01-18 18:01:22',NULL),(65,17,'6 months',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:29','2017-01-18 18:01:29',NULL),(66,17,'1 year',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:42','2017-01-18 18:01:42',NULL),(67,18,'night min','nights min',NULL,NULL,0,100,NULL,'1','2017-01-18 18:18:28','2018-04-28 04:56:03',NULL),(68,19,'night max','nights max',NULL,NULL,0,100,NULL,'1','2017-01-18 18:19:00','2018-05-02 04:59:10',NULL),(73,10,'Hair dryer',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-28 11:36:34','2017-07-28 14:45:50',NULL),(74,1,'Guest Room',NULL,NULL,NULL,NULL,NULL,NULL,'0','2017-07-28 14:21:14','2018-04-27 14:15:42',NULL),(76,1,'Private Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-30 04:24:13','2017-07-30 04:24:13',NULL),(77,1,'Entire Place',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-30 04:24:18','2018-04-27 13:10:06',NULL),(87,10,'LED TV',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-10 05:13:44','2018-04-28 04:52:14',NULL),(97,10,'TV',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-10 07:29:11','2018-04-10 07:29:32',NULL),(100,3,'Cottage ',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-10 08:56:22','2018-04-28 04:47:07',NULL),(102,4,'25-50 Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-10 08:57:40','2018-04-28 04:48:13',NULL),(103,14,'Loud Music Not Allowed',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-10 09:00:48','2018-05-02 04:57:29',NULL),(105,4,'50-100 Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-12 08:08:55','2018-04-28 04:48:27',NULL),(106,10,'item',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-12 08:09:22','2018-04-23 15:27:14',NULL),(110,1,'Landscape Trailer',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-24 00:24:06','2018-04-27 14:15:50',NULL),(112,1,'Tent',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-24 02:28:25','2018-05-02 04:53:56',NULL),(113,1,'Shared Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-24 02:28:41','2018-04-24 02:28:41',NULL),(118,10,'Parking',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-24 02:33:13','2018-04-24 02:33:13',NULL),(119,10,'Swimming Pool',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-24 02:33:23','2020-04-13 13:09:35','d8e103a2e500b56205bd28147fccae88.png'),(122,1,'happyplace',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-25 14:55:53','2018-05-02 04:53:51',NULL),(123,3,'House with garden',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-25 14:56:34','2018-04-28 04:47:28',NULL),(125,14,'Loud People are not allowed',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-25 14:59:40','2018-04-28 04:27:21',NULL),(126,4,'100+ Rooms',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-28 04:49:12','2018-04-28 04:49:12',NULL),(127,13,'Confirmed Email',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-28 04:53:50','2018-04-28 04:53:50',NULL),(128,16,'Same day',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-28 04:55:21','2018-04-30 21:33:25',NULL);
/*!40000 ALTER TABLE `ListSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListSettingsTypes`
--

DROP TABLE IF EXISTS `ListSettingsTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ListSettingsTypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) NOT NULL,
  `fieldType` enum('stringType','numberType') DEFAULT 'stringType',
  `step` int(11) DEFAULT '1',
  `isEnable` varchar(255) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `typeLabel` varchar(255) DEFAULT NULL,
  `isMultiValue` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListSettingsTypes`
--

LOCK TABLES `ListSettingsTypes` WRITE;
/*!40000 ALTER TABLE `ListSettingsTypes` DISABLE KEYS */;
INSERT INTO `ListSettingsTypes` VALUES (1,'roomType','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Room Type',0),(2,'personCapacity','numberType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Person Capacity',0),(3,'houseType','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','House Type',0),(4,'buildingSize','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Building Size',0),(5,'bedrooms','numberType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Bed Rooms',0),(6,'beds','numberType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Beds',0),(7,'bedType','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Bed Type',0),(8,'bathrooms','numberType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Bathrooms',0),(9,'bathroomType','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Bathroom Type',0),(10,'essentialsAmenities','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Essential Amenities',1),(11,'safetyAmenities','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Safety Amenities',1),(12,'spaces','stringType',1,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Spaces',1),(13,'guestRequirements','stringType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Guest Requirements',0),(14,'houseRules','stringType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','House Rules',1),(15,'reviewGuestBook','stringType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Review How Guests Book',0),(16,'bookingNoticeTime','stringType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Booking Notice Time',0),(17,'maxDaysNotice','stringType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Maximum Days Notice',0),(18,'minNight','numberType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Minimum Nights',0),(19,'maxNight','numberType',3,'1','2019-03-27 11:53:47','0000-00-00 00:00:00','Maximum Nights',0);
/*!40000 ALTER TABLE `ListSettingsTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListViews`
--

DROP TABLE IF EXISTS `ListViews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ListViews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `userId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListViews`
--

LOCK TABLES `ListViews` WRITE;
/*!40000 ALTER TABLE `ListViews` DISABLE KEYS */;
INSERT INTO `ListViews` VALUES (1,1,'977bc550-5069-11e9-a14e-635e0fd3bfa6','2019-07-04 13:37:45','2019-07-04 13:37:45'),(2,6,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6','2020-04-13 12:54:11','2020-04-13 12:54:11');
/*!40000 ALTER TABLE `ListViews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Listing`
--

DROP TABLE IF EXISTS `Listing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Listing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roomType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `houseType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `residenceType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bedrooms` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buildingSize` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bedType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `beds` int(11) DEFAULT NULL,
  `personCapacity` int(11) DEFAULT NULL,
  `bathrooms` float DEFAULT NULL,
  `bathroomType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buildingName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zipcode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lat` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lng` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isMapTouched` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  `coverPhoto` int(10) DEFAULT NULL,
  `bookingType` enum('request','instant') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'instant',
  `isPublished` tinyint(1) NOT NULL DEFAULT '0',
  `isReady` tinyint(1) NOT NULL DEFAULT '0',
  `reviewsCount` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Listing_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Listing`
--

LOCK TABLES `Listing` WRITE;
/*!40000 ALTER TABLE `Listing` DISABLE KEYS */;
INSERT INTO `Listing` VALUES (1,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','2',NULL,NULL,3,3,3,NULL,'US','763 Massachusetts Avenue',NULL,'Middlesex County','MA','02420','42.42703074607657','-71.20063239836423',1,'2019-03-27 09:45:41','2020-04-13 13:00:00','Off-grid it House and stunning view ','The Off-grid itHouse is an architecturally significant house, recently noted by Dwell as one of the \'Best Homes in America\' and in the Los Angeles Times as one of the best houses of all time in Southern California. The Off-grid itHouse is one of 10 IT Houses built in California, which have received much acclaim such as the Western Home award sponsored by Sunset magazine. Also noted as one of the top 10 airbnb rentals worldwide. This is the prototype for the pre-engineered system known as the IT House.\n\nThe house is 100% off-grid, powered by solar panels for energy and hot water, and is located in a pristine remote valley in the beautiful California high desert. The house observes key green principals of smaller footprint, minimal disturbance to the natural beauty of the surrounding landscape, use of renewable resources, and living simply and minimally.\n\nThe setting of the house is remote and serene, a quiet refuge from everything, free from distractions. Amazing views and vistas in all directions.\n\nPerfect for design or green aficionados, writers or those needing a secluded quiet getaway.',58,'request',1,1,0),(2,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',NULL,NULL,'0','1',NULL,NULL,2,2,2,NULL,'US','Guizhou Province Architectural Design & Research Institute, Nanming, , , /','','YunYan','Guizhou','551400','26.8429645','107.2902839',1,'2019-03-27 09:50:28','2020-04-13 13:00:00','Classic Harlem Brownstone - NYC',' Your Master Bedroom is located on the top floor of a classic Harlem brownstone, with a full guests-shared kitchen and bath. The home is located on Sugar Hill and is across the street from St. Nicholas Park and Hamilton Grange.\n\nThe Master Bedroom is on the top floor of a classic Harlem brownstone, build in 1901. It is gorgeous and spacious, facing the front of the house. You will have soft light in the morning, and a wonderful view of the city lights at night.\n\nPop out to the balcony or across the street to the park for some fresh air! Hamilton Heights, where the home is located, is a fun neighborhood with great fine dining, brunch and tasty takeout! You will have plenty of options for restaurants, bars, music venues and historical landmarks to visit during your stay.\n\nOnce home, enjoy the peace and quite of Hamilton Terrace. This beautiful and historic block is a quaint residential enclave you\'ll love at first sight!\n\nGuest access\n\nGuest have complete access to the full kitchen and full bath.',62,'instant',1,1,0),(3,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',NULL,NULL,'0','3',NULL,NULL,3,5,2.5,NULL,'GB','76 Russell Rd, ',NULL,'Nottingham','UK','NG1 5AW','52.9550908','-1.1583049',1,'2019-03-27 09:54:02','2020-04-13 13:00:00','Immaculate Lakefront Condo w/boat slip-THIS IS IT!','Whether you need a romantic getaway for two, a family fun week at the lake, or a fisherman\'s weekend, Smith Mountain Lake & our penthouse condo has it all just steps from the water. From sitting on the deck watching the sunset over the water while enjoying your favorite beverage, to drifting off to sleep cuddled up in our crisp linens after a day on the lake - Come for a visit - fall in love for a lifetime!',68,'request',1,1,0),(4,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','1',NULL,NULL,1,1,1,NULL,'US','328 East Fir Avenue, ',NULL,'Atwater','CA','90001','37.3456814','-120.5913511',1,'2019-03-27 09:56:36','2020-04-13 13:00:00','Adorable townhouse near MFL train & hipster spots','Relax in this adorable and cozy little Philly row house in the calm end of Fishtown. Steps from great coffee, cute independent shops and galleries, a stones throw from more hipster amenities, food and nightlife throughout Fishtown and Northern Liberties. And just a quick ride away from Old City, Center City or the airport.\n\nFull kitchen - Laundry - Patio - Free unlimited street parking all around and easy loading area right out front',73,'request',1,1,0),(5,'977bc550-5069-11e9-a14e-635e0fd3bfa6',NULL,NULL,NULL,'3',NULL,NULL,3,3,3,NULL,'GB','Basse Normandie, Rue Verte, ',NULL,'Hérouville-Saint-Clair','France','75116','49.205084','-0.318614',1,'2019-03-27 10:03:30','2020-04-13 13:00:00','Historic Georgian Lakeside Mansion 500 acre Park','This 250 year old delightful and spacious Georgian Menagerie - a replica of that built for Marie Antoinette at Palace of Versailles - is set within 10 acres of private grounds in a 500 acre country park. Sleep in a four poster bed, handmade from oak gifted to the owners by Prince Charles; one of 5 bedrooms available (with a further 2 by separate negotiation)',75,'request',1,1,0),(6,'977bc550-5069-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','2',NULL,NULL,2,2,2,NULL,'GB','Oristano Stazione F.s., Oristano, ','','Province of Oristano','Italy','09170','39.90105570554223','8.60587392065429',1,'2019-03-27 10:07:00','2020-04-13 13:00:00','Lux LoftApartment Nr City Centre with GatedParking','A ground floor light filled spacious apartment with amazing décor perfect for singles, couples, a romantic retreat, a group of friends, families and business travel. A stone\'s throw from City Centre with easy quick transport links or walking. 15/20 min walk to City Centre . 10 min walk to Cardiff City Stadium. The stunning galleried bedroom area is on a mezzanine level overlooking a large living area. Secure Private Parking and Bike Shed in gated courtyard and outside seating area.',81,'instant',1,1,0),(7,'977bc550-5069-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','5',NULL,NULL,6,4,4,NULL,'GB','69 Commercial Street',NULL,'Greater London','England','E1 7NE','51.51743291864772','-0.07390837724608446',1,'2019-03-27 10:09:22','2020-04-13 13:00:00','Historic and Stunning, Large Central Bedford House','Amazing Georgian home which can accommodate several families (up to 20+): roaring fires, kitchen range vast living rooms (can be candlelit throughout), third-acre garden; lawn tennis, swimming, piano. Our home is in the centre of Bedford, close for shopping, a huge variety of restaurants and pubs. A five minute walk to the town and beautiful river beyond; less to the bus station, and ten to the railway station with easy access to London (35 minutes) and a short drive (45 minutes) to Cambridge.',87,'request',1,1,0),(8,'977bc550-5069-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','5',NULL,NULL,5,5,2.5,NULL,'IE','Aidan Chamberlain property is located in Killorglin, IE',NULL,'KE','County Kerry','53665','52.122014593253695','-9.751445003857414',1,'2020-01-23 05:50:54','2020-04-13 13:10:31','River Laune in Main st Killorglin, - 3-star guest','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English the banks of the River Laune in Killorglin, Couples particularly like the location, Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humor and the like). this 3-star guest house has pretty river and mountain views. There is free Wi-Fi throughout, and free private parking on site. Coffey\'s Rivers Edge guest house has a balcony running the width of the house, and you can sit outside to read, play cards, or enjoy a drink and the picturesque views.',90,'request',1,1,0);
/*!40000 ALTER TABLE `Listing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListingData`
--

DROP TABLE IF EXISTS `ListingData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ListingData` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) DEFAULT NULL,
  `bookingNoticeTime` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `checkInStart` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Flexible',
  `checkInEnd` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Flexible',
  `minNight` int(11) DEFAULT NULL,
  `maxNight` int(11) DEFAULT NULL,
  `priceMode` tinyint(1) DEFAULT NULL,
  `basePrice` float DEFAULT '0',
  `maxPrice` float DEFAULT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hostingFrequency` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weeklyDiscount` float DEFAULT '0',
  `monthlyDiscount` float DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `cleaningPrice` float DEFAULT '0',
  `maxDaysNotice` enum('unavailable','3months','6months','9months','12months','available') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unavailable',
  `cancellationPolicy` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `ListingData_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListingData`
--

LOCK TABLES `ListingData` WRITE;
/*!40000 ALTER TABLE `ListingData` DISABLE KEYS */;
INSERT INTO `ListingData` VALUES (1,1,'59','14','19',0,6,NULL,135,NULL,'USD',NULL,2,5,'2019-03-27 09:49:54','2019-03-27 09:49:54',50,'available',2),(2,2,'58','Flexible','Flexible',0,4,NULL,250,NULL,'USD',NULL,5,10,'2019-03-27 09:52:48','2019-03-27 09:52:48',50,'available',3),(3,3,'59','14','22',2,0,NULL,500,NULL,'USD',NULL,4,8,'2019-03-27 09:55:45','2019-03-27 09:55:45',50,'available',1),(4,4,'58','10','15',1,6,NULL,550,NULL,'USD',NULL,3,6,'2019-03-27 09:59:06','2019-03-27 09:59:06',25,'available',1),(5,5,'59','16','19',0,11,NULL,650,NULL,'EUR',NULL,5,15,'2019-03-27 10:05:46','2019-03-27 10:05:46',NULL,'available',3),(6,6,'58','11','20',2,0,NULL,850,NULL,'EUR',NULL,5,NULL,'2019-03-27 10:08:24','2019-03-27 10:08:28',50,'available',1),(7,7,'59','15','Flexible',1,0,NULL,550,NULL,'EUR',NULL,3,8,'2019-03-27 10:11:05','2019-11-13 11:56:53',45,'available',2),(8,8,'60','10','20',3,0,NULL,750,NULL,'USD',NULL,4,12,'2020-01-23 05:53:23','2020-01-23 05:53:23',25,'available',3);
/*!40000 ALTER TABLE `ListingData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PaymentMethods`
--

DROP TABLE IF EXISTS `PaymentMethods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PaymentMethods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `processedIn` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fees` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details` mediumtext COLLATE utf8mb4_unicode_ci,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `paymentType` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentMethods`
--

LOCK TABLES `PaymentMethods` WRITE;
/*!40000 ALTER TABLE `PaymentMethods` DISABLE KEYS */;
INSERT INTO `PaymentMethods` VALUES (1,'Paypal','3–4 hours','PayPal withdrawal fees','USD','Connect your existing PayPal account.',1,'2017-04-18 20:13:25','2017-04-18 20:13:25',1),(2,'Bank Account','5 to 7 business days','No fees','USD','Add your bank details',1,'2018-01-04 17:26:45','2018-01-04 17:26:45',2);
/*!40000 ALTER TABLE `PaymentMethods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PaymentSettings`
--

DROP TABLE IF EXISTS `PaymentSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PaymentSettings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `paymentName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paymentStatus` enum('true','false') COLLATE utf8mb4_unicode_ci DEFAULT 'false',
  `paymentMode` enum('live','sandbox') COLLATE utf8mb4_unicode_ci DEFAULT 'sandbox',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `APIUserId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `APIPassword` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `APISecret` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AppId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentSettings`
--

LOCK TABLES `PaymentSettings` WRITE;
/*!40000 ALTER TABLE `PaymentSettings` DISABLE KEYS */;
INSERT INTO `PaymentSettings` VALUES (1,'paypal','false','sandbox','admin@gmail.com','Hello User Id','Hello password','Hello Secret','Hello Id','2019-03-27 11:53:47','2017-02-24 11:29:31');
/*!40000 ALTER TABLE `PaymentSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payout`
--

DROP TABLE IF EXISTS `Payout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Payout` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `methodId` int(11) NOT NULL,
  `userId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payEmail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address1` mediumtext COLLATE utf8mb4_unicode_ci,
  `address2` mediumtext COLLATE utf8mb4_unicode_ci,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipcode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `default` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `last4Digits` int(10) DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Payout_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payout`
--

LOCK TABLES `Payout` WRITE;
/*!40000 ALTER TABLE `Payout` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PopularLocation`
--

DROP TABLE IF EXISTS `PopularLocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PopularLocation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location` varchar(255) NOT NULL,
  `locationAddress` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PopularLocation`
--

LOCK TABLES `PopularLocation` WRITE;
/*!40000 ALTER TABLE `PopularLocation` DISABLE KEYS */;
INSERT INTO `PopularLocation` VALUES (1,'Greater London','198 Gambler Lane, Clarksburg, WV, USA','640cfab675d449a1187ffe26c17f3161.jpeg',1,'2019-03-27 10:17:45','2019-07-04 10:49:43'),(2,'Oristano','Oristano Stazione F.s., Oristano, Province of Oristano, Italy','9b1373af96b5dff40edd6bd9e7735cdb.jpeg',1,'2019-03-27 10:20:32','2019-07-04 10:53:02'),(3,'Basse-Normandie','Basse Normandie, Rue Verte, Hérouville-Saint-Clair, France','76c7707dbec00ac80e22b07cde982e33.jpeg',1,'2019-03-27 10:27:32','2019-07-04 10:57:37'),(4,'Fergus Falls','328 East Fir Avenue, Atwater, CA, USA','67416a5277d6d7b21236794d9548f04c.jpeg',1,'2019-03-27 10:28:56','2019-07-04 10:59:06'),(5,'SHIELS','76 Russell Rd, Nottingham, UK','13f96d1479f69394ae3947663a5b2746.jpeg',1,'2019-03-27 10:30:17','2019-07-04 11:00:44'),(7,'Cambridge','763 Massachusetts Avenue, Cambridge, MA 02420, U.S.','584540d3bc9408b86bc0507d668bd411.jpeg',1,'2019-07-04 11:03:21','2019-07-04 11:03:21'),(9,'Cambodia','no. 15 St 420, Phnom Penh, Cambodia','01310e90580242aaa6b1de8029d27d54.jpeg',1,'2019-07-04 11:17:30','2019-07-04 11:17:30'),(10,'Blue Lagoon, Ölüdeniz, Turkey','Laleli, Mimar Kemalettin Mahallesi, Fatih/Istanbul, Turkey','cb9a75cdf4f5f82eaae80d801e52b674.jpeg',1,'2019-07-04 11:18:38','2019-07-04 11:18:38'),(11,'Seychelles','Anse Source d\'Argent, La Digue, Seychelles','9f74354f93356bf6a3955804fd95020f.jpeg',1,'2019-07-04 11:19:11','2019-07-04 11:19:11'),(12,'New York','NYC, NY, USA','e6b011cfb2eaa59eb00278ebc066c4ee.jpeg',1,'2019-07-04 11:20:15','2019-07-04 11:20:15'),(13,'Paris','Paris-Charles de Gaulle Airport (CDG), Roissy-en-France, France','44931b9e30b46e51d1aa2bcb09f8b906.jpeg',1,'2019-07-04 11:20:48','2019-07-04 15:30:26'),(14,'Bradford','261 Southfield Lane, Bradford BD7 3NN, UK','1ce7239bb959bf72d651019eda3a8a2c.jpeg',1,'2019-07-04 11:21:19','2019-07-04 11:21:19');
/*!40000 ALTER TABLE `PopularLocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recommend`
--

DROP TABLE IF EXISTS `Recommend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Recommend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recommend`
--

LOCK TABLES `Recommend` WRITE;
/*!40000 ALTER TABLE `Recommend` DISABLE KEYS */;
INSERT INTO `Recommend` VALUES (1,7,'2019-03-27 10:32:50','2019-03-27 10:32:50'),(2,6,'2019-03-27 10:32:51','2019-03-27 10:32:51'),(3,5,'2019-03-27 10:32:52','2019-03-27 10:32:52'),(4,4,'2019-03-27 10:32:53','2019-03-27 10:32:53'),(5,3,'2019-03-27 10:32:54','2019-03-27 10:32:54'),(6,2,'2019-03-27 10:32:55','2019-03-27 10:32:55'),(7,1,'2019-03-27 10:32:56','2019-03-27 10:32:56');
/*!40000 ALTER TABLE `Recommend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReportUser`
--

DROP TABLE IF EXISTS `ReportUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ReportUser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reporterId` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `reportType` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReportUser`
--

LOCK TABLES `ReportUser` WRITE;
/*!40000 ALTER TABLE `ReportUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReportUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reservation`
--

DROP TABLE IF EXISTS `Reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reservation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `hostId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guestId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checkIn` datetime NOT NULL,
  `checkOut` datetime NOT NULL,
  `guests` int(11) DEFAULT '1',
  `message` mediumtext COLLATE utf8mb4_unicode_ci,
  `basePrice` float NOT NULL,
  `cleaningPrice` float DEFAULT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` float DEFAULT NULL,
  `discountType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guestServiceFee` float DEFAULT NULL,
  `hostServiceFee` float DEFAULT NULL,
  `total` float NOT NULL,
  `confirmationCode` int(11) DEFAULT NULL,
  `paymentState` enum('pending','completed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `payoutId` int(11) DEFAULT NULL,
  `reservationState` enum('pending','approved','declined','completed','cancelled','expired') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `paymentMethodId` tinyint(1) DEFAULT NULL,
  `cancellationPolicy` int(11) DEFAULT NULL,
  `isSpecialPriceAverage` float DEFAULT NULL,
  `dayDifference` float DEFAULT NULL,
  `paymentIntentId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reservation`
--

LOCK TABLES `Reservation` WRITE;
/*!40000 ALTER TABLE `Reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReservationSpecialPricing`
--

DROP TABLE IF EXISTS `ReservationSpecialPricing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ReservationSpecialPricing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) DEFAULT NULL,
  `reservationId` int(11) DEFAULT NULL,
  `blockedDates` datetime NOT NULL,
  `isSpecialPrice` float DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReservationSpecialPricing`
--

LOCK TABLES `ReservationSpecialPricing` WRITE;
/*!40000 ALTER TABLE `ReservationSpecialPricing` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReservationSpecialPricing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reviews`
--

DROP TABLE IF EXISTS `Reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reservationId` int(11) NOT NULL,
  `listId` int(11) NOT NULL,
  `authorId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reviewContent` text COLLATE utf8mb4_unicode_ci,
  `rating` float NOT NULL,
  `privateFeedback` mediumtext COLLATE utf8mb4_unicode_ci,
  `parentId` int(11) DEFAULT '0',
  `automated` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `isAdminEnable` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Reviews_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reviews`
--

LOCK TABLES `Reviews` WRITE;
/*!40000 ALTER TABLE `Reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SearchSettings`
--

DROP TABLE IF EXISTS `SearchSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SearchSettings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `minPrice` float NOT NULL,
  `maxPrice` float NOT NULL,
  `PriceRangecurrency` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SearchSettings`
--

LOCK TABLES `SearchSettings` WRITE;
/*!40000 ALTER TABLE `SearchSettings` DISABLE KEYS */;
INSERT INTO `SearchSettings` VALUES (1,10,10000,'USD','2019-03-27 11:53:47','2018-05-02 04:53:20');
/*!40000 ALTER TABLE `SearchSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `SequelizeMeta_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20180804061511-addUserBanStatus.js'),('20180804062523-addIsReadColumnInThreads.js'),('20180809095644-createBedTypeTable.js'),('20180919114144-addBanUserDefault.js'),('20180924105437-updateUserLoginTable.js'),('20180924130941-addNewUserLoginTable.js'),('20180929101729-updateNulledBanUserStatus.js'),('20180929110523-addColumnsForSmsVerification.js'),('20180929112313-updateCountyListWithDialCodes.js'),('20190105123130-addHomePageTypeSiteSettings.js'),('20190202071052-addIsListActiveField.js'),('20190202103305-updatePaymentMethods.js'),('20190206111430-createReportUser.js'),('20190223073145-addIsDeleteAtField.js'),('20190225042333-addReviewsCountInListing.js'),('20190322050510-addSiteSettingsField.js'),('20190325035946-addListBlockedDates.js'),('20190429092459-addColumNewThread.js'),('20190430110742-changeListingDataCloum.js'),('20190503052141-addColumnItemDescriptionListSettingsTable.js'),('20190513044345-addMetaFields.js'),('20190513070310-insertStaticpage.js'),('20190514121558-addCancellationPolicyReservation.js'),('20190525050311-changeDataTypeForItemDescription.js'),('20190527125405-addIsAdminEnableReviews.js'),('20190531062204-addReservationSpecialPricing.js'),('20190603083234-modifyBlogAndStaticPage.js'),('20190603102231-deleteInboxItem.js'),('20190604051522-addReservationFields.js'),('20190614110520-addPhoneStatus.js'),('20190615092318-addCountryNameInUserProfile.js'),('20190622051622-changeColumnLocationUserProfile.js'),('20190701041011-changeColumnTypeInSiteSettingsValue.js'),('20190712094239-deleteCoverPhotoRecordsFromListingTable.js'),('20190824052016-addHomePageLogoSiteSettings.js'),('20190827080301-addHomeBannerImage.js'),('20190828122142-addEmailPageLogoSiteSettings.js'),('20190830111259-addHomeLogoHeightSettings.js'),('20190902042250-addStaticBlockInfo.js'),('20190903093907-addStatusFieldInBlock.js'),('20190910043026-addPaymentIntentIdInReservation.js'),('20191008110026-testMigration.js'),('20191020041756-addUserListing.js'),('20191108043353-updateSteps.js'),('20200110151340-addRoleIdToAdminUser.js'),('20200217052735-addIsVerifiedToPayoutTable.js'),('20200323101255-addAppAvailableStatus.js'),('20200323102340-addPlayStoreUrl.js'),('20200323102456-addAppStoreUrl.js'),('20200324122956-contactPageManage.js'),('20200325110911-addWhyHostInfoBlocks.js'),('20200326043522-addHelpStaticPageManage.js'),('20200413120822-changeColumnValueAtWhyHostInfoBlock.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ServiceFees`
--

DROP TABLE IF EXISTS `ServiceFees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ServiceFees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guestType` enum('fixed','percentage') COLLATE utf8mb4_unicode_ci NOT NULL,
  `guestValue` float NOT NULL,
  `hostType` enum('fixed','percentage') COLLATE utf8mb4_unicode_ci NOT NULL,
  `hostValue` float NOT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ServiceFees`
--

LOCK TABLES `ServiceFees` WRITE;
/*!40000 ALTER TABLE `ServiceFees` DISABLE KEYS */;
INSERT INTO `ServiceFees` VALUES (1,'percentage',3,'percentage',9,'USD','2018-05-26 06:43:13','2018-05-26 06:43:13');
/*!40000 ALTER TABLE `ServiceFees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SiteSettings`
--

DROP TABLE IF EXISTS `SiteSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SiteSettings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SiteSettings`
--

LOCK TABLES `SiteSettings` WRITE;
/*!40000 ALTER TABLE `SiteSettings` DISABLE KEYS */;
INSERT INTO `SiteSettings` VALUES (1,'Site Name','siteName','Your Site','site_settings','2019-03-27 11:53:47','2020-04-13 12:57:11'),(2,'Site Title','siteTitle','Your Site Title','site_settings','2019-03-27 11:53:47','2020-04-13 12:57:12'),(3,'Meta Keyword','metaKeyword','Your Site Meta Keyword','site_settings','2019-03-27 11:53:47','2020-04-13 12:57:16'),(4,'Meta Discription','metaDescription','Your Site Meta Description','site_settings','2019-03-27 11:53:47','2020-04-13 12:57:12'),(10,'Facebook Link','facebookLink','https://www.facebook.com/radicalstartnow/','site_settings','2019-03-27 11:53:47','2020-04-13 12:57:12'),(11,'Twitter Link','twitterLink','https://twitter.com/radicalstartnow','site_settings','2019-03-27 11:53:47','2020-04-13 12:57:13'),(12,'Instagram Link','instagramLink','https://www.instagram.com/?hl=en','site_settings','2019-03-27 11:53:47','2020-04-13 12:57:13'),(64,'Logo Height','logoHeight','65','site_settings','2019-03-27 11:53:47','2020-04-13 12:57:11'),(65,'Logo Width','logoWidth','125','site_settings','2019-03-27 11:53:47','2020-04-13 12:57:12'),(66,'Home Page Banner Layout','homePageType','3','site_settings','2019-03-27 11:53:47','2020-04-13 12:57:13'),(67,'Video URL','videoLink','https://www.youtube.com/watch?v=5y2P4z7DM88','site_settings','2019-07-04 06:09:18','2020-04-13 12:57:13'),(68,'Phone Number Status','phoneNumberStatus','1','site_settings','2019-07-04 06:47:57','2020-04-13 12:57:14'),(72,'Home Logo Height','homeLogoHeight','65','site_settings','2019-09-06 06:41:03','2020-04-13 12:57:17'),(73,'Home Logo Width','homeLogoWidth','125','site_settings','2019-09-06 06:41:03','2020-04-13 12:57:17'),(74,'Logo','Logo','99ac17183073e38c787a71192f587608.png','site_settings','2019-09-06 06:44:40','2020-04-13 12:57:12'),(75,'Home Page Logo','homeLogo','337f4052d0be7376ff4e820956be1c57.png','site_settings','2019-09-06 06:45:00','2020-04-13 12:57:16'),(76,'Email Logo','emailLogo','88e8e1f411957f4ed28370d7eeb68774.png','site_settings','2019-09-06 06:45:13','2020-04-13 12:57:16'),(77,'App Available Status','appAvailableStatus','1','site_settings','2020-04-13 11:33:08','2020-04-13 12:57:14'),(78,'PlayStore URL','playStoreUrl','https://play.google.com/store','site_settings','2020-04-13 11:33:08','2020-04-13 12:57:15'),(79,'AppStore URL','appStoreUrl','https://www.apple.com/ios/app-store/','site_settings','2020-04-13 11:33:09','2020-04-13 12:57:15'),(80,'email','email','support@yourwebsite.com','site_settings','2020-04-13 11:33:09','2020-04-13 12:57:15'),(81,'Phone Number','phoneNumber','+0 000 0000','site_settings','2020-04-13 11:33:09','2020-04-13 12:57:16'),(82,'Address','address','Your Location, Country','site_settings','2020-04-13 11:33:09','2020-04-13 12:57:16');
/*!40000 ALTER TABLE `SiteSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StaticInfoBlock`
--

DROP TABLE IF EXISTS `StaticInfoBlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `StaticInfoBlock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `isEnable` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StaticInfoBlock`
--

LOCK TABLES `StaticInfoBlock` WRITE;
/*!40000 ALTER TABLE `StaticInfoBlock` DISABLE KEYS */;
INSERT INTO `StaticInfoBlock` VALUES (1,'Rent amazing homes for your trip','Homes with high standards and better facilities',NULL,'header',1,'2019-09-06 06:41:03','2019-09-06 06:49:26'),(2,'Enjoy your trip!','Rent the home that\'s suitable for you & your family and enjoy your trip!','6e43a271d065551362e9e57911b144ff.jpeg','block1',1,'2019-09-06 06:41:03','2019-09-06 06:49:26'),(3,'Trusted community!','Our community is completely driven by trust and your family safety is assured','e1f916093207db35c01154c4a82dc357.jpeg','block2',1,'2019-09-06 06:41:03','2019-09-06 06:49:26');
/*!40000 ALTER TABLE `StaticInfoBlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StaticPage`
--

DROP TABLE IF EXISTS `StaticPage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `StaticPage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pageName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaTitle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaDescription` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StaticPage`
--

LOCK TABLES `StaticPage` WRITE;
/*!40000 ALTER TABLE `StaticPage` DISABLE KEYS */;
INSERT INTO `StaticPage` VALUES (1,'About Us','<p></p>','About Us','About Us','2019-07-12 07:58:42','2019-07-12 07:58:42'),(2,'Trust & Safety','<p></p>','Trust & Safety','Trust & Safety','2019-07-12 07:58:42','2019-07-12 07:58:42'),(3,'Travel Credit','<p></p>','Travel Credit','Travel Credit','2019-07-12 07:58:42','2019-07-12 07:58:42'),(4,'Terms & Privacy','<p></p>','Terms & Privacy','Terms & Privacy','2019-07-12 07:58:42','2019-07-12 07:58:42'),(5,'Help','<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen books. </p>','Help','Help page description','2020-04-13 11:33:10','2020-04-13 13:07:55');
/*!40000 ALTER TABLE `StaticPage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ThreadItems`
--

DROP TABLE IF EXISTS `ThreadItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ThreadItems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `threadId` int(11) NOT NULL,
  `sentBy` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` mediumtext COLLATE utf8mb4_unicode_ci,
  `isRead` tinyint(1) DEFAULT NULL,
  `type` enum('message','inquiry','preApproved','declined','approved','pending','cancelledByHost','cancelledByGuest','intantBooking','requestToBook','confirmed','expired','completed') COLLATE utf8mb4_unicode_ci DEFAULT 'message',
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `personCapacity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `reservationId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `threadId` (`threadId`),
  CONSTRAINT `ThreadItems_ibfk_1` FOREIGN KEY (`threadId`) REFERENCES `Threads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ThreadItems`
--

LOCK TABLES `ThreadItems` WRITE;
/*!40000 ALTER TABLE `ThreadItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `ThreadItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Threads`
--

DROP TABLE IF EXISTS `Threads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Threads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `host` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guest` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isRead` tinyint(1) DEFAULT NULL,
  `messageUpdatedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `Threads_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Threads`
--

LOCK TABLES `Threads` WRITE;
/*!40000 ALTER TABLE `Threads` DISABLE KEYS */;
/*!40000 ALTER TABLE `Threads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Transaction`
--

DROP TABLE IF EXISTS `Transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reservationId` int(11) NOT NULL,
  `payerEmail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payerId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiverEmail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiverId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transactionId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `total` float NOT NULL,
  `transactionFee` float DEFAULT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ipn_track_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentType` enum('booking','cancellation','host') COLLATE utf8mb4_unicode_ci DEFAULT 'booking',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `paymentMethodId` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `Transaction_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transaction`
--

LOCK TABLES `Transaction` WRITE;
/*!40000 ALTER TABLE `Transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `Transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TransactionHistory`
--

DROP TABLE IF EXISTS `TransactionHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TransactionHistory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reservationId` int(11) NOT NULL,
  `userId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payoutId` int(11) NOT NULL,
  `payoutEmail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` float NOT NULL,
  `fees` float DEFAULT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `transactionId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentMethodId` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `TransactionHistory_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TransactionHistory`
--

LOCK TABLES `TransactionHistory` WRITE;
/*!40000 ALTER TABLE `TransactionHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `TransactionHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailConfirmed` tinyint(1) DEFAULT '0',
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userBanStatus` tinyint(1) DEFAULT '0',
  `userDeletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('977bc550-5069-11e9-a14e-635e0fd3bfa6','qa@radicalstart.com','$2a$08$lqcmo6OgjVbcioD1uDAlueCdu6JYBwZe2xaoc1dEparRYKDjFrv9y',1,'email','2019-03-27 08:23:25','2019-03-27 08:23:25',0,NULL),('d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6','demo@radicalstart.com','$2a$08$jkiXGz2lM41L47LdWFTBZuLhwT3dTLDK3Nmhjx6PrRydp0DEEb9gG',1,'email','2019-03-27 07:49:15','2019-03-27 07:49:15',0,NULL);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAmenities`
--

DROP TABLE IF EXISTS `UserAmenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserAmenities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `amenitiesId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserAmenities_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAmenities`
--

LOCK TABLES `UserAmenities` WRITE;
/*!40000 ALTER TABLE `UserAmenities` DISABLE KEYS */;
INSERT INTO `UserAmenities` VALUES (1,1,26,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(2,1,25,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(3,1,27,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(4,1,73,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(5,1,118,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(21,7,27,'2019-03-27 10:09:33','2019-03-27 10:09:33'),(22,7,73,'2019-03-27 10:09:33','2019-03-27 10:09:33'),(23,7,25,'2019-03-27 10:09:33','2019-03-27 10:09:33'),(24,7,118,'2019-03-27 10:09:33','2019-03-27 10:09:33'),(28,6,27,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(29,6,25,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(30,6,118,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(31,5,25,'2019-07-04 10:57:09','2019-07-04 10:57:09'),(32,5,73,'2019-07-04 10:57:09','2019-07-04 10:57:09'),(33,5,28,'2019-07-04 10:57:09','2019-07-04 10:57:09'),(37,3,26,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(38,3,27,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(39,3,73,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(40,2,25,'2019-07-04 11:02:18','2019-07-04 11:02:18'),(41,2,119,'2019-07-04 11:02:18','2019-07-04 11:02:18'),(42,2,73,'2019-07-04 11:02:18','2019-07-04 11:02:18'),(50,4,25,'2020-04-13 11:26:19','2020-04-13 11:26:19'),(51,4,26,'2020-04-13 11:26:19','2020-04-13 11:26:19'),(52,4,119,'2020-04-13 11:26:19','2020-04-13 11:26:19'),(53,4,27,'2020-04-13 11:26:19','2020-04-13 11:26:19'),(54,4,73,'2020-04-13 11:26:19','2020-04-13 11:26:19'),(55,4,28,'2020-04-13 11:26:19','2020-04-13 11:26:19'),(56,4,118,'2020-04-13 11:26:19','2020-04-13 11:26:19'),(57,8,26,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(58,8,25,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(59,8,27,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(60,8,73,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(61,8,119,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(62,8,118,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(63,8,28,'2020-04-13 13:10:32','2020-04-13 13:10:32');
/*!40000 ALTER TABLE `UserAmenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserClaim`
--

DROP TABLE IF EXISTS `UserClaim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserClaim` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `UserClaim_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserClaim`
--

LOCK TABLES `UserClaim` WRITE;
/*!40000 ALTER TABLE `UserClaim` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserClaim` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserHouseRules`
--

DROP TABLE IF EXISTS `UserHouseRules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserHouseRules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `houseRulesId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `houseRulesId` (`houseRulesId`),
  CONSTRAINT `UserHouseRules_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserHouseRules_ibfk_2` FOREIGN KEY (`houseRulesId`) REFERENCES `ListSettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserHouseRules`
--

LOCK TABLES `UserHouseRules` WRITE;
/*!40000 ALTER TABLE `UserHouseRules` DISABLE KEYS */;
INSERT INTO `UserHouseRules` VALUES (1,1,'2019-03-27 09:49:54','2019-03-27 09:49:54',48),(2,1,'2019-03-27 09:49:54','2019-03-27 09:49:54',50),(3,1,'2019-03-27 09:49:54','2019-03-27 09:49:54',51),(4,2,'2019-03-27 09:52:48','2019-03-27 09:52:48',50),(5,2,'2019-03-27 09:52:48','2019-03-27 09:52:48',52),(6,3,'2019-03-27 09:55:45','2019-03-27 09:55:45',50),(7,3,'2019-03-27 09:55:45','2019-03-27 09:55:45',52),(8,4,'2019-03-27 09:59:06','2019-03-27 09:59:06',49),(9,4,'2019-03-27 09:59:06','2019-03-27 09:59:06',50),(10,4,'2019-03-27 09:59:06','2019-03-27 09:59:06',52),(11,5,'2019-03-27 10:05:46','2019-03-27 10:05:46',51),(12,5,'2019-03-27 10:05:46','2019-03-27 10:05:46',50),(13,5,'2019-03-27 10:05:46','2019-03-27 10:05:46',52),(17,6,'2019-03-27 10:08:28','2019-03-27 10:08:28',50),(18,6,'2019-03-27 10:08:28','2019-03-27 10:08:28',51),(19,6,'2019-03-27 10:08:28','2019-03-27 10:08:28',49),(25,7,'2019-11-13 11:56:53','2019-11-13 11:56:53',50),(26,8,'2020-01-23 05:53:23','2020-01-23 05:53:23',48),(27,8,'2020-01-23 05:53:23','2020-01-23 05:53:23',50),(28,8,'2020-01-23 05:53:23','2020-01-23 05:53:23',52),(29,8,'2020-01-23 05:53:23','2020-01-23 05:53:23',49),(30,8,'2020-01-23 05:53:23','2020-01-23 05:53:23',51);
/*!40000 ALTER TABLE `UserHouseRules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserListingData`
--

DROP TABLE IF EXISTS `UserListingData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserListingData` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `settingsId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserListingData_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserListingData`
--

LOCK TABLES `UserListingData` WRITE;
/*!40000 ALTER TABLE `UserListingData` DISABLE KEYS */;
INSERT INTO `UserListingData` VALUES (6,1,77,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(7,1,5,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(8,1,10,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(9,1,16,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(10,1,22,'2019-03-27 09:46:00','2019-03-27 09:46:00'),(66,7,77,'2019-03-27 10:09:32','2019-03-27 10:09:32'),(67,7,5,'2019-03-27 10:09:32','2019-03-27 10:09:32'),(68,7,11,'2019-03-27 10:09:32','2019-03-27 10:09:32'),(69,7,16,'2019-03-27 10:09:32','2019-03-27 10:09:32'),(70,7,22,'2019-03-27 10:09:32','2019-03-27 10:09:32'),(76,6,76,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(77,6,6,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(78,6,10,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(79,6,16,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(80,6,22,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(81,5,77,'2019-07-04 10:57:09','2019-07-04 10:57:09'),(82,5,5,'2019-07-04 10:57:09','2019-07-04 10:57:09'),(83,5,10,'2019-07-04 10:57:09','2019-07-04 10:57:09'),(84,5,16,'2019-07-04 10:57:09','2019-07-04 10:57:09'),(85,5,22,'2019-07-04 10:57:09','2019-07-04 10:57:09'),(91,3,113,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(92,3,6,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(93,3,10,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(94,3,16,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(95,3,22,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(96,2,74,'2019-07-04 11:02:18','2019-07-04 11:02:18'),(97,2,5,'2019-07-04 11:02:18','2019-07-04 11:02:18'),(98,2,10,'2019-07-04 11:02:18','2019-07-04 11:02:18'),(99,2,16,'2019-07-04 11:02:18','2019-07-04 11:02:18'),(100,2,22,'2019-07-04 11:02:18','2019-07-04 11:02:18'),(111,4,113,'2020-04-13 11:26:19','2020-04-13 11:26:19'),(112,4,7,'2020-04-13 11:26:19','2020-04-13 11:26:19'),(113,4,10,'2020-04-13 11:26:19','2020-04-13 11:26:19'),(114,4,16,'2020-04-13 11:26:19','2020-04-13 11:26:19'),(115,4,22,'2020-04-13 11:26:19','2020-04-13 11:26:19'),(116,8,77,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(117,8,5,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(118,8,11,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(119,8,16,'2020-04-13 13:10:32','2020-04-13 13:10:32'),(120,8,22,'2020-04-13 13:10:32','2020-04-13 13:10:32');
/*!40000 ALTER TABLE `UserListingData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserListingSteps`
--

DROP TABLE IF EXISTS `UserListingSteps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserListingSteps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `step1` enum('inactive','active','completed') COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `step2` enum('inactive','active','completed') COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `step3` enum('inactive','active','completed') COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `step4` enum('inactive','active','completed') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserListingSteps_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserListingSteps`
--

LOCK TABLES `UserListingSteps` WRITE;
/*!40000 ALTER TABLE `UserListingSteps` DISABLE KEYS */;
INSERT INTO `UserListingSteps` VALUES (1,1,'completed','completed','completed','2019-03-27 09:45:45','2019-03-27 09:49:54','completed'),(2,2,'completed','completed','completed','2019-03-27 09:50:29','2019-03-27 09:52:49','completed'),(3,3,'completed','completed','completed','2019-03-27 09:54:04','2019-03-27 09:55:45','completed'),(4,4,'completed','completed','completed','2019-03-27 09:56:38','2019-03-27 09:59:06','completed'),(5,5,'completed','completed','completed','2019-03-27 10:03:31','2019-03-27 10:05:46','completed'),(6,6,'completed','completed','completed','2019-03-27 10:07:00','2019-03-27 10:08:24','completed'),(7,7,'completed','completed','completed','2019-03-27 10:09:22','2019-03-27 10:11:05','completed'),(8,8,'completed','completed','completed','2020-01-23 05:50:56','2020-01-23 05:53:24','completed');
/*!40000 ALTER TABLE `UserListingSteps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserLogin`
--

DROP TABLE IF EXISTS `UserLogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserLogin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deviceType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deviceId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deviceDetail` mediumtext COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserLogin`
--

LOCK TABLES `UserLogin` WRITE;
/*!40000 ALTER TABLE `UserLogin` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserLogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserProfile`
--

DROP TABLE IF EXISTS `UserProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserProfile` (
  `userId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `profileId` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `displayName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateOfBirth` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `picture` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phoneNumber` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preferredLanguage` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preferredCurrency` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `info` mediumtext COLLATE utf8mb4_unicode_ci,
  `location` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `stripeCusId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` int(4) DEFAULT '1',
  `verificationCode` int(5) DEFAULT NULL,
  `countryCode` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `countryName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `profileId` (`profileId`),
  UNIQUE KEY `UserProfile_profileId_unique` (`profileId`),
  CONSTRAINT `UserProfile_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserProfile`
--

LOCK TABLES `UserProfile` WRITE;
/*!40000 ALTER TABLE `UserProfile` DISABLE KEYS */;
INSERT INTO `UserProfile` VALUES ('977bc550-5069-11e9-a14e-635e0fd3bfa6',2,'Radical','QA','Radical QA','1-2000-1','d61ba8288aa9dc05f73b34d9d8fc4871.jpeg','Female',NULL,'en','EUR','I always wanted to be a great writer, like Victor Hugo who wrote \"Les Miserable\", or like Roman Roland who wrote \"John Christopher\". They have influenced millions of people through their books. I also wanted to be a great psychologist, like William James or Sigmund Freud, who could read people’s mind. Of course, I am nowhere close to these people, yet. I am just someone who does some teaching, some research, and some writing. But my dream is still alive.','Lives in The City, United Kingdom','2019-03-27 08:23:25','2019-07-04 10:31:38',NULL,1,NULL,NULL,NULL),('d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',1,'Demo','User','Demo User','10-1994-5','13579aa2edf46b7a707be6b537259f45.jpeg','Male',NULL,'en','USD','I am a person who is positive about every aspect of life. There are many things I like to do, to see, and to experience. I like to read, I like to write; I like to think, I like to dream; I like to talk, I like to listen. I like to see the sunrise in the morning, I like to see the moonlight at night; I like to feel the music flowing on my face, I like to smell the wind coming from the ocean. I like to look at the clouds in the sky with a blank mind, I like to do thought experiment when I cannot sleep in the middle of the night. I like flowers in spring, rain in summer, leaves in autumn, and snow in winter. I like to sleep early, I like to get up late; I like to be alone, I like to be surrounded by people. I like country’s peace, I like metropolis’ noise; I like the beautiful west lake in Hangzhou, I like the flat cornfield in Campaign. I like delicious food and comfortable shoes; I like good books and romantic movies. I like the land and the nature, I like people. And, I like to laugh.','Architect based in Los Angeles,  CA.','2019-03-27 07:49:16','2019-07-04 11:29:49',NULL,1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `UserProfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserSafetyAmenities`
--

DROP TABLE IF EXISTS `UserSafetyAmenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserSafetyAmenities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `safetyAmenitiesId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserSafetyAmenities_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserSafetyAmenities`
--

LOCK TABLES `UserSafetyAmenities` WRITE;
/*!40000 ALTER TABLE `UserSafetyAmenities` DISABLE KEYS */;
INSERT INTO `UserSafetyAmenities` VALUES (1,1,32,'2019-03-27 09:46:01','2019-03-27 09:46:01'),(2,1,29,'2019-03-27 09:46:01','2019-03-27 09:46:01'),(3,1,31,'2019-03-27 09:46:01','2019-03-27 09:46:01'),(15,7,30,'2019-03-27 10:09:33','2019-03-27 10:09:33'),(16,7,32,'2019-03-27 10:09:33','2019-03-27 10:09:33'),(19,6,30,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(20,6,32,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(21,5,30,'2019-07-04 10:57:10','2019-07-04 10:57:10'),(22,5,29,'2019-07-04 10:57:10','2019-07-04 10:57:10'),(23,5,31,'2019-07-04 10:57:10','2019-07-04 10:57:10'),(26,3,29,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(27,3,31,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(28,2,30,'2019-07-04 11:02:19','2019-07-04 11:02:19'),(29,2,32,'2019-07-04 11:02:19','2019-07-04 11:02:19'),(34,4,29,'2020-04-13 11:26:20','2020-04-13 11:26:20'),(35,4,30,'2020-04-13 11:26:20','2020-04-13 11:26:20'),(36,4,31,'2020-04-13 11:26:20','2020-04-13 11:26:20'),(37,4,32,'2020-04-13 11:26:20','2020-04-13 11:26:20'),(38,8,30,'2020-04-13 13:10:33','2020-04-13 13:10:33'),(39,8,32,'2020-04-13 13:10:33','2020-04-13 13:10:33'),(40,8,29,'2020-04-13 13:10:33','2020-04-13 13:10:33'),(41,8,31,'2020-04-13 13:10:33','2020-04-13 13:10:33');
/*!40000 ALTER TABLE `UserSafetyAmenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserSpaces`
--

DROP TABLE IF EXISTS `UserSpaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserSpaces` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listId` int(11) NOT NULL,
  `spacesId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `spacesId` (`spacesId`),
  CONSTRAINT `UserSpaces_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserSpaces_ibfk_2` FOREIGN KEY (`spacesId`) REFERENCES `ListSettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserSpaces`
--

LOCK TABLES `UserSpaces` WRITE;
/*!40000 ALTER TABLE `UserSpaces` DISABLE KEYS */;
INSERT INTO `UserSpaces` VALUES (1,1,36,'2019-03-27 09:46:01','2019-03-27 09:46:01'),(2,1,34,'2019-03-27 09:46:01','2019-03-27 09:46:01'),(13,7,34,'2019-03-27 10:09:33','2019-03-27 10:09:33'),(14,7,36,'2019-03-27 10:09:33','2019-03-27 10:09:33'),(15,7,33,'2019-03-27 10:09:33','2019-03-27 10:09:33'),(18,6,34,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(19,6,36,'2019-07-04 10:52:39','2019-07-04 10:52:39'),(20,5,34,'2019-07-04 10:57:10','2019-07-04 10:57:10'),(21,5,33,'2019-07-04 10:57:10','2019-07-04 10:57:10'),(22,5,35,'2019-07-04 10:57:10','2019-07-04 10:57:10'),(24,3,33,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(25,3,36,'2019-07-04 11:00:34','2019-07-04 11:00:34'),(26,2,34,'2019-07-04 11:02:19','2019-07-04 11:02:19'),(27,2,33,'2019-07-04 11:02:19','2019-07-04 11:02:19'),(32,4,34,'2020-04-13 11:26:21','2020-04-13 11:26:21'),(33,8,33,'2020-04-13 13:10:33','2020-04-13 13:10:33'),(34,8,34,'2020-04-13 13:10:33','2020-04-13 13:10:33'),(35,8,35,'2020-04-13 13:10:33','2020-04-13 13:10:33'),(36,8,36,'2020-04-13 13:10:33','2020-04-13 13:10:33');
/*!40000 ALTER TABLE `UserSpaces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserVerifiedInfo`
--

DROP TABLE IF EXISTS `UserVerifiedInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserVerifiedInfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEmailConfirmed` tinyint(1) DEFAULT '0',
  `isFacebookConnected` tinyint(1) DEFAULT '0',
  `isGoogleConnected` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isIdVerification` tinyint(1) DEFAULT '0',
  `isPhoneVerified` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `UserVerifiedInfo_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserVerifiedInfo`
--

LOCK TABLES `UserVerifiedInfo` WRITE;
/*!40000 ALTER TABLE `UserVerifiedInfo` DISABLE KEYS */;
INSERT INTO `UserVerifiedInfo` VALUES (1,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',1,0,0,'2019-03-27 07:49:16','2019-03-27 07:49:16',0,0),(2,'977bc550-5069-11e9-a14e-635e0fd3bfa6',1,0,0,'2019-03-27 08:23:25','2019-03-27 08:23:25',0,0);
/*!40000 ALTER TABLE `UserVerifiedInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WhyHostInfoBlock`
--

DROP TABLE IF EXISTS `WhyHostInfoBlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `WhyHostInfoBlock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `value` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WhyHostInfoBlock`
--

LOCK TABLES `WhyHostInfoBlock` WRITE;
/*!40000 ALTER TABLE `WhyHostInfoBlock` DISABLE KEYS */;
INSERT INTO `WhyHostInfoBlock` VALUES (1,'Host Banner Title 1','hostBannerTitle1','It\'s simple to become a YourSite host','2020-04-13 11:33:10','2020-04-13 11:36:18'),(2,'Host Banner Image 1','hostBannerImage1','2ae2bf4b77268d77302393a6bd452041.jpeg','2020-04-13 11:33:10','2020-04-13 11:36:18'),(3,'Why Block Title 1','whyBlockTitle1','What is Lorem Ipsum?','2020-04-13 11:33:10','2020-04-13 12:14:24'),(4,'Why Block Title 2','whyBlockTitle2','This tool for our day to day work and our clients?','2020-04-13 11:33:10','2020-04-13 12:14:24'),(5,'Why Block Content 1','whyBlockContent1','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  \n','2020-04-13 11:33:10','2020-04-13 12:14:24'),(6,'Why Block Content 2','whyBlockContent2','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.','2020-04-13 11:33:10','2020-04-13 12:14:25'),(7,'Hosting Block Title Heading','hostingBlockTitleHeading','There are 3 Lorem Ipsum generators','2020-04-13 11:33:10','2020-04-13 12:15:58'),(8,'Hosting Block Title 1','hostingBlockTitle1','Lorem Ipsum','2020-04-13 11:33:10','2020-04-13 12:15:58'),(9,'Hosting Block Title 2','hostingBlockTitle2','Lorem Ipsum','2020-04-13 11:33:10','2020-04-13 12:15:59'),(10,'Hosting Block Title 3','hostingBlockTitle3','Lorem Ipsum','2020-04-13 11:33:10','2020-04-13 12:15:59'),(11,'Hosting Block Content 1','hostingBlockContent1','Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n','2020-04-13 11:33:10','2020-04-13 12:15:59'),(12,'Hosting Block Content 2','hostingBlockContent2','Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n','2020-04-13 11:33:10','2020-04-13 12:15:59'),(13,'Hosting Block Content 3','hostingBlockContent3','Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n','2020-04-13 11:33:10','2020-04-13 12:15:59'),(14,'Cover Section Title 1','coverSectionTitle1','Use our generator to get your own','2020-04-13 11:33:10','2020-04-13 12:17:15'),(15,'Cover Section Image 1','coverSectionImage1','8f49e42fd6bab70ede68826ad0d4a03a.jpeg','2020-04-13 11:33:10','2020-04-13 12:17:15'),(16,'Cover Section Content 1','coverSectionContent1','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','2020-04-13 11:33:10','2020-04-13 12:17:15'),(17,'Cover Section Content 2','coverSectionContent2','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\n','2020-04-13 11:33:10','2020-04-13 12:17:16'),(18,'Cover Section Feature 1','coverSectionFeature1','Excepteur sint occaecat cupidatat non proident','2020-04-13 11:33:10','2020-04-13 12:17:16'),(19,'Cover Section Feature 2','coverSectionFeature2','quis nostrud exercitation ullamco laboris nisi','2020-04-13 11:33:10','2020-04-13 12:17:16'),(20,'Cover Section Feature 3','coverSectionFeature3','Sed ut perspiciatis unde omnis iste natus error sit','2020-04-13 11:33:10','2020-04-13 12:17:16'),(21,'Cover Section Feature 4','coverSectionFeature4','Nemo enim ipsam voluptatem quia voluptas sit aspernatur','2020-04-13 11:33:10','2020-04-13 12:17:16'),(22,'Cover Section Feature 5','coverSectionFeature5','Ut enim ad minima veniam, quis nostrum exercitationem','2020-04-13 11:33:10','2020-04-13 12:17:16'),(23,'Cover Section Feature 6','coverSectionFeature6','Excepteur sint occaecat cupidatat non proident','2020-04-13 11:33:10','2020-04-13 12:17:17'),(24,'Payment Title Heading','paymentTitleHeading','It to make a type specimen book','2020-04-13 11:33:10','2020-04-13 12:17:56'),(25,'Payment Title 1','paymentTitle1','Sed ut perspiciatis','2020-04-13 11:33:10','2020-04-13 12:17:56'),(26,'Payment Title 2','paymentTitle2','Nemo enim ipsam','2020-04-13 11:33:10','2020-04-13 12:17:57'),(27,'Payment Title 3','paymentTitle3','Neque porro','2020-04-13 11:33:10','2020-04-13 12:17:57'),(28,'Payment Content 1','paymentContent1','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur\n\n','2020-04-13 11:33:10','2020-04-13 12:17:57'),(29,'Payment Content 2','paymentContent2','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt\n\n','2020-04-13 11:33:10','2020-04-13 12:17:57'),(30,'Payment Content 3','paymentContent3','Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\n\n','2020-04-13 11:33:10','2020-04-13 12:17:57'),(31,'Quote Section Title 1','quoteSectionTitle1','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore','2020-04-13 11:33:10','2020-04-13 12:19:07'),(32,'Quote Section Title 2','quoteSectionTitle2','It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages','2020-04-13 11:33:10','2020-04-13 12:19:08'),(33,'Quote Section Content 1','quoteSectionContent1','software like Aldus PageMaker including versions of Lorem Ipsum.\n','2020-04-13 11:33:10','2020-04-13 12:19:08'),(34,'Quote Section Content 2','quoteSectionContent2','software like Aldus PageMaker including versions of Lorem Ipsum.\n','2020-04-13 11:33:10','2020-04-13 12:19:08'),(35,'Quote Section Image 1','quoteSectionImage1','0a584ba173af81174be5eb6a657667ad.jpeg','2020-04-13 11:33:10','2020-04-13 12:19:08'),(36,'Quote Section Image 2','quoteSectionImage2','083eb3e69d9eaca28ec8e2ca2cd8e350.jpeg','2020-04-13 11:33:10','2020-04-13 12:19:08'),(37,'Quote Section Button 1','quoteSectionButton1','Lorem Ipsum Text','2020-04-13 11:33:10','2020-04-13 12:19:09'),(38,'Quote Section Button 2','quoteSectionButton2','Lorem Ipsum Text','2020-04-13 11:33:10','2020-04-13 12:19:09'),(39,'FAQ Title 1','faqTitle1','Lorem ipsum dolor sit amet, consecteturt','2020-04-13 11:33:10','2020-04-13 12:19:40'),(40,'FAQ Title 2','faqTitle2','Lorem ipsum dolor sit amet, consecteturt','2020-04-13 11:33:10','2020-04-13 12:19:40'),(41,'FAQ Title 3','faqTitle3','Lorem ipsum dolor sit amet, consecteturt','2020-04-13 11:33:10','2020-04-13 12:19:40'),(42,'FAQ Title 4','faqTitle4','Lorem ipsum dolor sit amet, consecteturt','2020-04-13 11:33:10','2020-04-13 12:19:40'),(43,'FAQ Title 5','faqTitle5','','2020-04-13 11:33:10','2020-04-13 12:19:40'),(44,'FAQ Title 6','faqTitle6','','2020-04-13 11:33:10','2020-04-13 12:19:41'),(45,'FAQ Title 7','faqTitle7','','2020-04-13 11:33:10','2020-04-13 12:19:41'),(46,'FAQ Title 8','faqTitle8','','2020-04-13 11:33:10','2020-04-13 12:19:41'),(47,'FAQ Content 1','faqContent1','Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.\n\n','2020-04-13 11:33:10','2020-04-13 12:19:41'),(48,'FAQ Content 2','faqContent2','Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.\n\n','2020-04-13 11:33:10','2020-04-13 12:19:41'),(49,'FAQ Content 3','faqContent3','Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.\n\n','2020-04-13 11:33:10','2020-04-13 12:19:41'),(50,'FAQ Content 4','faqContent4','Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.\n\n','2020-04-13 11:33:10','2020-04-13 12:19:42'),(51,'FAQ Content 5','faqContent5','','2020-04-13 11:33:10','2020-04-13 12:19:42'),(52,'FAQ Content 6','faqContent6','','2020-04-13 11:33:10','2020-04-13 12:19:42'),(53,'FAQ Content 7','faqContent7','','2020-04-13 11:33:10','2020-04-13 12:19:42'),(54,'FAQ Content 8','faqContent8','','2020-04-13 11:33:10','2020-04-13 12:19:42');
/*!40000 ALTER TABLE `WhyHostInfoBlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WishList`
--

DROP TABLE IF EXISTS `WishList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `WishList` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wishListGroupId` int(11) NOT NULL,
  `listId` int(11) NOT NULL,
  `userId` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isListActive` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wishListGroupId` (`wishListGroupId`),
  KEY `listId` (`listId`),
  CONSTRAINT `WishList_ibfk_1` FOREIGN KEY (`wishListGroupId`) REFERENCES `WishListGroup` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `WishList_ibfk_2` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WishList`
--

LOCK TABLES `WishList` WRITE;
/*!40000 ALTER TABLE `WishList` DISABLE KEYS */;
/*!40000 ALTER TABLE `WishList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WishListGroup`
--

DROP TABLE IF EXISTS `WishListGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `WishListGroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `userId` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `isPublic` int(11) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WishListGroup`
--

LOCK TABLES `WishListGroup` WRITE;
/*!40000 ALTER TABLE `WishListGroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `WishListGroup` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-13 18:50:25
