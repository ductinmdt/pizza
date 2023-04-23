-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pizza
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `url` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `createdBy` int DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `ModifiedBy` int DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (1,'Banner1','Banner1','https://play.google.com/store/apps/details?id=com.radiofg.radiofg&hl=en_US','2023-04-02 01:34:24',NULL,'2023-04-02 01:34:41',NULL,1),(2,'Banner1','Banner1','ưesgd','2023-04-02 02:18:59',NULL,'2023-04-02 02:19:32',NULL,1),(3,'Banner1','Banner1','banner-01.png','2023-04-08 10:12:16',NULL,'2023-04-12 14:21:32',NULL,0),(4,'Banner2','Banner2','banner-02.png','2023-04-08 10:13:01',NULL,'2023-04-12 14:21:43',NULL,0),(5,'Banner3','Banner3','banner-03.png','2023-04-08 10:13:10',NULL,'2023-04-12 14:21:50',NULL,0),(6,'Banner4','Banner4','banner-04.png','2023-04-08 10:13:19',NULL,'2023-04-12 14:21:55',NULL,0),(7,'Banner5','Banner5','banner-05.png','2023-04-08 10:13:28',NULL,'2023-04-12 14:22:02',NULL,0);
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(255) DEFAULT NULL,
  `description` text,
  `url` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `createdBy` int DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `ModifiedBy` int DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (12,'Pizza','Bánh pizza là món ăn có nguồn gốc từ nước Ý, được làm từ bột mì, nước, muối và men nướng, sau đó được phết đều sốt cà chua và phủ lên nhiều loại phô mai, thịt nguội, thịt xông khói, rau củ và gia vị khác nhau.\r\n\r\nBánh pizza có hình tròn hoặc hình vuông, với đường kính và chiều cao phù hợp với từng loại pizza khác nhau. Bề mặt của pizza thường được xếp chồng lên nhau, tạo ra lớp đế bánh giòn, bên trên là sốt cà chua thơm ngon và phô mai béo ngậy.\r\n\r\nSự kết hợp của các nguyên liệu tạo nên bánh pizza mang lại hương vị phức tạp và thơm ngon. Bánh pizza thường được nướng trong lò nướng, cho đến khi phô mai tan chảy và đế bánh giòn rụm. Bánh pizza là món ăn phổ biến trên toàn thế giới và được yêu thích bởi nhiều người vì hương vị đa dạng và tiện lợi để thưởng thức.','2.jpg','2023-04-07 16:16:51',NULL,'2023-04-07 16:16:51',NULL,0),(13,'Sườn BBQ','Sườn BBQ là món ăn nổi tiếng được làm từ thịt lợn, được xé thành từng miếng sườn, sau đó được ướp với các gia vị như muối, đường, tỏi, tiêu và các loại gia vị khác tạo nên hương vị đặc trưng. Sau khi ướp, sườn được đưa vào lò nướng hoặc nồi nấu áp suất, phủ đều với sốt BBQ.\r\n\r\nSốt BBQ thường được làm từ cà chua, nước sốt tương, mật ong, rượu, giấm và các loại gia vị khác. Sốt này có mùi thơm đặc trưng, vị ngọt, chua và cay, tạo nên một hương vị đậm đà cho sườn BBQ.\r\n\r\nKhi nướng, sườn BBQ thường được chảo đều với sốt, cho đến khi thịt mềm và thấm đều vị của sốt BBQ. Sườn BBQ thường được phục vụ với các loại rau sống như xà lách, cà chua, cà rốt, hoặc với khoai tây chiên, bánh mì và các loại nước sốt khác.\r\n\r\nSườn BBQ là món ăn phổ biến ở nhiều quốc gia trên thế giới và được yêu thích bởi hương vị đậm đà và tiện lợi để thưởng thức.','4.jpg','2023-04-07 16:18:36',NULL,'2023-04-07 16:18:36',NULL,0),(14,'Mỳ Ý','Mỳ Ý là một loại mỳ truyền thống của Ý, được làm từ bột mì và nước, sau đó được cắt thành những sợi dài và khô. Mỳ Ý có nhiều hình dáng khác nhau, từ sợi mỏng đến sợi dày, có thể có những rãnh bên trong hoặc mặt bề mịn.\r\n\r\nMỳ Ý thường được nấu chín trong nước muối sôi cho đến khi mềm nhưng vẫn giữ được độ dai, sau đó được rửa sạch với nước lạnh để ngưng quá trình nấu chín và giữ cho mỳ giòn ngon.\r\n\r\nMỳ Ý thường được sử dụng trong nhiều món ăn khác nhau, như mỳ Ý sốt bơ, mỳ Ý sốt cà chua, mỳ Ý hải sản, mỳ Ý xào, v.v. Điểm chung của các món ăn này là mỳ Ý sẽ được kết hợp với các loại nước sốt, gia vị và các thành phần khác để tạo ra một món ăn ngon miệng và đậm đà.\r\n\r\nMỳ Ý là một món ăn rất phổ biến trên toàn thế giới và được yêu thích bởi độ dai, độ giòn và khả năng hấp thu nước sốt tuyệt vời.','5.jpg','2023-04-07 16:21:53',NULL,'2023-04-07 16:21:53',NULL,0),(15,'Salad','Salad là một món ăn được làm từ những nguyên liệu tươi sống như rau, củ, quả, hạt, thực phẩm động vật và được trộn với nước sốt hoặc dressing. Salad là một món ăn rất phổ biến và được ưa chuộng bởi sự đa dạng trong cách chế biến, hương vị tươi mới, và giá trị dinh dưỡng.\r\n\r\nNhững loại rau xanh như xà lách, rau cải, rau ngò, rau cải thảo, cải xoăn, hoa quả như dưa chuột, cà chua, cà rốt, củ cải, hạt như hạt chia, hạt lanh, hạt bí đỏ, thực phẩm động vật như thịt gà, thịt bò, tôm, cá... thường được sử dụng để tạo nên một đĩa salad.\r\n\r\nSalad thường được trang trí đẹp mắt và được tạo thành từ nhiều lớp khác nhau, bao gồm các thành phần khác nhau được cắt nhỏ và xếp lớp lên nhau, giống như một tác phẩm nghệ thuật. Nước sốt hoặc dressing thường được dùng để làm gia vị và tạo độ ẩm cho salad.','3.jpg','2023-04-07 16:22:59',NULL,'2023-04-07 16:22:59',NULL,0),(16,'Đồ uống','Đồ uống là bất kỳ loại nước uống nào được sản xuất để giải khát, thỏa mãn sự khát của con người hoặc thưởng thức trong các dịp đặc biệt. Có rất nhiều loại đồ uống khác nhau trên thế giới, từ đồ uống có cồn đến đồ uống không cồn, từ đồ uống nóng đến đồ uống lạnh, từ đồ uống có gas đến đồ uống không gas.','1.jpg','2023-04-07 16:25:00',NULL,'2023-04-07 16:25:00',NULL,0);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rate` int DEFAULT NULL,
  `description` text,
  `createdAt` datetime DEFAULT NULL,
  `createdBy` int DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `ModifiedBy` int DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `product_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_201` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_202` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,5,'Món ăn ngon với hương vị hài hòa và đằm thắm','2023-04-13 06:04:03',NULL,'2023-04-13 06:04:03',NULL,0,9,4),(2,5,'Ngon và vừa với tầm giá','2023-04-13 06:34:30',NULL,'2023-04-13 06:34:30',NULL,0,9,3),(3,3,'Bánh không giòn lắm','2023-04-13 06:41:19',NULL,'2023-04-13 06:41:19',NULL,0,9,11);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `description` text,
  `createdAt` datetime DEFAULT NULL,
  `createdBy` int DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `ModifiedBy` int DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,'Nguyễn Hoàng','hoang@gmail.com','867444903','Phục vụ tốt, món ăn ngon','2023-04-11 11:19:29',NULL,'2023-04-11 11:19:29',NULL,0),(2,'Tấn Vững','vuang@gmail.com','0875252861','Cần cải thiện thời gian giao hàng, thức ăn nguội','2023-04-11 11:29:22',NULL,'2023-04-11 15:54:40',NULL,1);
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(255) DEFAULT NULL,
  `description` text,
  `priceNew` double DEFAULT NULL,
  `priceOld` double DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `createdBy` int DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `ModifiedBy` int DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `cd` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (4,'Pizza Rau Củ (Xốt Bơ Tỏi)','\r\nThanh Nhẹ Với Ô Liu Đen Tuyệt Hảo, Cà Chua Bi Tươi Ngon, Nấm, Thơm, Bắp, Hành Tây Và Phô Mai Mozzarella Cho Bạn Bữa Tiệc Rau Củ Tròn Vị',120000,90000,20,'P1rs1.jpg','2023-04-07 16:49:08',NULL,'2023-04-07 16:49:08',NULL,0,'P1rs1',12),(5,'Pizza Gấp Đôi Nhân Phủ Hải Sản Xốt Pesto','Pizza Hải Sản Xốt Pesto Với Hải Sản (Tôm, Mực) Nhân Đôi Cùng Với Nấm Trên Nền Xốt Pesto Đặc Trưng, Phủ Phô Mai Mozzarella Từ New Zealand Và Quế Tây.',150000,110000,5,'P2rs1.jpg','2023-04-07 16:50:53',NULL,'2023-04-07 16:50:53',NULL,0,'P2rs1',12),(6,'Pizza Gấp Đôi Nhân Phủ Cơn Lốc Hải Sản','Pizza Cơn Lốc Hải Sản Với Hải Sản (MựC, Thanh Cua) Nhân Đôi Cùng Với Thơm, Ớt Chuông Xanh, HàNh Tây, Phủ Phô Mai Mozzarella Từ New Zealand Trên Nền XốT Cheesy Mayo.',115000,100000,13,'228daaabb8-Custom-1.jpeg','2023-04-07 16:52:41',NULL,'2023-04-07 16:52:41',NULL,0,'228daaabb8',12),(7,'PIZZA VIỀN PHÔ MAI 2 LOẠI NHÂN PHỦ (CỠ VỪA)','Cùng thưởng thức 2 loại nhân phủ thơm ngon trên cùng 1 bánh pizza. Pizza Half Half - vị ngon nhân đôi.',95000,NULL,21,'P5-1.jpg','2023-04-08 00:59:10',NULL,'2023-04-08 00:59:10',NULL,0,'P5-1',12),(8,'PIZZA VIỀN PHÔ MAI 2 LOẠI NHÂN PHỦ (CỠ LỚN)','Cùng thưởng thức 2 loại nhân phủ thơm ngon trên cùng 1 bánh pizza. Pizza Half Half - vị ngon nhân đôi.',115000,NULL,12,'P5-1.jpg','2023-04-08 01:00:31',NULL,'2023-04-08 01:00:31',NULL,0,'P5-2',12),(9,'Pizza Gà Nướng Nấm','Pizza Gà Nướng Nấm Trong Cuộc Phiêu Lưu Vị Giác Với Thịt Gà, Nấm, Thơm, Cà Rốt Và Rau Mầm Phủ Xốt Tiêu Đen Thơm Nồng',150000,NULL,13,'P11rs1.jpg','2023-04-08 01:03:03',NULL,'2023-04-08 01:03:03',NULL,0,'P11rs1',12),(10,'Pizza Thập cẩm','Mang Hương Vị Truyền Thống Với ThịT Bò, Thịt Xông Khói, Pepperoni, Ớt Chuông, Nấm Và Hành Tây, Phủ Phô Mai Mozzarella',100000,NULL,12,'P9rs1.jpg','2023-04-08 01:07:48',NULL,'2023-04-08 01:07:48',NULL,0,'P9rs1',12),(11,'Pizza Bò BBQ Xốt Cay Hàn Quốc','Thịt Bò Úc, Thơm Trên Nền Xốt Hàn Quốc Cay Nồng, Phủ Rau Mầm Và Mè Rang',75000,NULL,20,'P7rs1.jpg','2023-04-08 01:09:43',NULL,'2023-04-08 01:09:43',NULL,0,'P7rs1',12),(12,'SN. SƯỜN NƯỚNG BBQ – SIZE M – 300GR','Sườn Cây Nướng Sốt BBQ với các loại gia vị cao cấp trong sốt ướp và kiểu nướng chậm trên lửa nhỏ giúp sốt ướp thấm sâu và thịt mềm mọng nước. Size M',160000,NULL,20,'sườnbbq.png','2023-04-08 01:13:46',NULL,'2023-04-08 01:13:46',NULL,0,'SNBBQM',13),(13,'ST. SƯỜN NƯỚNG BBQ – SIZE L – 500GR','Sườn Cây Nướng Sốt BBQ với các loại gia vị cao cấp trong sốt ướp và kiểu nướng chậm trên lửa nhỏ giúp sốt ướp thấm sâu và thịt mềm mọng nước. Size L',210000,NULL,9,'sườnbbq.png','2023-04-08 01:14:58',NULL,'2023-04-08 01:14:58',NULL,0,'SNBBQL',13),(14,'Mỳ Ý Hải Sản Xốt Tiêu Đen','Tôm, Thanh Cua, Mực, Đậu Pháp, Nấm, Ớt Chuông Xanh Cùng Xốt Tiêu Đen Cay Nồng',75000,NULL,5,'M2-390x307.jpg','2023-04-08 01:18:57',NULL,'2023-04-08 01:36:20',NULL,0,'Mysba1',14),(15,'Mì Ý Hải Sản Xốt Cà Chua','Mì Ý Xốt Cà Chua Với Tôm, Mực, Hành Tây Và Ớt Chuông Xanh\r\n',80000,NULL,40,'M1-390x306.jpg','2023-04-08 01:20:48',NULL,'2023-04-08 01:20:48',NULL,0,'Mygs2',14),(16,'Mì Ý Thịt Xông Khói Xốt Kem','Mì Ý Xốt Kem Với Thịt Xông Khói\r\n',65000,NULL,22,'M5-390x307.jpg','2023-04-08 01:24:27',NULL,'2023-04-08 01:35:14',NULL,0,'Myda3',14),(17,'Salad theo mùa','Rau theo mùa, thịt gà hun khói, xà lách, sốt Ceasar',45000,NULL,21,'S2-390x306.jpg','2023-04-08 01:27:19',NULL,'2023-04-08 01:27:19',NULL,0,'Sa41',15),(18,'Trà đào hạt chia','Trà Đào, Đào Miếng Và Hạt Chia',15000,NULL,42,'Tra_Dao_Hat_Chia_400x275.jpg','2023-04-08 01:29:37',NULL,'2023-04-08 01:29:37',NULL,0,'TD001',16),(19,'  Pepsi Chai 1.5L','Pepsi Chai 1.5L',20000,NULL,61,'Pepsi_1.5L_400x275.jpg','2023-04-08 01:30:36',NULL,'2023-04-08 01:30:36',NULL,0,'Pepx015',16),(20,'Aquafina 500ml','Aquafina 500ml',10000,NULL,71,'Aquafina_400x275.jpg','2023-04-08 01:31:31',NULL,'2023-04-08 01:31:31',NULL,0,'Aqua500',16);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cd` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `createdBy` int DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `ModifiedBy` int DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','Admin','2023-04-10 14:26:29',NULL,'2023-04-10 14:26:29',NULL,0),(2,'user','User','2023-04-10 14:29:21',NULL,'2023-04-10 15:10:23',NULL,0);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sliders`
