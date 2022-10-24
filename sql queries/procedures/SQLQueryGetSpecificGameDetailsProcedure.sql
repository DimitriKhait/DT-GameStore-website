USE [video_games]
GO
IF EXISTS (
	SELECT [name]
	FROM sys.procedures
	WHERE [name] = N'getSpecificGameDetails'
)
drop proc getSpecificGameDetails

USE [video_games]
GO
create procedure getSpecificGameDetails
@gameId int
as
begin
	SELECT
	g.id,
	g.game_name,
	pub.publisher_name,
	genre.genre_name,
	pl.platform_name,
	release_year,
	g.price,
	g.game_description,
	g.pic_url
	FROM game_platform
	INNER JOIN game_publisher gpub ON game_publisher_id = gpub.id
	INNER JOIN game g ON gpub.game_id = g.id
	INNER JOIN platform pl ON platform_id = pl.id
	INNER JOIN publisher pub ON gpub.publisher_id = pub.id
	INNER JOIN genre on g.genre_id = genre.id
	WHERE g.id = @gameId
	GROUP BY g.id,g.game_name, g.price, genre.genre_name,g.game_description,pl.platform_name, release_year, pub.publisher_name,g.pic_url
end

