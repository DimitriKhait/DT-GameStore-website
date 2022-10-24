use video_games
GO

drop proc getAllGameNames

create procedure getAllGameNames
@str VARCHAR(25)
as
begin
	select game_name,price from Game
	WHERE game_name like '%'+@str+'%'
end
GO

exec getAllGameNames 'a'