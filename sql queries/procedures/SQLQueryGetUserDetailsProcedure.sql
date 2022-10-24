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
