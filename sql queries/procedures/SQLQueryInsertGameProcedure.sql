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
