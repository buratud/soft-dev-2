-- ตาราง chanel ของการchat ระหว่างuser
CREATE TABLE `chanel` (
  `chanel_id` int NOT NULL AUTO_INCREMENT,
  `member1` int NOT NULL,
  `member2` int NOT NULL,
  PRIMARY KEY (`chanel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


--ข้อความในchat
CREATE TABLE `chat` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `chanel_id` int NOT NULL,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `message_text` varchar(1000) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `dorm_detail` (
  `dorm_id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int NOT NULL,
  `dorm_name` varchar(45) NOT NULL,
  `min_price` int NOT NULL,
  `max_price` int NOT NULL,
  `distance` int NOT NULL COMMENT 'ระยะห่างจากมหาลัย',
  `url` json DEFAULT NULL,
  `wifi` varchar(5) NOT NULL,
  `address` varchar(200) NOT NULL,
  `more_info` varchar(200) NOT NULL,
  `size` int NOT NULL,
  PRIMARY KEY (`dorm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

--ข้อมูล facility แต่ละหอ
CREATE TABLE `facility` (
  `dorm_id` int NOT NULL AUTO_INCREMENT,
  `water_heater` tinyint NOT NULL,
  `TV` tinyint NOT NULL,
  `air` tinyint NOT NULL,
  `fridge` tinyint NOT NULL,
  `bike` tinyint NOT NULL,
  `car` tinyint NOT NULL,
  `fitness` tinyint NOT NULL,
  `washer` tinyint NOT NULL,
  `pool` tinyint NOT NULL,
  PRIMARY KEY (`dorm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

--ข้อมูล safety แต่ละหอ
CREATE TABLE `safety` (
  `dorm_id` int NOT NULL AUTO_INCREMENT,
  `dorm_key` tinyint NOT NULL,
  `key_card` tinyint NOT NULL,
  `camera` tinyint NOT NULL,
  `guard` tinyint NOT NULL,
  `finger_print` tinyint NOT NULL,
  PRIMARY KEY (`dorm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

--ข้อมูลการreview หอพัก
CREATE TABLE `review` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `dorm_id` int NOT NULL,
  `writer_id` int NOT NULL,
  `star` int NOT NULL,
  `comment` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`review_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


--ช่องแชทการส่งความช่วยเหลือจากuser ไปยัง admin
CREATE TABLE `ticket` (
  `ticket_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `subject` varchar(100) NOT NULL,
  `status` varchar(45) NOT NULL,
  `update` date NOT NULL DEFAULT (curdate()),
  PRIMARY KEY (`ticket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

--ข้อความในticket
CREATE TABLE `ticket_message` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `ticket_id` int NOT NULL,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `message_text` varchar(1000) NOT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `user_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `profile` varchar(1000) DEFAULT NULL,
  `actor` varchar(45) NOT NULL,
  PRIMARY KEY (`id`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci