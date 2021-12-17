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

INSERT INTO `empresas` VALUES (1,'Seara','seara.jpeg'),(2,'Nestlé','nestle.jpeg'),(3,'Sadia','sadia.jpeg'),(4,'Coca-cola','cocacola.jpeg'),(5,'Aurora','aurora.jpeg');

DROP TABLE IF EXISTS `produtos`;
CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `descricao` varchar(510) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `data_prod` date NOT NULL,
  `url` varchar(1020) NOT NULL,
  `imagem1` varchar(255) NOT NULL,
  `imagem2` varchar(255) DEFAULT NULL,
  `imagem3` varchar(255) DEFAULT NULL,
  `empresa` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_produtos_empesas_idx` (`empresa`),
  CONSTRAINT `fk_produtos_empesas` FOREIGN KEY (`empresa`) REFERENCES `empresas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `produtos` VALUES (1,'Toscana','A linguiça calabresa sofre processo de cozimento durante a sua fabricação na indústria... - Veja mais em ',100.00,"2019-11-01",'https://www.uol.com.br/vivabem/noticias/redacao/2021/08/18/linguica-calabresa-toscana-ou-de-frango-veja-qual-faz-menos-mal-a-saude.htm?cmpid=copiaecola','toscana1.jpeg','toscana2.jpeg','toscana3.jpeg',1),(2,'Chocolate','Cacau Show é a maior rede de Chocolates Finos do mundo',200.00, "2019-10-01", 'https://www.cacaushow.com.br','chocolate1.jpeg','chocolate2.jpeg',NULL,2),(3,'Queijo Mussarela','A mozzarella é um queijo italiano saboroso que vem sendo produzido e apreciado desde os tempos romanos',300.00,"2019-09-01",'http://www.livup.com.br','queijo1.jpeg','queijo2.jpeg',NULL,3),(4,'Pizza de Atum','Receitas...',300.00,"2019-08-01", 'https://receitas.globo.com/pizza-de-atum-561193b94d38857e2f000048.ghtml','pizza1.jpeg','pizza2.jpeg',NULL,3),(5,'Spryte','Refrigerante SPRITE Lata 350ml. Ingredientes: Água Gaseificada, Açúcar, Suco de Limão, Aroma Natural, Acidulante Ácido Cítrico e Conservadores Benzoato',400.00, '2019-06-01', 'http://www.casafiesta.com.br','spryte.jpeg',NULL ,NULL ,4),(6,'Sorvete','Quem não gosta de se deliciar comendo um sorvete supergostoso?',80.00, "2019-07-01", 'http://www.google.com','sorvete1.jpeg',NULL,NULL,2),(7,'Presunto','Presunto é um produto alimentar do ramo da charcutaria, formado pela perna inteira do porco, que é curada, por vezes apenas com sal,',500.00, '2019-05-01', 'https://pt.wikipedia.org/wiki/Presunto','presunto1.jpeg','presunto2.jpeg', NULL,5);

DROP TABLE IF EXISTS `feeds`;
CREATE TABLE `feeds` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data` datetime NOT NULL,
  `produto` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_feeds_produtos_idx` (`produto`),
  CONSTRAINT `fk_feeds_produtos` FOREIGN KEY (`produto`) REFERENCES `produtos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO feeds VALUES (1,'2021-04-14 18:21:11',1),(2,'2021-04-14 18:21:11',2),(3,'2021-04-14 18:21:11',3),(4,'2021-04-14 18:21:11',4),(5,'2021-04-14 18:21:11',5),(6,'2021-04-14 18:21:11',6),(7,'2021-04-14 18:21:11',7);
