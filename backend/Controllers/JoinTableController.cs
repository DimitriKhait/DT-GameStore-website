using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Data.SqlClient;
using System.Data;

namespace backend.Controllers
{
    [Route("api/myGames")]
    [ApiController]
    public class JoinTableController : ControllerBase
    {
        private readonly video_gamesContext _context;
        private readonly ILogger<JoinTableController> _logger;

        public JoinTableController(video_gamesContext context, ILogger<JoinTableController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/myGames
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> getAllGames()
        {
            if (_context.Games == null)
            {
                return NotFound();
            }
            return await _context.Games.ToListAsync();
        }

        public class gamesFullDetailsObject
        {
            public int Id { get; set; }
            public string GameName { get; set; }
            public string PlatformName { get; set; }
            public int ReleaseYear { get; set; }
            public string PublisherName { get; set; }
            public string GenreName { get; set; }
            public double Price { get; set; }
            public string GameDescription { get; set; }
            public string PicUrl { get; set; }
        }

        public class userGamesInCart
        {
            public int UserId { get; set; }
            public int GameId { get; set; }
            public string GameNameInCart { get; set; }

            public double GamePrice { get; set; }
            public int GameQuantity { get; set; }
        }

        public class countGamesInCartByIdObj
        {
            public int CountGamesInCart { get; set; }
        }


        // GET: api/myGames
        [HttpGet("GameDetails/{id}")]
        public async Task<ActionResult<IEnumerable<gamesFullDetailsObject>>> getGamesDetailWithId(int id)
        {
            return getSpecificGameDetailsWithId(id);
        }

        List<gamesFullDetailsObject> getSpecificGameDetailsWithId(int theId)
        {
            List<gamesFullDetailsObject> theList = new List<gamesFullDetailsObject>();
            using (SqlConnection con = new SqlConnection("Server=localhost;Database=video_games;Trusted_Connection=False;password=1234;user=sa1"))
            {
                using (SqlCommand cmd = new SqlCommand("getSpecificGameDetails", con))
                {//targeting specific Stored procedure

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@gameId", theId);//adding a parameter
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {//as long as there is still data to read
                        theList.Add(new gamesFullDetailsObject
                        {
                            Id = dr.GetInt32(0),
                            GameName = dr.GetString(1),
                            PublisherName = dr.GetString(2),
                            GenreName = dr.GetString(3),
                            PlatformName = dr.GetString(4),
                            ReleaseYear = dr.GetInt32(5),
                            Price = dr.GetDouble(6),
                            GameDescription = dr.GetString(7),
                            PicUrl = dr.GetString(8),

                        });
                    }

                    con.Close();
                }

                return theList;
            }
        }

        // GET: api/myGames/gamePictures
        [HttpGet("gamePictures")]
        public async Task<ActionResult<IEnumerable<string>>> getGamesPictures()
        {
            if (_context.Games == null)
            {
                return NotFound();
            }

            var allGames = await _context.Games.ToListAsync();
            List<Object> allKindsOfThingLst = new List<object>();

            allGames.ForEach((curr) =>
            {
                allKindsOfThingLst.Add(curr.PicUrl);
            });

            // allKindsOfThingLst.Add("one");
            var result = allKindsOfThingLst.OfType<string>().ToList();
            return result;
        }

        [HttpGet("userCart/{id}")]
        public async Task<ActionResult<IEnumerable<userGamesInCart>>> getUserCartById(int id)
        {
            return getUserCartWithId(id);
        }

        List<userGamesInCart> getUserCartWithId(int theId)
        {
            List<userGamesInCart> theList = new List<userGamesInCart>();
            using (SqlConnection con = new SqlConnection("Server=localhost;Database=video_games;Trusted_Connection=False;password=1234;user=sa1"))
            {
                using (SqlCommand cmd = new SqlCommand("getCartByUser", con))
                {//targeting specific Stored procedure

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userId", theId);//adding a parameter
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {//as long as there is still data to read
                        theList.Add(new userGamesInCart
                        {
                            UserId = dr.GetInt32(0),
                            GameId = dr.GetInt32(1),
                            GameNameInCart = dr.GetString(2),
                            GamePrice = dr.GetDouble(3),
                            GameQuantity = dr.GetInt32(4),
                        });
                    }

                    con.Close();
                }

                return theList;
            }
        }

        [HttpGet("countItemsInCartByUserId/{id}")]
        public async Task<ActionResult<IEnumerable<countGamesInCartByIdObj>>> countGamesInCartById(int id)
        {
            return countGamesInCartWithId(id);
        }

        List<countGamesInCartByIdObj> countGamesInCartWithId(int theId)
        {
            List<countGamesInCartByIdObj> theList = new List<countGamesInCartByIdObj>();
            using (SqlConnection con = new SqlConnection("Server=localhost;Database=video_games;Trusted_Connection=False;password=1234;user=sa1"))
            {
                using (SqlCommand cmd = new SqlCommand("getCountItemsInCart", con))
                {//targeting specific Stored procedure

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userId", theId);//adding a parameter
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {//as long as there is still data to read
                        theList.Add(new countGamesInCartByIdObj
                        {
                            CountGamesInCart = dr.GetInt32(1),
                        });
                    }

                    con.Close();
                }

                return theList;
            }
        }

        //addes a new game to user cart
        [HttpPost("addGameToUserCart/{myUserId}&{myGameId}")]
        public async void addGameToCart(int myUserId, int myGameId)
        {
            addMyGameToUserCart(myUserId, myGameId);
        }



        bool addMyGameToUserCart(int theUserId, int theGameId)
        {
            // List<> theList = new List<userFullDetailsObject>();
            using (SqlConnection con = new SqlConnection("Server=localhost;Database=video_games;Trusted_Connection=False;password=1234;user=sa1"))
            {
                using (SqlCommand cmd = new SqlCommand("addToUserCart", con))
                {//targeting specific Stored procedure

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userId", theUserId);//adding a parameter
                    cmd.Parameters.AddWithValue("@gameId", theGameId);//adding a parameter
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    con.Close();
                }

                return true;
            }
        }


        //addes a new game to user cart
        [HttpDelete("deleteGameFromCart/{myUserId}&{myGameId}")]
        public async void deleteGameFromCart(int myUserId, int myGameId)
        {
            deleteMyGameFromCart(myUserId, myGameId);
        }



        bool deleteMyGameFromCart(int theUserId, int theGameId)
        {
            // List<> theList = new List<userFullDetailsObject>();
            using (SqlConnection con = new SqlConnection("Server=localhost;Database=video_games;Trusted_Connection=False;password=1234;user=sa1"))
            {
                using (SqlCommand cmd = new SqlCommand("deleteGameFromUserCart", con))
                {//targeting specific Stored procedure

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userId", theUserId);//adding a parameter
                    cmd.Parameters.AddWithValue("@gameId", theGameId);//adding a parameter
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    con.Close();
                }

                return true;
            }
        }
    }
}