--

DROP TABLE IF EXISTS `sliders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sliders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `createdBy` int DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `ModifiedBy` int DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sliders`
--

LOCK TABLES `sliders` WRITE;
/*!40000 ALTER TABLE `sliders` DISABLE KEYS */;
/*!40000 ALTER TABLE `sliders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `createdBy` int DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `ModifiedBy` int DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ok',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-04-10 15:57:27',NULL,'2023-04-10 16:05:50',NULL,1,NULL),(2,'Tin Admin','tin.admin','tin.admin@gmail.com','$2b$12$vcyIjxzKiAo6udAyww2iEeRp/.103dYUyS7YIO5lSO1oqwexGC8K2','2001-11-27 00:00:00','tam xuân 2 núi thành quảng nam','0394272718','z4220285965957_07e58626b5c6bfa01f3f7a25ea46cc1e.jpg','Nam','2023-04-10 16:08:17',NULL,'2023-04-13 08:42:20',NULL,0,1),(3,'Đức Tin','tin.user','tin.user@gmail.com','$2b$12$6PLYu17Fp5cBPMK.FfGB4eifPmWZ/1L1st0aEpISEUyUpXjaoo4/6','2001-07-27 00:00:00','tam xuân 2 núi thành quảng nam','0334047362','tinavatar.jpg','Nam','2023-04-10 16:19:27',NULL,'2023-04-12 14:08:32',NULL,0,2),(4,'Anh Phạm','anh.user','tin.mai@gmail.com','$2b$12$qoI.E/dfG1xJP49wspe0m.6xVDjR4U.k1kYZ5Bdzi6IbDg4bo4nui','2001-03-07 00:00:00','Núi Thành - Quảng Nam','0867444903','default.jpg','Nam','2023-04-13 05:45:17',NULL,'2023-04-13 05:49:08',NULL,0,2),(11,'Bao Ngan','ngan.user','ngan@gmail.com','$2b$12$GhQViYpDbVyfdFm5YpWZzOGbPEiA1HhfL9927zz/IF4LvOJhoiueG','2001-03-07 00:00:00','Núi Thành - Quảng Nam','0967444903','default.jpg','Nam','2023-04-13 05:48:30',NULL,'2023-04-13 06:40:14',NULL,0,2),(13,'Đức Tin','ductin2711mdt@gmail.com','ductin2711mdt@gmail.com','$2b$12$vtM2..qCsaZ25E0kTDjKn.bTpCMGLXBNYtIkKDcwIFY9MmpvAxj9a',NULL,NULL,NULL,'https://lh3.googleusercontent.com/a/AGNmyxZmhnxtRCTfuM8hrIWtonsPI1I7u62vrXtbRaEr=s96-c',NULL,'2023-04-14 09:36:03',NULL,'2023-04-14 09:36:03',NULL,0,2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-16 12:31:20
