using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Service.Models;
using Service.Services;

namespace Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MultimediaManagementContext _context;

        public UsersController(MultimediaManagementContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public IEnumerable<User> GetUser()
        {
            return _context.User;
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }



            var dbUser = await _context.User.FirstOrDefaultAsync(r => r.Username == user.Username);
            if (dbUser == null)
            {
                return NotFound();
            }

            var service = new CryptoService();
            user.Password = service.Sha256_hash(user.Password);
            if (user.Password != dbUser.Password)
            {
                return BadRequest();
            }

            return Ok(dbUser);
        }

        [HttpGet("public/{id}/{take}/{skip}")]
        public async Task<IActionResult> GetPublic([FromRoute] Guid id, [FromRoute] int take, [FromRoute] int skip)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var col =  _context.Collection.Where(r => r.UserId != id && r.Type == 0).Skip(skip).Take(take).ToList();

            foreach (var collection in col)
            {
                collection.User = null;
                collection.Placeholder = _context.Placeholder.Where(r => r.CollectionId == collection.Id).Take(10).ToList();
                foreach (var placeholder in collection.Placeholder)
                {
                    placeholder.Collection = null;
                }
            }
            return Ok(col);
        }

        [HttpGet("public/{id}/{take}/{skip}/{keywords}")]
        public async Task<IActionResult> GetPublicWithKeywords([FromRoute] Guid id, [FromRoute] int take, [FromRoute] int skip, [FromRoute] String keywords)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var keywordsArr = keywords.Split(',');

            var col = _context.Collection.Where(r => r.UserId != id && r.Type == 0 && keywordsArr.Any(el => r.Keywords.Contains(el))).Skip(skip).Take(take).ToList();

            foreach (var collection in col)
            {
                collection.User = null;
                collection.Placeholder = _context.Placeholder.Where(r => r.CollectionId == collection.Id).Take(10).ToList();
                foreach (var placeholder in collection.Placeholder)
                {
                    placeholder.Collection = null;
                }
            }
            return Ok(col);
        }

        // GET: api/Users/5
        [HttpGet("{id}/{take}/{skip}")]
        public async Task<IActionResult> GetUser([FromRoute] Guid id, [FromRoute] int take, [FromRoute] int skip)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.User.FirstOrDefaultAsync(r=>r.Id == id);


            if (user == null)
            {
                return NotFound();
            }


            user.Password = null;

            user.Collection = _context.Collection.Where(r => r.UserId == user.Id).Skip(skip).Take(take).ToList();

            foreach (var collection in user.Collection)
            {
                collection.User = null;
                collection.Placeholder = _context.Placeholder.Where(r => r.CollectionId == collection.Id).Take(10).ToList();
                foreach (var placeholder in collection.Placeholder)
                {
                    placeholder.Collection = null;
                }
            }


            return Ok(user);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser([FromRoute] Guid id, [FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        [HttpPost]
        public async Task<IActionResult> PostUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_context.User.Any(r => r.Username == user.Username))
            {
                return BadRequest();
            }

            user.Id = Guid.NewGuid();
            var cryproService = new CryptoService();
            user.Password = cryproService.Sha256_hash(user.Password);

            _context.User.Add(user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        private bool UserExists(Guid id)
        {
            return _context.User.Any(e => e.Id == id);
        }
    }
}