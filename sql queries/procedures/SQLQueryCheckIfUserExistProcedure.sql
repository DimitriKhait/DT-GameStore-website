USE [video_games]
GO

--DeleteGameFromUserCartProcedure.sql
IF EXISTS (
	SELECT [name]
	FROM sys.procedures
	WHERE [name] = N'checkIfUserExist'
)
drop proc checkIfUserExist

USE [video_games]
GO
create procedure checkIfUserExist
@userEmail NVARCHAR(255)
as
begin
	select email from App_user where email=@userEmail
end





