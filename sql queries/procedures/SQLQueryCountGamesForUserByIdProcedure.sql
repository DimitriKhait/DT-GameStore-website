USE [video_games]
GO

IF EXISTS (
	SELECT [name]
	FROM sys.procedures
	WHERE [name] = N'getCountItemsInCart'
)
drop proc getCountItemsInCart

USE [video_games]
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

exec getCountItemsInCart 1