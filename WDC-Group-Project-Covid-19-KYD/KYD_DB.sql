-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: KYD_DB
-- ------------------------------------------------------
-- Server version	8.0.19-0ubuntu5

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `KYD_DB`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `KYD_DB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `KYD_DB`;

--
-- Table structure for table `Check_In_History`
--

DROP TABLE IF EXISTS `Check_In_History`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Check_In_History` (
  `checkInID` int NOT NULL AUTO_INCREMENT,
  `userID` varchar(255) DEFAULT NULL,
  `venueCode` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`checkInID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Check_In_History`
--

LOCK TABLES `Check_In_History` WRITE;
/*!40000 ALTER TABLE `Check_In_History` DISABLE KEYS */;
INSERT INTO `Check_In_History` VALUES (1,'u23168','v66416','2021-06-14 10:12:05'),(2,'u23168','v21630','2021-06-14 10:12:30'),(3,'u23168','v64055','2021-06-14 10:13:10'),(4,'u18174','v64055','2021-06-14 11:41:06'),(5,'u18174','v44089','2021-06-14 11:41:28'),(6,'u15033','v64055','2021-06-14 13:00:21'),(7,'u15033','v66416','2021-06-14 13:00:58');
/*!40000 ALTER TABLE `Check_In_History` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Health_Official`
--

DROP TABLE IF EXISTS `Health_Official`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Health_Official` (
  `healthID` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` bigint DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `healthCode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`healthID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Health_Official`
--

LOCK TABLES `Health_Official` WRITE;
/*!40000 ALTER TABLE `Health_Official` DISABLE KEYS */;
INSERT INTO `Health_Official` VALUES ('h11111','Ian','Knight','wdc@adelaide.edu.au',11111111,'wdc','healthMan'),('h26278','jhont','smith','5@5',2345678,'78d8045d684abd2eece923758f3cd781489df3a48e1278982466017f','234-456'),('h59252','jhon','smith','testing@example.com',1345768879,'test','testCode');
/*!40000 ALTER TABLE `Health_Official` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HotspotLocation`
--

DROP TABLE IF EXISTS `HotspotLocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HotspotLocation` (
  `hotspotID` int NOT NULL AUTO_INCREMENT,
  `healthID` varchar(255) DEFAULT NULL,
  `venueCode` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`hotspotID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HotspotLocation`
--

LOCK TABLES `HotspotLocation` WRITE;
/*!40000 ALTER TABLE `HotspotLocation` DISABLE KEYS */;
INSERT INTO `HotspotLocation` VALUES (3,'h59252','v64055','2021-06-14 12:08:14');
/*!40000 ALTER TABLE `HotspotLocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `userID` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` bigint DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('u103315','Lachlan','Possingham','whatever@gmail.com',666666666,'e9504dc7b607e8708d7b139024d002aa815bdfc0b4a7b8a510eb5347'),('u15033','hey','wow','w@w',234567890,'78d8045d684abd2eece923758f3cd781489df3a48e1278982466017f'),('u18174','Frank','Wang','fecyiw43@gmail.com',452618789,'78d8045d684abd2eece923758f3cd781489df3a48e1278982466017f'),('u19874','Thomas','Redding','thomas@techsupport.net.au',87250704,'9f61c81cb2904274a2d20e8dc649dc5762cdefc93be4452d82ee4d16'),('u23168','test5','test6','example@example',12345678,'90a3ed9e32b2aaf4c61c410eb925426119e1a9dc53d4286ade99a809'),('u30850','lachlan','test','here@there.com',4927318923,'78d8045d684abd2eece923758f3cd781489df3a48e1278982466017f'),('u42335','Aninda','Dhar','a.dhar@gmail.com',123321,'d63dc919e201d7bc4c825630d2cf25fdc93d4b2f0d46706d29038d01'),('u75043','here','there','h@here',928340435828,'78d8045d684abd2eece923758f3cd781489df3a48e1278982466017f'),('u92687','Bill','Gates','lordgates@bigpond.com',9807088110,'099fab07f046feb4e626d3c291cd93cc98762f86d106002df29ab3ca');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Venue`
--

DROP TABLE IF EXISTS `Venue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Venue` (
  `venueCode` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` bigint DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `venueName` varchar(255) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `isHotspot` int DEFAULT '0',
  `address` varchar(255) DEFAULT NULL,
  `longitude` decimal(40,20) DEFAULT NULL,
  `latitude` decimal(40,20) DEFAULT NULL,
  PRIMARY KEY (`venueCode`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Venue`
--

LOCK TABLES `Venue` WRITE;
/*!40000 ALTER TABLE `Venue` DISABLE KEYS */;
INSERT INTO `Venue` VALUES ('v21630','Darth','Vader','sithlord@deathstar.co.uk',27091977,'7e03db36ad30d2f16d647a4275ab715d50b28222211176e2fd8424c4','Exhaust Port Cafe',1075,0,'46 Pennington Terrace, North Adelaide',138.59728000000000000000,-34.91285100000000000000),('v44089','Peter','Hoj','highlord@adelaide.edu.au',12344321,'57f305c0fe2cbc7c557c9d137ff32a1e6d165dc4ff63db1423ead891','Uni Adelaide',1000,0,'1205 North Terrace, Adelaide South Australia 5000, Australia',138.60422400000000000000,-34.91946100000000000000),('v64055','hi','test','e@e',234354657,'57e31e954570bfa6c41ab50adc5f41cf18167976737795ae1e6ed7dd','test ven',20,1,'45 Colton Ave',138.59475700000000000000,-34.91252300000000000000),('v66416','R2','D2','weeeeee@woooooo',22222222,'fed541fc96195df6a319faaadfbdd0cc66b71268ecddf082487d5397','Mos Eisley Cantina',4,0,'8 Hume Lane, Adelaide SA',138.60885600000000000000,-34.93023900000000000000);
/*!40000 ALTER TABLE `Venue` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-14 13:21:18
