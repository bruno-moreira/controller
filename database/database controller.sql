DROP DATABASE IF EXISTS controller;
CREATE DATABASE controller;

USE controller;

DROP TABLE IF EXISTS `empresas`;
CREATE TABLE `empresas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `empresas` VALUES (1,'Chilli Beans','chillibeans.jpeg'),(2,'Ray-Ban','rayban.jpeg'),(3,'H. Stern','hstern.jpeg'),(4,'Boticário','boticario.jpeg'),(5,'Arezzo','arezzo.jpeg'),(6,'Dafiti','dafiti.jpeg');

DROP TABLE IF EXISTS `produtos`;
CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `descricao` varchar(510) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `url` varchar(1020) NOT NULL,
  `imagem1` varchar(255) NOT NULL,
  `imagem2` varchar(255) DEFAULT NULL,
  `imagem3` varchar(255) DEFAULT NULL,
  `empresa` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_produtos_empesas_idx` (`empresa`),
  CONSTRAINT `fk_produtos_empesas` FOREIGN KEY (`empresa`) REFERENCES `empresas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `produtos` VALUES (1,'Óculos Esportivo','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',100.00,'http://www.google.com','glasses0.jpeg','glasses1.jpeg','glasses2.jpeg',1),(2,'Óculos Esportivo','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',200.00,'http://www.google.com','glasses0.jpeg','glasses1.jpeg',NULL,2),(3,'Anel','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',300.00,'http://www.google.com','jewelry0.jpeg','jewelry1.jpeg',NULL,3),(4,'Conjunto Brinco e Anel','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',300.00,'http://www.google.com','jewelry0.jpeg',NULL,NULL,3),(5,'Maquiagem','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',80.00,'http://www.google.com','makeup0.jpg','makeup1.jpg','makeup2.jpg',4),(6,'Tênis Feminino','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',400.00,'http://www.google.com','shoes0.jpg','shoes1.jpg','shoes2.jpg',5),(7,'Tênis Feminino','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',500.00,'http://www.google.com','shoes0.jpg','shoes1.jpg','shoes2.jpg',6);

DROP TABLE IF EXISTS feeds;
CREATE TABLE `feeds` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data` datetime NOT NULL,
  `produto` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_feeds_produtos_idx` (`produto`),
  CONSTRAINT `fk_feeds_produtos` FOREIGN KEY (`produto`) REFERENCES `produtos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `feeds` VALUES (1,'2021-04-14 18:21:11',1),(2,'2021-04-14 18:21:11',2),(3,'2021-04-14 18:21:11',3),(4,'2021-04-14 18:21:11',4),(5,'2021-04-14 18:21:11',5),(6,'2021-04-14 18:21:11',6),(7,'2021-04-14 18:21:11',7);
