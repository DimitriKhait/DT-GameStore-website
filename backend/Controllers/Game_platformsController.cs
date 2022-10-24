using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Game_platformsController : ControllerBase
    {
        private readonly video_gamesContext _context;

        public Game_platformsController(video_gamesContext context)
        {
            _context = context;
        }

        // GET: api/Game_platforms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GamePlatform>>> GetGamePlatforms()
        {
            if (_context.GamePlatforms == null)
            {
                return NotFound();
            }
            return await _context.GamePlatforms.ToListAsync();
        }

        // GET: api/Game_platforms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GamePlatform>> GetGamePlatform(int id)
        {
            if (_context.GamePlatforms == null)
            {
                return NotFound();
            }
            var gamePlatform = await _context.GamePlatforms.FindAsync(id);

            if (gamePlatform == null)
            {
                return NotFound();
            }

            return gamePlatform;
        }

        // PUT: api/Game_platforms/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGamePlatform(int id, GamePlatform gamePlatform)
        {
            if (id != gamePlatform.Id)
            {
                return BadRequest();
            }

            _context.Entry(gamePlatform).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GamePlatformExists(id))
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

        // POST: api/Game_platforms
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GamePlatform>> PostGamePlatform(GamePlatform gamePlatform)
        {
            if (_context.GamePlatforms == null)
            {
                return Problem("Entity set 'video_gamesContext.GamePlatforms'  is null.");
            }
            _context.GamePlatforms.Add(gamePlatform);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGamePlatform", new { id = gamePlatform.Id }, gamePlatform);
        }

        // DELETE: api/Game_platforms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGamePlatform(int id)
        {
            if (_context.GamePlatforms == null)
            {
                return NotFound();
            }
            var gamePlatform = await _context.GamePlatforms.FindAsync(id);
            if (gamePlatform == null)
            {
                return NotFound();
            }

            _context.GamePlatforms.Remove(gamePlatform);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GamePlatformExists(int id)
        {
            return (_context.GamePlatforms?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
