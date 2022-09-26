-- MySQL Script generated by MySQL Workbench
-- Mon Sep 26 13:19:33 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema roomies
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema roomies
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `roomies` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `roomies` ;

-- -----------------------------------------------------
-- Table `roomies`.`admins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roomies`.`admins` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` INT NOT NULL DEFAULT '4',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `roomies`.`documents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roomies`.`documents` (
  `document_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40) NULL DEFAULT NULL,
  `isdeleted` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`document_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `roomies`.`owner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roomies`.`owner` (
  `owner_id` INT NOT NULL,
  `namefirst` VARCHAR(255) NOT NULL,
  `namelast` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `dob` VARCHAR(255) NOT NULL,
  `occupation` VARCHAR(255) NULL DEFAULT NULL,
  `city` VARCHAR(255) NOT NULL,
  `age` TINYINT NULL DEFAULT NULL,
  `gender` VARCHAR(255) NOT NULL,
  `state` VARCHAR(255) NOT NULL,
  `isdeleted` TINYINT NULL DEFAULT '0',
  PRIMARY KEY (`owner_id`),
  UNIQUE INDEX `owner_id` (`owner_id` ASC) VISIBLE,
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  CONSTRAINT `owner_ibfk_1`
    FOREIGN KEY (`email`)
    REFERENCES `roomies`.`admins` (`email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `roomies`.`flat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roomies`.`flat` (
  `flat_id` INT NOT NULL AUTO_INCREMENT,
  `owner_id` INT NULL DEFAULT NULL,
  `flat_type` VARCHAR(10) NULL DEFAULT NULL,
  `requirement` VARCHAR(60) NULL DEFAULT NULL,
  `no_of_members` INT NULL DEFAULT NULL,
  `deposite` INT NULL DEFAULT NULL,
  `rent` FLOAT NULL DEFAULT NULL,
  `is_wifi_available` TINYINT NULL DEFAULT NULL,
  `is_tv_available` TINYINT NULL DEFAULT NULL,
  `is_parking_available` TINYINT NULL DEFAULT NULL,
  `is_bed_available` TINYINT NULL DEFAULT NULL,
  `is_lift_available` TINYINT NULL DEFAULT NULL,
  `furnished_type` VARCHAR(40) NULL DEFAULT NULL,
  `address` VARCHAR(100) NULL DEFAULT NULL,
  `city` VARCHAR(30) NULL DEFAULT NULL,
  `state` VARCHAR(40) NULL DEFAULT NULL,
  `zipcode` MEDIUMTEXT NULL DEFAULT NULL,
  `isactive` TINYINT NULL DEFAULT NULL,
  `isdeleted` TINYINT NULL DEFAULT NULL,
  `image1` VARCHAR(200) NULL DEFAULT NULL,
  `image2` VARCHAR(200) NULL DEFAULT NULL,
  `image3` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`flat_id`),
  INDEX `owner_id` (`owner_id` ASC) VISIBLE,
  CONSTRAINT `flat_ibfk_1`
    FOREIGN KEY (`owner_id`)
    REFERENCES `roomies`.`owner` (`owner_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `roomies`.`flat_documents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roomies`.`flat_documents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `document_id` INT NULL DEFAULT NULL,
  `flat_id` INT NULL DEFAULT NULL,
  `isdeleted` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `document_id` (`document_id` ASC) VISIBLE,
  INDEX `flat_id` (`flat_id` ASC) VISIBLE,
  CONSTRAINT `flat_documents_ibfk_1`
    FOREIGN KEY (`document_id`)
    REFERENCES `roomies`.`documents` (`document_id`),
  CONSTRAINT `flat_documents_ibfk_2`
    FOREIGN KEY (`flat_id`)
    REFERENCES `roomies`.`flat` (`flat_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `roomies`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roomies`.`user` (
  `user_id` INT NOT NULL,
  `namefirst` VARCHAR(255) NOT NULL,
  `namelast` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `dob` VARCHAR(255) NOT NULL,
  `occupation` VARCHAR(255) NULL DEFAULT NULL,
  `city` VARCHAR(255) NOT NULL,
  `age` TINYINT NULL DEFAULT NULL,
  `gender` VARCHAR(255) NOT NULL,
  `state` VARCHAR(255) NOT NULL,
  `isdeleted` TINYINT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  CONSTRAINT `user_ibfk_1`
    FOREIGN KEY (`email`)
    REFERENCES `roomies`.`admins` (`email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `roomies`.`flat_review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roomies`.`flat_review` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `flat_id` INT NOT NULL,
  `review` VARCHAR(60) NULL DEFAULT NULL,
  `ratings` DECIMAL(2,1) NULL DEFAULT NULL,
  `isdeleted` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC) VISIBLE,
  INDEX `flat_id` (`flat_id` ASC) VISIBLE,
  INDEX `flat_review_ibfk_1` (`user_id` ASC) VISIBLE,
  CONSTRAINT `flat_review_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `roomies`.`user` (`user_id`),
  CONSTRAINT `flat_review_ibfk_2`
    FOREIGN KEY (`flat_id`)
    REFERENCES `roomies`.`flat` (`flat_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `roomies`.`hostel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roomies`.`hostel` (
  `hostel_id` INT NOT NULL AUTO_INCREMENT,
  `owner_id` INT NULL DEFAULT NULL,
  `name` VARCHAR(60) NULL DEFAULT NULL,
  `total_rooms` INT NULL DEFAULT NULL,
  `available_rooms` INT NULL DEFAULT NULL,
  `requirement` VARCHAR(30) NULL DEFAULT NULL,
  `no_of_singlebed` INT NULL DEFAULT NULL,
  `no_of_doublebed` INT NULL DEFAULT NULL,
  `is_lift_available` TINYINT(1) NULL DEFAULT NULL,
  `is_canteen_available` TINYINT(1) NULL DEFAULT NULL,
  `is_tv_available` TINYINT(1) NULL DEFAULT NULL,
  `is_ac_available` TINYINT(1) NULL DEFAULT NULL,
  `is_wifi_available` TINYINT(1) NULL DEFAULT NULL,
  `is_washing_machine_available` TINYINT(1) NULL DEFAULT NULL,
  `room_fee` FLOAT NULL DEFAULT NULL,
  `canteen_fee` FLOAT NULL DEFAULT NULL,
  `address` VARCHAR(70) NULL DEFAULT NULL,
  `city` VARCHAR(30) NULL DEFAULT NULL,
  `state` VARCHAR(30) NULL DEFAULT NULL,
  `zipcode` MEDIUMTEXT NULL DEFAULT NULL,
  `isactive` TINYINT NULL DEFAULT NULL,
  `isdeleted` TINYINT NULL DEFAULT NULL,
  `image1` VARCHAR(200) NULL DEFAULT NULL,
  `image2` VARCHAR(200) NULL DEFAULT NULL,
  `image3` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`hostel_id`),
  INDEX `owner_id` (`owner_id` ASC) VISIBLE,
  CONSTRAINT `hostel_ibfk_1`
    FOREIGN KEY (`owner_id`)
    REFERENCES `roomies`.`owner` (`owner_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `roomies`.`hostel_documents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roomies`.`hostel_documents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `document_id` INT NULL DEFAULT NULL,
  `hostel_id` INT NULL DEFAULT NULL,
  `isdeleted` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `document_id` (`document_id` ASC) VISIBLE,
  INDEX `hostel_id` (`hostel_id` ASC) VISIBLE,
  CONSTRAINT `hostel_documents_ibfk_1`
    FOREIGN KEY (`document_id`)
    REFERENCES `roomies`.`documents` (`document_id`),
  CONSTRAINT `hostel_documents_ibfk_2`
    FOREIGN KEY (`hostel_id`)
    REFERENCES `roomies`.`hostel` (`hostel_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `roomies`.`hostel_review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roomies`.`hostel_review` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `hostel_id` INT NOT NULL,
  `review` VARCHAR(60) NULL DEFAULT NULL,
  `ratings` DECIMAL(2,1) NULL DEFAULT NULL,
  `isdeleted` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC) VISIBLE,
  INDEX `hostel_id` (`hostel_id` ASC) VISIBLE,
  INDEX `hostel_review_ibfk_1` (`user_id` ASC) VISIBLE,
  CONSTRAINT `hostel_review_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `roomies`.`user` (`user_id`),
  CONSTRAINT `hostel_review_ibfk_2`
    FOREIGN KEY (`hostel_id`)
    REFERENCES `roomies`.`hostel` (`hostel_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `roomies`.`owner_phoneno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roomies`.`owner_phoneno` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `owner_id` INT NULL DEFAULT NULL,
  `phone` VARCHAR(15) NULL DEFAULT NULL,
  `isdeleted` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `owner_id` (`owner_id` ASC) VISIBLE,
  CONSTRAINT `owner_phoneno_ibfk_1`
    FOREIGN KEY (`owner_id`)
    REFERENCES `roomies`.`owner` (`owner_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `roomies`.`report`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roomies`.`report` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `owner_id` INT NULL DEFAULT NULL,
  `reason` VARCHAR(255) NULL DEFAULT NULL,
  `isdeleted` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `owner_id` (`owner_id` ASC) VISIBLE,
  CONSTRAINT `report_ibfk_1`
    FOREIGN KEY (`owner_id`)
    REFERENCES `roomies`.`owner` (`owner_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `roomies`.`user_phoneno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roomies`.`user_phoneno` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL DEFAULT NULL,
  `phone` VARCHAR(15) NULL DEFAULT NULL,
  `isdeleted` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_phoneno_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `roomies`.`user` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `roomies` ;

-- -----------------------------------------------------
-- procedure gethostels
-- -----------------------------------------------------

DELIMITER $$
USE `roomies`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `gethostels`()
begin 
	
	select hostel_id,owner.namefirst,name,total_rooms,available_rooms,requirement,no_of_singlebed,no_of_doublebed,is_lift_available,is_canteen_available,is_tv_available,is_ac_available,is_wifi_available,is_washing_machine_available,room_fee,canteen_fee,h.city,h.state,h.zipcode from hostel h inner join owner using(owner_id) where isactive=1 and h.isdeleted=0;
	
end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure insertflat
-- -----------------------------------------------------

DELIMITER $$
USE `roomies`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertflat`(oid int,flat_type varchar(40),req varchar(30),members int,
deposite int,rent int,wifi int,tv int,parking int,bed int,lift int,ftype varchar(30),address varchar(100),city varchar(20),
st varchar(40),zip varchar(20),isactive int,isdeleted int,img1 varchar(200),img2 varchar(200),img3 varchar(200))
BEGIN
	insert into flat(owner_id,
flat_type,
requirement,
no_of_members,
deposite,
rent,
is_wifi_available,
is_tv_available,
is_parking_available,
is_bed_available,
is_lift_available,
furnished_type,
address,
city,
`state`,
zipcode,
isactive,
isdeleted,
image1,image2,image3) values(oid,flat_type,req,members,deposite,rent,wifi,tv,parking,bed,lift,ftype,address,city,st,zip,isactive,isdeleted,img1,img2,img3);

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure inserthostel
-- -----------------------------------------------------

DELIMITER $$
USE `roomies`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `inserthostel`(oid int,name varchar(40),trm int,avrm int,req varchar(30),
sbed int,dbed int,lift bool,canteen bool,tv bool,ac bool,wifi bool,wm bool,rmfee float,cantfee float,
address varchar(100),city varchar(20),st varchar(40),zip varchar(20),isactive int,isdeleted int, image1 varchar(200) ,
image2 varchar(200), image3 varchar(200))
BEGIN
	insert into hostel(owner_id,
name,
total_rooms,
available_rooms,
requirement,
no_of_singlebed,
no_of_doublebed,
is_lift_available,
is_canteen_available,
is_tv_available,
is_ac_available,
is_wifi_available,
is_washing_machine_available,
room_fee,
canteen_fee,
address,
city,
`state`,
zipcode,
isactive,
isdeleted,image1,image2,image3) values(oid,name,trm,avrm,req,sbed,dbed,lift,canteen,tv,ac,wifi,wm,rmfee,cantfee,address,city,st,zip,isactive,isdeleted,image1,image2,image3);

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure updateflat
-- -----------------------------------------------------

DELIMITER $$
USE `roomies`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateflat`(fid int,ftype varchar(40),req varchar(30),nm int,fdeposite int,frent float,
wifi int,tv int,parking int,bed int,lift tinyint,furtype varchar(20),faddress varchar(100),fcity varchar(20),st varchar(40),
zip varchar(20),active int,deleted int,img1 varchar(200),img2 varchar(200),img3 varchar(200))
begin 
	
	update flat set flat_type=ftype,requirement=req,no_of_members=nm,deposite=fdeposite,rent=frent,is_wifi_available=wifi,
    is_tv_available=tv,is_parking_available=parking,is_bed_available=bed,is_lift_available=lift,furnished_type=furtype,
    address=faddress,city=fcity,`state`=st,zipcode=zip,isactive=active,isdeleted=deleted, image1 = img1,image2 = img2,
    image3 = img3 where flat_id=fid;
	
end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure updatehostel
-- -----------------------------------------------------

DELIMITER $$
USE `roomies`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updatehostel`(hid int,hname varchar(40),trm int,avrm int,req varchar(30),
sbed int,dbed int,lift tinyint,canteen tinyint,tv tinyint,ac tinyint,wifi tinyint,wm tinyint,rmfee float,cantfee float,
haddress varchar(100),hcity varchar(20),st varchar(40),zip varchar(20),active int,deleted int,img1 varchar(200), img2 varchar(200), img3 varchar(200))
begin 
	
	update hostel set name=hname,total_rooms=trm,available_rooms=avrm,requirement=req,no_of_singlebed=sbed,
    no_of_doublebed=dbed,is_lift_available=lift,is_canteen_available=canteen,is_tv_available=tv,is_ac_available=ac,
    is_wifi_available=wifi,is_washing_machine_available=wm,room_fee=rmfee,canteen_fee=cantfee,address=haddress,
    city=hcity,state=st,zipcode=zip,isactive=active,isdeleted=deleted, image1=img1, image2=img2, image3=img3 where hostel_id=hid;
	
end$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
