--adding another game with a procedure:
use video_games
GO

exec insertNewGame 
8,
'God of War',
40,
'God of War is an action-adventure game franchise created by David Jaffe at Sonys Santa Monica Studio. It began in 2005 on the PlayStation 2 video game console, and has become a flagship title for the PlayStation brand, consisting of ten games across multiple platforms with an eleventh currently in development.',
'https://cdn.cdkeys.com/700x700/media/catalog/product/e/g/egs_godofwar_santamonicastudio_s2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1.jpg',
8,
11,
2018


exec getCartByUser 1

exec checkIfUserExist 
'jd@gmail.com',
'Aa12345!'

exec getSpecificGameDetails 1

