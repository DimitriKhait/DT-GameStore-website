USE master
GO
IF EXISTS (
	SELECT [name]
	FROM sys.databases
	WHERE [name] = N'video_games'
)
DROP DATABASE video_games

--------------------------------------------------

IF EXISTS (
	SELECT [name]
	FROM sys.databases
	WHERE [name] = N'video_games'
)
-- if you are not able to drop your DB,
--   use this:
ALTER DATABASE video_games
SET SINGLE_USER
WITH ROLLBACK IMMEDIATE;
GO
IF EXISTS (
	SELECT [name]
	FROM sys.databases
	WHERE [name] = N'video_games'
)
DROP DATABASE video_games;

--------------------------------------------------
-- Create clean DATABASE
IF NOT EXISTS (
	SELECT [name]
	FROM sys.databases
	WHERE [name] = N'video_games')
CREATE DATABASE video_games
GO

USE video_games
GO

-------------------------------------------------------
-- Drop all tables --

IF OBJECT_ID('Game_platform','U') IS NOT NULL
DROP TABLE Game_platform
GO


IF OBJECT_ID('Game_publisher','U') IS NOT NULL
DROP TABLE Game_publisher
GO

IF OBJECT_ID('Game','U') IS NOT NULL
DROP TABLE Game
GO

IF OBJECT_ID('Publisher','U') IS NOT NULL
DROP TABLE Publisher
GO

IF OBJECT_ID('Genre','U') IS NOT NULL
DROP TABLE Genre
GO

IF OBJECT_ID('Platform','U') IS NOT NULL
DROP TABLE Platform
GO

IF OBJECT_ID('App_user','U') IS NOT NULL
DROP TABLE App_user
GO


IF OBJECT_ID('App_user_Game_platform','U') IS NOT NULL
DROP TABLE App_user_Game_platform
GO

-- ALL Tables are dropped!! --
-------------------------------------------------------


--Create tables
CREATE TABLE Platform (
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	platform_name NVARCHAR(50) -- Sony3-4-5, PSP, PC, WII, NINTEDO, XBOX
);

CREATE TABLE Genre (
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	genre_name NVARCHAR(50) -- Action, Fanatsy, Role-play, FPS Shooter, Sports, MMORPG(משחקי רשת), 
);

CREATE TABLE Publisher (
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	publisher_name NVARCHAR(100) --EA, Blizzard-Activision, RockStar, ubisoft
);


CREATE TABLE Game (
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	genre_id INT FOREIGN KEY REFERENCES genre(id),
	game_name NVARCHAR(200),
	price float,
	game_description NVARCHAR(1000),
	pic_url NVARCHAR(255)
	--CONSTRAINT fk_gm_gen FOREIGN KEY (genre_id) REFERENCES genre(id) -- COD, Horizon, Fifa, BNA2K, RDR2
);


CREATE TABLE Game_publisher (
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	game_id INT FOREIGN KEY REFERENCES game(id),
	publisher_id INT FOREIGN KEY REFERENCES publisher(id),
	--CONSTRAINT fk_gpu_gam FOREIGN KEY (game_id) REFERENCES game(id),
	--CONSTRAINT fk_gpu_pub FOREIGN KEY (publisher_id) REFERENCES publisher(id)
);

CREATE TABLE Game_platform (
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	game_publisher_id INT FOREIGN KEY REFERENCES game_publisher(id),
	platform_id INT FOREIGN KEY REFERENCES platform(id),
	release_year INT
	--CONSTRAINT fk_gpl_gp FOREIGN KEY (game_publisher_id) REFERENCES game_publisher(id),
	--CONSTRAINT fk_gpl_pla FOREIGN KEY (platform_id) REFERENCES platform(id)
);


CREATE TABLE App_user (
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	fname NVARCHAR(50),
	lname NVARCHAR(50),
	email NVARCHAR(50),
	pwd NVARCHAR(50),
	birthdate NVARCHAR(50),
	gender NVARCHAR(10),
	mobile_phone NVARCHAR(30)
);

CREATE TABLE App_user_Game_platform (
	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	app_user_id INT FOREIGN KEY REFERENCES App_user(id),
	game_platform_id INT FOREIGN KEY REFERENCES Game_platform(id),
	--CONSTRAINT fk_gpu_gam FOREIGN KEY (game_id) REFERENCES game(id),
	--CONSTRAINT fk_gpu_pub FOREIGN KEY (publisher_id) REFERENCES publisher(id)
);


