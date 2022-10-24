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
	users.id as usersId,
	g.id as gameId,
	g.game_name,

	g.price,

	count(game_platform_id) as quantity
	FROM App_user_Game_platform
	INNER JOIN Game_platform gplat ON App_user_Game_platform.game_platform_id = gplat.id
	INNER JOIN game_publisher gpub ON game_publisher_id = gpub.id
	INNER JOIN game g ON gpub.game_id = g.id
	INNER JOIN App_user users ON users.id = App_user_Game_platform.app_user_id
	WHERE users.id = @userId
	GROUP BY users.id,g.game_name,g.price,game_platform_id,g.id
end


