SELECT
g.game_name,
pl.platform_name,
release_year,
pub.publisher_name
FROM game_platform
INNER JOIN game_publisher gpub ON game_publisher_id = gpub.id
INNER JOIN game g ON gpub.game_id = g.id
INNER JOIN platform pl ON platform_id = pl.id
INNER JOIN publisher pub ON gpub.publisher_id = pub.id
GROUP BY g.game_name, pl.platform_name, release_year, pub.publisher_name;

select * from game_platform