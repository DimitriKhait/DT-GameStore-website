USE [video_games]
GO

--DeleteGameFromUserCartProcedure.sql
IF EXISTS (
	SELECT [name]
	FROM sys.procedures
	WHERE [name] = N'checkUserLoginDetails'
)
drop proc checkUserLoginDetails

USE [video_games]
GO
create procedure checkUserLoginDetails
@userEmail NVARCHAR(255),
@userPwd NVARCHAR(255)
as
begin
	DECLARE @userId int
	SET @userId =
	(SELECT id from App_user where email=@userEmail AND pwd=@userPwd)
	if (@userId is not null)
	begin	
	select * from App_user where id=@userId
	end
end

exec checkUserLoginDetails 'jd@gmail.com','Aa12345!'




