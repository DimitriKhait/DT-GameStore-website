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
    [Route("api/[controller]")]
    [ApiController]
    public class App_usersController : ControllerBase
    {
        private readonly video_gamesContext _context;

        public App_usersController(video_gamesContext context)
        {
            _context = context;
        }

        // GET: api/App_users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetAppUsers()
        {
            if (_context.AppUsers == null)
            {
                return NotFound();
            }
            return await _context.AppUsers.ToListAsync();
        }

        // GET: api/App_users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetAppUser(int id)
        {
            var dt = new DateTime(2020, 01, 15);
            var res = dt.Year;
            if (_context.AppUsers == null)
            {
                return NotFound();
            }
            var appUser = await _context.AppUsers.FindAsync(id);

            if (appUser == null)
            {
                return NotFound();
            }

            return appUser;
        }

        // PUT: api/App_users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppUser(int id, AppUser appUser)
        {
            if (id != appUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(appUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/App_users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AppUser>> PostAppUser(AppUser appUser)
        {
            if (_context.AppUsers == null)
            {
                return Problem("Entity set 'video_gamesContext.AppUsers'  is null.");
            }
            _context.AppUsers.Add(appUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppUser", new { id = appUser.Id }, appUser);
        }

        // DELETE: api/App_users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppUser(int id)
        {
            if (_context.AppUsers == null)
            {
                return NotFound();
            }
            var appUser = await _context.AppUsers.FindAsync(id);
            if (appUser == null)
            {
                return NotFound();
            }

            _context.AppUsers.Remove(appUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AppUserExists(int id)
        {
            return (_context.AppUsers?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        public class userFullDetailsObject
        {
            public int Id { get; set; }
            public string Fname { get; set; }
            public string Lname { get; set; }
            public string Email { get; set; }
            public string Pwd { get; set; }
            public string Birthdate { get; set; }
            public string Gender { get; set; }
            public string MobilePhone { get; set; }
        }

        // GET: api/myGames
        [HttpGet("checkUser/{myEmail}&{myPassword}")]
        public async Task<ActionResult<IEnumerable<userFullDetailsObject>>> getUserInfo(string myEmail, string myPassword)
        {
            var userRes = getSpecificUser(myEmail, myPassword);


            if (userRes.ToArray().Length == 0)
            {
                return NotFound();
            }
            else
            {
                return userRes;
            }


        }



        List<userFullDetailsObject> getSpecificUser(string theEmail, string thePassword)
        {
            List<userFullDetailsObject> theList = new List<userFullDetailsObject>();
            using (SqlConnection con = new SqlConnection("Server=localhost;Database=video_games;Trusted_Connection=False;password=1234;user=sa1"))
            {
                using (SqlCommand cmd = new SqlCommand("checkIfUserExist", con))
                {//targeting specific Stored procedure

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@uname", theEmail);//adding a parameter
                    cmd.Parameters.AddWithValue("@password", thePassword);//adding a parameter
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {//as long as there is still data to read
                        theList.Add(new userFullDetailsObject
                        {
                            Id = dr.GetInt32(0),
                            Fname = dr.GetString(1),
                            Lname = dr.GetString(2),
                            Email = dr.GetString(3),
                            Pwd = dr.GetString(4),
                            Birthdate = dr.GetString(5),
                            Gender = dr.GetString(6),
                            MobilePhone = dr.GetString(7),

                        });
                    }

                    con.Close();
                }

                return theList;
            }
        }


        public class userLoginInfo
        {
            public string Email { get; set; }
            public string Pwd { get; set; }
        }




        [HttpPost("UserLogin/")]
        public async Task<ActionResult<IEnumerable<AppUser>>> PostLoginOfUser(userLoginInfo tempUserLoginObject)
        {
            return myPostLoginOfUser(tempUserLoginObject);
        }

        List<AppUser> myPostLoginOfUser(userLoginInfo myTempUserLoginObject)
        {
            List<AppUser> theList = new List<AppUser>();
            using (SqlConnection con = new SqlConnection("Server=localhost;Database=video_games;Trusted_Connection=False;password=1234;user=sa1"))
            {
                using (SqlCommand cmd = new SqlCommand("checkUserLoginDetails", con))
                {//targeting specific Stored procedure

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userEmail", myTempUserLoginObject.Email);//adding a parameter
                    cmd.Parameters.AddWithValue("@userPwd", myTempUserLoginObject.Pwd);//adding a parameter
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {//as long as there is still data to read
                        theList.Add(new AppUser
                        {
                            Id = dr.GetInt32(0),
                            Fname = dr.GetString(1),
                            Lname = dr.GetString(2),
                            Email = dr.GetString(3),
                            Pwd = dr.GetString(4),
                            Birthdate = dr.GetString(5),
                            Gender = dr.GetString(6),
                            MobilePhone = dr.GetString(7),
                        });
                    }

                    con.Close();
                }

                return theList;
            }
        }


        public class userEmailInfo
        {
            public string Email { get; set; }
        }


        //addes a new game to user cart
        [HttpGet("checkIfEmailExist/{myEmail}")]
        public async Task<ActionResult<IEnumerable<userEmailInfo>>> checkIfEmailExist(string myEmail)
        {
            return myCheckIfEmailExist(myEmail);
        }



        List<userEmailInfo> myCheckIfEmailExist(string theEmail)
        {
            List<userEmailInfo> theList = new List<userEmailInfo>();
            using (SqlConnection con = new SqlConnection("Server=localhost;Database=video_games;Trusted_Connection=False;password=1234;user=sa1"))
            {
                using (SqlCommand cmd = new SqlCommand("checkIfUserExist", con))
                {//targeting specific Stored procedure

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userEmail", theEmail);//adding a parameter
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        theList.Add(new userEmailInfo
                        {
                            Email = dr.GetString(0),
                        });
                    }

                    con.Close();
                }

                return theList;
            }
        }
    }



}

