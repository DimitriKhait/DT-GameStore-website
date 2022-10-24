--this query contains all of our procedures

--insert new game procedure. inserts data to all relevent tables
use video_games
GO
IF EXISTS (
	SELECT [name]
	FROM sys.procedures
	WHERE [name] = N'insertNewGame'
)
drop proc insertNewGame
-------------------------------------------------------------------------

use video_games
GO
create procedure insertNewGame
@g_gameGenreId int,
@g_gameName NVARCHAR(255),
@g_price float,
@g_gameDescription NVARCHAR(1000),
@g_picUrl NVARCHAR(255),
@gp_publisherId int,
@gplat_platformId int,
@gplat_releaseYear int
as
begin
	DECLARE @gp_gameId int
	DECLARE @gplat_publisherId int
	INSERT INTO Game VALUES (@g_gameGenreId,@g_gameName,@g_price,@g_gameDescription,@g_picUrl)
	SET @gp_gameId =(SELECT id FROM Game WHERE game_name = @g_gameName)
	INSERT INTO Game_publisher VALUES (@gp_gameId,@gp_publisherId)
	SET @gplat_publisherId =(SELECT id FROM Game_publisher WHERE game_id = @gp_gameId)
	INSERT INTO Game_platform VALUES (@gplat_publisherId,@gplat_platformId,@gplat_releaseYear)
end
GO



--checkIfUserExist in the database and return it. (login purpose)

use video_games
GO
IF EXISTS (
	SELECT [name]
	FROM sys.procedures
	WHERE [name] = N'checkIfUserExist'
)
drop proc checkIfUserExist
-------------------------------------------------------------------------

use video_games
GO
create procedure checkIfUserExist
@uname NVARCHAR(255),
@password NVARCHAR(255)
as
begin
	DECLARE @userId int
	SET @userId =(select id from App_user where email=@uname AND pwd=@password)
	select * from App_user where id=@userId
end
GO







--getCartByUser

USE [video_games]
GO

IF EXISTS (
	SELECT [name]
	FROM sys.procedures
	WHERE [name] = N'getCartByUser'
)
drop proc getCartByUser

USE [video_games]
GO
create procedure getCartByUser
@userId int
as
begin
	SELECT
g.game_name,
users.id as usersId,
g.id as gameId
FROM App_user_Game_platform
INNER JOIN Game_platform gplat ON App_user_Game_platform.game_platform_id = gplat.id
INNER JOIN game_publisher gpub ON game_publisher_id = gpub.id
INNER JOIN game g ON gpub.game_id = g.id
INNER JOIN App_user users ON users.id = App_user_Game_platform.app_user_id
WHERE users.id = @userId
GROUP BY users.id,g.game_name,g.id
end
GO

exec getCartByUser 1

--------------------------------------------------------------



--count games for specific user


USE [video_games]
GO

IF EXISTS (
	SELECT [name]
	FROM sys.procedures
	WHERE [name] = N'getCountItemsInCart'
)
drop proc getCountItemsInCart

USE video_games
GO
create procedure getCountItemsInCart
@userId int
as
begin
	SELECT
users.id as usersId,
COUNT(*) as countGames
FROM App_user_Game_platform
INNER JOIN App_user users ON users.id = App_user_Game_platform.app_user_id
WHERE users.id = @userId
GROUP BY users.id
end