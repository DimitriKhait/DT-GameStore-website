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
    public class AppUserGamePlatformController : ControllerBase
    {
        private readonly video_gamesContext _context;

        public AppUserGamePlatformController(video_gamesContext context)
        {
            _context = context;
        }

        // GET: api/AppUserGamePlatform
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUserGamePlatform>>> GetAppUserGamePlatforms()
        {
            if (_context.AppUserGamePlatforms == null)
            {
                return NotFound();
            }
            return await _context.AppUserGamePlatforms.ToListAsync();
        }

        // GET: api/AppUserGamePlatform/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUserGamePlatform>> GetAppUserGamePlatform(int id)
        {
            if (_context.AppUserGamePlatforms == null)
            {
                return NotFound();
            }
            var appUserGamePlatform = await _context.AppUserGamePlatforms.FindAsync(id);

            if (appUserGamePlatform == null)
            {
                return NotFound();
            }

            return appUserGamePlatform;
        }

        // PUT: api/AppUserGamePlatform/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppUserGamePlatform(int id, AppUserGamePlatform appUserGamePlatform)
        {
            if (id != appUserGamePlatform.Id)
            {
                return BadRequest();
            }

            _context.Entry(appUserGamePlatform).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppUserGamePlatformExists(id))
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

        // POST: api/AppUserGamePlatform
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AppUserGamePlatform>> PostAppUserGamePlatform(AppUserGamePlatform appUserGamePlatform)
        {
            if (_context.AppUserGamePlatforms == null)
            {
                return Problem("Entity set 'video_gamesContext.AppUserGamePlatforms'  is null.");
            }
            _context.AppUserGamePlatforms.Add(appUserGamePlatform);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppUserGamePlatform", new { id = appUserGamePlatform.Id }, appUserGamePlatform);
        }

        // DELETE: api/AppUserGamePlatform/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppUserGamePlatform(int id)
        {
            if (_context.AppUserGamePlatforms == null)
            {
                return NotFound();
            }
            var appUserGamePlatform = await _context.AppUserGamePlatforms.FindAsync(id);
            if (appUserGamePlatform == null)
            {
                return NotFound();
            }

            _context.AppUserGamePlatforms.Remove(appUserGamePlatform);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AppUserGamePlatformExists(int id)
        {
            return (_context.AppUserGamePlatforms?.Any(e => e.Id == id)).GetValueOrDefault();
        }





        //----------self written code:---------------------------------

        //addes a new game to user cart
        [HttpDelete("deleteGameFromCartCompletely/{myUserId}&{myGameId}")]
        public async void deleteGameFromCartCompletely(int myUserId, int myGameId)
        {
            deleteMyGameFromCartCompletely(myUserId, myGameId);
        }



        bool deleteMyGameFromCartCompletely(int theUserId, int theGameId)
        {
            // List<> theList = new List<userFullDetailsObject>();
            using (SqlConnection con = new SqlConnection("Server=localhost;Database=video_games;Trusted_Connection=False;password=1234;user=sa1"))
            {
                using (SqlCommand cmd = new SqlCommand("deleteGameFromUserCartCompletely", con))
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