--Insert some tables
--Other tables are inserted by loading external data:
-- game, game_publisher, game_platform

--inserting database core data

INSERT INTO Genre VALUES ('Action'),('Adventure'),('Fighting'),('Misc'),('Platform'),('Puzzle'),('Racing'),('Role-Playing'),('Shooter'),('Simulation'),('Sports'),('Strategy');

INSERT INTO Platform VALUES ('Wii'),('NES'),('GB'),('DS'),('X360'),('PS3'),('PS2'),('SNES'),('GBA'),('3DS'),('PS4'),('N64'),('PS5'),('XB'),('PC'),('2600'),('PSP'),('XOne'),('GC'),('WiiU'),('GEN'),('DC'),('PSV'),('SAT'),('SCD'),('WS'),('NG'),('TG16'),('3DO'),('GG'),('PCFX'), ('Nintendo Switch');

INSERT INTO Publisher VALUES ('Nintendo'),('Guerrilla Games'),('Valve Corporation'),('Rockstar Games'),('Electronic Arts'),('INSOMNIAC GAMES'),('Activision Blizzard'),('Sony Interactive Entertainment'),('Sony Computer Entertainment'),('Ubisoft'),('Sega Games Co. Ltd'),('BioWare'),('Naughty Dog Inc'),('Square Enix Holdings Co. Ltd'),('Capcom Company Ltd'),('Bungie Inc'),('Microsoft Corporation'),('Bandai Namco Entertainment'),('Mojang'),('Epic Games'),('Game Freak'),('Insomniac Games Inc'),('Infinity Ward'),('Take-Two Interactive Software Inc'),('Gameloft'),('ZeniMax Media Inc'),('NCSOFT'),('Blizzard Entertainment Inc'),('Zynga'),('Nexon Co. Ltd'),('Konami Holdings Corporations'),('Bethesda Game Studios'),('Double Fine Productions Inc.'),('Treasure Co. Ltd'),('Relic'),('Petroglyph Games'),('PopCap Games'),('EA Canada'),('SCE Santa Monica Studio'),('Intelligent Systems Co. Ltd'),('EA Dice'),('Polyphony Digital'),('EA Maxis'),('1C Company'),('Beenox'),('Thatgamecompany LLC'),('Atari'),('Level-5 Company'),('LucasArts'),('Sonic Team'),('Retro Studios'),('Rare'),('id Software'),('Warner Bros. Interactive'),('2K Games'),('EA Sports'),('Xbox Game Studios'),('CD Projekt'),('Techland');




INSERT INTO Game VALUES (8,'Horizon Zero Dawn', 20, 'Horizon Zero Dawn is a 2017 action role-playing game developed by Guerrilla Games and published by Sony Interactive Entertainment. The plot follows Aloy, a young huntress in a world overrun by machines, who sets out to uncover her past.','https://cdn.cdkeys.com/700x700/media/catalog/product/n/e/new_project_3__3.jpg'),(1,'Grand Theft Auto V', 15, 'Grand Theft Auto V is a 2013 action-adventure game developed by Rockstar North and published by Rockstar Games. It is the seventh main entry in the Grand Theft Auto series, following 2008s Grand Theft Auto IV, and the fifteenth instalment overall.','https://cdn.cdkeys.com/700x700/media/catalog/product/f/a/fate_of_iberia_card_23_.jpg')
INSERT INTO Game VALUES (1,'MARVELS SPIDER-MAN REMASTERED', 60, 'PlayStation PC LLC. Released. Aug 12, 2022. In Marvels Spider-Man Remastered, the worlds of Peter Parker and Spider-Man collide in an original action-packed story. Play as an experienced Peter Parker, fighting big crime and iconic villains in Marvels New York.', 'https://cdn.cdkeys.com/700x700/media/catalog/product/s/g/sgvsvsfv.jpg')

--inserting new game 

INSERT INTO Game_publisher VALUES (1,2),(2,4),(3,6)

INSERT INTO Game_platform VALUES (1,11,2017),(2,15,2012),(3,15,2022);

--inserting new user

INSERT INTO App_user VALUES ('john','doe','jd@gmail.com','Aa12345!','01/01/1995','Male','052-123-1234')





