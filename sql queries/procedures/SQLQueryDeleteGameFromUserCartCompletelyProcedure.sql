USE [video_games]
GO

--DeleteGameFromUserCartProcedure.sql
IF EXISTS (
	SELECT [name]
	FROM sys.procedures
	WHERE [name] = N'deleteGameFromUserCartCompletely'
)
drop proc deleteGameFromUserCartCompletely

USE [video_games]
GO
create procedure deleteGameFromUserCartCompletely
@userId int,
@gameId int
as
begin
	DECLARE @gamePlatformId int
	SET @gamePlatformId =
	(SELECT
		game_platform.id as gplat_id
		FROM game_platform
		INNER JOIN game_publisher gpub ON game_publisher_id = gpub.id
		INNER JOIN game g ON gpub.game_id = g.id
		where g.id=@gameId
		GROUP BY g.game_name,game_platform.id
		);
	DELETE 
	FROM App_user_Game_platform
	WHERE app_user_id=@userId AND game_platform_id=@gamePlatformId;
end





