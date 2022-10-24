USE [video_games]
GO

IF EXISTS (
	SELECT [name]
	FROM sys.procedures
	WHERE [name] = N'addToUserCart'
)
drop proc addToUserCart

USE [video_games]
GO
create procedure addToUserCart
@userId int,
@gameId int
as
begin
	DECLARE @gamePlatformId int
		SET @gamePlatformId =(SELECT
	game_platform.id as gplat_id
	FROM game_platform
	INNER JOIN game_publisher gpub ON game_publisher_id = gpub.id
	INNER JOIN game g ON gpub.game_id = g.id
	where g.id=@gameId
	GROUP BY g.game_name,game_platform.id);

	INSERT INTO App_user_Game_platform VALUES (@userId,@gamePlatformId)

end
GO

